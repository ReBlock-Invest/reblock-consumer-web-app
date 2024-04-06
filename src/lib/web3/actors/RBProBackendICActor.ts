import { Actor } from "@dfinity/agent"
import ICActor from "./ICActor"

interface RBProBackendICActorInterface {
  get_borrower(): Promise<string>
}

interface RBProBackendICActorExtensionInterface extends RBProBackendICActorInterface, Actor {}

export default class RBProBackendICActor extends ICActor<RBProBackendICActorExtensionInterface>  {
  async getBorrower(): Promise<string>  {
    const actor = await this.getActor()
    return actor.get_borrower()
  }
}