import { Coffee, searchCoffees } from "@/lib/coffeeApi";
import { useCallback, useEffect, useRef, useState } from "react";

interface UseSearchResult {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  searchResults: Coffee[];
  isSearching: boolean;
  isSearchActive: boolean;
  clearSearch: () => void;
}

/**
 * Custom hook for handling coffee search with debouncing
 * @param debounceMs - Debounce delay in milliseconds (default: 300ms)
 */
export const useSearch = (debounceMs: number = 300): UseSearchResult => {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [searchResults, setSearchResults] = useState<Coffee[]>([]);
  const [isSearching, setIsSearching] = useState<boolean>(false);
  const debounceTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Check if search is active (user has typed something)
  const isSearchActive = searchQuery.trim().length > 0;

  const performSearch = useCallback(async (query: string) => {
    if (!query.trim()) {
      setSearchResults([]);
      setIsSearching(false);
      return;
    }

    setIsSearching(true);

    try {
      const { data, error } = await searchCoffees(query.trim());

      if (data) {
        setSearchResults(data as Coffee[]);
      } else {
        console.log("Error searching coffees:", error);
        setSearchResults([]);
      }
    } catch (error) {
      console.log("Search error:", error);
      setSearchResults([]);
    } finally {
      setIsSearching(false);
    }
  }, []);

  // Debounced search effect
  useEffect(() => {
    // Clear previous timer
    if (debounceTimer.current) {
      clearTimeout(debounceTimer.current);
    }

    // If query is empty, clear results immediately
    if (!searchQuery.trim()) {
      setSearchResults([]);
      setIsSearching(false);
      return;
    }

    // Set searching state for immediate feedback
    setIsSearching(true);

    // Set new timer for debounced search
    debounceTimer.current = setTimeout(() => {
      performSearch(searchQuery);
    }, debounceMs);

    // Cleanup on unmount or query change
    return () => {
      if (debounceTimer.current) {
        clearTimeout(debounceTimer.current);
      }
    };
  }, [searchQuery, debounceMs, performSearch]);

  const clearSearch = useCallback(() => {
    setSearchQuery("");
    setSearchResults([]);
    setIsSearching(false);
  }, []);

  return {
    searchQuery,
    setSearchQuery,
    searchResults,
    isSearching,
    isSearchActive,
    clearSearch,
  };
};
