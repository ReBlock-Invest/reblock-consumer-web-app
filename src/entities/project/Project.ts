import ProjectStatusEnum from "./ProjectStatusEnum"
import ProjectCreditRatingEnum from "./ProjectCreditRatingEnum"
import PaymentFrequencyEnum from "./PaymentFrequencyEnum"

type Project = {
  APR: string
  credit_rating: ProjectCreditRatingEnum
  description: string
  fundrise_end_time: string
  issuer_description: string
  issuer_picture: string
  loan_term: string
  maturity_date: string
  origination_date: string
  payment_frequency: PaymentFrequencyEnum
  secured_by: string
  smart_contract_url: string
  status: ProjectStatusEnum
  title: string
  total_loan_amount: number
  canister_id: string
}

export default Project