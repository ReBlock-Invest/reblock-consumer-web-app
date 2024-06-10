import { Actor } from "@dfinity/agent"
import ICActor from "../lib/web3/actors/ICActor"
import { Principal } from "@dfinity/principal"
import { createActor as makeAssetActor } from "entities/icrc"
import ApproveArgs from "entities/icrc/ApproveArgs"

interface CKUSDCActorInterface {
  approve(source_principal: Principal, amount: bigint): Promise<void>
}

interface CKUSDCActorExtensionInterface extends CKUSDCActorInterface, Actor {}

export default class CKUSDCActorRepository extends ICActor<CKUSDCActorExtensionInterface>  {
  async approve(
    spender_principal: Principal,
    amount: bigint
  ) {

    const args : ApproveArgs = {
      fee: [],
      memo: [],
      from_subaccount: [],
      created_at_time: [],
      amount: amount,
      expected_allowance: [],
      expires_at: [],
      spender: { owner: spender_principal, subaccount: [] }
    }

    const actor = makeAssetActor(process.env.REACT_APP_CKUSDC_CANISTER_ID)
    await actor.icrc2_approve(args)
  }

  async getBalance(
    userPrincipal: Principal
  ) {
    const actor = makeAssetActor(process.env.REACT_APP_CKUSDC_CANISTER_ID)
    let balance =  await actor.icrc1_balance_of({ owner: userPrincipal, subaccount: [] })
    return balance as bigint
  }
}