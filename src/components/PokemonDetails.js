import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function PokemonDetails({ match }) {
  const [currentPokemon, setPokemon] = useState({});
  const [currentAbility, setAbility] = useState("");

  useEffect(() => {
    let abilities = [];
    fetch(`https://pokeapi.co/api/v2/pokemon/${match.params.id}`)
      .then((response) => response.json())
      .then((json) => {
        for (let i = 0; i < json.abilities.length; i++) {
          abilities.push(json.abilities[i].ability.name);
          console.log(abilities);
        }
        setAbility(abilities.join(", "));
        setPokemon(json);
      });
  }, [match.params.id]);

  return (
    <div style={{paddingTop: '50px'}}>
      Name: {currentPokemon.name},
      <br />
      Weight: {currentPokemon.weight}
      <br />
      Abilities: {currentAbility}
      <br />
      <img
        style={{ display: "inline-block" }}
        src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${currentPokemon.id}.png`}
        alt={currentPokemon.name}
      />
    </div>
  );
}

//let abilities = []
//for(let i=0; i < currentPokemon.abilities.length; i++){
//abilities.push(currentPokemon.abilities[i].ability.name)
//}
