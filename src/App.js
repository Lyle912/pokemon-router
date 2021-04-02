import "./App.css";
import React, { useEffect, useReducer } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import PokemonList from "./components/PokemonList";
import PokemonDetails from "./components/PokemonDetails";
import About from "./components/About";

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
    for (let i = 1; i <= 50; i++) {
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

  return (
    <Router>
      <div className="App container">
        <h1 className="nav-header">
          <Link to={"/"} style={{flex:1}}>Home</Link>
          <span> </span>
          <Link to={`/about`} style={{flex:1}}>About </Link>
        </h1>
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
