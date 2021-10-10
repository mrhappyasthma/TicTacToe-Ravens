import { Phase } from "@ravens-engine/core/lib/core/index.js";

export default class GameEndedPhase extends Phase {
  initialize(winner) {
    this.state = {
      winner
    }
  }
}

GameEndedPhase.id = "game-ended";