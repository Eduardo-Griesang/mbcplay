'use client';

import MediaSection from "../components/MediaSection";
import { useMedia } from "@/context/MediaContext";
import MainPage from "../components/MainPage";

export default function Films() {
    const { 
        popularMovies, 
        upcomingMovies,
        loadingMovies,
        errorMovies
    } = useMedia();

    return(
        <MainPage>
            <div className="pb-12">
                <MediaSection
                    title="Popular Movies"
                    items={popularMovies}
                    loading={loadingMovies}
                    error={errorMovies}
                    mediaType="movie"
                />
                
                <MediaSection
                    title="Coming Soon"
                    items={upcomingMovies}
                    loading={loadingMovies}
                    error={errorMovies}
                    mediaType="movie"
                />
            </div>
        </MainPage>
    )
};
