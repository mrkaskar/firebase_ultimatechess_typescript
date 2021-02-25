const STOCKFISH = window.STOCKFISH;

const engineGame = (player, game, options, positionUpdate) => {
  options = options || {};
  let engine =
    typeof STOCKFISH === "function"
      ? STOCKFISH()
      : new Worker(options.stockfishjs || "stockfish.js");
  let evaler =
    typeof STOCKFISH === "function"
      ? STOCKFISH()
      : new Worker(options.stockfishjs || "stockfish.js");
  let engineStatus = {};
  let time = { wtime: 3000, btime: 3000, winc: 1500, binc: 1500 };
  let playerColor = player;
  function uciCmd(cmd, which) {
    // console.log('UCI: ' + cmd);

    (which || engine).postMessage(cmd);
  }
  uciCmd("uci");

  function get_moves() {
    let moves = "";
    let history = game.history({ verbose: true });

    for (let i = 0; i < history.length; ++i) {
      let move = history[i];
      moves +=
        " " + move.from + move.to + (move.promotion ? move.promotion : "");
    }

    return moves;
  }

  const prepareMove = () => {
    let turn = game.turn() === "w" ? "white" : "black";
    if (!game.game_over()) {
      if (turn !== playerColor) {
        uciCmd("position startpos moves" + get_moves());
        uciCmd("position startpos moves" + get_moves(), evaler);
        uciCmd("eval", evaler);

        if (time && time.wtime) {
          uciCmd(
            "go " +
              (time.depth ? "depth " + time.depth : "") +
              " wtime " +
              time.wtime +
              " winc " +
              time.winc +
              " btime " +
              time.btime +
              " binc " +
              time.binc
          );
        } else {
          uciCmd("go " + (time.depth ? "depth " + time.depth : ""));
        }
      }
    }
  };

  evaler.onmessage = function (event) {
    let line;
    if (event && typeof event === "object") {
      line = event.data;
    } else {
      line = event;
    }
    if (
      line === "uciok" ||
      line === "readyok" ||
      line.substr(0, 11) === "option name"
    ) {
      return;
    }
  };

  engine.onmessage = (event) => {
    let line;

    if (event && typeof event === "object") {
      line = event.data;
    } else {
      line = event;
    }
    if (line === "uciok") {
      engineStatus.engineLoaded = true;
    } else if (line === "readyok") {
      engineStatus.engineReady = true;
    } else {
      let match = line.match(/^bestmove ([a-h][1-8])([a-h][1-8])([qrbn])?/);
      if (match) {
        game.move({ from: match[1], to: match[2], promotion: match[3] });
        positionUpdate(game.fen());
        prepareMove();
        uciCmd("eval", evaler);
      } else if ((match = line.match(/^info .*\bdepth (\d+) .*\bnps (\d+)/))) {
        engineStatus.search = "Depth: " + match[1] + " Nps: " + match[2];
      }

      if ((match = line.match(/^info .*\bscore (\w+) (-?\d+)/))) {
        let score = parseInt(match[2], 10) * (game.turn() === "w" ? 1 : -1);

        if (match[1] === "cp") {
          engineStatus.score = (score / 100.0).toFixed(2);
        } else if (match[1] === "mate") {
          engineStatus.score = "Mate in " + Math.abs(score);
        }

        /// Is the score bounded?
        if ((match = line.match(/\b(upper|lower)bound\b/))) {
          engineStatus.score =
            ((match[1] === "upper") === (game.turn() === "w") ? "<= " : ">= ") +
            engineStatus.score;
        }
      }
    }
    // displayStatus();
  };

  return {
    setSkillLevel: function (skill) {
      var max_err, err_prob;

      if (skill < 0) {
        skill = 0;
      }
      if (skill > 20) {
        skill = 20;
      }

      time.level = skill;

      /// Change thinking depth allowance.
      if (skill < 5) {
        time.depth = "1";
      } else if (skill < 10) {
        time.depth = "2";
      } else if (skill < 15) {
        time.depth = "3";
      } else {
        /// Let the engine decide.
        time.depth = "";
      }

      uciCmd("setoption name Skill Level value " + skill);

      ///NOTE: Stockfish level 20 does not make errors (intentially), so these numbers have no effect on level 20.
      /// Level 0 starts at 1
      err_prob = Math.round(skill * 6.35 + 1);
      /// Level 0 starts at 10
      max_err = Math.round(skill * -0.5 + 10);

      uciCmd("setoption name Skill Level Maximum Error value " + max_err);
      uciCmd("setoption name Skill Level Probability value " + err_prob);
    },
    setAggressiveness: function (value) {
      uciCmd("setoption name Aggressiveness value " + value);
    },

    start: function () {
      uciCmd("ucinewgame");
      uciCmd("isready");
      engineStatus.engineReady = false;
      engineStatus.search = null;
      prepareMove();
    },
    prepareMove: function () {
      prepareMove();
    },
  };
};

export default engineGame;
