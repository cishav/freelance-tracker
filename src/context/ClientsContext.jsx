import { createContext, useEffect, useReducer, useState, useCallback, useContext } from "react";
import ToastContext from "./ToastContext";

function clientsReducer(state, action) {
  switch (action.type) {
    case "ADD_CLIENT":
      return [...state, action.payload];
    case "MARK_PAID":
      return state.map((client, i) =>
        i === action.index ? { ...client, status: "Paid" } : client
      );
    case "DELETE_CLIENT":
      return state.filter((client, i) => i !== action.index );
    case "UPDATE_CLIENT":
      return state.map((client, i) => i === action.index ? {...client, ...action.updatedData} : client);
    case "LOAD_CLIENTS":  
      return action.payload;
    case "ADD_NOTE":
      return state.map((client) =>
        client.addedAt === action.addedAt ? {...client, notes: [...(client.notes || []), action.note]} : client 
      );
    default:
      return state;
  }
}

const ClientsContext = createContext();

export function ClientsProvider({ children }) {
  const [clients, dispatch] = useReducer(clientsReducer, []);
  const [isLoaded, setIsLoaded] = useState(false);
  const { showToast } = useContext(ToastContext);

  useEffect(() => {
    const savedClients = localStorage.getItem('clients');
    if (savedClients) {
      dispatch({ type: "LOAD_CLIENTS", payload: JSON.parse(savedClients) });
    }
    setIsLoaded(true);
  }, []);

  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem('clients', JSON.stringify(clients));
    }
  }, [clients, isLoaded]);

  const handleAddClient = useCallback((newClient) => {
    dispatch({ type: "ADD_CLIENT", payload: { ...newClient, addedAt: Date.now(), notes: [] } });
    showToast('New Client Added!');
  }, []);

  const handleMarkPaid = useCallback((index) => {
    dispatch({ type: "MARK_PAID", index });
    showToast('Marked As Paid!');
  }, []);

  const handleDeleteClient = useCallback((index) => {
    dispatch({ type: "DELETE_CLIENT", index });
    showToast('Client Deleted!');
  }, []);

  const handleUpdateClient = useCallback((index, updatedData) => {
    dispatch({ type: "UPDATE_CLIENT", index, updatedData });
    showToast('Client Updated!');
  }, []);

  const handleAddNote = useCallback((addedAt, note) => {
    dispatch({ type: "ADD_NOTE", addedAt, note });
    showToast('Note added!');
  }, []);

  return (
    <ClientsContext.Provider value={{ clients, handleAddClient, handleMarkPaid, handleDeleteClient, handleUpdateClient, handleAddNote }}>
      {children}
    </ClientsContext.Provider>
  );
}

export default ClientsContext;