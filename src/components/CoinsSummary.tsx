import React, { useEffect, useState } from "react";
import { AppProp } from "../types/Types";

const CoinsSummary = ({ coin }: AppProp): JSX.Element => {
  const [amount, setAmount] = useState<number>(0);

  useEffect(() => {
    console.log(coin.name + " set amount", amount);
  });
  return (
    <div>
      <span>{`${coin.name} | ${coin.symbol} | ${coin.current_price} `}</span>
      <input
        style={{ margin: "10px" }}
        type="number"
        value={amount}
        onChange={(e) => setAmount(parseInt(e.target.value))}
      />
      <p>
        {(coin.current_price * amount).toLocaleString(undefined, {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        })}
      </p>
    </div>
  );
};

export default CoinsSummary;
