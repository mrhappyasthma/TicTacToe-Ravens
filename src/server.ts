import { Server } from "@ravens-engine/core/lib/server/index.js";
import TicTacToeGame from "./TicTacToeGame";

// @ts-ignore
const server = new Server({
// @ts-ignore
  gameClass: TicTacToeGame
});

server.start();
