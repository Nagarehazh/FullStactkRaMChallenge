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
    favorites: { id: string }[];
}

export interface CharacterCardProps {
    pj: Character;
}

interface FilterProps {
    search?: string;
}

export interface HomeProps {
    searchParams: FilterProps
}

export interface OptionProps {
    title: string;
    value: string;
}

export interface CustomFilterProps {
    title: string;
    options: OptionProps[];
    onChange: (value: string) => void;
}