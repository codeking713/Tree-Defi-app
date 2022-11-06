import React from 'react';
import { Contract } from 'web3-eth-contract';
export interface MoneyWheelBet {
    val1: string;
    val3: string;
    val5: string;
    val10: string;
    val20: string;
    val50: string;
}
interface BetActionsProps {
    bet: MoneyWheelBet;
    onResult: (lastResult: any) => void;
    tokenContract: Contract;
    moneyWheelContract: Contract;
    disabled: boolean;
}
declare const BetActions: React.FC<BetActionsProps>;
export default BetActions;
