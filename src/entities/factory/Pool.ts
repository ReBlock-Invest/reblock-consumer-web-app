import { Principal } from "@dfinity/principal"

type Pool = {
  id: Principal;
  apr: string;
  status: string;
  title: string;
  issuer_picture: string;
  smart_contract_url:string;
  total_loan_amount: bigint;
  payment_frequency: string,
  description: string;
  maturity_date: bigint;
  loan_term: string;
  issuer_description: string;
  timestamp: bigint;
  secured_by: string;
  fundrise_end_time: bigint;
  credit_rating: string;
  origination_date: bigint;
  borrowers: Principal[];
};

export default Pool