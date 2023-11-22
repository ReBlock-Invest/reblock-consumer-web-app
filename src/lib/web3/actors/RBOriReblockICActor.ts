import { Actor } from "@dfinity/agent"
import ICActor from "./ICActor"

interface RBOriReblockICActorInterface {
  getDepositAddress(): Promise<string>
  deposit(balance: number): Promise<any>
}

interface RBOriReblockICActorExtensionInterface extends RBOriReblockICActorInterface, Actor {}

export default class RBOriReblockICActor extends ICActor<RBOriReblockICActorExtensionInterface> implements RBOriReblockICActorInterface  {
  getDepositAddress(): Promise<string>  {
    return this.getActor().getDepositAddress()
  }
  deposit(balance: number): Promise<any> {
    return this.getActor().deposit(balance)
  }
}