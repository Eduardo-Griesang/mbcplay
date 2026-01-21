'use client';

import React, { createContext, useContext } from 'react';
import type { MediaItem } from '@/context/MediaContext';

interface DataContextType {
    popularMovies: MediaItem[];
    upcomingMovies: MediaItem[];
    popularTVShows: MediaItem[];
    upcomingTVShows: MediaItem[];
}

const DataContext = createContext<DataContextType | undefined>(undefined);

export const DataProvider: React.FC<{ 
    children: React.ReactNode;
    data: DataContextType;
}> = ({ children, data }) => {
    return <DataContext.Provider value={data}>{children}</DataContext.Provider>;
};

export const useData = () => {
    const context = useContext(DataContext);
    if (!context) {
        throw new Error('useData must be used within a DataProvider');
    }
    return context;
};
