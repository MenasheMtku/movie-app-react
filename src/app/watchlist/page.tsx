import type { Metadata } from "next";
import WatchlistView from "@/views/Watchlist";

export const metadata: Metadata = {
  title: "Watchlist — MovieApp",
  description: "Your saved movies and TV shows",
};

export default function WatchlistPage() {
  return <WatchlistView />;
}
