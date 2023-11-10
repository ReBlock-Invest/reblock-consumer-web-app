import { Avatar, Flex, List, Space, Statistic, Typography } from "antd"
import ReblockIcon from "components/common/ReblockIcon"
import FontFamilies from "components/themes/FontFamilies"
import React from "react"

const { Text, Link } = Typography

type Props = {

}

const TransactionActivityItem: React.FC<Props> = () => {
  return (
    <List.Item actions={[
      <Flex vertical align="end">
          <Statistic
            prefix="$"
            value={13543.99}
            precision={2}
            valueStyle={{
              fontFamily: FontFamilies.primary,
              fontSize: 14,
              fontWeight: 'bold',
            }}
          />
          <Text type="secondary" style={{fontSize: 12}}>Withdrawal</Text>
        </Flex>
    ]}>
      <List.Item.Meta
        avatar={
        <Avatar src={`https://xsgames.co/randomusers/avatar.php?g=pixel`} />
      }
        title={
          <Text>0x8e41...5d0e</Text>
        }
        description={
          <Flex vertical>
             <Text type="secondary" style={{fontSize: 12}}>Oct 8, 2023</Text>

            <Link href="" target="_blank" style={{fontSize: 12}}>
              <Space>
                View Transaction
                <ReblockIcon name="open-link" size={12} />
              </Space>              
            </Link>
          </Flex>
        }
      />
    </List.Item>
  )
}

export default React.memo(TransactionActivityItem)