import { Game } from "@ravens-engine/core/lib/core/index.js";
import GameEndedPhase from "./phases/GameEndedPhase.js"
import GameInProgressPhase from "./phases/GameInProgressPhase.js"
import LobbyPhase from "./phases/LobbyPhase.js"

export default class TicTacToeGame extends Game {
  initialize() {
    const emptyGrid = [
      [null, null, null],
      [null, null, null],
      [null, null, null]
    ];

    // NOTE: The state of the game must be a pure javascript object
    // to allow for Ravens to seralize it. This means it cannot
    // contain class instances or cyclical references.
    this.state = {
      grid: emptyGrid
    };
    
    this.setChild(LobbyPhase);
  }
}

TicTacToeGame.childPhaseClasses = [LobbyPhase, GameInProgressPhase, GameEndedPhase];