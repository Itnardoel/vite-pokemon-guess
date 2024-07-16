import {useRef, useState} from "react";

import {Count} from "./types";
import usePokemon from "./hooks/usePokemon";

function App() {
  const {pokemon, getRandomPokemon} = usePokemon();
  const [count, setCount] = useState<Count>(() => {
    const localData = localStorage.getItem("count");

    return localData !== null ? JSON.parse(localData) : {correct: 0, incorrect: 0};
  });
  const [submitted, setSubmitted] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const $image = document.querySelector("img");

    setSubmitted(true);
    const data = new FormData(event.currentTarget);
    const name = data
      .get("name")
      ?.toString()
      .toLocaleLowerCase()
      .replace(/[^A-z]/g, "");

    if (name === pokemon.name) {
      $image?.classList.add("show");
      inputRef.current?.classList.add("is-success");

      setCount((prevState) => {
        const newState = {
          ...prevState,
          correct: prevState.correct + 1,
        };

        localStorage.setItem("count", JSON.stringify(newState));

        return newState;
      });
    } else {
      inputRef.current?.classList.add("is-error");

      setCount((prevState) => {
        const newState = {
          ...prevState,
          incorrect: prevState.incorrect + 1,
        };

        localStorage.setItem("count", JSON.stringify(newState));

        return newState;
      });
    }
  }

  function onClick() {
    const $image = document.querySelector("img");

    inputRef.current?.classList.remove("is-success", "is-error");

    setSubmitted(false);

    if (inputRef.current !== null) {
      inputRef.current.value = "";
      inputRef.current.focus();
    }

    $image?.classList.remove("show");

    getRandomPokemon();
  }

  return (
    <main>
      {/* Let&apos;s get this party started */}
      <h1>¿Quién es este Pokemon?</h1>
      <img src={pokemon.image} />
      <form onSubmit={handleSubmit}>
        <input ref={inputRef} autoFocus className="nes-input" name="name" type="text" />
        <button
          className={`nes-btn ${submitted ? "is-disabled" : "is-primary"}`}
          disabled={submitted}
          type="submit"
        >
          Adivinar
        </button>
      </form>
      <section className="icon-list">
        {count.correct}
        <i className="nes-pokeball" />
        {count.incorrect}
        <i className="nes-icon close is-large" />
      </section>
      <button
        className={`nes-btn ${!submitted ? "is-disabled" : "is-primary"}`}
        disabled={!submitted}
        type="button"
        onClick={onClick}
      >
        Volver a jugar
      </button>
    </main>
  );
}

export default App;
