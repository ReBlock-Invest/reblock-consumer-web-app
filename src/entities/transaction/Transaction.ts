import TransactionOperationEnum from "./TransactionOperationEnum"
import TransactionStatusEnum from "./TransactionStatusEnum"

type Transaction = {
  op: TransactionOperationEnum
  from: string
  to: string
  caller: string
  fee: BigInt
  status: TransactionStatusEnum
  timestamp: number
  index: number
  amount: BigInt
}

export default Transaction