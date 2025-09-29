const texto = document.querySelector("#searchInput");
const botonBuscar = document.querySelector("#searchBtn");
const botonCargar = document.querySelector("#loadBtn");
const results = document.querySelector("#results");
const botonFavoritos = document.querySelector("#verFavoritosBtn");
botonBuscar.addEventListener("click", async()=>{
   const campo = texto.value.trim().toLowerCase();
   if(!campo){
    results.innerHTML = `<p class="msg">Escribe un nombre o ID</p>`;
    return;
   }
   fetchPokemon(campo);

});
botonCargar.addEventListener("click",cargarPokemonesIniciales);
botonFavoritos.addEventListener("click",mostrarFavoritos);

async function fetchPokemon(campo){
     results.innerHTML = ``;
try {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${campo}`);
    if(!response.ok){
        throw new Error("Pokemon no encontrado")
        
    }
    const pokemon = await response.json();
    mostrarPokemon(pokemon);
    
} catch (error) {
    results.innerHTML = `<p style="color:red;">${error.message}</p>`;
}
}
function mostrarPokemon(pokemon) {
  const sprite = pokemon.sprites?.other?.['official-artwork']?.front_default
                 || pokemon.sprites?.front_default || '';

  const tipos = pokemon.types
    .map(t => t.type.name.charAt(0).toUpperCase() + t.type.name.slice(1))
    .join(', ');

  const altura = (pokemon.height / 10).toFixed(1);
  const peso = (pokemon.weight / 10).toFixed(1);

  const statsList = pokemon.stats
    .map(s => `<li><span>${formatStatName(s.stat.name)}</span><strong>${s.base_stat}</strong></li>`)
    .join('');


  const card = document.createElement('div');
  card.className = 'pokemon-card';
  card.innerHTML = `
    <div class="card-top">
      <h2>${pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)} <small>#${pokemon.id}</small></h2>
    </div>
    ${sprite ? `<div class="card-img"><img src="${sprite}" alt="${pokemon.name}"></div>` : ''}
    <div class="card-body">
      <p><strong>Tipos:</strong> ${tipos}</p>
      <p><strong>Altura:</strong> ${altura} m &nbsp; <strong>Peso:</strong> ${peso} kg</p>
      <h3>Estadísticas Base</h3>
      <ul class="stats">${statsList}</ul>
      <div class="card-actions">
        <button class="fav-btn"></button>
      </div>
    </div>
  `;


  let favoritos = JSON.parse(localStorage.getItem('favoritos')) || [];
  let isFav = favoritos.some(f => f.id === pokemon.id);
  const favBtn = card.querySelector('.fav-btn');
  favBtn.textContent = isFav ? '❌ Quitar de favoritos' : '⭐ Agregar a favoritos';

  favBtn.addEventListener('click', () => {
    if (isFav) {
      quitarFavorito(pokemon.id);
      favBtn.textContent = '⭐ Agregar a favoritos';
      isFav = false;
    } else {
      agregarAFavoritos(pokemon);
      favBtn.textContent = '❌ Quitar de favoritos';
      isFav = true;
    }
   
  });

  results.appendChild(card);
}


function formatStatName(name) {
  const map = {
    'hp': 'HP',
    'attack': 'Ataque',
    'defense': 'Defensa',
    'special-attack': 'Atq. Esp.',
    'special-defense': 'Def. Esp.',
    'speed': 'Velocidad'
  };
  return map[name] || name.replace('-', ' ').toUpperCase();
}



async function cargarPokemonesIniciales() {

 const listaPokemones = [];
for (let id=1;id<=20;id++){
listaPokemones.push(
      fetch(`https://pokeapi.co/api/v2/pokemon/${id}`).then(res => {
        if (!res.ok) {
          throw new Error(`Error al cargar el Pokémon con ID ${id}`);
        }
        return res.json();
    })

);

}
try {
    const pokemones = await Promise.all(listaPokemones);
    results.innerHTML = '';
    pokemones.forEach(pokemon => mostrarPokemon(pokemon));
} catch (error) {
      results.innerHTML = `<p class="error">${error.message}</p>`;
}
}


function agregarAFavoritos(pokemon) {
  let favoritos = JSON.parse(localStorage.getItem("favoritos")) || [];

  const existe = favoritos.some(p => p.id === pokemon.id);
  if (existe) return alert(`${pokemon.name} ya está en favoritos`);

  favoritos.push({
    id: pokemon.id,
    name: pokemon.name,
    types: pokemon.types.map(t => t.type.name),
    height: (pokemon.height / 10).toFixed(1),
    weight: (pokemon.weight / 10).toFixed(1),
    image: pokemon.sprites.front_default // 🔹 guardamos la imagen
  });

  localStorage.setItem("favoritos", JSON.stringify(favoritos));
  alert(`${pokemon.name} agregado a favoritos`);
}

function mostrarFavoritos() {
  results.innerHTML = '';
  const contenedor = document.querySelector("#favoritosContainer");
  contenedor.innerHTML = ""; 

  const favoritos = JSON.parse(localStorage.getItem("favoritos")) || [];

  favoritos.forEach(pokemon => {
    const div = document.createElement("div");
    div.className = "pokemon-card"; // usamos la misma clase que las tarjetas normales
    div.innerHTML = `
      <img src="${pokemon.image}" alt="${pokemon.name}">
      <h3>${pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}</h3>
      <p>Tipos: ${pokemon.types.join(", ")}</p>
      <p>Altura: ${pokemon.height} m</p>
      <p>Peso: ${pokemon.weight} kg</p>
      <button class="remove-fav">❌ Quitar</button>
    `;

    // Botón para quitar favorito
    div.querySelector(".remove-fav").addEventListener("click", () => {
      quitarFavorito(pokemon.id);
    });

    contenedor.appendChild(div);
  });
}

function quitarFavorito(id) {
  let favoritos = JSON.parse(localStorage.getItem("favoritos")) || [];
  favoritos = favoritos.filter(p => p.id !== id);
  localStorage.setItem("favoritos", JSON.stringify(favoritos));
  mostrarFavoritos();
}



