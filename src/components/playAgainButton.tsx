interface PlayAgainButtonProps {
  getRandomPokemon: () => Promise<void>;
  inputRef: React.RefObject<HTMLInputElement>;
  setSubmitted: React.Dispatch<React.SetStateAction<boolean>>;
  submitted: boolean;
}

export default function PlayAgainButton({
  getRandomPokemon,
  inputRef,
  setSubmitted,
  submitted,
}: PlayAgainButtonProps) {
  function handleClick() {
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
    <button
      className={`nes-btn ${!submitted ? "is-disabled" : "is-primary"}`}
      disabled={!submitted}
      type="button"
      onClick={handleClick}
    >
      Volver a jugar
    </button>
  );
}
