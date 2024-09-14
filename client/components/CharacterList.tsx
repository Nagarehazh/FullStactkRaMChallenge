"use client";

import { useState, useEffect } from 'react';
import { CustomFilter, CharacterCard } from "@/components";
import { Character } from "@/types";
import { generateFilterOptions } from '@/utils';

type CharacterListProps = {
    initialCharacters: Character[];
};

type SortOrder = 'asc' | 'desc' | 'none';

export default function CharacterList({ initialCharacters }: CharacterListProps) {
    const [filters, setFilters] = useState({
        estado: '',
        especie: '',
        genero: '',
        origen: ''
    });
    const [characters, setCharacters] = useState(initialCharacters);
    const [sortOrder, setSortOrder] = useState<SortOrder>('none');
    const [filterOptions, setFilterOptions] = useState(() => generateFilterOptions(initialCharacters));
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);
        setCharacters(initialCharacters);
        setFilterOptions(generateFilterOptions(initialCharacters));
        setLoading(false);
    }, [initialCharacters]);

    const activeFilters = Object.entries(filters).filter(([_, value]) => value !== '');

    useEffect(() => {
        setLoading(true);
        const filteredCharacters = initialCharacters.filter(character =>
            (filters.estado === '' || character.status.toLowerCase() === filters.estado.toLowerCase()) &&
            (filters.especie === '' || character.species.toLowerCase() === filters.especie.toLowerCase()) &&
            (filters.genero === '' || character.gender.toLowerCase() === filters.genero.toLowerCase()) &&
            (filters.origen === '' || character.origin.toLowerCase() === filters.origen.toLowerCase())
        );

        let sortedCharacters = [...filteredCharacters];
        if (sortOrder !== 'none') {
            sortedCharacters.sort((a, b) => {
                if (sortOrder === 'asc') {
                    return a.name.localeCompare(b.name);
                } else {
                    return b.name.localeCompare(a.name);
                }
            });
        }

        setCharacters(sortedCharacters);
        setLoading(false);
    }, [filters, initialCharacters, sortOrder]);

    const handleFilterChange = (filterType: keyof typeof filters) => (value: string) => {
        setFilters(prev => ({ ...prev, [filterType]: value }));
    };

    const clearFilter = (filterType: keyof typeof filters) => {
        setFilters(prev => ({ ...prev, [filterType]: '' }));
    };

    const clearAllFilters = () => {
        setFilters({
            estado: '',
            especie: '',
            genero: '',
            origen: ''
        });
    };

    const handleSortChange = () => {
        setSortOrder(current => {
            if (current === 'none') return 'asc';
            if (current === 'asc') return 'desc';
            return 'none';
        });
    };

    return (
        <>
            <div className="flex flex-col items-center justify-center space-y-4 home__filters">
                <div className="flex flex-wrap justify-center items-center gap-4 mt-4 mb-4 home__filter-container">
                    <CustomFilter
                        title='Estado'
                        options={filterOptions.estado}
                        onChange={handleFilterChange('estado')}
                    />
                    <CustomFilter
                        title='Especie'
                        options={filterOptions.especie}
                        onChange={handleFilterChange('especie')}
                    />
                    <CustomFilter
                        title='Género'
                        options={filterOptions.genero}
                        onChange={handleFilterChange('genero')}
                    />
                    <CustomFilter
                        title='Origen'
                        options={filterOptions.origen}
                        onChange={handleFilterChange('origen')}
                    />
                    <button
                        onClick={handleSortChange}
                        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
                    >
                        Ordenar por nombre: {
                        sortOrder === 'none' ? 'Sin ordenar' :
                            sortOrder === 'asc' ? 'A-Z' : 'Z-A'
                    }
                    </button>
                </div>
            </div>

            {activeFilters.length > 0 && (
                <div className="mt-4 mb-4 text-center">
                    <h3 className="text-lg font-semibold mb-2">Filtros activos:</h3>
                    <div className="flex flex-wrap justify-center gap-2">
                        {activeFilters.map(([key, value]) => (
                            <span key={key} className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-sm flex items-center">
                                {key}: {value}
                                <button
                                    onClick={() => clearFilter(key as keyof typeof filters)}
                                    className="ml-2 text-blue-600 hover:text-blue-800"
                                >
                                    ×
                                </button>
                            </span>
                        ))}
                        <button
                            onClick={clearAllFilters}
                            className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
                        >
                            Limpiar todos los filtros
                        </button>
                    </div>
                </div>
            )}

            {loading ? (
                <div className="flex justify-center items-center h-64">
                    <p className="text-lg">Cargando...</p>
                </div>
            ) : characters.length > 0 ? (
                <section className="flex justify-center items-center">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 home__rams-wrapper">
                        {characters.map((character) => (
                            <CharacterCard pj={character} key={character.id}/>
                        ))}
                    </div>
                </section>
            ) : (
                <div className="flex justify-center items-center h-64">
                    <h2>Oops, no hay resultados</h2>
                </div>
            )}
        </>
    );
}
