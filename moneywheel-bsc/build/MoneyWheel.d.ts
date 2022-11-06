import React from "react";
interface MoneyWheelProps {
    prizeNumber: number;
    mustSpin: boolean;
    onStopping: () => void;
    soundUrl: string;
}
declare const MoneyWheel: React.FC<MoneyWheelProps>;
export default MoneyWheel;
