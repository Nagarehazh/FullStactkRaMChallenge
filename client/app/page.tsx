import Image from "next/image";
import {CustomFilter, Hero, SearchBar} from "../components";

export default function Home() {
    return (
        <main className="overflow-hidden">
            <Hero/>
            <div className='mt-12 padding-x padding-y max-width' id='discover'>
                <div className='home__text-container'>
                    <h1 className='text-4xl font-extrabold'>Catálogo</h1>
                    <p>Explora los diferentes filtros</p>
                </div>

                <div className='home__filters'>
                    <SearchBar/>
                    <div className='home__filter-container'>
                        <CustomFilter title='Estado'/>
                        <CustomFilter title='Especie'/>
                        <CustomFilter title='Género'/>
                        <CustomFilter title='Nombre'/>
                        <CustomFilter title='Origen'/>
                    </div>
                </div>

            </div>
        </main>
    );
}
