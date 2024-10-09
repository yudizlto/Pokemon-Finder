import React, { use } from "react";
import styles from "./PokemonCard.module.css";

// Async function to fetch data from the given URL
async function fetchData(url) {
  // Fetch data from the URL
  const response = await fetch(url);
  // Convert response to JSON format
  return response.json();
}

export default function PokemonCard(props) {
  // Destructure props to get the selectedPokemon, clearHandler, and parentUrl
  const { selectedPokemon, clearHandler, parentUrl } = props;
  // Construct the full URL for the selected Pokemon
  const pokemonUrl = parentUrl + selectedPokemon;
  // Fetch Pokemon data asynchronously using the 'use' hook
  const data = use(fetchData(pokemonUrl));

  return (
    <>
      <img
        className={styles.iconPokeball}
        src="./assets/pokeball.png"
        alt="Pokeball"
      />
      <div className={styles.cardContainer}>
        <div className={styles.cardHeader}>
          <h1 className={styles.pokemonName}>{selectedPokemon}</h1>
          <div className={styles.closeButtonContainer}>
            <button className={styles.closeButton} onClick={clearHandler}>
              X
            </button>
          </div>
        </div>
        <div className={styles.imageContainer}>
          <img
            className={styles.pokemonImage}
            src={data.sprites.front_default}
            alt={selectedPokemon}
          />
        </div>
        <div className={styles.movesContainer}>
          <img
            className={styles.iconPokestar}
            src="./assets/pokestar.png"
            alt="Pokestar"
          />
          <h2>Moves</h2>
        </div>

        {/**
         * Display the first two moves of the Pokemon
         * Return the move name in a list item
         */}

        <div className={styles.movesWrapper}>
          {data.moves.slice(0, 2).map((move, index) => {
            return <li key={index}>{move.move.name}</li>;
          })}
        </div>
        <div className={styles.movesContainer}>
          <img
            className={styles.iconPokestar}
            src="./assets/pokegold.png"
            alt="Pokegold"
          />
          <h2>Stats</h2>
        </div>
        <div className={styles.pokemonStats}>
          {/**
           * Display the first three stats of the Pokemon
           * Display stat name and base value
           */}
          <div className={styles.leftColumn}>
            {data.stats.slice(0, 3).map((stat, index) => (
              <div key={index}>
                <p>
                  {stat.stat.name} : {stat.base_stat}
                </p>
              </div>
            ))}
          </div>

          {/**
           * Display the next three stats of the Pokemon
           * Display stat name and base value
           */}
          <div className={styles.rightColumn}>
            {data.stats.slice(3, 6).map((stat, index) => (
              <div key={index}>
                <p>
                  {stat.stat.name} : {stat.base_stat}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
