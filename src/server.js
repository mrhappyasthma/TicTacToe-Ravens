import { Server } from "@ravens-engine/core/lib/server/index.js";
import CoupGame from "./LoveLetterGame.js";

const server = new Server({
  gameClass: LoveLetterGame
});

server.start();
