import React, { useEffect, useState } from "react";
import styled from "styled-components";

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

  const BoxWrap = styled.div`
    font-size: 30px;
    border: 5px solid;
    color: white;
    background-color: navy;
    padding: 10px;
    margin: 10px;
    
  `;


  return (
    <BoxWrap>
      {/*<div style={{paddingTop: '50px'}}>*/}
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
      {/* </div>  */}
    </BoxWrap>
  );
}

//let abilities = []
//for(let i=0; i < currentPokemon.abilities.length; i++){
//abilities.push(currentPokemon.abilities[i].ability.name)
//}
