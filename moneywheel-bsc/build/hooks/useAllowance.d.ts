import { Contract } from 'web3-eth-contract';
import BigNumber from 'bignumber.js';
export declare const getAllowance: (lpContract: Contract, masterChefContract: Contract, account: string | null) => Promise<string>;
export declare const useMoneyWheelAllowance: (tokenContract: Contract, moneyWheelContract: Contract) => BigNumber;
