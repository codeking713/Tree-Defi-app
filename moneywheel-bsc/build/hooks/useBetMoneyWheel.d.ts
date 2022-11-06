import { Contract } from 'web3-eth-contract';
import BigNumber from 'bignumber.js';
export interface MoneyWheelBet {
    val1: string;
    val3: string;
    val5: string;
    val10: string;
    val20: string;
    val50: string;
}
export declare const placeBet: (moneyWheelContract: Contract, bet: MoneyWheelBet, account: string | null) => Promise<any>;
export declare const getLastResult: (moneyWheelContract: Contract, account: string | null) => Promise<any>;
export declare const useBetMoneyWheel: (moneyWheelContract: Contract) => {
    onBetMoneyWheel: (bet: MoneyWheelBet) => Promise<any>;
};
export declare const getMinBetValue: (moneyWheelContract: Contract) => Promise<any>;
export declare const useGetMinBet: (moneyWheelContract: Contract) => BigNumber;
export declare const getMaxBetValue: (moneyWheelContract: Contract) => Promise<any>;
export declare const useGetMaxBet: (moneyWheelContract: Contract) => BigNumber;
