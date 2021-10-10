import * as React from "react";
import "./style.css";

export default class CoupComponent extends React.Component {
  render() {
    const tableRows = [];
    for (let x = 0; x < 3; x++) {
      const row = [];

      for (let y = 0; y < 3; y++) {
        row.push(<td onClick={this.onCellClick.bind(this, x, y)}>{this.props.game.state.grid[x][y]}</td>);
      }

      tableRows.push(<tr>{row}</tr>);
    }

    return (
      <div>
        <div>Turn: {this.props.game.state.turn}</div>
        <table>
		      <tbody>
            {tableRows}
		      </tbody>
        </table>
      </div>
    );
  }
  
  onCellClick(x, y) {
    this.props.client.sendAction({
      type: "fill",
      cell: {
        x,
        y
      }
    });
  }
}
