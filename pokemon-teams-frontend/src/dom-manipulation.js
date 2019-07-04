function renderTrainers(trainers){
  trainers.forEach(trainer => renderTrainer(trainer))
}

function renderTrainer(trainer){
  const mainElement = document.querySelector('main');
  const pokeCard = createCardElement(trainer)
  mainElement.appendChild(pokeCard);
}

function createPokemonListItems(pokemons){
  return pokemons.map((pokemon) => {
    const pokeLi = document.createElement('li');
    pokeLi.innerText = pokemon.species;
    const releasePokemonBtn = document.createElement('button');
    releasePokemonBtn.innerText = 'Ditch Pokemon Away';
    releasePokemonBtn.className = 'release';
    releasePokemonBtn.dataset.id = pokemon.id;
    pokeLi.appendChild(releasePokemonBtn);
    return pokeLi;
  })
}

function createNewPokemon(pokemon, e){
  const pokeLi = document.createElement('li');
  pokeLi.innerText = pokemon.species
  const releasePokemonBtn = document.createElement('button');
  releasePokemonBtn.innerText = 'Release Pokemon'
  releasePokemonBtn.className = 'release'
  releasePokemonBtn.dataset.id = pokemon.id
  pokeLi.appendChild(releasePokemonBtn);
  e.target.nextSibling.append(pokeLi)
}

function createCardElement(trainer){
  const newDiv = document.createElement('div');
  const trainerNameP = document.createElement('p');
  const addPokemonBtn = document.createElement('button');
  const unorderedList = document.createElement('ul');
  const pokeLis = createPokemonListItems(trainer.pokemons);
  pokeLis.forEach((pokeLi) => {
    unorderedList.appendChild(pokeLi);
  })

  newDiv.className = 'card';
  newDiv.dataset.id = trainer.id;

  newDiv.innerText = trainer.name;

  addPokemonBtn.dataset.trainer_id = trainer.id;
  addPokemonBtn.innerText = 'Add New Pokemon'
  addPokemonBtn.className = 'add'

  newDiv.appendChild(trainerNameP);
  newDiv.appendChild(addPokemonBtn);
  newDiv.appendChild(unorderedList);
  return newDiv;
}


















//
