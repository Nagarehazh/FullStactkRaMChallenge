import {Hero, SearchBar} from "@/components";
import {getCharacters} from "@/utils";
import {HomeProps} from "@/types";
import {CharacterList} from '@/components';

export default async function Home({searchParams}: HomeProps) {
    const queryString: string = searchParams.search || "";
    const searchObject = {
        name: queryString,
    };
    const result = await getCharacters(searchObject || {});

    return (
        <main className="overflow-hidden">
            <Hero/>
            <div className='mt-12 padding-x padding-y max-width mb-40' id='discover'>
                <div className='home__text-container'>
                    <h1 className='text-4xl font-extrabold'>Catálogo</h1>
                    <p>Explora los diferentes filtros</p>
                </div>

                <SearchBar/>
                <CharacterList initialCharacters={result}/>
            </div>
        </main>
    );
}