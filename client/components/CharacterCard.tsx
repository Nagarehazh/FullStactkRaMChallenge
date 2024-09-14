"use client";

import {useState} from "react";
import Image from "next/image";
import {CharacterCardProps} from "@/types";

const CharacterCard = ({pj}: CharacterCardProps) => {
    console.log(pj.image);
    return (
        <div className='ram-ramd group'>
            <div className='ram-ramd__content'>
                <h2 className="ram-ramd__content-title">
                    {pj.name}
                </h2>
            </div>
            <div className='relative w-full h-40 my-3 object-contain'>
                <Image
                    src={pj.image}
                    alt={pj.name}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="rounded-lg"
                />
            </div>

            <div className='relative flex w-full mt-2'>
                <div className='flex w-full justify-between text-grey flex-wrap gap-1'>
                    <div className='ram-ramd__icon'>
                        <Image src={pj.status.toLowerCase() === "alive" ? "/alive.png" : "/dead.png"} alt={"morty"} width={20} height={20}/>
                        <p className="ram-ramd__icon-text">{pj.status}</p>
                    </div>
                    <div className='ram-ramd__icon'>
                        <Image src="/specie.svg" alt={"morty"} width={20} height={20}/>
                        <p className="ram-ramd__icon-text">{pj.species}</p>
                    </div>
                    <div className='ram-ramd__icon'>
                        <Image src={pj.gender.toLowerCase() === "male" ? "/male.svg" : "/female.svg"} alt={"morty"} width={20} height={20}/>
                        <p className="ram-ramd__icon-text">{pj.gender}</p>
                    </div>
                    <div className='ram-ramd__icon'>
                        <Image src="/origin.svg" alt={"morty"} width={20} height={20}/>
                        <p className="ram-ramd__icon-text">{pj.origin}</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CharacterCard;