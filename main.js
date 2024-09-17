


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



findPokeInput.addEventListener('keyup', async function(event) {
    if (event.key === 'Enter') {
        let inputValue = findPokeInput.value.toLowerCase();
        console.log(inputValue);

        try {
            
            const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${inputValue}`);
            
            if (response) {
                
                const { id, name, sprites } = await response.json();
                const imageUrl = sprites.front_default; 
                
                const overlay = document.getElementById('pokemon-overlay');
                const pokemonNameElem = document.getElementById('pokemon-name');
                const pokemonIdElem = document.getElementById('pokemon-id');
                const pokemonImageElem = document.getElementById('pokemon-image');

                pokemonNameElem.textContent = `Name: ${name}`;
                pokemonIdElem.textContent = `ID: ${id}`;
                pokemonImageElem.src = imageUrl;

                
                overlay.classList.remove('hidden');
                
            } else {
                pokedexList.innerHTML = 'Pokémon ne postoji u bazi.';
            }

        } catch (error) {
            console.log('Greška:', error);
            pokedexList.innerHTML = 'Došlo je do greške. Pokušajte ponovo.';
        }
    }
});


document.getElementById('close-overlay').addEventListener('click', function() {
    document.getElementById('pokemon-overlay').classList.add('hidden');
});
























