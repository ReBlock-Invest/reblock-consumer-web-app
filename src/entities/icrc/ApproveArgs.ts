import { Principal } from "@dfinity/principal"

export type Subaccount = Uint8Array | number[];

export interface Account {
    owner: Principal;
    subaccount: [] | [Subaccount];
}

export default interface ApproveArgs {
    fee: [] | [bigint];
    memo: [] | [Uint8Array | number[]];
    from_subaccount: [] | [Uint8Array | number[]];
    created_at_time: [] | [bigint];
    amount: bigint;
    expected_allowance: [] | [bigint];
    expires_at: [] | [bigint];
    spender: Account;
}
