import { Actor } from "@dfinity/agent"
import ICActor from "./ICActor"

interface NNSLedgerReblockICActorInterface {
  sendDFX(
    to: string,
    fee: number,
    amount: number,
    memo: string
  ): Promise<void>
}

interface NNSLedgerReblockICActorExtensionInterface extends NNSLedgerReblockICActorInterface, Actor {}

export default class NNSLedgerReblockICActor extends ICActor<NNSLedgerReblockICActorExtensionInterface> implements NNSLedgerReblockICActorInterface  {
  sendDFX(
    to: string,
    fee: number,
    amount: number,
    memo: string
  ): Promise<void>  {
    return this.getActor().sendDFX(
      to,
      fee,
      amount,
      memo,
    )
  }
}