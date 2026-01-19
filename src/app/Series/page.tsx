'use client';

import MediaSection from "../components/MediaSection";
import { useMedia } from "@/context/MediaContext";
import MainPage from "../components/MainPage";
import { filterByCategory } from "@/lib/categories";

export default function Series() {
    const { 
        popularTVShows, 
        upcomingTVShows,
        loadingTVShows,
        errorTVShows,
        selectedCategoryId
    } = useMedia();

    const filteredPopularTVShows = filterByCategory(popularTVShows, "tv", selectedCategoryId);
    const filteredUpcomingTVShows = filterByCategory(upcomingTVShows, "tv", selectedCategoryId);

    return (
        <MainPage>
            <div className="pb-12">
                <MediaSection
                    title="Popular Series"
                    items={filteredPopularTVShows}
                    loading={loadingTVShows}
                    error={errorTVShows}
                    mediaType="tv"
                />
                
                <MediaSection
                    title="Coming Soon"
                    items={filteredUpcomingTVShows}
                    loading={loadingTVShows}
                    error={errorTVShows}
                    mediaType="tv"
                />
            </div>
        </MainPage>
    )
};
