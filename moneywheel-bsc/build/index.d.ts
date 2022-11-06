import React from "react";
import { Contract } from 'web3-eth-contract';
interface moneyWheelBscProps {
    contract: Contract;
    token: Contract;
    tokenBalance: string;
    soundUrl: string;
}
declare const MoneyWheelBsc: React.FC<moneyWheelBscProps>;
export default MoneyWheelBsc;
