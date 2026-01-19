'use client';

import MediaSection from "../components/MediaSection";
import { useMedia } from "@/context/MediaContext";
import MainPage from "../components/MainPage";
import { filterByCategory } from "@/lib/categories";

export default function Films() {
    const { 
        popularMovies, 
        upcomingMovies,
        loadingMovies,
        errorMovies,
        selectedCategoryId
    } = useMedia();

    const filteredPopularMovies = filterByCategory(popularMovies, "movie", selectedCategoryId);
    const filteredUpcomingMovies = filterByCategory(upcomingMovies, "movie", selectedCategoryId);

    return(
        <MainPage>
            <div className="pb-12">
                <MediaSection
                    title="Popular Movies"
                    items={filteredPopularMovies}
                    loading={loadingMovies}
                    error={errorMovies}
                    mediaType="movie"
                />
                
                <MediaSection
                    title="Coming Soon"
                    items={filteredUpcomingMovies}
                    loading={loadingMovies}
                    error={errorMovies}
                    mediaType="movie"
                />
            </div>
        </MainPage>
    )
};
