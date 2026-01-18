export type MediaType = "movie" | "tv";

export type MediaDetails = {
    id: number;
    title?: string;
    name?: string;
    overview?: string;
    poster_path?: string;
    backdrop_path?: string;
    release_date?: string;
    first_air_date?: string;
    vote_average?: number;
    genres?: { id: number; name: string }[];
    runtime?: number;
    number_of_seasons?: number;
};

type FetchResult = {
    details: MediaDetails | null;
    error: string | null;
};

export async function getMediaDetails(params: {
    id?: string;
    type?: string;
    apiKey?: string;
    baseURL?: string;
}): Promise<FetchResult> {
    const { id, type, apiKey, baseURL = "https://api.themoviedb.org/3" } = params;
    const isValidType = type === "movie" || type === "tv";

    if (!id || !isValidType) {
        return { details: null, error: "Missing or invalid media ID/type." };
    }

    if (!apiKey) {
        return { details: null, error: "TMDB API key is not configured." };
    }

    try {
        const res = await fetch(`${baseURL}/${type}/${id}?api_key=${apiKey}&language=en-US`, {
            cache: "no-store",
        });
        if (!res.ok) {
            throw new Error(`Failed to fetch details (${res.status})`);
        }
        const details = (await res.json()) as MediaDetails;
        return { details, error: null };
    } catch (error) {
        const message = error instanceof Error ? error.message : "Failed to fetch details.";
        return { details: null, error: message };
    }
}
