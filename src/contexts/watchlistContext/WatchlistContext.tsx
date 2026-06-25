"use client";

import React, { createContext, useCallback, useContext, useEffect, useState } from "react";

export type WatchlistItem = {
  id: number;
  type: string;
  title: string;
  poster_path?: string;
};

type WatchlistContextType = {
  watchlist: WatchlistItem[];
  add: (item: WatchlistItem) => void;
  remove: (id: number) => void;
  isInWatchlist: (id: number) => boolean;
};

const WatchlistContext = createContext<WatchlistContextType>({
  watchlist: [],
  add: () => {},
  remove: () => {},
  isInWatchlist: () => false,
});

const STORAGE_KEY = "movieapp_watchlist";

export function WatchlistProvider({ children }: { children: React.ReactNode }) {
  const [watchlist, setWatchlist] = useState<WatchlistItem[]>([]);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) setWatchlist(JSON.parse(stored));
    } catch {}
  }, []);

  const add = useCallback((item: WatchlistItem) => {
    setWatchlist(prev => {
      const next = [...prev, item];
      localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
      return next;
    });
  }, []);

  const remove = useCallback((id: number) => {
    setWatchlist(prev => {
      const next = prev.filter(i => i.id !== id);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
      return next;
    });
  }, []);

  const isInWatchlist = useCallback(
    (id: number) => watchlist.some(i => i.id === id),
    [watchlist]
  );

  return (
    <WatchlistContext.Provider value={{ watchlist, add, remove, isInWatchlist }}>
      {children}
    </WatchlistContext.Provider>
  );
}

export const useWatchlist = () => useContext(WatchlistContext);
