import { Actor } from "@dfinity/agent"
import ICActor from "./ICActor"

type SendDFXArgs = {
  to: string,
  fee: {
    e8s: BigInt
  },
  amount: {
    e8s: BigInt
  },
  memo: bigint
  from_subaccount?: string[] | null
  created_at_time?: string[] | null
}
interface NNSLedgerReblockICActorInterface {
  send_dfx(args: SendDFXArgs): Promise<void>
}

interface NNSLedgerReblockICActorExtensionInterface extends NNSLedgerReblockICActorInterface, Actor {}

export default class NNSLedgerReblockICActor extends ICActor<NNSLedgerReblockICActorExtensionInterface> implements NNSLedgerReblockICActorInterface  {
  async send_dfx(args: SendDFXArgs): Promise<void>  {
    const actor = await this.getActor()
    await actor.send_dfx(args)
  }
}