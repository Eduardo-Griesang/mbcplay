'use client';

import MediaSection from "../components/MediaSection";
import { useMedia } from "@/context/MediaContext";
import MainPage from "../components/MainPage";

export default function Series() {
    const { 
        popularTVShows, 
        upcomingTVShows,
        loadingTVShows,
        errorTVShows
    } = useMedia();

    return (
        <MainPage>
            <div className="pb-12">
                <MediaSection
                    title="Popular Series"
                    items={popularTVShows}
                    loading={loadingTVShows}
                    error={errorTVShows}
                    mediaType="tv"
                />
                
                <MediaSection
                    title="Coming Soon"
                    items={upcomingTVShows}
                    loading={loadingTVShows}
                    error={errorTVShows}
                    mediaType="tv"
                />
            </div>
        </MainPage>
    )
};
