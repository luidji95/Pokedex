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

const pokemonManager = new PokemonManager();

async function fetchData(url) {
    try {
        let response = await fetch(url);
        let data = await response.json(); 
        let pokemons = data.pokemon || []; 

        pokemonManager.resetPokemons();

        pokemons.forEach((entry, index) => {
            
            let pokemonName = entry.pokemon.name;
            pokemonManager.addPokemon(pokemonName, index);
        });

        pokemonManager.renderPokemons();

    } catch (error) {
        console.log('Greška:', error);
    }
}

container.addEventListener('click', function(ev) {
    if (ev.target.classList.contains('fire')) { 
        fetchData('https://pokeapi.co/api/v2/type/fire'); 
    } else if (ev.target.classList.contains('water')) {
        fetchData('https://pokeapi.co/api/v2/type/water'); 
    } else if (ev.target.classList.contains('electric')){
        fetchData('https://pokeapi.co/api/v2/type/electric');
    } else if (ev.target.classList.contains('grass')){
        fetchData('https://pokeapi.co/api/v2/type/grass');
    } 
});