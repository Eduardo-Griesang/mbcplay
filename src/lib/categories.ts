export type Category = {
    id: string;
    label: string;
    movieGenreId?: number;
    tvGenreId?: number;
};

export const categories: Category[] = [
    { id: "all", label: "Todas" },
    { id: "action", label: "Ação", movieGenreId: 28, tvGenreId: 10759 },
    { id: "horror", label: "Terror", movieGenreId: 27, tvGenreId: 9648 },
    { id: "adventure", label: "Aventura", movieGenreId: 12, tvGenreId: 10759 },
    { id: "animation", label: "Animacão", movieGenreId: 16, tvGenreId: 16 },
    { id: "drama", label: "Drama", movieGenreId: 18, tvGenreId: 18 },
    { id: "comedy", label: "Comédia", movieGenreId: 35, tvGenreId: 35 },
    { id: "sports", label: "Esportes", movieGenreId: 99, tvGenreId: 10764 },
    { id: "sci-fi", label: "Ficção Científica", movieGenreId: 878, tvGenreId: 10765 },
];

export function getGenreId(categoryId: string | null, mediaType: "movie" | "tv") {
    if (!categoryId || categoryId === "all") {
        return null;
    }
    const category = categories.find((item) => item.id === categoryId);
    return mediaType === "movie" ? category?.movieGenreId : category?.tvGenreId;
}

export function filterByCategory<T extends { genre_ids?: number[] }>(
    items: T[],
    mediaType: "movie" | "tv",
    categoryId: string | null
) {
    const genreId = getGenreId(categoryId, mediaType);
    if (!genreId) {
        return items;
    }
    return items.filter((item) => item.genre_ids?.includes(genreId));
}
