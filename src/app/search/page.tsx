'use client';

import { Suspense, useEffect, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import MainPage from "../components/MainPage";
import MediaCard from "../components/MediaCard";
import type { MediaItem } from "@/context/MediaContext";

type SearchResult = MediaItem & { media_type: "movie" | "tv" };

export default function SearchPage() {
    return (
        <Suspense fallback={<div className="px-7 pb-12 text-thirdText">Carregando busca...</div>}>
            <SearchContent />
        </Suspense>
    );
}

function SearchContent() {
    const searchParams = useSearchParams();
    const query = useMemo(() => (searchParams.get("q") ?? "").trim(), [searchParams]);
    const [results, setResults] = useState<SearchResult[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const apiKey = process.env.NEXT_PUBLIC_TMDB_API_KEY;
    const baseURL = process.env.NEXT_PUBLIC_TMDB_BASE_URL;

    useEffect(() => {
        if (!apiKey || !baseURL) {
            setError("Missing API configuration.");
            setResults([]);
            setLoading(false);
            return;
        }

        if (query.length < 2) {
            setResults([]);
            setError(null);
            setLoading(false);
            return;
        }

        const controller = new AbortController();

        const fetchResults = async () => {
            try {
                setLoading(true);
                setError(null);
                const response = await fetch(
                    `${baseURL}/search/multi?api_key=${apiKey}&language=en-US&query=${encodeURIComponent(query)}&page=1&include_adult=false`,
                    { signal: controller.signal }
                );

                if (!response.ok) {
                    throw new Error("Failed to fetch search results");
                }

                const data = await response.json();
                const filtered = (data.results || []).filter(
                    (item: { media_type?: string }) => item.media_type === "movie" || item.media_type === "tv"
                );
                setResults(filtered);
            } catch (fetchError) {
                if ((fetchError as { name?: string }).name === "AbortError") {
                    return;
                }
                setError(fetchError instanceof Error ? fetchError.message : "An error occurred");
            } finally {
                setLoading(false);
            }
        };

        fetchResults();

        return () => controller.abort();
    }, [apiKey, baseURL, query]);

    return (
        <MainPage>
            <section className="pb-12">
                <div className="mb-6">
                    <h1 className="text-mainText text-3xl font-semibold">Resultados da busca</h1>
                    <p className="text-thirdText mt-2">
                        {query.length > 0 ? `Resultados para "${query}"` : "Digite algo para iniciar a busca"}
                    </p>
                </div>

                {loading && (
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
                        {[...Array(10)].map((_, index) => (
                            <div
                                key={index}
                                className="w-40 h-56 bg-secondaryBackground rounded-lg animate-pulse"
                            />
                        ))}
                    </div>
                )}

                {!loading && error && <p className="text-thirdText">Error: {error}</p>}

                {!loading && !error && query.length >= 2 && results.length === 0 && (
                    <p className="text-thirdText">Nenhum resultado encontrado.</p>
                )}

                {!loading && !error && results.length > 0 && (
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
                        {results.map((item) => (
                            <MediaCard
                                key={`${item.media_type}-${item.id}`}
                                media={item}
                                mediaType={item.media_type}
                            />
                        ))}
                    </div>
                )}
            </section>
        </MainPage>
    );
}
