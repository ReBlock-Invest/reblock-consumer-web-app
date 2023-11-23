import { Actor } from "@dfinity/agent"
import ICActor from "./ICActor"

interface RBOriReblockICActorInterface {
  getDepositAddress(): Promise<string>
  deposit(balance: bigint): Promise<any>
}

interface RBOriReblockICActorExtensionInterface extends RBOriReblockICActorInterface, Actor {}

export default class RBOriReblockICActor extends ICActor<RBOriReblockICActorExtensionInterface> implements RBOriReblockICActorInterface  {
  async getDepositAddress(): Promise<string>  {
    const actor = await this.getActor()
    return actor.getDepositAddress()
  }
  async deposit(balance: bigint): Promise<any> {
    const actor = await this.getActor()
    return actor.deposit(balance)
  }
}