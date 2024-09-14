"use client";

import { useState } from "react";
import Image from "next/image";
import { CharacterCardProps } from "@/types";
import CharacterDetail from "@/components/CharacterDetail";

const CharacterCard = ({ pj }: CharacterCardProps) => {
    const [isFavorite, setIsFavorite] = useState(false);
    const [isOpen, setIsOpen] = useState(false);

    const toggleFavorite = (e: React.MouseEvent) => {
        e.stopPropagation();
        setIsFavorite(!isFavorite);
    };

    const openModal = () => {
        setIsOpen(true);
    };

    return (
        <>
            <div className="ram-ramd group relative cursor-pointer" onClick={openModal}>
                <div
                    className="absolute top-2 right-2 cursor-pointer pr-2"
                    onClick={toggleFavorite}
                >
                    <Image
                        src={isFavorite ? "/heart-filled.svg" : "/heart-outline.svg"}
                        alt="favorite"
                        width={24}
                        height={24}
                    />
                </div>

                <div className="ram-ramd__content">
                    <h2 className="ram-ramd__content-title">{pj.name}</h2>
                </div>

                <div className="relative w-full h-40 my-3 object-contain">
                    <Image
                        src={pj.image}
                        alt={pj.name}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        className="rounded-lg"
                    />
                </div>

                <div className="relative flex w-full mt-2">
                    <div className="flex w-full justify-between text-grey flex-wrap gap-1">
                        <div className="ram-ramd__icon">
                            <Image
                                src={pj.status.toLowerCase() === "alive" ? "/alive.png" : "/dead.png"}
                                alt={"morty"}
                                width={20}
                                height={20}
                            />
                            <p className="ram-ramd__icon-text">{pj.status}</p>
                        </div>
                        <div className="ram-ramd__icon">
                            <Image src="/specie.svg" alt={"morty"} width={20} height={20} />
                            <p className="ram-ramd__icon-text">{pj.species}</p>
                        </div>
                        <div className="ram-ramd__icon">
                            <Image
                                src={pj.gender.toLowerCase() === "male" ? "/male.svg" : "/female.svg"}
                                alt={"morty"}
                                width={20}
                                height={20}
                            />
                            <p className="ram-ramd__icon-text">{pj.gender}</p>
                        </div>
                        <div className="ram-ramd__icon">
                            <Image src="/origin.svg" alt={"morty"} width={20} height={20} />
                            <p className="ram-ramd__icon-text">{pj.origin}</p>
                        </div>
                    </div>
                </div>
            </div>

            {isOpen && <CharacterDetail isOpen={isOpen} closeModal={() => setIsOpen(false)} ram={pj} />}
        </>
    );
};

export default CharacterCard;