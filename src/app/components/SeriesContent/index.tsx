'use client';

import { useMedia } from "@/context/MediaContext";
import { filterByCategory } from "@/lib/categories";
import { filterByFilters } from "@/lib/filters";
import type { MediaItem } from "@/context/MediaContext";
import MediaSection from "../MediaSection";

type SeriesContentProps = {
    popularTVShows: MediaItem[];
    upcomingTVShows: MediaItem[];
};

export default function SeriesContent({ popularTVShows, upcomingTVShows }: SeriesContentProps) {
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
                title="Popular Series"
                items={filteredPopularTVShows}
                loading={false}
                error={null}
                mediaType="tv"
            />

            <MediaSection
                title="Coming Soon"
                items={filteredUpcomingTVShows}
                loading={false}
                error={null}
                mediaType="tv"
            />
        </div>
    );
}
