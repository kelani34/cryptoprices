import React from "react";
import { AppProp } from "../types/Types";

const CoinsSummary = ({ coin }: AppProp): JSX.Element => {
  return <p>{`${coin.name} | ${coin.symbol} | ${coin.current_price} `}</p>;
};

export default CoinsSummary;
