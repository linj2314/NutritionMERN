import { createContext, useContext, useState } from "react";

const DataContext = createContext();

export function DataProvider({ children }) {
  const [currentList, setCurrentList] = useState([]);

  return (
    <DataContext.Provider value={{ currentList, setCurrentList }}>
      {children}
    </DataContext.Provider>
  );
}

export function useData() {
  return useContext(DataContext);
}
