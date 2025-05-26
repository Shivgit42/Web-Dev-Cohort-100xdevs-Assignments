const generateButton = document.getElementById("generateButton");
const cardCountInput = document.getElementById("cardCount");
const typeSelect = document.getElementById("type");
const container = document.querySelector(".container");

// Create card container
const cardGrid = document.createElement("div");
cardGrid.className = "card-grid";
container.appendChild(cardGrid);

generateButton.addEventListener("click", async () => {
  const count = parseInt(cardCountInput.value);
  const selectedType = typeSelect.value.toLowerCase();

  cardGrid.innerHTML = "";

  const maxPokemon = 1025;
  const maxAttempts = 100;
  let found = 0;
  let attempts = 0;

  while (found < count && attempts < maxAttempts) {
    const randomId = Math.floor(Math.random() * maxPokemon) + 1;

    try {
      const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${randomId}`);
      if (!res.ok) throw new Error("Failed fetch");
      const data = await res.json();
      console.log(data);

      const types = data.types.map((t) => t.type.name.toLowerCase());

      if (types.includes(selectedType)) {
        const card = createPokemonCard(data);
        cardGrid.appendChild(card);
        found++;
      }
    } catch (err) {
      console.error("Error fetching Pokémon:", err);
    }

    attempts++;
  }

  if (found === 0) {
    cardGrid.innerHTML = `<p style="color: red; font-weight: bold;">No Pokémon found for type "${selectedType}"</p>`;
  }
});

function createPokemonCard(pokemon) {
  const card = document.createElement("div");
  card.className = "card";

  const typesHTML = pokemon.types
    .map((t) => `<span class="type-badge">${t.type.name}</span>`)
    .join(" ");

  card.innerHTML = `
    <div class="card-header">
      <div class="hp">HP ${pokemon.stats[0].base_stat}</div>
    </div>
    <img src="${pokemon.sprites.front_default || ""}" alt="${pokemon.name}">
    <h3>${pokemon.name}</h3>
    <div class="type">${typesHTML}</div>
    <div class="stats">
      <div>
        <h4>${pokemon.stats[1].base_stat}</h4>
        <p>Attack</p>
      </div>
      <div>
        <h4>${pokemon.stats[2].base_stat}</h4>
        <p>Defense</p>
      </div>
      <div>
        <h4>${pokemon.stats[5].base_stat}</h4>
        <p>Speed</p>
      </div>
    </div>
  `;

  return card;
}
