const params = new URLSearchParams(window.location.search);
const agent = params.get("agent") || "reception";

const locations = [
  {
    id: 'center',
    name: 'Centro Pokémon',
    sprite: 'assets/sprites/hospital.svg',
    description: 'Bem-vindo ao Centro Pokémon! Aqui você pode curar seus Pokémon e falar com o enfermeiro-chefe.',
    inside: 'Pikachu está no balcão do atendimento, pronto para ajudar os treinadores.'
  },
  {
    id: 'lab',
    name: 'Laboratório do Professor Carvalho',
    sprite: 'assets/sprites/lab.svg',
    description: 'Este é o laboratório do Professor Carvalho. Você pode conversar com a IA e descobrir novas rotas.',
    inside: 'Porygon e bot estão analisando dados no laboratório.'
  }
];

const agents = [
  {
    id: 'pikachu',
    name: 'Pikachu',
    sprite: 'assets/sprites/pikachu.svg',
    x: 40,
    y: 32,
    location: 'outdoor',
    place: 'Praça'
  },
  {
    id: 'meowth',
    name: 'Meowth',
    sprite: 'assets/sprites/meowth.svg',
    x: 280,
    y: 42,
    location: 'outdoor',
    place: 'Ao lado do Centro Pokémon'
  },
  {
    id: 'porygon',
    name: 'Porygon',
    sprite: 'assets/sprites/porygon.svg',
    x: 180,
    y: 140,
    location: 'lab',
    place: 'Dentro do laboratório'
  },
  {
    id: 'bot',
    name: 'Bot',
    sprite: 'assets/sprites/bot.svg',
    x: 110,
    y: 180,
    location: 'center',
    place: 'Dentro do Centro Pokémon'
  }
];

function initMap() {
  const mapViewport = document.getElementById('mapViewport');
  mapViewport.innerHTML = '';

  const gridSize = 6;
  for (let row = 0; row < 4; row++) {
    for (let col = 0; col < gridSize; col++) {
      const tile = document.createElement('div');
      tile.className = 'map-tile';
      tile.style.left = `${col * 64}px`;
      tile.style.top = `${row * 60}px`;
      mapViewport.appendChild(tile);
    }
  }

  const centerBuilding = document.createElement('div');
  centerBuilding.className = 'building';
  centerBuilding.style.left = '32px';
  centerBuilding.style.top = '22px';
  centerBuilding.style.backgroundImage = 'url(assets/sprites/hospital.svg)';
  centerBuilding.title = 'Centro Pokémon';
  centerBuilding.onclick = () => enterLocation('center');
  mapViewport.appendChild(centerBuilding);

  const labBuilding = document.createElement('div');
  labBuilding.className = 'building';
  labBuilding.style.left = '252px';
  labBuilding.style.top = '130px';
  labBuilding.style.backgroundImage = 'url(assets/sprites/lab.svg)';
  labBuilding.title = 'Laboratório';
  labBuilding.onclick = () => enterLocation('lab');
  mapViewport.appendChild(labBuilding);

  const sign = document.createElement('div');
  sign.className = 'map-annotation';
  sign.textContent = 'Pallet Town - 1 cidade • Centro • Laboratório';
  mapViewport.appendChild(sign);

  agents.forEach((agentInfo) => {
    const agentEl = document.createElement('div');
    agentEl.className = `agent-sprite ${agentInfo.id}`;
    agentEl.style.left = `${agentInfo.x}px`;
    agentEl.style.top = `${agentInfo.y}px`;
    agentEl.style.backgroundImage = `url(${agentInfo.sprite})`;
    agentEl.title = `${agentInfo.name} - ${agentInfo.place}`;
    if (agentInfo.location !== 'outdoor') {
      agentEl.style.opacity = '0.85';
    }
    mapViewport.appendChild(agentEl);
  });
}

function showMap() {
  document.getElementById('mapViewport').style.display = 'block';
  document.getElementById('locationPanel').classList.add('hidden');
  const screen = document.getElementById('screen');
  typeWriter(screen, '🔎 Você está de volta à cidade de Pallet Town. Clique em um local para entrar.');
}

function enterLocation(id) {
  const location = locations.find((location) => location.id === id);
  if (!location) return;

  document.getElementById('mapViewport').style.display = 'none';
  const panel = document.getElementById('locationPanel');
  panel.classList.remove('hidden');
  document.getElementById('locationTitle').textContent = location.name;
  document.getElementById('locationInside').innerHTML = `
    <strong>${location.description}</strong>
    <p>${location.inside}</p>
    <p>Use os botões para voltar à cidade ou enviar mensagens para o Pokémon/IA.</p>
  `;
  typeWriter(document.getElementById('screen'), `➡️ Entrou em ${location.name}.`);
}

async function send() {
  const input = document.getElementById('input');
  const screen = document.getElementById('screen');
  const msg = input.value.trim();
  if (!msg) {
    typeWriter(screen, '✉️ Digite uma mensagem para enviar.');
    return;
  }

  const res = await fetch('https://mating-avalanche-canyon.ngrok-free.dev/chat/' + agent, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ message: msg })
  });

  const data = await res.json();
  typeWriter(screen, data.reply);
  input.value = '';
}

function typeWriter(el, text) {
  el.innerHTML = '';
  let i = 0;

  function type() {
    if (i < text.length) {
      el.innerHTML += text.charAt(i);
      i++;
      setTimeout(type, 20);
    }
  }
  type();
}

async function botControl(action) {
  let endpoint = '';
  if (action === 'play') endpoint = '/bot/play';
  if (action === 'pause') endpoint = '/bot/pause';
  if (action === 'stop') endpoint = '/bot/stop';
  if (!endpoint) return;

  const res = await fetch('https://mating-avalanche-canyon.ngrok-free.dev' + endpoint, {
    method: 'POST'
  });
  const data = await res.json();
  typeWriter(document.getElementById('screen'), `[BOT] ${action.toUpperCase()}: ${data.status}`);
}

window.addEventListener('DOMContentLoaded', () => {
  initMap();
  showMap();
});
