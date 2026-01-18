import Image from "next/image";
import Profile from "../components/Profile";
import SearchBar from "../components/SearchBar";
import SideBar from "../components/SideBar";
import { getMediaDetails } from "@/lib/tmdb";

type DetailsPageProps = {
    searchParams?: {
        id?: string;
        type?: string;
    };
};

export default async function Details({ searchParams }: DetailsPageProps) {
    const mediaId = searchParams?.id;
    const mediaType = searchParams?.type;
    const apiKey = process.env.NEXT_PUBLIC_TMDB_API_KEY;
    const baseURL = process.env.NEXT_PUBLIC_TMDB_BASE_URL ?? "https://api.themoviedb.org/3";
    const { details, error: errorMessage } = await getMediaDetails({
        id: mediaId,
        type: mediaType,
        apiKey,
        baseURL,
    });

    return (
        <div className="bg-mainBackground grid grid-cols-6 h-screen overflow-hidden">
            <SideBar />
            <main className="col-span-5 mx-7 flex flex-col overflow-y-auto">
                <section className="flex items-center justify-between py-6 sticky top-0 bg-mainBackground z-10">
                    <SearchBar />
                    <Profile />
                </section>
                
                <div className="pb-12">
                    {errorMessage ? (
                        <p className="text-thirdText">{errorMessage}</p>
                    ) : details ? (
                        <div className="flex gap-8 items-start">
                            <div className="relative w-56 h-80 rounded-2xl overflow-hidden bg-secondaryBackground">
                                <Image
                                    src={
                                        details.poster_path
                                            ? `https://image.tmdb.org/t/p/w500${details.poster_path}`
                                            : "https://via.placeholder.com/300x450?text=No+Image"
                                    }
                                    alt={details.title ?? details.name ?? "Poster"}
                                    fill
                                    className="object-cover"
                                />
                            </div>
                            <div className="flex flex-col gap-3 max-w-3xl">
                                <h1 className="text-mainText text-3xl font-semibold">
                                    {details.title ?? details.name}
                                </h1>
                                <p className="text-thirdText">
                                    {details.overview || "No overview available."}
                                </p>
                                <div className="flex flex-wrap gap-4 text-mainText/80">
                                    {details.release_date && (
                                        <span>Release: {details.release_date}</span>
                                    )}
                                    {details.first_air_date && (
                                        <span>First Air: {details.first_air_date}</span>
                                    )}
                                    {typeof details.runtime === "number" && (
                                        <span>Runtime: {details.runtime} min</span>
                                    )}
                                    {typeof details.number_of_seasons === "number" && (
                                        <span>Seasons: {details.number_of_seasons}</span>
                                    )}
                                    {typeof details.vote_average === "number" && (
                                        <span>Rating: {details.vote_average.toFixed(1)}</span>
                                    )}
                                </div>
                                {details.genres && details.genres.length > 0 && (
                                    <div className="flex flex-wrap gap-2">
                                        {details.genres.map((genre) => (
                                            <span
                                                key={genre.id}
                                                className="px-3 py-1 rounded-full bg-secondaryBackground text-mainText text-sm"
                                            >
                                                {genre.name}
                                            </span>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </div>
                    ) : (
                        <p className="text-thirdText">Loading details...</p>
                    )}
                </div>
            </main>
        </div>
    )
}
