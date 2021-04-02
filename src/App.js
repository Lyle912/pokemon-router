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
    var fetchedArray = [];
    for (let i = 1; i <= 150; i++) {
      fetch(`https://pokeapi.co/api/v2/pokemon/${i}`)
        .then((response) => response.json())
        .then((json) => fetchedArray.push(json))
        .then((foo) =>
          dispatch({
            type: "establishInitialPokemon",
            payload: { pokemonList: fetchedArray },
          })
        );
    }
  }, []);

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
