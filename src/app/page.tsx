'use client';

import MediaSection from "./components/MediaSection";
import HeroCarousel from "./components/HeroCarousel";
import { useMedia } from "@/context/MediaContext";
import { useEffect } from "react";
import MainPage from "./components/MainPage";

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
    <MainPage>
        <HeroCarousel 
          items={upcomingMovies.slice(11, 13)}
          mediaType="movie"
          loading={loadingMovies}
        />
        
        <MediaSection
          title="Filmes Populares"
          items={popularMovies}
          loading={loadingMovies}
          error={errorMovies}
          mediaType="movie"
        />
        
        <MediaSection
          title="Series Populares"
          items={popularTVShows}
          loading={loadingTVShows}
          error={errorTVShows}
          mediaType="tv"
        />
        
        <MediaSection
          title="Filmes - Em Breve"
          items={upcomingMovies}
          loading={loadingMovies}
          error={errorMovies}
          mediaType="movie"
        />
        
        <MediaSection
          title="Series - Em Breve"
          items={upcomingTVShows}
          loading={loadingTVShows}
          error={errorTVShows}
          mediaType="tv"
        />
    </MainPage>
  );
}
