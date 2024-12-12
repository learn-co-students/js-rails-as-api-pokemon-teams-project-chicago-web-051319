const BASE_URL = "http://localhost:3000"
const TRAINERS_URL = `${BASE_URL}/trainers`
const POKEMONS_URL = `${BASE_URL}/pokemons`

function fetchTeams(){
    fetch('http://localhost:3000/trainers').then(response => response.json()).then(data=> renderAllTeams(data))
};

const pokeCard = document.getElementsByClassName('card')

document.addEventListener('DOMContentLoaded',function(){
    fetchTeams();


    document.querySelector('main').addEventListener('click',(e)=>{
        if (e.target.className === "release"){
            handleRemovePokemon(e);
        }
        else if (e.target.className === "add"){
            if (e.target.nextElementSibling.children.length < 6){
                handleAddPokemon(e);
            }
            else {
                window.alert("You cannot exceed 6 pokemon per team. Please remove a pokemon to continue.")
            }
        }
    }
    )
})


function renderSingleTeam(teamObj){
    const div = document.createElement('div');
    div.className = "card";
    div.setAttribute('data-id',teamObj['id']);
    const p = document.createElement('p');
    p.innerText = teamObj["name"];
    div.appendChild(p);
    const addButton = document.createElement('button');
    addButton.textContent = "Add Pokemon";
    addButton.setAttribute('data-trainer-id', teamObj['id']);
    addButton.className = "add";
    div.appendChild(addButton);
    const ul = document.createElement('ul');
    teamObj["pokemons"].forEach((pokemon)=> {
        const li = document.createElement('li')
        li.textContent = `${pokemon["nickname"]} (${pokemon["species"]})`
        const deleteButton = document.createElement('button');
        deleteButton.className = "release";
        deleteButton.textContent = "Release";
        deleteButton.setAttribute('data-pokemon-id',pokemon['id']);
        li.appendChild(deleteButton);
        ul.appendChild(li);
    })
    div.appendChild(ul);
    const main = document.querySelector('main');
    main.insertAdjacentElement('beforeend',div)
}

function renderAllTeams(teamObj){
    teamObj.forEach(team=>{
        renderSingleTeam(team);
    })
}

function handleAddPokemon(event){
    const reqObj = {
        method: 'POST',
        headers: {
            'Content-Type':'application/json',
            'Accept':'application/json'
        },
        body: JSON.stringify({trainerId: event.target.dataset.trainerId})
    }

    fetch('http://localhost:3000/pokemons', reqObj).then(response=>response.json()).then(data=> renderSinglePokemon(data, event))
    
}

function renderSinglePokemon(pokemonData, event){
    const pokeLi = document.createElement('li')
    pokeLi.textContent = `${pokemonData["nickname"]} (${pokemonData["species"]})`
    const delButton = document.createElement('button');
    delButton.className = "release";
    delButton.textContent = "Release";
    delButton.setAttribute('data-pokemon-id',pokemonData['id']);
    pokeLi.appendChild(delButton);
    event.target.nextElementSibling.appendChild(pokeLi);
}

function handleRemovePokemon(event){
    const delObj = {method: 'DELETE'}

    fetch(`http://localhost:3000/pokemons/${event.target.dataset.pokemonId}`, delObj).then(response => response.json()).then(data => deletePokemon(event))
}

function deletePokemon(event){
    event.target.parentElement.remove();
}