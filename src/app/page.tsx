import MainPage from "./components/MainPage";
import HomeContent from "./components/HomeContent";
import {
  fetchPopularMovies,
  fetchPopularTVShows,
  fetchUpcomingMovies,
  fetchUpcomingTVShows,
} from "@/lib/tmdbServer";

export default async function Home() {
  const [
    popularMovies,
    upcomingMovies,
    popularTVShows,
    upcomingTVShows,
  ] = await Promise.all([
    fetchPopularMovies(),
    fetchUpcomingMovies(),
    fetchPopularTVShows(),
    fetchUpcomingTVShows(),
  ]);

  return (
    <MainPage>
      <HomeContent
        popularMovies={popularMovies}
        upcomingMovies={upcomingMovies}
        popularTVShows={popularTVShows}
        upcomingTVShows={upcomingTVShows}
      />
    </MainPage>
  );
}
