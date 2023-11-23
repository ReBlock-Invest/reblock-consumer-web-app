import random from 'crypto-random-bigint'
import RBOriReblockICActor from "lib/web3/actors/RBOriReblockICActor";
import NSSLedgerReblockICActor from "lib/web3/actors/NSSLedgerReblockICActor";
import BaseRepository from "./BaseRepository";

export default class ICPTransactionRepository extends BaseRepository {
  private rbOriReblockICActor: RBOriReblockICActor
  private nssLedgerReblockICActor: NSSLedgerReblockICActor

  constructor(
    rbOriReblockICActor: RBOriReblockICActor,
    nssLedgerReblockICActor: NSSLedgerReblockICActor
  ) {
    super()
    this.rbOriReblockICActor = rbOriReblockICActor
    this.nssLedgerReblockICActor = nssLedgerReblockICActor
  }

  async invest(amount: number) {
    const depositAddress = await this.rbOriReblockICActor.getDepositAddress()
    const e8sAmount = BigInt(amount * 100000000)
    
    await this.nssLedgerReblockICActor.send_dfx({
      to: depositAddress,
      fee: {
        e8s: BigInt(10000),
      },
      amount: {
        e8s: e8sAmount,
      },
      memo: random (32),
      from_subaccount: [],
      created_at_time: []
    })

    await this.rbOriReblockICActor.deposit(e8sAmount)
  }
}