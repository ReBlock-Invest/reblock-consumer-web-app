import { Alert, Button, Col, Drawer, Flex, Row, Statistic, Typography, theme } from "antd"
import React from "react"

const { Text } = Typography

type Props = {
  open?: boolean
  onClose?: () => void
  value: number
}

const ConfirmInvestmentDrawer: React.FC<Props> = ({open, onClose, value}) => {
  const {
    token: {
      colorBgLayout,
    }
  } = theme.useToken()
  return (
    <Drawer
      placement="bottom"
      open={open}
      onClose={onClose}
      title="Confirm Investment"
      footer={
        <Row style={{width: '100%'}} gutter={8}>
          <Col span={12}>
            <Button block size="large" onClick={onClose}>
              Cancel
            </Button>
          </Col>
          <Col span={12}>
            <Button type="primary" block size="large" onClick={onClose}>
              Confirm
            </Button>
          </Col>
        </Row>
      }
    >
      <Flex
        gap={8}
        vertical
      >
        <Text>Total amount</Text>
        <div
          style={{backgroundColor: colorBgLayout, borderRadius: 8}}
          className="p-sm"
        >
          <Statistic
            value={value}
            precision={2}
            suffix="ICP"
          />
        </div>

        <Alert 
          message="Withdrawal timeline"
          description="Based on withdrawal queue and the projected repayments by borrowers, you may not be able to withdraw the majority of your assets for at least 30 days. The actual time to withdraw your assets may be shorter or longer depending on variety of factors."
          type="success"
        />

        <Text type="secondary">
          By clicking “Confirm” below, I hereby agree and acknowledge that I am investing capital in an asset that may not be available to withdraw
        </Text>
      </Flex>      
    </Drawer>
  )
}

export default ConfirmInvestmentDrawer