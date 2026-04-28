const params = new URLSearchParams(window.location.search);
const agent = params.get("agent") || "reception";

async function send() {
  const input = document.getElementById("input");
  const screen = document.getElementById("screen");

  const msg = input.value;

  const res = await fetch("https://mating-avalanche-canyon.ngrok-free.dev/chat/" + agent, {
    method: "POST",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify({ message: msg })
  });

  const data = await res.json();

  typeWriter(screen, data.reply);
  input.value = "";
}

// efeito digitando
function typeWriter(el, text) {
  el.innerHTML = "";
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