import { Actor, HttpAgent } from "@dfinity/agent";

// Imports and re-exports candid interface
import { idlFactory } from "./factory.did.js";
export { idlFactory } from "./factory.did.js";

/* CANISTER_ID is replaced by webpack based on node environment
 * Note: canister environment variable will be standardized as
 * process.env.CANISTER_ID_<CANISTER_NAME_UPPERCASE>
 * beginning in dfx 0.15.0
 */
export const canisterId = process.env.CANISTER_ID_FACTORY;

export const createActor = async (canisterId, callType, options = {}) => {
  const agent = options.agent || new HttpAgent({ ...options.agentOptions });

  if (options.agent && options.agentOptions) {
    console.warn(
      "Detected both agent and agentOptions passed to createActor. Ignoring agentOptions and proceeding with the provided agent."
    );
  }

  // Fetch root key for certificate validation during development
  if (process.env.DFX_NETWORK !== "ic") {
    agent.fetchRootKey().catch((err) => {
      console.warn(
        "Unable to fetch root key. Check to ensure that your local replica is running"
      );
      console.error(err);
    });
  }

  if (callType === "query") {
    return Actor.createActor(idlFactory, {
      agent,
      canisterId,
      ...options.actorOptions,
    });
  }

  if (!window.ic || !window.ic.plug) {
    return Actor.createActor(idlFactory, {
      agent,
      canisterId,
      ...options.actorOptions,
    });
  }

  const connected = await window.ic.plug.isConnected();

  if (!connected) {
    return Actor.createActor(idlFactory, {
      agent,
      canisterId,
      ...options.actorOptions,
    });
  }
  // Creates an actor with using the candid interface and the HttpAgent
  return await window.ic.plug.createActor({
    canisterId: canisterId,
    interfaceFactory: idlFactory,
  });
};

export const factory = canisterId ? createActor(canisterId) : undefined;
