import {useEffect, useRef, useState} from "react";

import {Pokemon} from "./types";
import {default as api} from "./api";

function App() {
  const [pokemon, setPokemon] = useState<Pokemon>({
    id: 0,
    name: "",
    image: "",
  });
  const [count, setCount] = useState({
    correct: 0,
    incorrect: 0,
  });
  const [submitted, setSubmitted] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const randomPokemon = async () => {
    const data = await api.random();

    setPokemon(data);
  };

  useEffect(() => {
    randomPokemon();
  }, []);

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
      setCount((prevState) => ({...prevState, correct: prevState.correct + 1}));
    } else {
      inputRef.current?.classList.add("is-error");

      setCount((prevState) => ({...prevState, incorrect: prevState.incorrect + 1}));
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

    randomPokemon();
  }

  return (
    <main>
      {/* Let&apos;s get this party started */}
      <h1>¿Quién es este Pokemon?</h1>
      {pokemon.image !== "" ? (
        <>
          <img alt="pokemon image" src={pokemon.image} />
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
            <i className="nes-pokeball is-large" />
            {count.incorrect}
            <i className="nes-icon close is-large" />
          </section>
          <button className="nes-btn" type="button" onClick={onClick}>
            Volver a jugar
          </button>
        </>
      ) : (
        <p className="">Loading...</p>
      )}
    </main>
  );
}

export default App;
