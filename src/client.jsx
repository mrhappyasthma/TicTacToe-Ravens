import * as React from "react";
import * as ReactDOM from "react-dom";
import { GameComponent } from "@ravens-engine/core/lib/client/index.js";
import LoveLetterGame from "./LoveLetterGame";
import LoveLetterComponent from "./components/LoveLetterComponent";

ReactDOM.render(
  <GameComponent gameClass={LoveLetterGame} rootComponent={LoveLetterComponent} />,
  document.getElementById("root")
);
