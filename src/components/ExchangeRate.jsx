import { useContext } from "react";
import CurrencyContext from "../context/CurrencyContext";

function ExchangeRate() {
  const { rate, rateLoading, rateError } = useContext(CurrencyContext);

  if (rateLoading) {
    return (
      <div className="exchange-rate">
        <div className="skeleton"></div>
      </div>
    );
  }

  if (rateError) {
    return (
      <div className="exchange-rate">
        <p>Could not load exchange rate: {rateError}</p>
      </div>
    );
  }

  return (
    <div className="exchange-rate">
      <p>1 USD = {rate.toFixed(2)} NPR</p>
    </div>
  );
}

export default ExchangeRate;