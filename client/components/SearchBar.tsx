"use client";

import { SearchByQuery } from "@/components";
import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Image from "next/image";
import { cleanString } from "@/utils";

const SearchButton = ({ otherClasses }: { otherClasses: string }) => (
    <button type="submit" className={`-ml-3 z-10 ${otherClasses}`}>
        <Image
            src={"/magnifying-glass.svg"}
            alt={"magnifying glass"}
            width={40}
            height={40}
            className="object-contain"
        />
    </button>
);

const SearchBar = () => {
    const router = useRouter();
    const searchParams = useSearchParams();
    const initialQuery = searchParams.get("search") || "";
    const [searchQuery, setSearchQuery] = useState(initialQuery);

    useEffect(() => {
        setSearchQuery(initialQuery);
    }, [initialQuery]);

    const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        updateSearchParams(searchQuery.trim());
    };

    const updateSearchParams = (searchQuery: string) => {
        const searchParam = new URLSearchParams(window.location.search);

        if (searchQuery) {
            searchParam.set("search", cleanString(searchQuery));
        } else {
            searchParam.delete("search");
        }

        const newPathName = `${window.location.pathname}?${searchParam.toString()}`;

        if (newPathName !== window.location.href) {
            router.push(newPathName, { scroll: false });
        }
    };

    return (
        <form className="searchbar" onSubmit={handleSearch}>
            <div className="searchbar__item">
                <SearchByQuery
                    searchQuery={searchQuery}
                    setSearchQuery={setSearchQuery}
                />
                <SearchButton otherClasses="sm:hidden" />
            </div>
            <SearchButton otherClasses="max-sm:hidden" />
        </form>
    );
};

export default SearchBar;