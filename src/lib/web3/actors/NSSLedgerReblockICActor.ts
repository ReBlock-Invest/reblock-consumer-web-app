import { Actor } from "@dfinity/agent"
import ICActor from "./ICActor"

type SendDFXArgs = {
  to: string,
  fee: {
    e8s: number
  },
  amount: {
    e8s: number
  },
  memo: number
  from_subacount?: string[] | null
  created_at_time?: string | null
}
interface NNSLedgerReblockICActorInterface {
  send_dfx(args: SendDFXArgs): Promise<void>
}

interface NNSLedgerReblockICActorExtensionInterface extends NNSLedgerReblockICActorInterface, Actor {}

export default class NNSLedgerReblockICActor extends ICActor<NNSLedgerReblockICActorExtensionInterface> implements NNSLedgerReblockICActorInterface  {
  send_dfx(args: SendDFXArgs): Promise<void>  {
    return this.getActor().send_dfx(args)
  }
}