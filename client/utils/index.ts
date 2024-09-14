import { GraphQLClient } from 'graphql-request';
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

    const variables = { count };

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
        return response.getCharacters;
    } catch (error) {
        console.error('Error fetching characters:', error);
        throw new Error('Error al obtener personajes');
    }
};

export const cleanString = (str: string): string => {
    return str.toLowerCase()
            .replace(/\s+/g, "")
}