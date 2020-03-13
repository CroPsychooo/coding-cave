
const pokedex = document.getElementById("pokedex");
// console.log(pokedex);


// Fetch the pokemon API
const fetchingPokemon = () => {
    const promises = [];
    for (let i = 1; i <= 100; i++) {
        const url = `https://pokeapi.co/api/v2/pokemon/${i}`;
        promises.push(fetch(url).then((res) => res.json()));
        
        
        }
       
        
        Promise.all(promises).then((results) => {
            const pokemon = results.map((data) => ({
                name: data.name,
                id: data.id,
                image: data.sprites['front_default'],
                type: data.types.map((type) => type.type.name).join(', '),
                abilities: data.abilities.map((ability) => ability.ability.name).join(', ')
                
        }));
        displayPokemon(pokemon);
        
    });
};



// Display the pokemon 
const displayPokemon = (pokemon) => {
    console.log(pokemon);
    const pokemonHTMLString = pokemon.map((pokeman) => `
    <li id="list"><a href="#">  
        <div class="pic-content">
        <img class="pic" src="https://img.icons8.com/color/55/000000/red-team--v1.png"/>
        </div>
        <img onmouseover="moreInfo(show)" src="${pokeman.image}" />
        <h2>${pokeman.id}. ${pokeman.name}</h2>
        <p class="description">Type: ${pokeman.type}</p>
        <p class="description">Abilities: ${pokeman.abilities}</p>
        <p>${pokeman.description}</p>
    </a></li>`).join('');
    pokedex.innerHTML = pokemonHTMLString;


};



// Search engine
function searchPokemon() {
    var input, filter, ol, li, a, i, txtValue;
    input = document.getElementById("search");
    filter = input.value.toUpperCase();
    ol = document.getElementById("pokedex");
    li = ol.getElementsByTagName('li');

    for (i = 0; i < li.length; i++) {
        a = li[i].getElementsByTagName("a")[0];
        txtValue = a.textContent || a.innerText;
        if (txtValue.toUpperCase().indexOf(filter) > -1) {
            li[i].style.display = 'inline-block';
        } else {
            li[i].style.display = 'none';
        } 
    }
}






fetchingPokemon();


