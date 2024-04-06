import RBProBackendICActor from "lib/web3/actors/RBProBackendICActor";
import BaseRepository from "./BaseRepository";

export default class RBProBackendRepository extends BaseRepository {
  private rbProBackendIcActor: RBProBackendICActor;

  constructor(
    rbProBackendIcActor: RBProBackendICActor
  ) {
    super()
    this.rbProBackendIcActor = rbProBackendIcActor
  }

  async getBorrowerAddress() {
    const borrowerAdrress = await this.rbProBackendIcActor.getBorrower()
    return borrowerAdrress
  }
}