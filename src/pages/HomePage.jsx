import { useContext } from "react";
import ClientsContext from "../context/ClientsContext";
import ClientCard from "../components/ClientCard";
import Dashboard from "../components/Dashboard";
import ExchangeRate from "../components/ExchangeRate";

function HomePage() {
  const { clients, handleMarkPaid, handleDeleteClient, handleUpdateClient } = useContext(ClientsContext);

  return (
    <>
      <Dashboard clients={clients} />
      <ExchangeRate />
      {clients.map((client, index) => (
        <ClientCard
          key={index}
          name={client.name}
          platform={client.platform}
          status={client.status}
          addedAt={client.addedAt}
          onMarkPaid={() => handleMarkPaid(index)}
          onDelete={() => handleDeleteClient(index)}
          onUpdate={(updatedData) => handleUpdateClient(index, updatedData)}
        />
      ))}
    </>
  );
}

export default HomePage;