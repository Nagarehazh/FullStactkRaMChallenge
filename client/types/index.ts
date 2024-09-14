import {MouseEventHandler} from "react";

export interface CustomButtonProps {
    title: string;
    containerStyles?: string;
    handleClick: MouseEventHandler<HTMLButtonElement>;
}

export interface SearchByNameProps {
    characterName: string;
    setCharacterName: (name: string) => void;
}

export interface Character {
    id: string;
    name: string;
    status: string;
    species: string;
    gender: string;
    origin: string;
    image: string;
}

export interface CharacterCardProps {
    pj: Character;
}