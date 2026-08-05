import { useContext, useMemo } from "react";
import CurrencyContext from "../context/CurrencyContext";

function Dashboard({clients}){

    const {currency, setCurrency} = useContext(CurrencyContext);

    const total = clients.length;
    const paidCount = useMemo(() => {
        return clients.filter((client) => client.status === "Paid").length;
    }, [clients]);
    const pendingCount = total - paidCount;

    return (
        <div className="dashboard">
            <h2>Dashboard</h2>
            <div className="dashboard-stats">
                <p>Total Clients: {total}</p>
                <p>Paid: {paidCount}</p>
                <p>Pendings: {pendingCount}</p>
            </div>

            <label className="currency-select">
                Currency:
                <select value={currency} onChange={(e) => setCurrency(e.target.value)}>
                    <option value="USD">USD</option>
                    <option value="NPR">NPR</option>
                </select>
            </label>
        </div>
    )
}

export default Dashboard;