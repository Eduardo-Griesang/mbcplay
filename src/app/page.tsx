'use client';

import MediaSection from "./components/MediaSection";
import HeroCarousel from "./components/HeroCarousel";
import MediaCarousel from "./components/MediaCarousel";
import { useMedia } from "@/context/MediaContext";
import MainPage from "./components/MainPage";
import { filterByCategory } from "@/lib/categories";
import { filterByFilters } from "@/lib/filters";
import Filters from "./components/Filters";

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
    selectedCategoryId,
    selectedMood,
    selectedYear,
    selectedLanguage,
    selectedAgeRating,
  } = useMedia();

  const activeFilters = {
    mood: selectedMood,
    year: selectedYear,
    language: selectedLanguage,
    ageRating: selectedAgeRating,
  };

  const filteredPopularMovies = filterByFilters(
    filterByCategory(popularMovies, "movie", selectedCategoryId),
    "movie",
    activeFilters
  );
  const filteredUpcomingMovies = filterByFilters(
    filterByCategory(upcomingMovies, "movie", selectedCategoryId),
    "movie",
    activeFilters
  );
  const filteredPopularTVShows = filterByFilters(
    filterByCategory(popularTVShows, "tv", selectedCategoryId),
    "tv",
    activeFilters
  );
  const filteredUpcomingTVShows = filterByFilters(
    filterByCategory(upcomingTVShows, "tv", selectedCategoryId),
    "tv",
    activeFilters
  );

  return (
    <MainPage>
        <HeroCarousel 
          items={filteredUpcomingMovies.slice(1, 3)}
          mediaType="movie"
          loading={loadingMovies}
        />
        
        <MediaCarousel
          items={filteredPopularMovies.slice(1, 20)}
          mediaType="movie"
          loading={loadingMovies}
        />
        
        <section className="flex flex-col md:flex-row-reverse md:justify-end">
          <Filters />

          <section className="md:w-3/4">
            <MediaSection
              title="Series Populares"
              items={filteredPopularTVShows.slice(1, 5)}
              loading={loadingTVShows}
              error={errorTVShows}
              mediaType="tv"
              main={true}
            />
            
            <MediaSection
              title="Filmes - Em Breve"
              items={filteredUpcomingMovies.slice(1, 5)}
              loading={loadingMovies}
              error={errorMovies}
              mediaType="movie"
              main={true}
            />
            
            <MediaSection
              title="Series - Em Breve"
              items={filteredUpcomingTVShows.slice(1, 5)}
              loading={loadingTVShows}
              error={errorTVShows}
              mediaType="tv"
              main={true}
            />
          </section>
        </section>
    </MainPage>
  );
}
