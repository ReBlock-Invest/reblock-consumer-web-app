import { Avatar, Flex, List, Space, Statistic, Typography } from "antd"
import ReblockIcon from "components/common/ReblockIcon"
import FontFamilies from "components/themes/FontFamilies"
import Transaction from "entities/transaction/Transaction"
import React from "react"

const { Text, Link } = Typography

type Props = {
  transaction: Transaction
}

function formatBigInt(amount: bigint): string {
  return (Number(amount / BigInt(10000)) / 100).toFixed(2)
}


const TransactionActivityItem: React.FC<Props> = ({
  transaction,
}) => {

  return (
    <List.Item actions={[
      <Flex vertical align="end">
          <Statistic
            prefix="ckUSDC"
            value={ formatBigInt(transaction.amount) }
            precision={2}
            valueStyle={{
              fontFamily: FontFamilies.primary,
              fontSize: 14,
              fontWeight: 'bold',
            }}
          />
          <Text type="secondary" style={{fontSize: 12}}>{transaction.op}</Text>
        </Flex>
    ]}>
      <List.Item.Meta
        avatar={
        <Avatar src={`https://xsgames.co/randomusers/avatar.php?g=pixel`} />
      }
        title={
          <Text ellipsis style={{maxWidth: '200px'}}>{ transaction.from }</Text>
        }
        description={
          <Flex vertical>
             <Text type="secondary" style={{fontSize: 12}}>{new Date(Math.floor(transaction.timestamp)).toLocaleDateString()}</Text>
          
            <Link href="#" style={{fontSize: 12}}>
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