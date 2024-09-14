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