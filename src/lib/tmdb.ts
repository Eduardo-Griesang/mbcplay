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
    created_by?: { id: number; name: string }[];
    credits?: MediaCredits;
};

export type MediaCredits = {
    cast?: { id: number; name: string; character?: string; order?: number }[];
    crew?: { id: number; name: string; job?: string; department?: string }[];
};

export type MediaSummary = {
    id: number;
    title?: string;
    name?: string;
    overview?: string;
    poster_path?: string | null;
    backdrop_path?: string | null;
    release_date?: string;
    first_air_date?: string;
    vote_average?: number;
    genre_ids?: number[];
};

export type TrailerResult = {
    trailerUrl: string | null;
    error: string | null;
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
        const res = await fetch(
            `${baseURL}/${type}/${id}?api_key=${apiKey}&language=en-US&append_to_response=credits`,
            {
                cache: "no-store",
            }
        );
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

type SimilarResult = {
    items: MediaSummary[];
    error: string | null;
};

export async function getSimilarByGenres(params: {
    type?: string;
    genreIds: number[];
    excludeId?: number;
    apiKey?: string;
    baseURL?: string;
    limit?: number;
}): Promise<SimilarResult> {
    const {
        type,
        genreIds,
        excludeId,
        apiKey,
        baseURL = "https://api.themoviedb.org/3",
        limit = 4,
    } = params;
    const isValidType = type === "movie" || type === "tv";

    if (!isValidType) {
        return { items: [], error: "Missing or invalid media type." };
    }

    if (!apiKey) {
        return { items: [], error: "TMDB API key is not configured." };
    }

    if (!genreIds.length) {
        return { items: [], error: null };
    }

    try {
        const response = await fetch(
            `${baseURL}/discover/${type}?api_key=${apiKey}&language=en-US&sort_by=popularity.desc&with_genres=${genreIds.join(",")}&page=1&include_adult=false`,
            { cache: "no-store" }
        );

        if (!response.ok) {
            throw new Error(`Failed to fetch similar media (${response.status})`);
        }

        const data = await response.json();
        const filtered = (data.results || []).filter(
            (item: { id?: number }) => (excludeId ? item.id !== excludeId : true)
        );

        return { items: filtered.slice(0, limit), error: null };
    } catch (error) {
        const message = error instanceof Error ? error.message : "Failed to fetch similar media.";
        return { items: [], error: message };
    }
}

export async function getTrailerUrl(params: {
    id?: string;
    type?: string;
    apiKey?: string;
    baseURL?: string;
}): Promise<TrailerResult> {
    const { id, type, apiKey, baseURL = "https://api.themoviedb.org/3" } = params;
    const isValidType = type === "movie" || type === "tv";

    if (!id || !isValidType) {
        return { trailerUrl: null, error: "Missing or invalid media ID/type." };
    }

    if (!apiKey) {
        return { trailerUrl: null, error: "TMDB API key is not configured." };
    }

    try {
        const res = await fetch(
            `${baseURL}/${type}/${id}/videos?api_key=${apiKey}&language=en-US`,
            {
                cache: "no-store",
            }
        );

        if (!res.ok) {
            throw new Error(`Failed to fetch trailer (${res.status})`);
        }

        const data = await res.json();
        const videos = data.results || [];
        
        // Look for official trailer
        const trailer = videos.find(
            (video: { type: string; name: string; site: string }) => 
                video.type === "Trailer" && video.site === "YouTube"
        );

        if (trailer) {
            return { trailerUrl: `https://www.youtube.com/watch?v=${trailer.key}`, error: null };
        }

        // Fallback to any YouTube video
        const youtubeVideo = videos.find(
            (video: { site: string }) => video.site === "YouTube"
        );

        if (youtubeVideo) {
            return { trailerUrl: `https://www.youtube.com/watch?v=${youtubeVideo.key}`, error: null };
        }

        return { trailerUrl: null, error: "No trailer found." };
    } catch (error) {
        const message = error instanceof Error ? error.message : "Failed to fetch trailer.";
        return { trailerUrl: null, error: message };
    }
}
