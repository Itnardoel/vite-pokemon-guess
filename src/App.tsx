import {useRef, useState} from "react";

import {type Count} from "./types";
import usePokemon from "./hooks/usePokemon";
import AnswerForm from "./components/answerForm";
import PointsCounter from "./components/pointsCounter";
import PlayAgainButton from "./components/playAgainButton";

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
