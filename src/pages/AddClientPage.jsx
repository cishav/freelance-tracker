import { useContext } from "react";
import ClientsContext from "../context/ClientsContext";
import AddClientForm from "../components/AddClientForm";

function AddClientPage() {
  const { handleAddClient } = useContext(ClientsContext);

  return <AddClientForm onAddClient={handleAddClient} />;
}

export default AddClientPage;