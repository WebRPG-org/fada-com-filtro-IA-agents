import express from "express";
import cors from "cors";

import reception from "./agents/receptionAgent.js";
import sales from "./agents/salesAgent.js";
import automation from "./agents/automationAgent.js";

const app = express();
app.use(cors());
app.use(express.json());

app.post("/chat/:agent", async (req, res) => {
  const { message } = req.body;
  const { agent } = req.params;

  let reply = "Agent não encontrado";

  if (agent === "reception") reply = await reception(message);
  if (agent === "sales") reply = await sales(message);
  if (agent === "automation") reply = await automation(message);

  res.json({ reply });
});

// --- INTEGRAÇÃO COM O BOT PRINCIPAL ---
import { spawn } from "child_process";
let botProcess = null;

app.post("/bot/play", (req, res) => {
  if (botProcess) {
    return res.json({ status: "already-running" });
  }
  botProcess = spawn("npx", ["ts-node", "../../bot.ts"], {
    cwd: process.cwd(),
    stdio: "inherit",
    shell: true
  });
  res.json({ status: "started" });
});

app.post("/bot/pause", (req, res) => {
  // Pausa não nativa, apenas envia SIGSTOP (Unix) ou ignora no Windows
  if (!botProcess) return res.json({ status: "not-running" });
  try {
    process.platform !== "win32" && botProcess.kill("SIGSTOP");
    res.json({ status: "paused" });
  } catch {
    res.json({ status: "pause-unsupported" });
  }
});

app.post("/bot/stop", (req, res) => {
  if (!botProcess) return res.json({ status: "not-running" });
  botProcess.kill();
  botProcess = null;
  res.json({ status: "stopped" });
});

app.listen(3000, () => {
  console.log("🚀 Backend rodando em http://localhost:3000");
});

app.get("/test", (req, res) => {
  res.json({ reply: "⚡ Pikachu: funcionando via ngrok!" });
});