// Importerer nødvendige moduler
import { serve } from "@hono/node-server";
import { Hono } from "hono";
import { cors } from "hono/cors";
import fs from "node:fs/promises";

// Oppretter en ny Hono-applikasjon
const app = new Hono();

// Aktiverer CORS (Cross-Origin Resource Sharing) for alle ruter
app.use("/*", cors());

// Last inn data fra JSON-fil
async function loadData() {
  try {
    const data = await fs.readFile("./data.json", "utf8");
    console.log(`Lastet ${data.length} utstillinger`);
    return JSON.parse(data);
  } catch (error) {
    console.error("Feil ved lasting av data:", error);
  }
}

// GET / - Hent alle utstillinger
app.get("/", async (c) => {
  const exhibitions = await loadData();
  return c.json(exhibitions);
});

const port = 3999;

serve({
  fetch: app.fetch,
  port,
});
