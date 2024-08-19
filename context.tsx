import React, { createContext, useState } from "react";
import { Movie } from "./api/fetch-movies";

export const ItemContext = createContext<{
  item: Movie | null;
  onItemSelect: (item: Movie) => void;
}>({
  item: null,
  onItemSelect: () => {},
});

export const ItemProvider = ({ children }: { children: React.ReactNode }) => {
  const [item, setItem] = useState<Movie | null>(null);

  const handleItemClick = (item: Movie) => {
    setItem(item);
  };

  return (
    <ItemContext.Provider value={{ item, onItemSelect: handleItemClick }}>
      {children}
    </ItemContext.Provider>
  );
};
