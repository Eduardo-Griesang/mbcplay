'use client';

import React, { createContext, useContext, useState } from 'react';

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
    original_language?: string;
    adult?: boolean;
}

interface MediaContextType {
    selectedCategoryId: string;
    setSelectedCategoryId: (categoryId: string) => void;

    selectedMood: string;
    setSelectedMood: (mood: string) => void;
    selectedYear: string;
    setSelectedYear: (year: string) => void;
    selectedLanguage: string;
    setSelectedLanguage: (language: string) => void;
    selectedAgeRating: string;
    setSelectedAgeRating: (rating: string) => void;
}

const MediaContext = createContext<MediaContextType | undefined>(undefined);

export const MediaProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [selectedCategoryId, setSelectedCategoryId] = useState("all");
    const [selectedMood, setSelectedMood] = useState("all");
    const [selectedYear, setSelectedYear] = useState("all");
    const [selectedLanguage, setSelectedLanguage] = useState("all");
    const [selectedAgeRating, setSelectedAgeRating] = useState("all");

    const value: MediaContextType = {
        selectedCategoryId,
        setSelectedCategoryId,
        selectedMood,
        setSelectedMood,
        selectedYear,
        setSelectedYear,
        selectedLanguage,
        setSelectedLanguage,
        selectedAgeRating,
        setSelectedAgeRating,
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
