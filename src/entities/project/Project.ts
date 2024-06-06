import ProjectStatusEnum from "./ProjectStatusEnum"
import ProjectCreditRatingEnum from "./ProjectCreditRatingEnum"
import PaymentFrequencyEnum from "./PaymentFrequencyEnum"
import { Principal } from "@dfinity/principal"



type Project = {
  id: string | Principal
  APR: string
  credit_rating: ProjectCreditRatingEnum
  description: string
  fundrise_end_time: number | BigInt
  issuer_description: string
  issuer_picture: string
  loan_term: string
  maturity_date: number | BigInt
  origination_date: number | BigInt
  payment_frequency: PaymentFrequencyEnum
  secured_by: string
  smart_contract_url: string
  borrowers: Array<Principal>
  status: ProjectStatusEnum
  title: string
  total_loan_amount: BigInt
  canister_id: string
}

export default Project