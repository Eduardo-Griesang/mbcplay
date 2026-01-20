import MainPage from "../components/MainPage";
import FilmsContent from "../components/FilmsContent";
import { fetchPopularMovies, fetchUpcomingMovies } from "@/lib/tmdbServer";

export default async function Films() {
    const [popularMovies, upcomingMovies] = await Promise.all([
        fetchPopularMovies(),
        fetchUpcomingMovies(),
    ]);

    return (
        <MainPage>
            <FilmsContent popularMovies={popularMovies} upcomingMovies={upcomingMovies} />
        </MainPage>
    );
}
