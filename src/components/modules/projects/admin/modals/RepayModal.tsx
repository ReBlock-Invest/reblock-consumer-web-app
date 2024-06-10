import { Modal } from "antd"
import React from "react"
import { useQuery } from "react-query"
import useServices from "hooks/useServices"

type FieldType = {
  amount: number
  interest: number
}

type Props = {
  open: boolean
  userBalance: bigint | undefined
  poolId: string
  onOk: (form: FieldType) => void
  onCancel: () => void
  confirmLoading: boolean
  closable: boolean
}

const RepayModal: React.FC<Props> = ({
  open,
  userBalance,
  poolId,
  onOk,
  confirmLoading,
  onCancel,
  closable
}) => {

  const services = useServices()
  const { data: repayment, isLoading } = useQuery({
    queryKey: ["repayment", poolId],
    queryFn: () => services.rbPoolService.getNextRepayments(poolId),
    enabled: !!poolId
  })

  let amount = 0;
  let interest = 0;

  if(!isLoading) {
    amount = Number(repayment?.principal) / 1000000
    interest = Number(repayment?.interest) / 1000000
  }

  return (
    <Modal
      title="Repay"
      open={open}
      onOk={() => {
        onOk({
          amount,
          interest,
        })
      }}
      confirmLoading={confirmLoading}
      onCancel={onCancel}
      closable={closable}
    >

        <div>Available: <strong>{Number(userBalance) / 1000000} ckUSDT</strong></div><br/><br/>
        <div>Next principal repayment: <strong>{amount} ckUSDT</strong></div><br/>
        <div>Next interest repayment:: <strong>{interest} ckUSDT</strong></div><br/>
        <div><strong>Repay now?</strong></div>
    </Modal>
  )
}

export default RepayModal