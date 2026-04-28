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

app.listen(3000, () => {
  console.log("🚀 Backend rodando em http://localhost:3000");
});

app.get("/test", (req, res) => {
  res.json({ reply: "⚡ Pikachu: funcionando via ngrok!" });
});