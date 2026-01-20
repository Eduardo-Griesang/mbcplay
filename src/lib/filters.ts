export type ActiveFilters = {
    mood: string;
    year: string;
    language: string;
    ageRating: string;
};

type MediaWithFilters = {
    release_date?: string;
    first_air_date?: string;
    genre_ids?: number[];
    original_language?: string;
    adult?: boolean;
};

const moodGenreMap: Record<
    string,
    { movie: number[]; tv: number[] }
> = {
    chill: {
        movie: [35, 10749],
        tv: [35, 10749],
    },
    dark: {
        movie: [27, 53, 80],
        tv: [9648, 80],
    },
    epic: {
        movie: [12, 28, 14],
        tv: [10759, 10765],
    },
    fun: {
        movie: [35, 16, 10751],
        tv: [35, 16],
    },
};

function getYear(item: MediaWithFilters) {
    const dateString = item.release_date ?? item.first_air_date;
    if (!dateString) {
        return null;
    }
    const year = new Date(dateString).getFullYear();
    return Number.isNaN(year) ? null : year;
}

function matchesMood(item: MediaWithFilters, mediaType: "movie" | "tv", mood: string) {
    if (!mood || mood === "all") {
        return true;
    }
    const moodGenres = moodGenreMap[mood]?.[mediaType];
    if (!moodGenres?.length) {
        return true;
    }
    return item.genre_ids?.some((id) => moodGenres.includes(id)) ?? false;
}

function matchesYear(item: MediaWithFilters, year: string) {
    if (!year || year === "all") {
        return true;
    }
    const itemYear = getYear(item);
    return itemYear === Number(year);
}

function matchesLanguage(item: MediaWithFilters, language: string) {
    if (!language || language === "all") {
        return true;
    }
    return item.original_language === language;
}

function matchesAgeRating(item: MediaWithFilters, rating: string) {
    if (!rating || rating === "all") {
        return true;
    }
    if (rating === "adult") {
        return item.adult === true;
    }
    if (rating === "general") {
        return item.adult !== true;
    }
    return true;
}

export function filterByFilters<T extends MediaWithFilters>(
    items: T[],
    mediaType: "movie" | "tv",
    filters: ActiveFilters
) {
    return items.filter((item) => {
        if (!matchesMood(item, mediaType, filters.mood)) {
            return false;
        }
        if (!matchesYear(item, filters.year)) {
            return false;
        }
        if (!matchesLanguage(item, filters.language)) {
            return false;
        }
        if (!matchesAgeRating(item, filters.ageRating)) {
            return false;
        }
        return true;
    });
}
