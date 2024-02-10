import random from 'crypto-random-bigint'
import BaseRepository from "./BaseRepository";

export default class MaticTransactionRepository extends BaseRepository {
  constructor() {
    super()
  }

  async invest(amount: number) {
    //const depositAddress = await this.rbOriReblockICActor.getDepositAddress()
    const e8sAmount = BigInt(amount * 100000000)
    
    /*await this.nssLedgerReblockICActor.send_dfx({
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

    await this.rbOriReblockICActor.deposit(e8sAmount)*/
  }
}