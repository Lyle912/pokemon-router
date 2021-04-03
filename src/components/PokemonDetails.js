import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

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
    text-transform: capitalize;
  `;

  const NavHeader = styled.div`
    background-color: navy;
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
    color: "yellow",
    fontWeight: "bold",
  };

  return (
    <BoxWrap>
      <Router>
        <NavHeader>
          <Link to={`/pokemon/${currentPokemon.id}`} style={LinkStyle}>
            Ability
          </Link>
          <Link
            to={`/pokemon/${currentPokemon.id}/environment`}
            style={LinkStyle}
          >
            Environment
          </Link>
        </NavHeader>

        <Switch>
          <Route
            path={`/pokemon/${currentPokemon.id}/environment`}
            render={() => {
              return (
                <div>
                  Can be found in the plains of{" "}
                  {currentPokemon.name.split("").reverse().join("")}
                </div>
              );
            }}
          />
          <Route
            path="/"
            render={() => {
              return (
                <div>
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
            }}
          />
        </Switch>
      </Router>
    </BoxWrap>
  );
}
