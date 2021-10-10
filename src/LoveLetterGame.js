import { Game, InvalidActionError } from "@ravens-engine/core/lib/core/index.js";

export default class LoveLetterGame extends Game {
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
      grid: emptyGrid,
      turn: "O"
    }
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
      if (this.state.grid[action.cell.x][action.cell.y] != null) {
        throw new InvalidActionError("Invalid move: cell already filled");
      }

      // Fill the grid with the new value.
      this.state.grid[action.cell.x][action.cell.y] = this.state.turn;

      // Change which symbol's turn it is.
      this.state.turn = (this.state.turn == "O") ? "X" : "O";
    }
  }
}
