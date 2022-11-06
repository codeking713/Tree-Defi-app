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
interface ConfirmBetModalProps {
    moneyWheelContract: Contract;
    bet: MoneyWheelBet;
    onResult: (lastResult: any) => void;
    disabled: boolean;
}
declare const ConfirmBetModal: React.FC<ConfirmBetModalProps>;
export default ConfirmBetModal;
