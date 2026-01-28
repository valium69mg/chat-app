import app from "./app.js";
import { initSocket } from "./websocket.js";
import dotenv from "dotenv";
dotenv.config();

const PORT = process.env.PORT || 3000;
const server = initSocket(app);

server.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
