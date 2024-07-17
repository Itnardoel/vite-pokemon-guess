import {useRef, useState} from "react";

import {type Count} from "./types";
import usePokemon from "./hooks/usePokemon";
import AnswerForm from "./components/answerForm";
import PointsCounter from "./components/pointsCounter";
import PlayAgainButton from "./components/playAgainButton";
import {capitalizeFirstLetter} from "./utils/formatting";

function App() {
  const {pokemon, getRandomPokemon} = usePokemon();
  const [count, setCount] = useState<Count>(() => {
    const localData = localStorage.getItem("count");

    return localData !== null ? JSON.parse(localData) : {correct: 0, incorrect: 0};
  });
  const [submitted, setSubmitted] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <main>
      <h1>¿Quién es este Pokemon?</h1>
      {submitted ? (
        <h2
          className={`nes-text ${
            inputRef.current?.classList.contains("is-success") ? "is-success" : "is-error"
          }`}
        >
          {capitalizeFirstLetter(pokemon.name)}
        </h2>
      ) : (
        <h2>&nbsp;</h2>
      )}
      <img src={pokemon.image} />
      <AnswerForm
        inputRef={inputRef}
        pokemon={pokemon}
        setCount={setCount}
        setSubmitted={setSubmitted}
        submitted={submitted}
      />
      <PointsCounter count={count} />
      <PlayAgainButton
        getRandomPokemon={getRandomPokemon}
        inputRef={inputRef}
        setSubmitted={setSubmitted}
        submitted={submitted}
      />
    </main>
  );
}

export default App;
