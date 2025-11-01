import React, { useState } from "react";
import styles from "./Search.module.css";
import { ReactComponent as SearchIcon } from "../../assets/search-icon.svg";
// import { truncate } from "../../helpers/helpers";
import { useNavigate } from "react-router-dom";

function Search({ searchData = [], placeholder }) {
  const [query, setQuery] = useState("");
  const [filteredOptions, setFilteredOptions] = useState([]);
  const [showList, setShowList] = useState(false);

  const navigate = useNavigate();

  const handleChange = (e) => {
    const value = e.target.value;
    setQuery(value);

    if (value.trim() === "") {
      setFilteredOptions([]);
      setShowList(false);
      return;
    }

    const filtered = searchData.filter((item) =>
      item.title.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredOptions(filtered);
    setShowList(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const match = searchData.find(
      (item) => item.title.toLowerCase() === query.toLowerCase()
    );
    if (match) navigate(`/album/${match.slug}`);
  };

  const handleSelect = (option) => {
    setQuery(option.title);
    setShowList(false);
    navigate(`/album/${option.slug}`);
  };

  return (
    <div style={{ position: "relative" }}>
      <form className={styles.wrapper} onSubmit={handleSubmit}>
        <input
          name="album"
          value={query}
          onChange={handleChange}
          onFocus={() => query && setShowList(true)}
          placeholder={placeholder}
          className={styles.search}
          required
        />
        <button className={styles.searchButton} type="submit">
          <SearchIcon />
        </button>
      </form>

      {showList && filteredOptions.length > 0 && (
        <ul className={styles.listBox}>
          {filteredOptions.map((option, index) => {
            const artists = option.songs.reduce((acc, song) => {
              acc.push(...song.artists);
              return acc;
            }, []);

            return (
              <li
                key={index}
                className={styles.listElement}
                onClick={() => handleSelect(option)}
              >
                <div>
                  <p className={styles.albumTitle}>{option.title}</p>
                  <p className={styles.albumArtists}>
                    {(artists.join(", "), 40)}
                  </p>
                </div>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}

export default Search;
