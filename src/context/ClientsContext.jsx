import { createContext, useEffect, useReducer, useState, useCallback } from "react";

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
    default:
      return state;
  }
}

const ClientsContext = createContext();

export function ClientsProvider({ children }) {
  const [clients, dispatch] = useReducer(clientsReducer, []);
  const [isLoaded, setIsLoaded] = useState(false);

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
    dispatch({ type: "ADD_CLIENT", payload: { ...newClient, addedAt: Date.now() } });
  }, []);

  const handleMarkPaid = useCallback((index) => {
    dispatch({ type: "MARK_PAID", index });
  }, []);

  const handleDeleteClient = useCallback((index) => {
    dispatch({ type: "DELETE_CLIENT", index });
  }, []);

  const handleUpdateClient = useCallback((index, updatedData) => {
    dispatch({ type: "UPDATE_CLIENT", index, updatedData });
  }, []);

  return (
    <ClientsContext.Provider value={{ clients, handleAddClient, handleMarkPaid, handleDeleteClient, handleUpdateClient }}>
      {children}
    </ClientsContext.Provider>
  );
}

export default ClientsContext;