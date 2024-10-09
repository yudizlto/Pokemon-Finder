import { useState, Suspense } from "react";
import ErrorBoundary from "./components/ErrorBoundary/ErrorBoundary";
import PokemonCard from "./components/PokemonCard/PokemonCard";
import PokemonGrid from "./components/PokemonGrid/PokemonGrid";
import styles from "./App.module.css";

function App() {
  // State to keep track of the currently selected Pokemon
  const [selectedPokemon, setSelectedPokemon] = useState(null);
  // Base URL for the Pokemon API
  const url = "https://pokeapi.co/api/v2/pokemon/";

  // Function to handle the selection of a Pokemon
  function handleSelectPokemon(pokemon) {
    return () => {
      // Update the selectedPokemon state
      setSelectedPokemon(pokemon);
    };
  }

  return (
    /**
     * Wrap the application in an ErrorBoundary to catch errors
     * Use Suspense to display a loading state while waiting for components to load
     */

    <ErrorBoundary
      fallback={<h2 className={styles.errorFallback}>!! Error... !!</h2>}
    >
      <Suspense
        fallback={<h2 className={styles.loadingFallback}>🌀 Loading...</h2>}
      >
        <div className="App">
          {/**
           * Conditional rendering based on selectedPokemon state
           * If a Pokemon is selected, render the PokemonCard component
           * If no Pokemon is selected, render the PokemonGrid component
           */}

          {selectedPokemon ? (
            <PokemonCard
              parentUrl={url}
              selectedPokemon={selectedPokemon}
              clearHandler={() => setSelectedPokemon(null)}
            />
          ) : (
            <PokemonGrid url={url} handleSelectPokemon={handleSelectPokemon} />
          )}
        </div>
      </Suspense>
    </ErrorBoundary>
  );
}

export default App;
