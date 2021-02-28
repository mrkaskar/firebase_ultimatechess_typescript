const jsChessEngine = require("js-chess-engine");
const { aiMove } = jsChessEngine;
/* eslint-disable no-restricted-globals */

onmessage = (e) => {
  let fen = e.data.fen;
  let level = e.data.leve;
  const aimove = aiMove(fen, level);

  postMessage({
    result: aimove,
  });
};
