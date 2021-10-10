import * as React from "react";
import * as ReactDOM from "react-dom";
import { GameComponent } from "@ravens-engine/core/lib/client/index.js";
import CoupGame from "./CoupGame";
import CoupComponent from "./CoupComponent";

ReactDOM.render(
  <GameComponent gameClass={CoupGame} rootComponent={CoupComponent} />,
  document.getElementById("root")
);
