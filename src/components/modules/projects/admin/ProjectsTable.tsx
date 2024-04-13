import { DownloadOutlined, UploadOutlined } from "@ant-design/icons"
import { App, Button, Flex, Table, Tooltip, Typography } from "antd"
import { ColumnsType } from "antd/es/table"
import Project from "entities/project/Project"
import React, { useMemo, useState } from "react"
import WithdrawModal from "./modals/WithdrawModal"
import RepayModal from "./modals/RepayModal"
import { useMutation } from "react-query"
import useServices from "hooks/useServices"

const { Text } = Typography

type Props = {
  data: Project[]
  loading: boolean
}

const ProjectsTable: React.FC<Props> = ({data, loading}) => {
  const { message } = App.useApp()
  const [selectedWithdrawalCanisterId, setSelectedWithdrawalCanisterId] = useState<string | undefined>(undefined)
  const [selectedDepositCanisterId, setSelectedDepositCanisterId] = useState<string | undefined>(undefined)
  
  const services = useServices()

  const {mutate: withdraw, isLoading: isWithdrawLoading} = useMutation({
    mutationKey: ['withdraw'],
    mutationFn: (args: {amount: number}) => services.projectService.depositToRBPoolPrincipal(
      'dummy_usdc',
      BigInt(args.amount)
    ),
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
    mutationFn: async (args: {amount: number, interest: number}) => {
      await services.projectService.repayPrincipal(
        'dummy_usdc',
        BigInt(args.amount)
      )

      await services.projectService.repayInterest(
        'dummy_usdc',
        BigInt(args.interest)
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

  const columns: ColumnsType<Project> = useMemo(() => [
    {
      title: 'Title',
      dataIndex: 'title',
      key: 'title',
    },
    {
      title: 'Description',
      dataIndex: 'description',
      key: 'description',
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
    },
    {
      title: 'Total Loan',
      dataIndex: 'total_loan_amount',
      key: 'total_loan_amount',
    },
    {
      title: 'Pool Balance',
      dataIndex: 'pool_balance',
      key: 'pool_balance',
      render: (_, record) => (
        <Text>0</Text>
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
              onClick={() => setSelectedWithdrawalCanisterId(process.env.REACT_APP_DUMMY_USDC_CANISTER_ID as string)}
            />
          </Tooltip>
          <Tooltip title="Repay">
            <Button
              type="primary"
              icon={<UploadOutlined />}
              //Demo purpose only
              onClick={() => setSelectedDepositCanisterId(process.env.REACT_APP_DUMMY_USDC_CANISTER_ID as string)}
              style={{ backgroundColor: 'green'}}
            />
          </Tooltip>
        </Flex>
      ),
    },
  ], [setSelectedWithdrawalCanisterId, setSelectedDepositCanisterId])

  return (
    <Flex>
      <WithdrawModal
        open={!!selectedWithdrawalCanisterId}
        confirmLoading={isWithdrawLoading}
        onCancel={() => setSelectedWithdrawalCanisterId(undefined)}
        onOk={(form) => withdraw({amount: form.amount})}
        closable={!isWithdrawLoading}
      />
      <RepayModal
        open={!!selectedDepositCanisterId}
        confirmLoading={isDepositLoading}
        onCancel={() => setSelectedDepositCanisterId(undefined)}
        onOk={(form) => deposit({
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