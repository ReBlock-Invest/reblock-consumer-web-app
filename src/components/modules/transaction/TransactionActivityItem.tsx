import { Flex, List, Space, Statistic, Typography } from "antd"
import Avatar from 'react-avatar';
import ReblockIcon from "components/common/ReblockIcon"
import FontFamilies from "components/themes/FontFamilies"
import Transaction from "entities/transaction/Transaction"
import React from "react"

const { Text, Link } = Typography

type Props = {
  transaction: Transaction
}

function formatBigInt(amount: bigint | undefined): string {
  if (amount === undefined) return "_"

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
        <Avatar size="30px" round="20px" textSizeRatio={2} name={transaction.from} />
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