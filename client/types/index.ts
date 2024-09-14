import {MouseEventHandler} from "react";

export interface CustomButtonProps {
    isDisabled?: boolean;
    btnType?: "button" | "submit";
    containerStyles?: string;
    textStyles?: string;
    title: string;
    rightIcon?: string;
    handleClick?: MouseEventHandler<HTMLButtonElement>;
}

export interface SearchByNameProps {
    searchQuery: string;
    setSearchQuery: (name: string) => void;
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

export interface SearchBarProps {
    allCharactersData: Character[];
}

interface FilterProps {
    search?: string;
}

export interface HomeProps {
    searchParams: FilterProps
}