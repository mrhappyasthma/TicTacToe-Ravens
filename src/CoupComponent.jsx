import * as React from "react";

export default class CoupComponent extends React.Component {
  render() {
    const tableRows = [];
    for (let x = 0; x < 3; x++) {
      const row = [];

      for (let y = 0; y < 3; y++) {
        row.push(<td style={{ width: '50px', height: '50px', border: '1px solid black'}}>{this.props.game.state.grid[x][y]}</td>);
      }

      tableRows.push(<tr>{row}</tr>);
    }

    return (
      <div style={{ display: 'flex', alignItems: 'center'}}>
        <div>Turn: {this.props.game.state.turn}</div>
        <table>
		  <tbody>
            {tableRows}
		  </tbody>
        </table>
      </div>
    );
  }
}
