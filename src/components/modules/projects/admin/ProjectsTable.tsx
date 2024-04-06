import { DownloadOutlined, UploadOutlined } from "@ant-design/icons"
import { Button, Flex, Table, Tooltip, Typography } from "antd"
import { ColumnsType } from "antd/es/table"
import Project from "entities/project/Project"
import React, { useMemo, useState } from "react"
import WithdrawModal from "./modals/WithdrawModal"
import DepositModal from "./modals/DepositModal"

const { Text } = Typography




type Props = {
  data: Project[]
}

const ProjectsTable: React.FC<Props> = ({data}) => {

  const [openWithdrawModal, setOpenWithdrawModal] = useState(false)
  const [openDepositModal, setOpenDepositModal] = useState(false)

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
              onClick={() => setOpenWithdrawModal(true)}
            />
          </Tooltip>
          <Tooltip title="Deposit">
            <Button
              type="primary"
              icon={<UploadOutlined />}
              onClick={() => setOpenDepositModal(true)}
              style={{ backgroundColor: 'green'}}
            />
          </Tooltip>
        </Flex>
      ),
    },
  ], [setOpenWithdrawModal])

  return (
    <Flex>
      <WithdrawModal
        open={openWithdrawModal}
        confirmLoading={false}
        onCancel={() => setOpenWithdrawModal(false)}
        onOk={() =>  setOpenWithdrawModal(false)}
      />
      <DepositModal
        open={openDepositModal}
        confirmLoading={false}
        onCancel={() => setOpenDepositModal(false)}
        onOk={() =>  setOpenDepositModal(false)}
      />
      <Table
        columns={columns}
        dataSource={data}
      />
    </Flex>
  )
}

export default ProjectsTable