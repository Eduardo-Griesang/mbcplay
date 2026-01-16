'use client';

import Profile from "./components/Profile";
import SearchBar from "./components/SearchBar";
import SideBar from "./components/SideBar";
import MediaSection from "./components/MediaSection";
import HeroCarousel from "./components/HeroCarousel";
import { useMedia } from "@/context/MediaContext";
import { useEffect } from "react";

export default function Home() {
  const { 
    popularMovies, 
    upcomingMovies, 
    popularTVShows, 
    upcomingTVShows,
    loadingMovies,
    loadingTVShows,
    errorMovies,
    errorTVShows
  } = useMedia();

  useEffect(() => {
    console.log(popularMovies)
  })

  return (
    <div className="bg-mainBackground grid grid-cols-6 h-screen overflow-hidden">
      <SideBar />
      <main className="col-span-5 flex flex-col overflow-y-auto">
        <section className="flex items-center justify-between py-6 top-0 bg-mainBackground z-10 px-7">
          <SearchBar />
          <Profile />
        </section>

        <div className="pb-12 pl-7">
          <HeroCarousel 
            items={upcomingMovies.slice(11, 13)} 
            loading={loadingMovies}
          />
          
          <MediaSection
            title="Filmes Populares"
            items={popularMovies}
            loading={loadingMovies}
            error={errorMovies}
          />
          
          <MediaSection
            title="Series Populares"
            items={popularTVShows}
            loading={loadingTVShows}
            error={errorTVShows}
          />
          
          <MediaSection
            title="Filmes - Em Breve"
            items={upcomingMovies}
            loading={loadingMovies}
            error={errorMovies}
          />
          
          <MediaSection
            title="Series - Em Breve"
            items={upcomingTVShows}
            loading={loadingTVShows}
            error={errorTVShows}
          />
        </div>
      </main>
    </div>
  );
}
