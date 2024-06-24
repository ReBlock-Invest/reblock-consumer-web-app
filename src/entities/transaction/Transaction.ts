import TransactionOperationEnum from "./TransactionOperationEnum"
import TransactionStatusEnum from "./TransactionStatusEnum"

type Transaction = {
  op: TransactionOperationEnum
  from: string
  to: string
  caller: string
  fee: bigint
  status: TransactionStatusEnum
  timestamp: number
  index: number
  amount: bigint
}

export default Transaction