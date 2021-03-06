import { Game } from "@ravens-engine/core/lib/core/index.js";
import GameEndedPhase from "./phases/GameEndedPhase"
import GameInProgressPhase from "./phases/GameInProgressPhase"
import LobbyPhase from "./phases/LobbyPhase"

interface TicTacToeGameState {
  grid: string[][]
}

export default class TicTacToeGame extends Game<any, TicTacToeGameState> {
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
    
    // @ts-ignore
    this.setChild(LobbyPhase);
  }
}
// @ts-ignore
TicTacToeGame.childPhaseClasses = [LobbyPhase, GameInProgressPhase, GameEndedPhase];