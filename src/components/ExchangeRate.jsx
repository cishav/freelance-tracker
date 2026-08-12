import { useState, useEffect } from "react";

function ExchangeRate(){
    const [rate, setRate] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        async function fetchRate(){
            try{
                setLoading(true);
                const response = await fetch(
                "https://open.er-api.com/v6/latest/USD"
                );

                if (!response.ok) {
                    throw new Error("Failed to fetch exchange rate");
                }

                const data = await response.json();
                setRate(data.rates.NPR);
                setError(null);
            }catch(err){
                setError(err.message);
            }finally{
                setLoading(false);
            }
        }

        fetchRate();
    }, []);

    if(loading){
        return (
            <div className="exchange-rate">
                <div className="skeleton"></div>
            </div>
        )
    }

    if(error){
        return (
        <div className="exchange-rate">
            <p>Could not load exchange rate: {error}</p>
        </div>
        );
    }

    return (
        <div className="exchange-rate">
            <p>1 USD = {rate.toFixed(2)} NPR</p>
        </div>
    )
}

export default ExchangeRate;