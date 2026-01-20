import MainPage from "../components/MainPage";
import MediaCard from "../components/MediaCard";
import { searchMulti } from "@/lib/tmdbServer";

type SearchPageProps = {
    searchParams?: { q?: string };
};

export default async function SearchPage({ searchParams }: SearchPageProps) {
    const query = (searchParams?.q ?? "").trim();
    const shouldSearch = query.length >= 2;
    const results = shouldSearch ? await searchMulti(query) : [];

    return (
        <MainPage>
            <section className="pb-12">
                <div className="mb-6">
                    <h1 className="text-mainText text-3xl font-semibold">Resultados da busca</h1>
                    <p className="text-thirdText mt-2">
                        {query.length > 0 ? `Resultados para "${query}"` : "Digite algo para iniciar a busca"}
                    </p>
                </div>

                {shouldSearch && results.length === 0 && (
                    <p className="text-thirdText">Nenhum resultado encontrado.</p>
                )}

                {results.length > 0 && (
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
