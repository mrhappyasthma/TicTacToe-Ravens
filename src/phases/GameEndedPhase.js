import { Phase } from "@ravens-engine/core/lib/core/index.js";
import { GameStatus } from "@ravens-engine/core/lib/core/GameStatus.js";

export default class GameEndedPhase extends Phase {
  initialize(winner) {
    this.setStatus(GameStatus.FINISHED);
    this.state = {
      winner
    }
  }
}

GameEndedPhase.id = "game-ended";