import ProjectStatusEnum from "./ProjectStatusEnum"

type Project = {
  APR: string
  credit_rating: string
  description: string
  fundrise_end_time: string
  issuer_description: string
  issuer_picture: string
  loan_term: string
  maturity_date: string
  origination_date: string
  secured_by: string
  smart_contract_url: string
  status: ProjectStatusEnum
  title: string
}

export default Project