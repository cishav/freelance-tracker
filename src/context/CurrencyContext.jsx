import { createContext, useState, useEffect } from "react";
import useLocalStorage from "../hooks/useLocalStorage";

const CurrencyContext = createContext();

export function CurrencyProvider({ children }) {
  const [currency, setCurrency] = useLocalStorage("currency", "USD");
  const [rate, setRate] = useState(null);
  const [rateLoading, setRateLoading] = useState(true);
  const [rateError, setRateError] = useState(null);

  useEffect(() => {
    async function fetchRate() {
      try {
        setRateLoading(true);
        const response = await fetch("https://open.er-api.com/v6/latest/USD");
        if (!response.ok) {
          throw new Error("Failed to fetch exchange rate");
        }
        const data = await response.json();
        setRate(data.rates.NPR);
        setRateError(null);
      } catch (err) {
        setRateError(err.message);
      } finally {
        setRateLoading(false);
      }
    }

    fetchRate();
  }, []);

  return (
    <CurrencyContext.Provider value={{ currency, setCurrency, rate, rateLoading, rateError }}>
      {children}
    </CurrencyContext.Provider>
  );
}

export default CurrencyContext;