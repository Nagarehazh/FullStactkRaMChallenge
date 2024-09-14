import Image from "next/image";
import {CustomFilter, Hero, SearchBar} from "../components";
import {getCharacters} from "@/utils";
import {CharacterCard} from "@/components";
import {HomeProps} from "@/types";

export default async function Home({searchParams}: HomeProps) {
    const queryString: string = searchParams.search || "";
    const searchObject = {
        name: queryString,
    };
    const result = await getCharacters(searchObject || {});
    const isDataEmpty = !Array.isArray(result) || result.length === 0 || !result;

    return (
        <main className="overflow-hidden">
            <Hero/>
            <div className='mt-12 padding-x padding-y max-width mb-40' id='discover'>
                <div className='home__text-container'>
                    <h1 className='text-4xl font-extrabold'>Catálogo</h1>
                    <p>Explora los diferentes filtros</p>
                </div>

                <div className='home__filters'>
                    <SearchBar allCharactersData={result} />
                    <div className='home__filter-container'>
                        <CustomFilter title='Estado'/>
                        <CustomFilter title='Especie'/>
                        <CustomFilter title='Género'/>
                        <CustomFilter title='Nombre'/>
                        <CustomFilter title='Origen'/>
                    </div>
                </div>
                {!isDataEmpty ? (
                    <section>
                        <div className="home__rams-wrapper">
                            {result?.map((character) => (
                                <CharacterCard pj={character} key={character.id}/>
                            ))}
                        </div>
                    </section>
                ) : (
                    <div className="home__error-container">
                        <h2>Oops, no hay resultados</h2>
                    </div>
                )}
            </div>
        </main>
    );
}
