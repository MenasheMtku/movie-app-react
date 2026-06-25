import type { Metadata } from "next";
import { Providers } from "@/components/Providers";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer/Footer";
import { PageTransition } from "@/components/PageTransition";
import "@/index.css";

export const metadata: Metadata = {
  title: {
    template: "%s — MovieApp",
    default: "MovieApp",
  },
  description: "Discover trending movies and TV shows powered by TMDB.",
  openGraph: {
    type: "website",
    siteName: "MovieApp",
  },
  twitter: {
    card: "summary_large_image",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://api.themoviedb.org" />
        <link rel="preconnect" href="https://image.tmdb.org" crossOrigin="anonymous" />
      </head>
      <body className="invisible bg-bkg text-content grid grid-rows-[auto_1fr_auto] grid-cols-1 duration-200">
        <Providers>
          <Navbar />
          <main>
            <PageTransition>{children}</PageTransition>
          </main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
