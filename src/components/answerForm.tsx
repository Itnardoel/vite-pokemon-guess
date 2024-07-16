import {type Pokemon, type Count} from "../types";

interface AnswerFormProps {
  pokemon: Pokemon;
  setCount: React.Dispatch<React.SetStateAction<Count>>;
  inputRef: React.RefObject<HTMLInputElement>;
  setSubmitted: React.Dispatch<React.SetStateAction<boolean>>;
  submitted: boolean;
}

function AnswerForm({inputRef, pokemon, setCount, setSubmitted, submitted}: AnswerFormProps) {
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

  return (
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
  );
}

export default AnswerForm;
