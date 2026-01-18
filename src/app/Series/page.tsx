'use client';

import Profile from "../components/Profile";
import SearchBar from "../components/SearchBar";
import SideBar from "../components/SideBar";
import MediaSection from "../components/MediaSection";
import { useMedia } from "@/context/MediaContext";

export default function Series() {
    const { 
        popularTVShows, 
        upcomingTVShows,
        loadingTVShows,
        errorTVShows
    } = useMedia();

    return (
        <div className="bg-mainBackground grid grid-cols-6 h-screen overflow-hidden">
            <SideBar />
            <main className="col-span-5 mx-7 flex flex-col overflow-y-auto">
                <section className="flex items-center justify-between py-6 bg-mainBackground z-10">
                    <SearchBar />
                    <Profile />
                </section>
                
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
            </main>
        </div>
    )
};
