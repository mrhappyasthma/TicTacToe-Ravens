import { InvalidActionError, Phase } from "@ravens-engine/core/lib/core/index.js";

export default class GameInProgressPhase  extends Phase {
  initialize() {
    this.state = {
      turn: "O"
    };
  }
  
  /** Returns true if it is currently the turn for the player with `userID`. */
  isTurn(userId) {
    const currentPlayerIndex = this.players.indexOf(userId);
    const turn = this.state.turn;
    return (currentPlayerIndex == 0 && turn == "O") || (currentPlayerIndex == 1 && turn == "X");
  }
  
  /**
   * The general action handler for all user actions triggered in the game.
   *
   * Args:
   *   userId: (string) Corresponds to the ID of the user that performed
   *                    the action
   *  action: (object) A JS object containing a description of the action
   *                   performed. Passed in by the action trigger.
   */
  applyAction(userId, action) {
    if (action.type == "fill") {
      // Check if the cell has already been filled.
      if (this.parent.state.grid[action.cell.x][action.cell.y] != null) {
        throw new InvalidActionError("Invalid move: cell already filled");
      }

      // Fill the grid with the new value.
      this.parent.state.grid[action.cell.x][action.cell.y] = this.state.turn;

      // Change which symbol's turn it is.
      this.state.turn = (this.state.turn == "O") ? "X" : "O";
    }
  }
}

GameInProgressPhase.id = "game-in-progress";