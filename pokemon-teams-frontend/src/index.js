const BASE_URL = "http://localhost:3000"
const TRAINERS_URL = `${BASE_URL}/trainers`
const POKEMONS_URL = `${BASE_URL}/pokemons`

function main() {
 document.addEventListener('DOMContentLoaded', () => {
   getTrainers();
   addClickListener();
 });
}

function addClickListener() {
  document.addEventListener('click', e => {
    if (e.target.className === 'add') {
      handleAddPokemon(e);
    } else if(e.target.className === 'release') {
      handleReleasePokemon(e);
    }
  })
}

function getTrainers() {
  fetch(TRAINERS_URL)
  .then(resp => resp.json())
  .then(data => renderTrainers(data))
}

function handleAddPokemon(e) {
  const reqObj = {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({id: e.target.dataset.trainer_id}),
  }
    fetch(POKEMONS_URL, reqObj)
    .then(resp => resp.json())
    .then(data => createNewPokemon(data, e))

}

function handleReleasePokemon(e) {
  const config = {
    method: "DELETE"
  }
  fetch(`${POKEMONS_URL}/${e.target.dataset.pokemonId}`, config)
  .then(response => response.json())
  .then(data => {
    e.target.parentElement.remove()
  })
}

function createNewPokemon(pokemon, e) {
  const pokeLi = document.createElement('li');
  pokeLi.innerText = `${pokemon.nickname} (${pokemon.species})`;
  const releasePokemonBtn = document.createElement('button');
  releasePokemonBtn.innerText = 'Release Pokemon';
  releasePokemonBtn.className = 'release';
  releasePokemonBtn.dataset.id = pokemon.id;
  pokeLi.append(releasePokemonBtn);
  e.target.nextSibling.append(pokeLi)
}

function renderTrainers(trainers) {
  trainers.forEach(trainer => renderTrainer(trainer))
}

function renderTrainer(trainer) {
  const mainElement = document.querySelector('main');
  const pokeCard = createCardElement(trainer);
  mainElement.appendChild(pokeCard);
}

function createPokemonListItems(pokemons) {
  return pokemons.map(pokemon => {
    const pokeLi = document.createElement('li');
    pokeLi.innerText = `${pokemon.nickname} (${pokemon.species})`;
    const releasePokemonBtn = document.createElement('button');
    releasePokemonBtn.innerText = 'Release Pokemon';
    releasePokemonBtn.className = 'release';
    releasePokemonBtn.dataset.id = pokemon.id;
    pokeLi.append(releasePokemonBtn);
    return pokeLi;
  })
}

function createCardElement(trainer) {
  const newDiv = document.createElement('div');
  const addPokemonBtn = document.createElement('button');
  const unorderedList = document.createElement('ul');
  const pokeLi = createPokemonListItems(trainer.pokemons);
  pokeLi.forEach(pokeLi => {
    unorderedList.append(pokeLi);
  })
  newDiv.className = 'card';
  newDiv.dataset.id = trainer;

  let addPokemon = document.createElement('button');
  addPokemon.innerText = 'Add Pokemon';
  addPokemon.dataset.trainer_id = trainer.id;
  addPokemon.className = 'add';
  newDiv.innerHTML += `<p>${trainer.name}</p>`;
  newDiv.appendChild(addPokemon);
  newDiv.appendChild(unorderedList);
  return newDiv;
}

main();
