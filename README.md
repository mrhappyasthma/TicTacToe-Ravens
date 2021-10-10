# TicTacToe (Ravens)

A simple implementation of TicTacToe using the [Ravens engine](https://github.com/mrhappyasthma/core).

This is heavily based off of the RavensDev [tutorial](https://ravens.dev/tutorial/).

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
