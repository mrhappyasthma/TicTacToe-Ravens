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
          {this.renderGameGrid()}
		    </tbody>
      </table>
    </>;
  }
  
  gameStatus() {
    if (this.props.game.child instanceof LobbyPhase) {
      return <>Waiting for <b>{2 - this.props.game.players.length}</b> more player(s)...</>;
    }
    if (this.props.game.child instanceof GameInProgressPhase) {
      const gameInProgressPhase = this.props.game.child;
      return <>Turn: <b>{gameInProgressPhase.state.turn}</b> {gameInProgressPhase.isTurn(this.props.client.userId) && "(Your turn)"}</>;
    }
    if (this.props.game.child instanceof GameEndedPhase) {
      const gameEndedPhase = this.props.game.child;
      if (gameEndedPhase.state.winner == 'null') {
        return <>Draw!</>;
      } else {
        return <>Winner: <b>{gameEndedPhase.state.winner}</b>!</>;
      }
    }
  }
  
  renderGameGrid() {
    return <>
      {this.props.game.state.grid.map((row, x) => (
        <tr key={x}>
          {this.props.game.state.grid[x].map((cell, y) => (
            <td key={y}
                className={this.canFill(x, y) ? "clickable" : ""}
                onClick={this.onCellClick.bind(this, x, y)}>
                  {cell}
            </td>
          ))}
        </tr>
      ))}
    </>;
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
    if (!(this.props.game.child instanceof GameInProgressPhase)) {
      return false;
    }
    const gameInProgressPhase = this.props.game.child;
    if (!gameInProgressPhase.isTurn(this.props.client.userId)) {
      return false;
    }
    if (this.props.game.state.grid[x][y] != null) {
      return false;
    }
    return true;
  }
}
