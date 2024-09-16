import './style.css'


'use strict';

const container = document.querySelector('.container'); 
const pokedexList = document.querySelector('.pokedex-list');
const findPokeInput = document.querySelector('.findPoke');

class PokemonManager {
    constructor() {
        this.pokemonsArray = [];
        this.singlePokemon = "";
    }

    addPokemon(name, index) {
        this.pokemonsArray.push({ name, index: index + 1 });
    }

    renderPokemons() {
        pokedexList.innerHTML = ''; 

        this.pokemonsArray.forEach(pokemon => {
            let listItem = document.createElement('li');
            listItem.textContent = `${pokemon.index}. ${pokemon.name}`;
            pokedexList.appendChild(listItem);
        });
    }

    resetPokemons() {
        this.pokemonsArray = [];
    }

 
}