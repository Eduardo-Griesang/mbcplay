import type { MediaItem } from "@/context/MediaContext";

const defaultBaseURL = "https://api.themoviedb.org/3";

function getApiConfig() {
    const apiKey = process.env.TMDB_API_KEY ?? process.env.NEXT_PUBLIC_TMDB_API_KEY;
    const baseURL = process.env.TMDB_BASE_URL ?? process.env.NEXT_PUBLIC_TMDB_BASE_URL ?? defaultBaseURL;
    return { apiKey, baseURL };
}

async function fetchTmdb<T>(path: string, revalidateSeconds = 300): Promise<T | null> {
    const { apiKey, baseURL } = getApiConfig();
    if (!apiKey) {
        return null;
    }
    const res = await fetch(`${baseURL}${path}&api_key=${apiKey}`, {
        next: { revalidate: revalidateSeconds },
    });
    if (!res.ok) {
        return null;
    }
    return (await res.json()) as T;
}

type TmdbListResponse<T = MediaItem> = {
    results?: T[];
};

export async function fetchPopularMovies() {
    const data = await fetchTmdb<TmdbListResponse>("/movie/popular?language=en-US&page=1");
    return data?.results ?? [];
}

export async function fetchUpcomingMovies() {
    const data = await fetchTmdb<TmdbListResponse>("/movie/upcoming?language=en-US&page=1");
    return data?.results ?? [];
}

export async function fetchPopularTVShows() {
    const data = await fetchTmdb<TmdbListResponse>("/tv/popular?language=en-US&page=1");
    return data?.results ?? [];
}

export async function fetchUpcomingTVShows() {
    const data = await fetchTmdb<TmdbListResponse>("/tv/on_the_air?language=en-US&page=1");
    return data?.results ?? [];
}

export type SearchResult = MediaItem & { media_type: "movie" | "tv" };

export async function searchMulti(query: string) {
    if (!query || query.trim().length < 2) {
        return [];
    }
    const encodedQuery = encodeURIComponent(query.trim());
    const data = await fetchTmdb<TmdbListResponse<SearchResult>>(
        `/search/multi?language=en-US&query=${encodedQuery}&page=1&include_adult=false`,
        60
    );
    const results = data?.results ?? [];
    return results.filter(
        (item: { media_type?: string }) => item.media_type === "movie" || item.media_type === "tv"
    ) as SearchResult[];
}
