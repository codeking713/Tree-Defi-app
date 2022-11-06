import { provider as ProviderType } from 'web3-core';
import { Contract } from 'web3-eth-contract';
export declare const getContract: (provider: ProviderType, address: string) => any;
export declare const getAllowance: (lpContract: Contract, masterChefContract: Contract, account: string) => Promise<string>;
export declare const getTokenBalance: (provider: ProviderType, tokenAddress: string, userAddress: string | null) => Promise<string>;
