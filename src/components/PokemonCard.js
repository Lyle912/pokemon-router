import React from "react";

const PokemonCard = ({ pokemon }) => {
  let { name, id } = pokemon;

  return (
    <div className="pokemon-card">
      <strong>{name}</strong>
      <img
        src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`}
        alt={name}
      />
    </div>
  );
};

export default PokemonCard;
