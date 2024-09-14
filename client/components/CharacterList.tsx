'use client';

import { useState, useEffect } from 'react';
import { CustomFilter, CharacterCard } from "@/components";
import { Character } from "@/types";
import { generateFilterOptions, filterCharacters } from '@/utils';

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
    const [filteredCharacters, setFilteredCharacters] = useState(initialCharacters);
    const [sortOrder, setSortOrder] = useState<SortOrder>('none');

    const filterOptions = generateFilterOptions(initialCharacters);

    useEffect(() => {
        let newFilteredCharacters = filterCharacters(initialCharacters, filters);

        // Aplicar ordenamiento
        if (sortOrder !== 'none') {
            newFilteredCharacters = [...newFilteredCharacters].sort((a, b) => {
                if (sortOrder === 'asc') {
                    return a.name.localeCompare(b.name);
                } else {
                    return b.name.localeCompare(a.name);
                }
            });
        }

        setFilteredCharacters(newFilteredCharacters);
    }, [filters, initialCharacters, sortOrder]);

    const handleFilterChange = (filterType: keyof typeof filters) => (value: string) => {
        setFilters(prev => ({ ...prev, [filterType]: value }));
    };

    const clearFilter = (filterType: keyof typeof filters) => {
        setFilters(prev => ({ ...prev, [filterType]: '' }));
    };

    const activeFilters = Object.entries(filters).filter(([_, value]) => value !== '');

    const handleSortChange = () => {
        setSortOrder(current => {
            if (current === 'none') return 'asc';
            if (current === 'asc') return 'desc';
            return 'none';
        });
    };

    return (
        <>
            <div className='home__filters'>
                <div className='home__filter-container'>
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
                <div className="mt-4 mb-4">
                    <h3 className="text-lg font-semibold mb-2">Filtros activos:</h3>
                    <div className="flex flex-wrap gap-2">
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
                    </div>
                </div>
            )}

            {filteredCharacters.length > 0 ? (
                <section>
                    <div className="home__rams-wrapper">
                        {filteredCharacters.map((character) => (
                            <CharacterCard pj={character} key={character.id}/>
                        ))}
                    </div>
                </section>
            ) : (
                <div className="home__error-container">
                    <h2>Oops, no hay resultados</h2>
                </div>
            )}
        </>
    );
}