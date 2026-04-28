WA.onInit().then(() => {

  const BASE_URL = "https://mating-avalanche-canyon.ngrok-free.dev";

  WA.room.onEnterZone("PikachuZone", async () => {

    const res = await fetch(BASE_URL + "/chat/reception", {
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify({ message: "treinador entrou" })
    });

    const data = await res.json();

    WA.ui.openPopup("pikachu", data.reply);
  });

  function openPokedex(agent) {
    WA.ui.openWebsite(
      "https://mating-avalanche-canyon.ngrok-free.dev/frontend/index.html?agent=" + agent,
      "Pokédex",
      true
    );
  }

  app.get("/test", (req, res) => {
    res.json({ reply: "⚡ Pikachu: funcionando!" });
  });

  WA.room.onEnterZone("PikachuZone", () => {
    WA.ui.openPopup("pikachu", "⚡ Pika pika! Bem-vindo treinador!");
    setTimeout(() => openPokedex("reception"), 500);
  });

  WA.room.onEnterZone("MeowthZone", () => {
    WA.ui.openPopup("meowth", "💰 Meowth: quer caçar escolas?");
    setTimeout(() => openPokedex("sales"), 500);
  });

  WA.room.onEnterZone("PorygonZone", () => {
    WA.ui.openPopup("porygon", "🤖 Porygon iniciando sistemas...");
    setTimeout(() => openPokedex("automation"), 500);
  });

});

WA.onInit().then(() => {

  //Pikachu andando
  WA.room.createNPC({
    id: "pikachu",
    sprite: "https://img.pokemondb.net/sprites/black-white/normal/pikachu-f.png",
    x: 6,
    y: 6,
    width: 32,
    height: 32,

    animations: {
      down: [0,1,2],
      left: [3,4,5],
      right: [6,7,8],
      up: [9,10,11]
    },

    move: [
      { x: 6, y: 6 },
      { x: 10, y: 6 },
      { x: 10, y: 10 },
      { x: 6, y: 10 }
    ],

    speed: 1,
    loop: true
  });

});