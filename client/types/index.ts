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