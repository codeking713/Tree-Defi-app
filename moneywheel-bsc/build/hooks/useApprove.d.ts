import { Contract } from 'web3-eth-contract';
export declare const approve: (lpContract: Contract, masterChefContract: Contract, account: string | null) => Promise<any>;
export declare const useMoneyWheelApprove: (tokenContract: Contract, moneywheelContract: Contract) => {
    onApprove: () => Promise<any>;
};
