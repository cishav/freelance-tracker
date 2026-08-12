import { useContext, useState, useMemo } from "react";
import ClientsContext from "../context/ClientsContext";
import ClientCard from "../components/ClientCard";
import Dashboard from "../components/Dashboard";
import ExchangeRate from "../components/ExchangeRate";
import ClientSearch from "../components/ClientSearch";

function HomePage() {
  const { clients, handleMarkPaid, handleDeleteClient, handleUpdateClient } = useContext(ClientsContext);

  const [searchValue, setSearchValue] = useState('');
  const [selectStatus, setSelectStatus] = useState('All');
  const [sortOrder, setSortOrder] = useState('Oldest First');

  function handleSearch(name, status, sortOrder){
    setSearchValue(name);
    setSelectStatus(status);
    setSortOrder(sortOrder);
  }

  const visibleClients = useMemo(() => {
    const filteredClients = clients.filter((client) => {
      const matchesName = client.name.toLowerCase().includes(searchValue.toLowerCase());
      const matchesStatus = selectStatus === 'All' || client.status === selectStatus;
      return matchesName && matchesStatus;
    });

    switch(sortOrder){
      case 'Oldest First':
        filteredClients.sort((a, b) => a.addedAt - b.addedAt);
        break;
      case 'Newest First':
        filteredClients.sort((a, b) => b.addedAt - a.addedAt);
        break;
      case 'Name (A-Z)':
        filteredClients.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case 'Name (Z-A)':
        filteredClients.sort((a, b) => b.name.localeCompare(a.name));
        break;
      default:
        filteredClients.sort((a, b) => a.addedAt - b.addedAt);
    }
    return filteredClients;
  }, [clients, searchValue, selectStatus, sortOrder]);

  return (
    <>
      <Dashboard clients={clients} />
      <ExchangeRate />
      <ClientSearch onSearch={handleSearch}/>
      {visibleClients.map((client) => {
        const index = clients.indexOf(client);
        return (
          <ClientCard
            key={client.addedAt}
            name={client.name}
            platform={client.platform}
            status={client.status}
            addedAt={client.addedAt}
            onMarkPaid={() => handleMarkPaid(index)}
            onDelete={() => handleDeleteClient(index)}
            onUpdate={(updatedData) => handleUpdateClient(index, updatedData)}
          />
        );
      })}
    </>
  );
}

export default HomePage;