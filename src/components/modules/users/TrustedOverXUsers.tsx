import { Avatar, Card, Space, Statistic, Typography, theme } from "antd"
import React from "react"

const {Text} = Typography

type Props = {

}

const TrustedOverXUsers: React.FC<Props> = () => {
  const {
    token: {
      colorTextLightSolid,
    }
  } = theme.useToken()

  return (
    <Space direction="vertical" align="center">
      <Avatar.Group>
        <Avatar src="https://xsgames.co/randomusers/avatar.php?g=pixel&key=1" />
        <Avatar src="https://xsgames.co/randomusers/avatar.php?g=pixel&key=2" />
        <Avatar src="https://xsgames.co/randomusers/avatar.php?g=pixel&key=3" />
        <Avatar src="https://xsgames.co/randomusers/avatar.php?g=pixel&key=4" />
        <Avatar src="https://xsgames.co/randomusers/avatar.php?g=pixel&key=4" />
      </Avatar.Group>
      <Text type="secondary" style={{color: colorTextLightSolid}}>Trusted over 800K+</Text>      
    </Space>
  )
}

export default TrustedOverXUsers