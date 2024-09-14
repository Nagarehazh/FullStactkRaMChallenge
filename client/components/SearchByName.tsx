"use client";

import {Combobox, Transition} from "@headlessui/react";
import {useState, Fragment} from "react";
import {SearchByNameProps} from "@/types";
import Image from "next/image";
import {rickyAndMortyNames} from "@/constants";

const SearchByName = ({characterName, setCharacterName}: SearchByNameProps) => {
    const [query, setQuery] = useState("");

    const filteredNames = query === ""
        ? rickyAndMortyNames
        : rickyAndMortyNames.filter((name) =>
            name.toLowerCase()
                .replace(/\s+/g, "")
                .includes(query.toLowerCase().replace(/\s+/g, ""))
        );

    return (
        <div className="searchbyname">
            <Combobox value={characterName} onChange={setCharacterName}>
                <div className="relative w-full">
                    <Combobox.Button className="absolute top-[14px]">
                        <Image
                            src="/morty.svg"
                            alt="user-logo"
                            width={20}
                            height={20}
                            className="ml-4"
                        />
                    </Combobox.Button>
                    <Combobox.Input
                        type="text"
                        placeholder="Search by name"
                        value={characterName}
                        onChange={(e) => setQuery(e.target.value)}
                        className="searchbyname__input"
                    />
                    <Transition
                        as={Fragment}
                        leave='transition ease-in duration-100'
                        leaveFrom='opacity-100'
                        leaveTo='opacity-0'
                        afterLeave={() => setQuery("")}
                    >
                        <Combobox.Options>
                            {filteredNames.length === 0 && query !== "" ? (
                                <Combobox.Option value={query} className="searchbyname__option">
                                    Create "{query}"
                                </Combobox.Option>
                            ) : (
                                filteredNames.map((name) => (
                                    <Combobox.Option
                                        key={name}
                                        value={name}
                                        className={({focus}) =>
                                            `relative search-manufacturer__option ${
                                                focus                                            }`
                                        }
                                    >
                                        {({selected, focus}) => (
                                            <>
                                                <span className={`block truncate ${selected ? "font-medium" : "font-normal"}`}>
                                                  {name}
                                                </span>
                                                {selected ? (
                                                    <span
                                                        className={`absolute inset-y-0 left-0 flex items-center pl-3 ${focus ? "text-white" : "text-pribg-primary-purple"}`}
                                                    ></span>
                                                ) : null}
                                            </>
                                        )}
                                    </Combobox.Option>
                                ))
                            )}
                        </Combobox.Options>
                    </Transition>
                </div>
            </Combobox>
        </div>
    )
}

export default SearchByName;