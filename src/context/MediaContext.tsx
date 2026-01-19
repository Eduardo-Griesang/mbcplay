'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

export interface MediaItem {
    id: number;
    title?: string;
    name?: string;
    poster_path: string;
    backdrop_path: string;
    overview: string;
    release_date?: string;
    first_air_date?: string;
    vote_average: number;
    genre_ids?: number[];
}

interface MediaContextType {
    // Movies
    popularMovies: MediaItem[];
    upcomingMovies: MediaItem[];
    loadingMovies: boolean;
    errorMovies: string | null;

    // TV Shows
    popularTVShows: MediaItem[];
    upcomingTVShows: MediaItem[];
    loadingTVShows: boolean;
    errorTVShows: string | null;

    selectedCategoryId: string;
    setSelectedCategoryId: (categoryId: string) => void;

    // Refetch functions
    refetchMovies: () => Promise<void>;
    refetchTVShows: () => Promise<void>;
}

const MediaContext = createContext<MediaContextType | undefined>(undefined);

export const MediaProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [popularMovies, setPopularMovies] = useState<MediaItem[]>([]);
    const [upcomingMovies, setUpcomingMovies] = useState<MediaItem[]>([]);
    const [loadingMovies, setLoadingMovies] = useState(true);
    const [errorMovies, setErrorMovies] = useState<string | null>(null);

    const [popularTVShows, setPopularTVShows] = useState<MediaItem[]>([]);
    const [upcomingTVShows, setUpcomingTVShows] = useState<MediaItem[]>([]);
    const [loadingTVShows, setLoadingTVShows] = useState(true);
    const [errorTVShows, setErrorTVShows] = useState<string | null>(null);
    const [selectedCategoryId, setSelectedCategoryId] = useState("all");

    const apiKey = process.env.NEXT_PUBLIC_TMDB_API_KEY;
    const baseURL = process.env.NEXT_PUBLIC_TMDB_BASE_URL;

    const fetchMovies = async () => {
        try {
            setLoadingMovies(true);
            setErrorMovies(null);

            const [popularRes, upcomingRes] = await Promise.all([
                fetch(`${baseURL}/movie/popular?api_key=${apiKey}&language=en-US&page=1`),
                fetch(`${baseURL}/movie/upcoming?api_key=${apiKey}&language=en-US&page=1`),
            ]);

            if (!popularRes.ok || !upcomingRes.ok) {
                throw new Error('Failed to fetch movies');
            }

            const popularData = await popularRes.json();
            const upcomingData = await upcomingRes.json();

            setPopularMovies(popularData.results || []);
            setUpcomingMovies(upcomingData.results || []);
        } catch (error) {
            setErrorMovies(error instanceof Error ? error.message : 'An error occurred');
            console.error('Error fetching movies:', error);
        } finally {
            setLoadingMovies(false);
        }
    };

    const fetchTVShows = async () => {
        try {
            setLoadingTVShows(true);
            setErrorTVShows(null);

            const [popularRes, upcomingRes] = await Promise.all([
                fetch(`${baseURL}/tv/popular?api_key=${apiKey}&language=en-US&page=1`),
                fetch(`${baseURL}/tv/on_the_air?api_key=${apiKey}&language=en-US&page=1`),
            ]);

            if (!popularRes.ok || !upcomingRes.ok) {
                throw new Error('Failed to fetch TV shows');
            }

            const popularData = await popularRes.json();
            const upcomingData = await upcomingRes.json();

            setPopularTVShows(popularData.results || []);
            setUpcomingTVShows(upcomingData.results || []);
        } catch (error) {
            setErrorTVShows(error instanceof Error ? error.message : 'An error occurred');
            console.error('Error fetching TV shows:', error);
        } finally {
            setLoadingTVShows(false);
        }
    };

    useEffect(() => {
        fetchMovies();
        fetchTVShows();
    }, []);

    const value: MediaContextType = {
        popularMovies,
        upcomingMovies,
        loadingMovies,
        errorMovies,
        popularTVShows,
        upcomingTVShows,
        loadingTVShows,
        errorTVShows,
        selectedCategoryId,
        setSelectedCategoryId,
        refetchMovies: fetchMovies,
        refetchTVShows: fetchTVShows,
    };

    return <MediaContext.Provider value={value}>{children}</MediaContext.Provider>;
};

export const useMedia = () => {
    const context = useContext(MediaContext);
    if (!context) {
        throw new Error('useMedia must be used within a MediaProvider');
    }
    return context;
};
