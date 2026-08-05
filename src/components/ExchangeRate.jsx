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
                setError(err);
            }finally{
                setLoading(false);
            }
        }

        fetchRate();
    }, []);

    if(loading){
        return <p>Loading Exchange Rate...</p>;
    }

    if(error){
        return <p>Could not load exchnage rate : {error}</p>;
    }

    return (
        <div className="exchange-rate">
            {loading && <p>Loading exchange rate...</p>}
            {error && <p>Could not load exchange rate: {error}</p>}
            {!loading && !error && <p>1 USD = {rate.toFixed(2)} NPR</p>}
        </div>
    )
}

export default ExchangeRate;