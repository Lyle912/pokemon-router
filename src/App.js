import "./App.css";
import React, { useEffect, useReducer } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import PokemonList from "./components/PokemonList";
import PokemonDetails from "./components/PokemonDetails";
import About from "./components/About";
import styled from "styled-components";

function App() {
  const [state, dispatch] = useReducer(reducer, {
    pokemonList: [],
    fetchedArray: [],
  });
  const { pokemonList } = state;

  function reducer(state, action) {
    const { payload } = action;
    switch (action.type) {
      case "establishInitialPokemon":
        return { ...state, pokemonList: payload.pokemonList };
      default:
        return state;
    }
  }
  useEffect(() => {
    for (let i = 1; i <= 50; i++) {
      fetch(`https://pokeapi.co/api/v2/pokemon/${i}`)
        .then((response) => response.json())
        .then((json) => state.fetchedArray.push(json))
        .then((foo) =>
          dispatch({
            type: "establishInitialPokemon",
            payload: { pokemonList: state.fetchedArray },
          })
        );
    }
  }, []);

  function handleChange(e) {
    var pokeType = e.target.value === "default" ? "" : e.target.value;
    state.pokemonList = state.fetchedArray;
    dispatch({
      type: "establishInitialPokemon",
      payload: {
        pokemonList: state.pokemonList.filter((pokemon) =>
          pokemon.types[0].type.name
            .toLowerCase()
            .includes(pokeType.toLowerCase())
        ),
      },
    });
  }

  const NavHeader = styled.div`
    grid-row-start: 1;
    grid-column-start: 1;
    position: fixed;
    background-color: yellow;
    width: 100%;
    height: 10%;
    font-size: 40px;
    color: white;
    display: flex;
    align-items: center;
    justify-content: center;
  `;

  const LinkStyle = {
    flex: 1,
    textDecoration: "underline",
    color: "navy",
    fontWeight: "bold",
  };

  return (
    <Router>
      <select id="type" onChange={handleChange}>
        <option value="default">Select Type</option>
        <option value="Fire">Fire</option>
        <option value="Water">Water</option>
        <option value="Grass">Grass</option>
        <option value="Electric">Electric</option>
      </select>
      <div className="App container">
        <NavHeader>
          <Link to={"/"} style={LinkStyle}>
            Home
          </Link>
          <Link to={`/about`} style={LinkStyle}>
            About
          </Link>
        </NavHeader>
        <div className="main-area">
          <Switch>
            <Route
              path="/"
              exact
              render={() => <PokemonList list={pokemonList} />}
            />
            <Route path="/pokemon/:id" component={PokemonDetails} />
            <Route path="/about" component={About} />
          </Switch>
        </div>
      </div>
      <div className="pokeDetails"></div>
    </Router>
  );
}

export default App;
