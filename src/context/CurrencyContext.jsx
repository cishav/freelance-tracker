import { createContext, useState } from "react"
import useLocalStorage from "../hooks/useLocalStorage";

const CurrencyContext = createContext();

export function CurrencyProvider({children}){

    const [currency, setCurrency] = useLocalStorage('currency', 'USD');

    return (
        <CurrencyContext.Provider value={{ currency, setCurrency }}>
            {children}
        </CurrencyContext.Provider>
    )
}

export default CurrencyContext;