import React from "react";
import styled from "styled-components";

const PokemonCard = ({ pokemon }) => {
  let { name, id } = pokemon;

  return (
    <Card>
      <strong>{name}</strong>
      <img
        src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`}
        alt={name}
      />
    </Card>
  );
};

const Card = styled.div`
  width: 20vw;
  font-size: 2vw;
  height: 30vh;
  background-color: navy;
  color: yellow;
  margin: 1vw;
  padding: 1vw;
  overflow: hidden;
  text-transform: capitalize;
  text-decoration: none;
  border: 2px solid;
`;

export default PokemonCard;
