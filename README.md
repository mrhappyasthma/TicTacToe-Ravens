# Love Letter (Ravens)

A simple implementation of the game Love Letter using the [Ravens engine](https://github.com/mrhappyasthma/core).

## Game Rules

### Base game

Love Letter plays 2-4 players.

For a description of the rules, see: https://www.ultraboardgames.com/love-letter/game-rules.php

For a detailed description of each character in the base game, see https://www.ultraboardgames.com/love-letter/the-people.php

### Premium edition

Love Letter Premium extends the game by adding more cards to support 5-8 players.

For the premium edition rules, see: https://www.ultraboardgames.com/love-letter/premium-edition.php

For a detailed description of the new characters introduced in the premium edition, see: https://www.ultraboardgames.com/love-letter/premium-edition.php

## Building and Running

### How to deploy the game services locally

If you don't already have [node.js](https://nodejs.org/en/download/) installed, install the first.

Then open a terminal in the respository and issue:

```
npm install
```

Then run the following command to start the client service:

```
npm run start-client
```

Next, open another terminal and run the following command to start the server service:

```
npm run start-server
```

### Launching the game locally

The game can be accessed by opening a web browser and navigating to the local host.

To connect multiple players at once, add `#X` to the end of the URL, where `X` is the player position, starting with 1.

For example, player 1 would connect to: `http://localhost:8080#1`. And player 2 would connect to `http://localhost:8080#2`.