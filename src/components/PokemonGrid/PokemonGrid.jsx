import React, { use, useState } from "react";
import styles from "./PokemonGrid.module.css";

export default function PokemonGrid(props) {
  // Destructure props to get handleSelectPokemon and url
  const { handleSelectPokemon, url } = props;
  // State to keep track of the search input
  const [search, setSearch] = useState("");
  // Variable to hold the Pokemon data
  let data;

  /**
   * Check if Pokemon data is already cached in local storage.
   * If cached data exists, parse it and assign to data.
   * If no cached data, fetch from the API and cache the data.
   */
  if (localStorage.getItem("pokemon-cards")) {
    data = JSON.parse(localStorage.getItem("pokemon-cards"));
    console.log("FETCHED FROM CACHED", data);
  } else {
    console.log("FETCHED FROM API");
    data = use(fetchData(url));
    localStorage.setItem("pokemon-cards", JSON.stringify(data));
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>My Pokemon</h1>
      <div>
        <input
          className={styles.searchInput}
          placeholder="Search Pokemon's Name"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <div className={styles.pokemonList}>
          {/* Filter the Pokemon data based on the search input */}
          {data.results
            .filter((value) => value.name.includes(search))
            .map((pokemon, index) => {
              return (
                <div
                  key={index}
                  className={styles.pokemonItem}
                  onClick={handleSelectPokemon(pokemon.name)}
                >
                  {pokemon.name}
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
}
