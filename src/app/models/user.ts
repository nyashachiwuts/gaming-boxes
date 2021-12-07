import { Wallet } from "./wallet";

export interface User {
  id: string;
  name: string;
  wallets: Wallet[];
  __typename: string;
}