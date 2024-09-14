import {GraphQLClient} from 'graphql-request';
import {Character} from "@/types";

const endpoint = 'http://localhost:4040/graphql';

const graphQLClient = new GraphQLClient(endpoint);

export const importCharacters = async (count: number): Promise<Character[]> => {
    const mutation = `
        mutation ImportCharacters($count: Int!) {
            importCharacters(count: $count) {
                id
                name
                status
                species
                gender
                origin
            }
        }
    `;

    const variables = {count};

    try {
        const response = await graphQLClient.request<{ importCharacters: Character[] }>(mutation, variables);
        return response.importCharacters;
    } catch (error) {
        console.error('Error importing characters:', error);
        throw new Error('Error al importar personajes');
    }
};

export const getCharacters = async (filters: {
    status?: string;
    species?: string;
    gender?: string;
    name?: string;
    origin?: string;
}): Promise<Character[]> => {
    const query = `
        query GetCharacters($status: String, $species: String, $gender: String, $name: String, $origin: String) {
            getCharacters(status: $status, species: $species, gender: $gender, name: $name, origin: $origin) {
                id
                name
                status
                species
                gender
                origin
                image
                comments {
                    id
                    content
                }
                favorites {
                    id
                }
            }
        }
    `;

    const variables = {
        status: filters.status || '',
        species: filters.species || '',
        gender: filters.gender || '',
        name: filters.name || '',
        origin: filters.origin || '',
    };

    try {
        const response = await graphQLClient.request<{ getCharacters: Character[] }>(query, variables);
        return response.getCharacters.map(character => ({
            ...character,
            favorites: character.favorites || []
        }));
    } catch (error) {
        console.error('Error fetching characters:', error);
        throw new Error('Error al obtener personajes');
    }
};

interface ToggleFavoriteResponse {
    success: boolean;
    message: string;
    favorite?: {
        id: string;
        characterId: string;
    };
}

export const toggleFavorite = async (characterId: string): Promise<ToggleFavoriteResponse> => {
    const mutation = `
        mutation ToggleFavorite($characterId: String!) {
            toggleFavorite(characterId: $characterId) {
                success
                message
                favorite {
                    id
                    characterId
                }
            }
        }
    `;

    const variables = {characterId};

    try {
        const response = await graphQLClient.request<{ toggleFavorite: ToggleFavoriteResponse }>(mutation, variables);
        return response.toggleFavorite;
    } catch (error) {
        console.error('Error toggling favorite:', error);
        throw new Error('Error al marcar/desmarcar favorito');
    }
};

export const cleanString = (str: string): string => {
    return str.toLowerCase()
        .replace(/\s+/g, "")
}

type FilterOption = { title: string; value: string };
type FilterOptions = {
    estado: FilterOption[];
    especie: FilterOption[];
    genero: FilterOption[];
    origen: FilterOption[];
};

export const generateFilterOptions = (characters: Character[]): FilterOptions => {
    const createFilterOptions = (filterType: 'estado' | 'especie' | 'genero' | 'origen') => {
        const uniqueValues = Array.from(new Set(characters.map(char => {
            switch (filterType) {
                case 'estado':
                    return char.status;
                case 'especie':
                    return char.species;
                case 'genero':
                    return char.gender;
                case 'origen':
                    return char.origin;
                default:
                    return '';
            }
        })));

        return [
            {title: filterType.charAt(0).toUpperCase() + filterType.slice(1), value: ""},
            ...uniqueValues.map(value => ({title: value, value}))
        ];
    };

    return {
        estado: createFilterOptions('estado'),
        especie: createFilterOptions('especie'),
        genero: createFilterOptions('genero'),
        origen: createFilterOptions('origen')
    };
};

interface AddCommentResponse {
    success: boolean;
    message?: string;
    comment?: {
        id: string;
        content: string;
    };
}

export const addComment = async (characterId: string, content: string): Promise<AddCommentResponse> => {
    const mutation = `
        mutation AddComment($characterId: String!, $content: String!) {
            addComment(characterId: $characterId, content: $content) {
                success
                message
                comment {
                    id
                    content
                }
            }
        }
    `;

    const variables = { characterId, content };

    try {
        const response = await graphQLClient.request<{ addComment: AddCommentResponse }>(mutation, variables);
        return response.addComment;
    } catch (error) {
        console.error('Error adding comment:', error);
        throw new Error('Error al agregar comentario');
    }
};