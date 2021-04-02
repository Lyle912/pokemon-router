import PokemonCard from "./PokemonCard";
import { Link } from "react-router-dom";

const PokemonList = ({ list }) => {
  return (
    <div className="pokemon-list">
      {list.map((pokemon) => (
        <div key={pokemon.id}>
          <Link to={`/pokemon/${pokemon.id}`}>
            <PokemonCard pokemon={pokemon} />
          </Link>
        </div>
      ))}
    </div>
  );
};

export default PokemonList;
