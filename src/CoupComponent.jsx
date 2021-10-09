export default class CoupComponent extends React.Component {
  render() {
    let tableRows = [];
    for (let x = 0; x < 3; x++) {
      const row = [];

      for (let y = 0; y < 3; y++) {
        row.push(<td>this.props.game.state.grid[x][y]</td>);
      }

      tableRows.push(<th>{row}</th>);
    }

    return (
      <div style="display: flex; align-items: center">
        <div>{this.props.game.state.turn}</div>
        <table>
          {tablerows}
        </table>
      </div>
    );
  }
}
