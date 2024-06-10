import { DownloadOutlined, UploadOutlined } from "@ant-design/icons"
import { App, Button, Flex, Skeleton, Table, Tooltip, Typography } from "antd"
import { ColumnsType } from "antd/es/table"
import ProjectWithBalance from "entities/project/ProjectWithBalance"
import React, { useMemo, useState } from "react"
import WithdrawModal from "./modals/WithdrawModal"
import RepayModal from "./modals/RepayModal"
import { useMutation, useQuery } from "react-query"
import useServices from "hooks/useServices"
import useWeb3 from "hooks/useWeb3"

const { Text } = Typography

type Props = {
  data: ProjectWithBalance[]
  loading: boolean
}

const dateOptions: Intl.DateTimeFormatOptions = {
  weekday: 'long',
  year: 'numeric',
  month: 'long',
  day: 'numeric',
};

const ProjectsTable: React.FC<Props> = ({data, loading}) => {
  const { message } = App.useApp()
  const { accounts, isLoading: isAccountLoading } = useWeb3()
  const [selectedWithdrawalCanisterId, setSelectedWithdrawalCanisterId] = useState<ProjectWithBalance | undefined>(undefined)
  const [selectedDepositCanisterId, setSelectedDepositCanisterId] = useState<ProjectWithBalance | undefined>(undefined)
  
  const services = useServices()

  const { data: userbalance } = useQuery({
    queryKey: ["userbalance", !!accounts && accounts.length > 0 ? accounts[0] : ""],
    queryFn: () => services.projectService.getCkUSDCBalance(      
      !!accounts && accounts.length > 0 ? accounts[0] : ""
    ),
    enabled: !!accounts && accounts.length > 0,
  })

  const {mutate: withdraw, isLoading: isWithdrawLoading} = useMutation({
    mutationKey: ['withdraw'],
    mutationFn: async (args: {poolId: string}) => {
      await services.projectService.drawdownAsset(args.poolId)
    },
    onSuccess: () => {
      setSelectedWithdrawalCanisterId(undefined)
      message.success('Success to withdraw from project.')
    },
    onError: (err) => {
      message.error('Failed to withdraw from project.')
    },
  })

  const {mutate: deposit, isLoading: isDepositLoading} = useMutation({
    mutationKey: ['deposit'],
    mutationFn: async (args: {poolId: string, amount: number, interest: number}) => {
      await services.projectService.repayPrincipal(
        args.poolId,
        BigInt(parseInt(`${parseFloat(`${args.amount}`) * 1000000}`))
      )

      await services.projectService.repayInterest(
        args.poolId,
        BigInt(parseInt(`${parseFloat(`${args.interest}`) * 1000000}`))
      )
    },
    onSuccess: () => {
      setSelectedDepositCanisterId(undefined)
      message.success('Success to deposit to project.')
    },
    onError: (err) => {
      message.error('Failed to deposit to project.')
    },
  })

  const columns: ColumnsType<ProjectWithBalance> = useMemo(() => [
    {
      title: 'Title',
      dataIndex: 'title',
      key: 'title',
    },
    {
      title: 'Description',
      dataIndex: 'description',
      key: 'description',
      render: (_, record) => (
        <div>
        <Text>{ record.description }</Text><br/><br/>
        <Text><i>Fundrise End Date</i>: {new Date(Number(record.fundrise_end_time) / 1000000).toLocaleDateString(undefined, dateOptions)}</Text><br/>
        <Text><i>Origination Date</i>: {new Date(Number(record.origination_date) / 1000000).toLocaleDateString(undefined, dateOptions)}</Text><br/>
        <Text><i>Maturity Date</i>: {new Date(Number(record.maturity_date) / 1000000).toLocaleDateString(undefined, dateOptions)}</Text><br/>
        </div>
      )
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (_, record) => (
        <Text><strong>{ record.status.toString() }</strong></Text>
      )
    },
    {
      title: 'Total Loan',
      dataIndex: 'total_loan_amount',
      key: 'total_loan_amount',
      render: (_, record) => (
        <Text>{ Number(record.total_loan_amount) / 1000000 }</Text>
      )
    },
    {
      title: 'Pool Balance',
      dataIndex: 'pool_balance',
      key: 'pool_balance',
      render: (_, record) => (
        <Text>{ record.balance / 1000000 }</Text>
      )
    },
    {
      title: 'Action',
      key: 'action',
      render: (_, record) => (
        <Flex gap={8}>
          <Tooltip title="Withdraw">
            <Button
              type="primary"
              icon={<DownloadOutlined />}
              //Demo purpose only
              onClick={() => setSelectedWithdrawalCanisterId(record)}
            />
          </Tooltip>
          <Tooltip title="Repay">
            <Button
              type="primary"
              icon={<UploadOutlined />}
              //Demo purpose only
              onClick={() => setSelectedDepositCanisterId(record)}
              style={{ backgroundColor: 'green'}}
            />
          </Tooltip>
        </Flex>
      ),
    },
  ], [setSelectedWithdrawalCanisterId, setSelectedDepositCanisterId])

  if (isAccountLoading) {
    return <Skeleton/>
  }

  return (
    <Flex>
      <WithdrawModal
        open={!!selectedWithdrawalCanisterId}
        balance={selectedWithdrawalCanisterId?.balance}
        confirmLoading={isWithdrawLoading}
        onCancel={() => setSelectedWithdrawalCanisterId(undefined)}
        onOk={(form) => withdraw({poolId: selectedWithdrawalCanisterId?.canister_id as string})}
        closable={!isWithdrawLoading}
      />
      <RepayModal
        open={!!selectedDepositCanisterId}
        userBalance={userbalance as bigint}
        poolId={selectedDepositCanisterId?.canister_id as string}
        confirmLoading={isDepositLoading}
        onCancel={() => setSelectedDepositCanisterId(undefined)}
        onOk={(form) => deposit({
          poolId: selectedDepositCanisterId?.canister_id as string,
          amount: form.amount,
          interest: form.interest,
        })}
        closable={!isDepositLoading}
        
      />
      <Table
        columns={columns}
        dataSource={data}
        loading={loading}
        style={{width: '100%'}}
      />
    </Flex>
  )
}

export default ProjectsTable