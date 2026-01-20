'use client';

import MediaSection from "./components/MediaSection";
import HeroCarousel from "./components/HeroCarousel";
import { useMedia } from "@/context/MediaContext";
import MainPage from "./components/MainPage";
import { filterByCategory } from "@/lib/categories";

export default function Home() {
  const { 
    popularMovies, 
    upcomingMovies, 
    popularTVShows, 
    upcomingTVShows,
    loadingMovies,
    loadingTVShows,
    errorMovies,
    errorTVShows,
    selectedCategoryId
  } = useMedia();

  const filteredPopularMovies = filterByCategory(popularMovies, "movie", selectedCategoryId);
  const filteredUpcomingMovies = filterByCategory(upcomingMovies, "movie", selectedCategoryId);
  const filteredPopularTVShows = filterByCategory(popularTVShows, "tv", selectedCategoryId);
  const filteredUpcomingTVShows = filterByCategory(upcomingTVShows, "tv", selectedCategoryId);

  return (
    <MainPage>
        <HeroCarousel 
          items={filteredUpcomingMovies.slice(1, 3)}
          mediaType="movie"
          loading={loadingMovies}
        />
        
        <MediaSection
          title="Filmes Populares"
          items={filteredPopularMovies.slice(1, 11)}
          loading={loadingMovies}
          error={errorMovies}
          mediaType="movie"
        />
        
        <MediaSection
          title="Series Populares"
          items={filteredPopularTVShows.slice(1, 5)}
          loading={loadingTVShows}
          error={errorTVShows}
          mediaType="tv"
        />
        
        <MediaSection
          title="Filmes - Em Breve"
          items={filteredUpcomingMovies.slice(1, 5)}
          loading={loadingMovies}
          error={errorMovies}
          mediaType="movie"
        />
        
        <MediaSection
          title="Series - Em Breve"
          items={filteredUpcomingTVShows.slice(1, 5)}
          loading={loadingTVShows}
          error={errorTVShows}
          mediaType="tv"
        />
    </MainPage>
  );
}
