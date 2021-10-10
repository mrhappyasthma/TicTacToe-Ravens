import * as React from "react";
import * as ReactDOM from "react-dom";
import { GameComponent } from "@ravens-engine/core/lib/client/index.js";
import CoupGame from "./LoveLetterGame";
import CoupComponent from "./LoveLetterComponent";

ReactDOM.render(
  <GameComponent gameClass={LoveLetterGame} rootComponent={LoveLetterComponent} />,
  document.getElementById("root")
);
