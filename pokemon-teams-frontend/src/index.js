const BASE_URL = "http://localhost:3000"
const TRAINERS_URL = `${BASE_URL}/trainers`
const POKEMONS_URL = `${BASE_URL}/pokemons`

function deletePokemonFetch(pokemon) {
  let pokemonId = pokemon.getAttribute('data-pokemon-id');
  let destroyObj = {
    method: 'DELETE'
  }
  fetch(POKEMONS_URL+`/${pokemonId}`,destroyObj)
  .then(resp => resp)
  .then(obj => {
    pokemon.parentElement.remove();
  });
}
function createForm() {
  const form = document.createElement("form");
  const pokeName = document.createElement("input");
  const pokeSpecies = document.createElement("input");
  const submitBtn = document.createElement("input");

  pokeName.setAttribute("name", "nickname")
  pokeName.setAttribute("type", "text")
  pokeName.setAttribute("placeholder", "Nickname")

  pokeSpecies.setAttribute("name", "species")
  pokeSpecies.setAttribute("type", "text")
  pokeSpecies.setAttribute("placeholder", "species")

  submitBtn.setAttribute("value", "Submit")
  submitBtn.setAttribute("type", "submit")

  form.appendChild(pokeName);
  form.appendChild(pokeSpecies);
  form.appendChild(submitBtn);

  return {form, pokeName, pokeSpecies, submitBtn}
}
function addCreateFormEvent(form) {
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const trainerId = form.parentElement.getAttribute("data-id");
    const nickname = form.children[0].value;
    const species = form.children[1].value;
    const formData = {
      trainer_id: trainerId,
      nickname: nickname,
      species: species
    }
    const reqObj = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body: JSON.stringify(formData)
    }
    fetch(POKEMONS_URL, reqObj)
    .then(resp => resp.json())
    .then(obj => {
      populatePokemon(obj,form.parentElement.querySelector("ul"));
      form.parentElement.querySelector("button").style.display = "block";
      form.remove();
    });
  });
}

function addPokemon(trainerBtn) {
  // console.log(trainerBtn);
  // form WAY
  // const formElements = createForm();
  // trainerBtn.parentNode.insertBefore(formElements.form, trainerBtn);
  // trainerBtn.style.display = "none";
  // addCreateFormEvent(formElements.form)
  // OTHER WAY
  const trainerId = trainerBtn.parentElement.getAttribute("data-id");
  const formData = {
    trainer_id: trainerId
  }
  const reqObj = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json"
    },
    body: JSON.stringify(formData)
  }
  fetch(POKEMONS_URL, reqObj)
  .then(resp => resp.json())
  .then(obj => {
    populatePokemon(obj,trainerBtn.parentElement.querySelector("ul"));
  });
}

function addCardEventListener(card) {
  card.addEventListener("click", (e) => {
    if (e.target.classList.contains("release")) {
      deletePokemonFetch(e.target)
    }else if (e.target.classList.contains("add")) {
      // console.log("Grow Horde");
      // console.log(e.target.parentElement);
      addPokemon(e.target)
    }
  });
}

function generateTrainerElements() {
  const card = document.createElement("div");
  const addButton = document.createElement("button");
  const trainerName = document.createElement("p");
  const pokemonUl = document.createElement("ul");

  card.appendChild(trainerName);
  card.appendChild(addButton);
  card.appendChild(pokemonUl);
  card.classList.add("card");
  addCardEventListener(card);

  addButton.classList.add("add")
  return {card, addButton, pokemonUl, trainerName}
}

function populatePokemon(pokemon,pokemonUl) {
  const listItem = document.createElement("li");
  const releaseButton = document.createElement("button");

  releaseButton.classList.add("release")
  releaseButton.textContent = ("Release")
  releaseButton.setAttribute("data-pokemon-id",pokemon.id)

  listItem.textContent = `${pokemon.nickname} (${pokemon.species})`;
  listItem.appendChild(releaseButton);

  pokemonUl.appendChild(listItem)
}

function populatePokemons(pokemons,pokemonUl) {
  for (pokemon of pokemons) {
    populatePokemon(pokemon,pokemonUl)
  }
}

function displayTrainer(trainer) {
  const elements = generateTrainerElements();
  const main = document.querySelector("main");

  elements.card.setAttribute("data-id",trainer.id)
  elements.trainerName.textContent = trainer.name;
  elements.addButton.textContent = "Add Pokemon";
  elements.addButton.setAttribute("data-trainer-id",trainer.id);
  populatePokemons(trainer.pokemons,elements.pokemonUl);

  main.appendChild(elements.card);
}

function displayTrainers(trainers) {
  for (trainer of trainers) {
    displayTrainer(trainer)
  }
}

function fetchTrainers() {
  return fetch(TRAINERS_URL)
  .then(resp => resp.json())
  .then(obj => {

    displayTrainers(obj)

  });
}

function generateTrainers() {
  fetchTrainers();
}

function application() {
  generateTrainers();
}

application()
