import * as React from "react";
import "../style.css";
import GameEndedPhase from "../phases/GameEndedPhase"
import GameInProgressPhase from "../phases/GameInProgressPhase"
import LobbyPhase from "../phases/LobbyPhase"

export default class LoveLetterComponent extends React.Component {
  render() {
    return <>
      <div>
        Player {this.props.client.userId} - {this.gameStatus()}
      </div>

      <table>
		    <tbody>

		    </tbody>
      </table>
    </>;
  }
  
  gameStatus() {
    if (this.props.game.child instanceof LobbyPhase) {
      return <>Waiting for <b>{2 - this.props.game.players.length}</b> more player(s)...</>;
    }
    if (this.props.game.child instanceof GameInProgressPhase) {
      let gameInProgressPhase = this.props.game.child;
      return <>Turn: <b>{gameInProgressPhase.state.turn}</b> {gameInProgressPhase.isTurn(this.props.client.userId) && "(Your turn)"}</>;
    }
    if (this.props.game.child instanceof GameEndedPhase) {
      let gameEndedPhase = this.props.game.child;
      if (gameEndedPhase.state.winner == 'null') {
        return <>Draw!</>;
      } else {
        return <>Winner: <b>{gameEndedPhase.state.winner}</b>!</>;
      }
    }
  }
  
  onCellClick(x, y) {
    if (!this.canFill(x, y)) {
      return;
    }
    this.props.client.sendAction({
      type: "fill",
      cell: {
        x,
        y
      }
    });
  }

  canFill(x, y) {
    return (this.props.game.state.grid[x][y] == null);
  }
}
