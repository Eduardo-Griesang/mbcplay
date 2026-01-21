'use client';

import { useMedia } from "@/context/MediaContext";
import { useData } from "@/context/DataContext";
import { filterByCategory } from "@/lib/categories";
import { filterByFilters } from "@/lib/filters";
import MediaSection from "../MediaSection";

export default function FilmsContent() {
    const {
        selectedCategoryId,
        selectedMood,
        selectedYear,
        selectedLanguage,
        selectedAgeRating,
    } = useMedia();

    const {
        popularMovies,
        upcomingMovies,
    } = useData();

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

    return (
        <div className="pb-12">
            <MediaSection
                title="Filmes Populares"
                items={filteredPopularMovies}
                loading={false}
                error={null}
                mediaType="movie"
            />

            <MediaSection
                title="Em Breve"
                items={filteredUpcomingMovies}
                loading={false}
                error={null}
                mediaType="movie"
            />
        </div>
    );
}
