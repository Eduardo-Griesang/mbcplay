 'use client';

import { useEffect, useRef, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Search from "../../icons/Search.svg"
import Image from "next/image";

export default function SearchBar() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const [query, setQuery] = useState("");
    const lastSubmitted = useRef("");

    useEffect(() => {
        const currentQuery = searchParams.get("q") ?? "";
        lastSubmitted.current = currentQuery;
        setQuery(currentQuery);
    }, [searchParams]);

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const trimmed = query.trim();
        if (trimmed.length < 2) {
            return;
        }
        lastSubmitted.current = trimmed;
        router.push(`/search?q=${encodeURIComponent(trimmed)}`);
    };

    return (
        <form
            onSubmit={handleSubmit}
            className="my-10 flex items-center gap-3 bg-secondaryBackground w-2/3 px-4 py-3 rounded-4xl"
        >
            <Image src={Search} alt="Search Icon" width={25} height={25} />
            <input 
                type="text"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                className="bg-transparent outline-none w-full text-2xl font-semibold placeholder-fourthText text-white"
                placeholder="Pesquisar..."
                aria-label="Pesquisar filmes ou series"
            />
        </form>
    )
}
