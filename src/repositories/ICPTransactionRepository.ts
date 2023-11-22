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
    await this.nssLedgerReblockICActor.send_dfx({
      to: depositAddress,
      fee: {
        e8s: 0
      },
      amount: {
        e8s: 0
      },
      memo: 1,
      from_subacount: ['ezp3d-dn22j-wyyra-ctgbg-tly7k-khzap-lqbat-gimyf-2ckmf-6uzv7-wae'],
    })
  }
}