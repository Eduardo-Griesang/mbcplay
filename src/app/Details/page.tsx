import Image from "next/image";
import { getMediaDetails } from "@/lib/tmdb";
import MainPage from "../components/MainPage";
import Star from "../icons/Star.svg"
import Play from "../icons/Play.svg"

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
    const year = details?.release_date ? new Date(details.release_date).getFullYear() : null;
    const crew = details?.credits?.crew ?? [];
    const cast = details?.credits?.cast ?? [];
    const directorNames = crew
        .filter((member) => member.job === "Director")
        .map((member) => member.name);
    const creatorNames =
        !directorNames.length && details?.created_by
            ? details.created_by.map((creator) => creator.name)
            : [];
    const producerNames = crew
        .filter((member) => member.job === "Producer" || member.job === "Executive Producer")
        .map((member) => member.name);
    const castNames = cast.slice(0, 5).map((member) => member.name);
    const uniqueNames = (names: string[]) => Array.from(new Set(names));
    const formatNames = (names: string[]) => (names.length ? uniqueNames(names).join(", ") : "N/A");
        
    //console.log(details)

    return (
        <MainPage>
            <div className="pb-12">
                {errorMessage ? (
                    <p className="text-thirdText">{errorMessage}</p>
                ) : details ? (
                    <div className="flex flex-col gap-8 pr-7 relative">
                        <div className="relative bg-secondaryBackground w-full h-64 sm:h-80 md:h-96 rounded-2xl overflow-hidden">
                            <Image
                                src={
                                    details.backdrop_path
                                        ? `https://image.tmdb.org/t/p/w500${details.backdrop_path}`
                                        : "https://via.placeholder.com/300x450?text=No+Image"
                                }
                                alt={details.title ?? details.name ?? "Poster"}
                                fill
                                sizes="100%"
                                className="object-cover"
                            />
                            <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 text-mainText font-medium text-2xl ">
                                <div className="rounded-full bg-mainText/35 w-24 h-24 flex items-center justify-center hover:cursor-pointer">
                                    <Image
                                        src={Play}
                                        alt={"Play button"}
                                        className="w-20 h-20"
                                    />
                                </div>
                                <h3>Assistir trailer</h3>
                            </div>
                        </div>
                        <div className="flex flex-col gap-4 w-3/4">
                            <section className="flex justify-between items-center">
                                <h1 className="text-mainText text-2xl font-medium">
                                    {details.title ?? details.name} • {year ? year : "N/A"} • {typeof details.runtime === "number" ? (<span>{details.runtime} min</span>) : "N/A"}
                                </h1>

                                <div className="flex gap-5">
                                    {details.genres && details.genres.length > 0 && (
                                        <div className="flex flex-wrap gap-2">
                                            {details.genres.map((genre) => (
                                                <span
                                                    key={genre.id}
                                                    className="px-3 py-1 rounded-full border-1 border-mainText/35 text-mainText/80 text-sm"
                                                >
                                                    {genre.name}
                                                </span>
                                            ))}
                                        </div>
                                    )}
                                    <div className="flex gap-2 items-center">
                                        <Image src={Star} alt={'Star'} />
                                        <span className="text-mainText font-medium text-2xl"> 
                                            {typeof details.vote_average === "number" && details.vote_average.toFixed(1)}
                                        </span>
                                    </div>
                                </div>
                            </section>
                            <p className="text-mainText font-normal text-xl">
                                {details.overview || "No overview available."}
                            </p>
                            <div className="border-t border-mainText/25"></div>
                            <div className="flex flex-wrap gap-4 text-mainText text-xl">
                                <section>
                                    <h2 className="font-bold">Diretor</h2>
                                    <span className="font-normal">{formatNames(directorNames.length ? directorNames : creatorNames)}</span>
                                </section>
                                <section>
                                    <h2 className="font-bold">Produtores</h2>
                                    <span className="font-normal">{formatNames(producerNames)}</span>
                                </section>
                                <section>
                                    <h2 className="font-bold">Elenco</h2>
                                    <span className="font-normal">{formatNames(castNames)}</span>
                                </section>
                            </div>
                        </div>
                    </div>
                ) : (
                    <p className="text-thirdText">Loading details...</p>
                )}
            </div>
        </MainPage>
    )
}
