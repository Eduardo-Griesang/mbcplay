'use client';

import { useMedia } from "@/context/MediaContext";
import { useData } from "@/context/DataContext";
import { filterByCategory } from "@/lib/categories";
import { filterByFilters } from "@/lib/filters";
import MediaSection from "../MediaSection";

export default function SeriesContent() {
    const {
        selectedCategoryId,
        selectedMood,
        selectedYear,
        selectedLanguage,
        selectedAgeRating,
    } = useMedia();

    const {
        popularTVShows,
        upcomingTVShows,
    } = useData();

    const activeFilters = {
        mood: selectedMood,
        year: selectedYear,
        language: selectedLanguage,
        ageRating: selectedAgeRating,
    };

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
        <div className="pb-12">
            <MediaSection
                title="Series Populares"
                items={filteredPopularTVShows}
                loading={false}
                error={null}
                mediaType="tv"
            />

            <MediaSection
                title="Em Breve"
                items={filteredUpcomingTVShows}
                loading={false}
                error={null}
                mediaType="tv"
            />
        </div>
    );
}
