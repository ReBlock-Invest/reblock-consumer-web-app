import { Alert, Button, Col, Drawer, Flex, Row, Statistic, Typography, theme } from "antd"
import React from "react"

const { Text } = Typography

type Props = {
  open?: boolean
  onClose?: () => void
}

const ConfirmInvestmentDrawer: React.FC<Props> = ({open, onClose}) => {
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
            <Button block size="large">
              Cancel
            </Button>
          </Col>
          <Col span={12}>
            <Button type="primary" block size="large">
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
            value={33.78}
            precision={2}
            prefix="$USDC"
          />
        </div>

        <Alert 
          message="Withdrawal timeline"
          description="Phasellus purus purus, vulputate non lacus vehicula, tincidunt facilisis eros. Suspendisse sagittis sodales elit, vitae dapibus felis facilisis vitae. Vivamus sed fringilla augue. Maecenas ac porttitor sapien. Aenean rhoncus orci velit, ut maximus enim pellentesque non. Etiam euismod nibh sed est rutrum, vel mollis nibh blandit. Suspendisse efficitur tristique nibh nec vulputate. In feugiat dignissim nisl ac fermentum."
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