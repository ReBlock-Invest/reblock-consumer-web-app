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
      created_at_time: [BigInt(Date.now()  * 1000000 )],
      amount: amount,
      expected_allowance: [],
      expires_at: [],
      spender: { owner: spender_principal, subaccount: [] }
    }

    const actor = await makeAssetActor(process.env.REACT_APP_CKUSDC_CANISTER_ID)
    return await actor.icrc2_approve(args)
  }

  async getBalance(
    userPrincipal: Principal
  ) {
    const actor = await makeAssetActor(process.env.REACT_APP_CKUSDC_CANISTER_ID, 'query')
    let balance =  await actor.icrc1_balance_of({ owner: userPrincipal, subaccount: [] })
    return balance as bigint
  }
}