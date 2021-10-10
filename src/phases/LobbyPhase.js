import { Phase } from "@ravens-engine/core/lib/core/index.js";

export class LobbyPhase extends Phase {
  /**
   * Adds player(s) to the game during the lobby stage. Once two players
   * have been connected, the game will begin automatically.
   */
  onUserConnection(userId) {
    this.addPlayer(userId);
    
    // Start the game automatically once two players have connected.
    if (this.players.length == 2) {
      this.parent.setChild(GameInProgressPhase);
    }
  }
  
  onUserDisconnect(userId) {
    this.removePlayer(userId);
  }
}

LobbyPhase.id = "lobby";