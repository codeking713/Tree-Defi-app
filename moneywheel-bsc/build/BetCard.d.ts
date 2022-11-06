import React from "react";
import { Contract } from 'web3-eth-contract';
import BigNumber from 'bignumber.js';
interface BetCardProps {
    max: BigNumber;
    tokenBalance: BigNumber;
    onResult: (lastResult: any) => void;
    tokenContract: Contract;
    moneyWheelContract: Contract;
}
declare const BetCard: React.FC<BetCardProps>;
export default BetCard;
