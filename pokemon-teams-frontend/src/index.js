const BASE_URL = "http://localhost:3000"
const TRAINERS_URL = `${BASE_URL}/trainers`
const POKEMONS_URL = `${BASE_URL}/pokemons`


function getTrainers(){
  fetch(TRAINERS_URL)
  .then(resp => resp.json())
  .then(data => renderTrainers(data))
}

function handleAddPokemon(e){
  const reqObj = {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({id: e.target.dataset.trainer_id}),
  }
  fetch(POKEMONS_URL, reqObj)
  .then(resp => resp.json())
  .then(data => createNewPokemon(data, e))
}

function handleReleasePokemon(e){
  fetch(`${POKEMONS_URL}/${e.target.dataset.id}`, {method: 'DELETE'})
  .then(resp => resp.json())
  .then(data => deletePokemon(data, e))
}

function deletePokemon(data, e){
  e.target.parentNode.remove();
}

function addClickListener(){
  document.addEventListener('click', (e) => {
    if (e.target.className === 'add'){
      handleAddPokemon(e)
    } else if(e.target.className === 'release'){
      handleReleasePokemon(e)
    }
    // check classname of what got clicked to see if its a btn
  })
}



function main(){
  document.addEventListener('DOMContentLoaded',() => {
    getTrainers();
    addClickListener();

  })
}

main();
