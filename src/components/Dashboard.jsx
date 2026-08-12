import { useContext, useMemo } from "react";
import CurrencyContext from "../context/CurrencyContext";

function Dashboard({clients}){

    const {currency, setCurrency, rate} = useContext(CurrencyContext);

    const total = clients.length;
    const paidCount = useMemo(() => {
        return clients.filter((client) => client.status === "Paid").length;
    }, [clients]);
    const pendingCount = total - paidCount;

    function handleExport(){
        // 1. Header row — the column titles
        const headers = ["Name", "Platform", "Status", "Payment Amount (USD)", "Payment Amount (NPR)", "Added On"];

        // 2. One row per client, converting each into an array of values
        const rows = clients.map((client) => [
            client.name,
            client.platform,
            client.status,
            client.paymentAmount.toFixed(2),
            (client.paymentAmount * rate).toFixed(2),
            new Date(client.addedAt).toLocaleDateString(),
        ]);

        // 3. Combine headers + rows, wrap each value in quotes, join with commas,
        //    join all rows with newlines
        const csvContent = [headers, ...rows]
            .map((row) => row.map((value) => `"${value}"`).join(","))
            .join("\n");

        // 4. Turn that string into a downloadable file
        const blob = new Blob([csvContent], { type: "text/csv" });
        const url = URL.createObjectURL(blob);

        const link = document.createElement("a");
        link.href = url;
        link.download = "clients.csv";
        link.click();

        URL.revokeObjectURL(url);
    }

    return (
        <div className="dashboard">
            <h2>Dashboard</h2>
            <div className="dashboard-stats">
                <p>Total Clients: {total}</p>
                <p>Paid: {paidCount}</p>
                <p>Pendings: {pendingCount}</p>
            </div>
            <button onClick={handleExport} className="btn btn-success">Export to CSV</button>

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