# 🖥️ Pokedex Web App

## Descripción
Esta es una **Pokedex interactiva** desarrollada con **HTML, CSS y JavaScript puro**.  
Permite:

- Buscar Pokémon por **nombre o ID**.  
- Cargar los primeros 20 Pokémon iniciales.  
- Mostrar detalles completos de cada Pokémon: nombre, imagen oficial, tipos, altura, peso y estadísticas base (HP, ataque, defensa, velocidad, etc.).  
- Marcar y desmarcar Pokémon como **favoritos**, guardándolos en **localStorage**.  
- Visualizar una sección de **“Mis Favoritos”** en la misma página.  


## Tecnologías utilizadas
- **HTML5**  
- **CSS3**   
- **JavaScript (ES6+)**  
- **API externa:** [PokeAPI](https://pokeapi.co/)  
- **LocalStorage** para guardar favoritos  

---

## Instalación

1. Clonar el repositorio:
```bash
git clone https://github.com/tu-usuario/pokedex.git
```
2. Entrar a la carpeta del proyecto
```bash
cd pokedex
```
3. Abrir index.html
```bash
start index.html
```
## Estructura de archivos
```text
pokedex/
│
├─ index.html         # Página principal
├─ style.css          # Estilos principales 
├─ backend.js         # Lógica de búsqueda, favoritos y renderizado
└─ README.md          # Documentación del proyecto
```
## USO

**Buscar Pokémon**
- Escribe el nombre o ID en la barra de búsqueda y presiona Buscar.

- Se mostrará la tarjeta con todos los detalles del Pokémon.

**Cargar Pokémon iniciales**

- Haz click en el botón Cargar 20 Pokémon.

- Se desplegarán los primeros 20 Pokémon de la Pokédex.

**Favoritos** 

- Presiona el botón ⭐ Agregar a favoritos en la tarjeta de un Pokémon.

- El Pokémon se guardará en LocalStorage.

- Para eliminarlo, haz click en ❌ Quitar de favoritos.

- Para ver todos tus favoritos, haz click en Mis Favoritos.

## Funciones principales
- fetchPokemon(campo) → Obtiene la información del Pokémon por nombre o ID.

- mostrarPokemon(pokemon) → Renderiza la tarjeta del Pokémon.

- agregarAFavoritos(pokemon) → Agrega un Pokémon a la lista de favoritos.

- quitarFavorito(id) → Quita un Pokémon de la lista de favoritos.

- mostrarFavoritos() → Muestra la sección de favoritos en la página.

- formatStatName(name) → Traduce las estadísticas de la API (ingles) a Espanol (HP, Ataque, Defensa, etc.).