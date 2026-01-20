'use client';

import { useMedia } from "@/context/MediaContext";
import { filterByCategory } from "@/lib/categories";
import { filterByFilters } from "@/lib/filters";
import type { MediaItem } from "@/context/MediaContext";
import MediaSection from "../MediaSection";

type FilmsContentProps = {
    popularMovies: MediaItem[];
    upcomingMovies: MediaItem[];
};

export default function FilmsContent({ popularMovies, upcomingMovies }: FilmsContentProps) {
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

    return (
        <div className="pb-12">
            <MediaSection
                title="Popular Movies"
                items={filteredPopularMovies}
                loading={false}
                error={null}
                mediaType="movie"
            />

            <MediaSection
                title="Coming Soon"
                items={filteredUpcomingMovies}
                loading={false}
                error={null}
                mediaType="movie"
            />
        </div>
    );
}
