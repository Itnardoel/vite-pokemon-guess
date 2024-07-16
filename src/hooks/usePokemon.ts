import {useCallback, useEffect, useState} from "react";

import {default as api} from "../api";
import {Pokemon} from "../types";

export default function usePokemon() {
  const [pokemon, setPokemon] = useState<Pokemon>({
    id: 0,
    name: "",
    image: "https://upload.wikimedia.org/wikipedia/commons/3/3d/Fully_transparent_placeholder.svg",
  });

  const randomPokemon = useCallback(async () => {
    const data = await api.random();

    setPokemon(data);
  }, []);

  useEffect(() => {
    randomPokemon();
  }, [randomPokemon]);

  return {pokemon, getRandomPokemon: randomPokemon};
}
