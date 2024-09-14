"use client";

import {Combobox} from "@headlessui/react";
import {useState} from "react";
import {SearchByNameProps} from "@/types";
import Image from "next/image";

const SearchByQuery = ({searchQuery, setSearchQuery}: SearchByNameProps) => {
    const [query, setQuery] = useState("");

    return (
        <div className="searchbyname">
            <Combobox value={searchQuery || ""} onChange={(value) => {
                setSearchQuery(value ?? "");
                setQuery(value ?? "");
            }}>

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
                        value={query}
                        onChange={(e) => {
                            const inputValue = e.target.value;
                            setQuery(inputValue);
                            setSearchQuery(inputValue);
                        }}
                        className="searchbyname__input"
                    />
                </div>
            </Combobox>
        </div>
    )
}

export default SearchByQuery;