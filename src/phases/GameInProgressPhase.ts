import { InvalidActionError, Phase } from "@ravens-engine/core/lib/core/index.js";
import { GameStatus } from "@ravens-engine/core/lib/core/GameStatus.js";
import GameEndedPhase from "./GameEndedPhase"

export default class GameInProgressPhase extends Phase {
  parent: any;

  initialize() {
    this.setStatus(GameStatus.STARTED);
    this.state = {
      turn: "O"
    };
  }
  
  /** Returns true if the user ID is one of the players. For spectators, returns false. */
  isPlaying(userId: string) {
    const symbolForUser = this.symbolForUserId(userId);
    return (this.symbolForUserId(userId) != null)
  }
  
  /** Returns true if it is currently the turn for the player with `userID`. */
  isTurn(userId: string) {
    const symbolForUser = this.symbolForUserId(userId);
    const turn = this.state.turn;
    return (symbolForUser == turn);
  }
  
  /** Determines the tic-tac-toe symbol for the player's ID. */
  symbolForUserId(userId: string) {
    const indexOfUserId = this.players.indexOf(userId);
    if (indexOfUserId == 0) {
      return "O";
    } else if (indexOfUserId == 1) {
      return "X";
    }
    return null;
  }
  
  /** Checks the game board to determine if any player has won. */
  isVictory() {
    const winningMoves = [
      [[0, 0], [0, 1], [0, 2]],  // Top row
      [[1, 0], [1, 1], [1, 2]],  // Middle row
      [[2, 0], [2, 1], [2, 2]],  // Bottom row
      [[0, 0], [1, 0], [2, 0]],  // Left column
      [[0, 1], [1, 1], [2, 1]],  // Middle column
      [[0, 2], [1, 2], [2, 2]],  // Right column
      [[0, 0], [1, 1], [2, 2]],  // Diagonal (top-left to bottom-right)
      [[2, 0], [1, 1], [0, 2]],  // Diagonal (bottom-left to top-right)
    ];
    
    return ["O", "X"].some(symbol => winningMoves.some(line => line.every(([x,y]) => this.parent.state.grid[x][y] == symbol)));
  }

  /** Checks the game board to determine if there is a draw. */
  isDraw() {
    // This method should be called after checking for victory. But, just to be safe,
    // do not consider a draw if the board has a victory in it.
    if (this.isVictory()) {
      return false;
    }
    // Iterate all cells to determine if the board is full. If so, then there must
    // be a draw.
    for (let x = 0; x < 3; x++) {
      for (let y = 0; y < 3; y++) {
        if (this.parent.state.grid[x][y] == null) {
          return false;
        }
      }
    }
    return true;
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
  applyAction(userId: string, action: any) {
    // This game phase currently only supports the 'fill' action.
    if (action.type != "fill") {
      return;
    }
    if (this.parent.state.grid[action.cell.x][action.cell.y] != null) {
      throw new InvalidActionError("Invalid move: cell already filled.");
    }
    const symbol = this.symbolForUserId(userId);
    if (this.state.turn != symbol) {
      throw new InvalidActionError("Invalid move: not ${symbol}'s turn to play.");
    }

    // Fill the grid with the new value.
    this.parent.state.grid[action.cell.x][action.cell.y] = symbol;

    // Update which symbol's turn is next.
    this.state.turn = (symbol == "O") ? "X" : "O";
    
    if (this.isVictory()) {
      this.parent.setChild(GameEndedPhase, /*winner=*/symbol); 
    } else if (this.isDraw()) {
      this.parent.setChild(GameEndedPhase, /*winner=*/null);
    }
  }
}

GameInProgressPhase.id = "game-in-progress";