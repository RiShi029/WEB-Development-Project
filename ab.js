const menuToggle = document.querySelector('.toggle');
      const showcase = document.querySelector('.showcase');

      menuToggle.addEventListener('click', () => {
        menuToggle.classList.toggle('active');
        showcase.classList.toggle('active');
      })
      window.addEventListener("DOMContentLoaded", (e) => {
        const $ = (selector) => document.querySelector(selector);
        const maxMove = 3;
      
        const PokemonTypes = Object.freeze(
          {
            "normal":{
              "color": "#A8A978"
            },
            "fighting":{
              "color": "#C03028"
            }, 
            "flying":{
              "color": "#A890F0"
            }, 
            "poison":{
              "color": "#7b447b"
            }, 
            "ground":{
              "color": "#E0C068"
            }, 
            "rock":{
              "color": "#B9A038"
            }, 
            "bug":{
              "color": "#A8B820"
            }, 
            "ghost":{
              "color": "#705899"
            }, 
            "steel":{
              "color": "#B8B8D0"
            }, 
            "fire":{
              "color": "#F0802F"
            }, 
            "water":{
              "color": "#6891F0"
            }, 
            "grass":{
              "color": "#78C850"
            }, 
            "electric":{
              "color": "#F8D02F"
            }, 
            "psychic":{
              "color": "#b93b61"
            }, 
            "ice":{
              "color": "#98D8D8"
            }, 
            "dragon":{
              "color": "#7038F8"
            }, 
            "dark":{
              "color": "#705848"
            }, 
            "fairy":{
              "color": "#E1C5E6"
            }, 
          }
        )
      
        class Pokemon {
          constructor() {
            this.name = "";
            this.pv = "";
            this.image = "";
            this.types = [];
            this.attack = [];
          };
      
          setName(name) {
            this.name = name;
          }
      
          setPv(pv) {
            this.pv = `${pv}hp`;
          }
      
          setImage(image) {
            this.image = image;
          }
      
          setTypes(type) {
            this.types.push(type);
          }
      
          setAttacks(attack) {
            this.attack.push(attack);
          }
        }
      
        async function getPokemon () {
          let rand = Math.floor(Math.random() * Math.floor(700));
          return await fetch(`https://pokeapi.co/api/v2/pokemon/${rand}/`)
            .then(response => response.json())
            .then(data => {
            return data;
          }) 
        }
      
        async function getMove(url) {
          return await fetch(url)
            .then(response => response.json())
            .then(data => {
            return data;
          }) 
        }
      
        const toggleCard = (displayed) => {
          if(!displayed) {
            $('#pokecard').classList.remove('displayed');
            $('#pokecard').classList.add('hidden');
          }else{
            $('#pokecard').classList.remove('hidden');
            $('#pokecard').classList.add('displayed');
          }
        }
      
        const updateSlider = () => {
          toggleCard(false);
          getPokemon().then(data => loadPokemon(data));
        }
      
        const updatePokemonMove = (move) => {
          $('#attack').appendChild(createMove(move));
        }
      
        const createMove = (move) => {
          const moveBlock = document.createElement("div");
          const moveBlockAttackName = document.createElement("label");
          moveBlockAttackName.innerText = move.name;
          const moveBlockAttackDescription = document.createElement("p");
          const description = move.effect_entries.reduce((prev, cur) => {
            prev += cur.short_effect;
            return prev;
          }, "");
          moveBlockAttackDescription.innerText = description;
          moveBlock.appendChild(moveBlockAttackName);
          moveBlock.appendChild(moveBlockAttackDescription);
          return moveBlock;
        }
      
        let currentPokemon = new Pokemon();
      
        const loadPokemon = (pokemon) => {
          currentPokemon.setImage(pokemon.sprites.front_default);
          currentPokemon.setName(pokemon.name);
          currentPokemon.setPv(pokemon.base_experience);
          currentPokemon.attack = [];
          currentPokemon.types = [];
          for(var i = 0; i < (pokemon.moves.length < maxMove ? pokemon.moves.length : maxMove); i ++) {
            const move = pokemon.moves[i];
            getMove(move.move.url).then(data => currentPokemon.setAttacks(data));
          }
          pokemon.types.forEach((type) => {
            currentPokemon.setTypes(type.type.name)
          });
          setTimeout(() => {
            updatePokemon();
          }, 300);
        }
      
        const updatePokemon = () => {
          $('#pv').innerText = currentPokemon.pv;
          $('#name').innerText = currentPokemon.name;
          $('#image').src = currentPokemon.image;
          $('#attack').innerHTML = "";
          currentPokemon.attack.forEach((attack) => updatePokemonMove(attack));
          $('#pokecard-content').style.backgroundColor = PokemonTypes[currentPokemon.types[0]].color;
          setTimeout(() => {
            toggleCard(true);
          }, 300);
        }
      
        updateSlider();
        setInterval(() => {
          updateSlider();
        }, 5000)
      
      });
      