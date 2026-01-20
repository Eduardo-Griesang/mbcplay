'use client';

import { useMedia } from "@/context/MediaContext";
import { filterByCategory } from "@/lib/categories";
import { filterByFilters } from "@/lib/filters";
import type { MediaItem } from "@/context/MediaContext";
import HeroCarousel from "../HeroCarousel";
import MediaCarousel from "../MediaCarousel";
import MediaSection from "../MediaSection";
import Filters from "../Filters";

type HomeContentProps = {
    popularMovies: MediaItem[];
    upcomingMovies: MediaItem[];
    popularTVShows: MediaItem[];
    upcomingTVShows: MediaItem[];
};

export default function HomeContent({
    popularMovies,
    upcomingMovies,
    popularTVShows,
    upcomingTVShows,
}: HomeContentProps) {
    const {
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
        <>
            <HeroCarousel
                items={filteredUpcomingMovies.slice(1, 3)}
                mediaType="movie"
                loading={false}
            />

            <MediaCarousel
                items={filteredPopularMovies.slice(1, 20)}
                mediaType="movie"
                loading={false}
            />

            <section className="flex flex-col md:flex-row-reverse md:justify-end">
                <Filters />

                <section className="md:w-3/4">
                    <MediaSection
                        title="Series Populares"
                        items={filteredPopularTVShows.slice(1, 5)}
                        loading={false}
                        error={null}
                        mediaType="tv"
                        main={true}
                    />

                    <MediaSection
                        title="Filmes - Em Breve"
                        items={filteredUpcomingMovies.slice(1, 5)}
                        loading={false}
                        error={null}
                        mediaType="movie"
                        main={true}
                    />

                    <MediaSection
                        title="Series - Em Breve"
                        items={filteredUpcomingTVShows.slice(1, 5)}
                        loading={false}
                        error={null}
                        mediaType="tv"
                        main={true}
                    />
                </section>
            </section>
        </>
    );
}
