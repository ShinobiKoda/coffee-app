import { Coffee } from "@/lib/coffeeApi";
import React, { createContext, ReactNode, useContext, useState } from "react";

interface FavoritesContextType {
  favorites: Coffee[];
  addToFavorites: (coffee: Coffee) => void;
  removeFromFavorites: (coffeeId: number) => void;
  toggleFavorite: (coffee: Coffee) => void;
  isFavorite: (coffeeId: number) => boolean;
  getFavoritesCount: () => number;
}

const FavoritesContext = createContext<FavoritesContextType | undefined>(
  undefined,
);

export const useFavorites = () => {
  const context = useContext(FavoritesContext);
  if (!context) {
    throw new Error("useFavorites must be used within a FavoritesProvider");
  }
  return context;
};

interface FavoritesProviderProps {
  children: ReactNode;
}

export const FavoritesProvider = ({ children }: FavoritesProviderProps) => {
  const [favorites, setFavorites] = useState<Coffee[]>([]);

  const addToFavorites = (coffee: Coffee) => {
    setFavorites((prev) => {
      if (prev.some((item) => item.id === coffee.id)) {
        return prev;
      }
      return [...prev, coffee];
    });
  };

  const removeFromFavorites = (coffeeId: number) => {
    setFavorites((prev) => prev.filter((item) => item.id !== coffeeId));
  };

  const toggleFavorite = (coffee: Coffee) => {
    setFavorites((prev) => {
      if (prev.some((item) => item.id === coffee.id)) {
        return prev.filter((item) => item.id !== coffee.id);
      }
      return [...prev, coffee];
    });
  };

  const isFavorite = (coffeeId: number) => {
    return favorites.some((item) => item.id === coffeeId);
  };

  const getFavoritesCount = () => {
    return favorites.length;
  };

  return (
    <FavoritesContext.Provider
      value={{
        favorites,
        addToFavorites,
        removeFromFavorites,
        toggleFavorite,
        isFavorite,
        getFavoritesCount,
      }}
    >
      {children}
    </FavoritesContext.Provider>
  );
};
