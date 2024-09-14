"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { Hero, SearchBar, CharacterList } from "@/components";
import { getCharacters } from "@/utils";
import { Character } from "@/types";

export default function Home() {
    const searchParams = useSearchParams();
    const queryString = searchParams.get("search") || "";

    const [characters, setCharacters] = useState<Character[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const fetchCharacters = async () => {
            setLoading(true);
            try {
                const result = await getCharacters({ name: queryString });
                setCharacters(result);
            } catch (error) {
                console.error("Error fetching characters:", error);
                setCharacters([]);
            } finally {
                setLoading(false);
            }
        };

        fetchCharacters();
    }, [queryString]); // Este efecto se ejecutará cada vez que queryString cambie

    return (
        <main className="overflow-hidden">
            <Hero />
            <div className="mt-12 padding-x padding-y max-width mb-40" id="discover">
                <div className="home__text-container">
                    <h1 className="text-4xl font-extrabold">Catálogo</h1>
                    <p>Explora los diferentes filtros</p>
                </div>

                <SearchBar />
                {loading ? (
                    <p>Cargando personajes...</p>
                ) : (
                    <CharacterList initialCharacters={characters} />
                )}
            </div>
        </main>
    );
}