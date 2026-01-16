'use client';

import Profile from "../components/Profile";
import SearchBar from "../components/SearchBar";
import SideBar from "../components/SideBar";
import MediaSection from "../components/MediaSection";
import { useMedia } from "@/context/MediaContext";

export default function Films() {
    const { 
        popularMovies, 
        upcomingMovies,
        loadingMovies,
        errorMovies
    } = useMedia();

    return(
        <div className="bg-mainBackground grid grid-cols-6 h-screen overflow-hidden">
            <SideBar />
            <main className="col-span-5 mx-7 flex flex-col overflow-y-auto">
                <section className="flex items-center justify-between py-6 sticky top-0 bg-mainBackground z-10">
                    <SearchBar />
                    <Profile />
                </section>
                
                <div className="pb-12">
                    <MediaSection
                        title="Popular Movies"
                        items={popularMovies}
                        loading={loadingMovies}
                        error={errorMovies}
                    />
                    
                    <MediaSection
                        title="Coming Soon"
                        items={upcomingMovies}
                        loading={loadingMovies}
                        error={errorMovies}
                    />
                </div>
            </main>
        </div>
    )
};