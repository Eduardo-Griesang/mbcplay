import type { Metadata } from "next";
import "./globals.css";
import { MediaProvider } from "@/context/MediaContext";
import { DataProvider } from "@/context/DataContext";
import {
  fetchPopularMovies,
  fetchPopularTVShows,
  fetchUpcomingMovies,
  fetchUpcomingTVShows,
} from "@/lib/tmdbServer";

import { Poppins } from "next/font/google";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-poppins",
  display: "swap",
});

export const metadata: Metadata = {
  title: "MBCPlay",
  description: "Filmes e Séries no MBCPlay",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [
    popularMovies,
    upcomingMovies,
    popularTVShows,
    upcomingTVShows,
  ] = await Promise.all([
    fetchPopularMovies(),
    fetchUpcomingMovies(),
    fetchPopularTVShows(),
    fetchUpcomingTVShows(),
  ]);

  return (
    <html lang="en">
      <body
        className={`${poppins.variable} bg-mainBackground antialiased`}
      >
        <MediaProvider>
          <DataProvider data={{
            popularMovies,
            upcomingMovies,
            popularTVShows,
            upcomingTVShows,
          }}>
            {children}
          </DataProvider>
        </MediaProvider>
      </body>
    </html>
  );
}
