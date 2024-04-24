import TransactionOperationEnum from "./TransactionOperationEnum"
import TransactionStatusEnum from "./TransactionStatusEnum"

type Transaction = {
  op: TransactionOperationEnum
  from: string
  to: string
  caller: string
  fee: number
  status: TransactionStatusEnum
  timestamp: number
  index: number
  amount: number
}

export default Transaction