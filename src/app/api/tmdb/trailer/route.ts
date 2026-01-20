import { NextResponse } from "next/server";

const defaultBaseURL = "https://api.themoviedb.org/3";

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");
    const type = searchParams.get("type");

    if (!id || (type !== "movie" && type !== "tv")) {
        return NextResponse.json({ trailerUrl: null, error: "Missing or invalid id/type." }, { status: 400 });
    }

    const apiKey = process.env.TMDB_API_KEY ?? process.env.NEXT_PUBLIC_TMDB_API_KEY;
    const baseURL = process.env.TMDB_BASE_URL ?? process.env.NEXT_PUBLIC_TMDB_BASE_URL ?? defaultBaseURL;

    if (!apiKey) {
        return NextResponse.json({ trailerUrl: null, error: "TMDB API key not configured." }, { status: 500 });
    }

    try {
        const res = await fetch(
            `${baseURL}/${type}/${id}/videos?api_key=${apiKey}&language=en-US`,
            { next: { revalidate: 300 } }
        );

        if (!res.ok) {
            return NextResponse.json({ trailerUrl: null, error: "Failed to fetch trailer." }, { status: 502 });
        }

        const data = await res.json();
        const videos = data.results || [];
        const trailer = videos.find(
            (video: { type?: string; site?: string }) => video.type === "Trailer" && video.site === "YouTube"
        );
        const youtubeVideo = trailer ?? videos.find((video: { site?: string }) => video.site === "YouTube");

        if (youtubeVideo?.key) {
            return NextResponse.json({ trailerUrl: `https://www.youtube.com/watch?v=${youtubeVideo.key}`, error: null });
        }

        return NextResponse.json({ trailerUrl: null, error: "No trailer found." });
    } catch (error) {
        return NextResponse.json({ trailerUrl: null, error: "Failed to fetch trailer." }, { status: 500 });
    }
}
