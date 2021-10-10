import * as React from "react";
import "../style.css";
import GameEndedPhase from "../phases/GameEndedPhase"
import GameInProgressPhase from "../phases/GameInProgressPhase"
import LobbyPhase from "../phases/LobbyPhase"

export default class TicTacToeComponent extends React.Component {
  render() {
    return <>
      <div>
        {this.gameStatus()}
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
    const currentUserId = this.props.client.userId;
    if (this.props.game.child instanceof GameInProgressPhase) {
      const gameInProgressPhase = this.props.game.child;
      if (gameInProgressPhase.isPlaying(currentUserId)) {
        return <>Player {currentUserId} - Turn: <b>{gameInProgressPhase.state.turn}</b> {gameInProgressPhase.isTurn(currentUserId) && "(Your turn)"}</>;
      }
      return <>Spectating - Turn: <b>{gameInProgressPhase.state.turn}</b></>
    }
    if (this.props.game.child instanceof GameEndedPhase) {
      const gameEndedPhase = this.props.game.child;
      if (gameEndedPhase.state.winner == null) {
        return <>Player {currentUserId} - Draw!</>;
      } else {
        return <>Player {currentUserId} - Winner: <b>{gameEndedPhase.state.winner}</b>!</>;
      }
    }
  }
  
  renderGameGrid() {
    if (this.props.game.child instanceof LobbyPhase) {
      return;
    }
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
