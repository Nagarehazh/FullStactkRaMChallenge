"use client";

import {SearchByName} from "@/components";
import {useState} from "react";

const SearchBar = () => {
    const [characterName, setCharacterName] = useState("");

    const handleSearch = () => {}

    return (
        <form className="searchbar" onSubmit={handleSearch}>
            <div className="searchbar__item">
              <SearchByName
                characterName={characterName}
                setCharacterName={setCharacterName}
              />
            </div>
        </form>
    )
}

export default SearchBar;