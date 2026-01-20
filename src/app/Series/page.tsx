import MainPage from "../components/MainPage";
import SeriesContent from "../components/SeriesContent";
import { fetchPopularTVShows, fetchUpcomingTVShows } from "@/lib/tmdbServer";

export default async function Series() {
    const [popularTVShows, upcomingTVShows] = await Promise.all([
        fetchPopularTVShows(),
        fetchUpcomingTVShows(),
    ]);

    return (
        <MainPage>
            <SeriesContent
                popularTVShows={popularTVShows}
                upcomingTVShows={upcomingTVShows}
            />
        </MainPage>
    );
}
