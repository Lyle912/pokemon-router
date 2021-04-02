import PokemonCard from "./PokemonCard";
import { Link } from "react-router-dom";
import styled from "styled-components";

const PokemonList = ({ list }) => {
  const List = styled.div`
    grid-row-start: 2;
    grid-column-start: 1;
    display: flex;
    flex-flow: row wrap;
    justify-content: center;
    align-items: center;
  `;

  const LinkStyle = {
    flex: 1,
    textDecoration: "none",
    color: "yellow",
    fontWeight: "bold",
  };

  return (
    <List>
      {list.map((pokemon) => (
        <div key={pokemon.id}>
          <Link to={`/pokemon/${pokemon.id}` } style={LinkStyle}>
            <PokemonCard pokemon={pokemon} />
          </Link>
        </div>
      ))}
    </List>
  );
};

export default PokemonList;
