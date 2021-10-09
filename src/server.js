import { Server } from "@ravens-engine/core/lib/server/index.js";
import CoupGame from "./CoupGame";

const server = new Server({
  gameClass: CoupGame
});

server.start();
