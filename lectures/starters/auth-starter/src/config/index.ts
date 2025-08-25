import { env } from "cloudflare:workers";

const PORT = env.PORT;
const APP_URL = "https://localhost:5137";
const APP_VERSION = "v1";
const API_URL = `${APP_URL}/api/${APP_VERSION}`;

export { PORT, APP_URL, API_URL };
