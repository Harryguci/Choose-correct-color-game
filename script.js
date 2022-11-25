$(document).ready(function () {
  let maxScore = 0;
  let modeTheme = 0;

  $(".change-theme").on("click", function () {
    if (modeTheme == 0) {
      $("html, body").css("background", "#1B2430");
      $(".change-theme .material-symbols-outlined").css("color", "#ffffff");
      modeTheme = 1;
    } else {
      $("html, body").css("background", "#ffffff");
      $(".change-theme .material-symbols-outlined").css("color", "#1B2430");
      modeTheme = 0;
    }
  });

  var gameMap = [
    [0, 0, 0],
    [0, 0, 0],
    [0, 0, 0],
  ];
  const rand = function () {
    var row = Math.floor(Math.random() * 3);
    var col = Math.floor(Math.random() * 3);

    return { row, col };
  };
  const randColors = function () {
    var R = Math.floor(Math.random() * 255);
    var G = Math.floor(Math.random() * 255);
    var B = Math.floor(Math.random() * 255);
    return { R, G, B };
  };

  const init = () => {
    currCell = rand();
    gameMap[currCell.row][currCell.col] = 1;
    var elem;
    $(".frame__main .item").each(function () {
      if (
        $(this).attr("data-col") == currCell.col &&
        $(this).attr("data-row") == currCell.row
      ) {
        elem = $(this);
      }
    });
    elem.css({
      background: "blue",
    });
  };
  init();

  var score = 0;
  var currCell = { col: 0, row: 0 };

  const resetEveryThing = function () {
    gameMap = [
      [0, 0, 0],
      [0, 0, 0],
      [0, 0, 0],
    ];
    score = 0;

    $(".score-val").text("0");
  };

  const handleCell = function () {
    var currColor = randColors();
    $(".frame__main .item").each(function () {
      $(this).css(
        "background",
        `rgb(${currColor.R},${currColor.G},${currColor.B})`
      );
    });
    gameMap = [
      [0, 0, 0],
      [0, 0, 0],
      [0, 0, 0],
    ];
    currColor.R += 5;
    currColor.G += 5;
    currColor.B += 5;

    currColor.R = Math.min(255, currColor.R);
    currColor.G = Math.min(255, currColor.G);
    currColor.B = Math.min(255, currColor.B);

    currCell = rand();
    gameMap[currCell.row][currCell.col] = 1;
    var elem;
    $(".frame__main .item").each(function () {
      if (
        $(this).attr("data-col") == currCell.col &&
        $(this).attr("data-row") == currCell.row
      ) {
        elem = $(this);
      }
    });
    elem.css({
      background: `rgb(${currColor.R},${currColor.G},${currColor.B})`,
    });
  };

  const checkEnd = function (row, col) {
    return row == currCell.row && col == currCell.col;
  };

  $(".frame__main .item").click(function () {
    var is = checkEnd($(this).attr("data-row"), $(this).attr("data-col"));

    if (is) {
      score += 5;
      $(".score-val").text(score);
    } else {
      maxScore = Math.max(maxScore, score);
      $(".score-val").text("LOOSE");
      $(".modal .max-score").text(maxScore);
      $(".modal").show();
    }
    handleCell();
  });

  $("#reset-btn").click(function () {
    console.log("clicked");
    resetEveryThing();
  });

  $(".modal").on("click", function () {
    $(".modal .modal-footer button").on("click", resetEveryThing());
    $(".modal").hide();
  });
});
