import { Flex, Form, Input, Modal } from "antd"
import React from "react"


type FieldType = {
  amount: number
}

type Props = {
  open: boolean
  onOk: (form: FieldType) => void
  onCancel: () => void
  confirmLoading: boolean
  closable: boolean
}


const WithdrawModal: React.FC<Props> = ({
  open,
  onOk,
  confirmLoading,
  onCancel,
  closable
}) => {
  const [form] = Form.useForm<FieldType>();

  const amount = Form.useWatch('amount', form);

  return (
    <Modal
      title="Withdraw"
      open={open}
      onOk={() => {
        onOk({
          amount,
        })
        form.resetFields()
      }}
      confirmLoading={confirmLoading}
      onCancel={onCancel}
      closable={closable}
    >
      <Flex>
        <Form
          form={form}
          name="basic"
          labelCol={{ span: 4 }}
          wrapperCol={{ span: 24 }}
          style={{width: '100%'}}
          initialValues={{ remember: true }}
          onFinish={onOk}
          autoComplete="off"
        >
          <Form.Item<FieldType>
            label="Amount"
            name="amount"
            rules={[{ required: true, message: 'Please input withdraw amount' }]}
            wrapperCol={{ span: 24 }}
          >
            <Input />
          </Form.Item>
        </Form>
      </Flex>
    </Modal>
  )
}

export default WithdrawModal