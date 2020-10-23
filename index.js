let columnSize = 9;
let rowSize = 9;
let bombsLeft = 9;

// let currentSum = 0;
let score = 0;
let gameOver = false;

// let target;

let grid = [[], [], [], [], [], [], [], [], []];
let bombPosArray = [];

const createGrid = () => {
  for (let i = 0; i < columnSize; i++) {
    for (let j = 0; j < rowSize; j++) {
      grid[i][j] = null;
    }
  }
  console.log("Checkpoint Create Grid Acheived");
  placeBombs();
};

let randomBombIndex = function () {
  let i = Math.floor(Math.random() * 9);
  let j = Math.floor(Math.random() * 9);

  if (i === 9) {
    i = 8;
  } else if (j === 9) {
    j = 8;
  }

  let bombIndex = i + "x" + j;

  return bombIndex;
};

const placeBombs = () => {
  let firstClick = bombPosArray[0];

  while (bombPosArray.length !== 10) {
    let bombIndex = randomBombIndex();
    let present = false;

    for (let i = 0; i < bombPosArray.length; i++) {
      if (bombPosArray[i] === bombIndex) {
        present = true;
        break;
      }
    }

    if (!present) {
      bombPosArray.push(bombIndex);
    }
  }
  // console.log(bombPosArray);

  for (let k = 1; k <= 9; k++) {
    let i = bombPosArray[k][0];
    let j = bombPosArray[k][2];

    grid[i][j] = "💣";
  }

  // for first click
  let firstI = +firstClick[0];
  let firstJ = +firstClick[2];

  grid[firstI][firstJ] = bombsInVicinity(firstI, firstJ);

  for (let i = 0; i < rowSize; i++) {
    for (let j = 0; j < columnSize; j++) {
      if (grid[i][j] !== "💣" && grid[i][j] !== grid[firstI][firstJ]) {
        grid[i][j] = bombsInVicinity(i, j);
      }
    }
  }

  console.log("Checkpoint check placeBombs again");
};

const bombsInVicinity = (i, j) => {
  let count = 0;
  let arrI = [];
  let arrJ = [];

  //direct arr me push krke aur dekho like arr,push[0,0]etc

  if (i === 0 && j === 0) {
    arrI = [0, 1];
    arrJ = [0, 1];
  } else if (i === 0 && j === 8) {
    arrI = [0, 1];
    arrJ = [7, 8];
  } else if (i === 8 && j === 0) {
    arrI = [8, 7];
    arrJ = [0, 1];
  } else if (i === 8 && j === 8) {
    arrI = [7, 8];
    arrJ = [7, 8];
  } else if (i < 8 && i > 0 && j === 0) {
    arrI = [i, i - 1, i + 1];
    arrJ = [0, 1];
  } else if (i < 8 && i > 0 && j === 8) {
    arrI = [i, i - 1, i + 1];
    arrJ = [7, 8];
  } else if (j < 8 && j > 0 && i === 0) {
    arrI = [0, 1];
    arrJ = [j, j - 1, j + 1];
  } else if (j < 8 && j > 0 && i === 8) {
    arrI = [7, 8];
    arrJ = [j, j - 1, j + 1];
  } else {
    // condition if needed (i + 1 < 9 && i - 1 >= 0 && j + 1 < 9 && j - 1 >= 0)
    arrI = [i, i + 1, i - 1];
    arrJ = [j, j + 1, j - 1];
  }

  // console.log(arrI);
  // console.log(arrJ);

  for (let x = 0; x < arrI.length; x++) {
    for (let y = 0; y < arrJ.length; y++) {
      if (grid[arrI[x]][arrJ[y]] === "💣") {
        count++;
      }
    }
  }

  // console.log("Checkpoint bomnsInVicinity acheived");
  // console.log(count);

  return count;
};

// const initTarget = () => {
//   target = 10 + Math.ceil(Math.random() * 50);
//   document.getElementById("target").innerHTML = target;
// };

// const updateBombs = (score) => {
//   document.getElementById("score").innerHTML = "Score :" + score;
// };

const getId = (i, j) => {
  return i.toString() + j.toString();
};

// let updateBoard = () => {
//   for (let i = 0; i < grid.length; i++) {
//     for (let j = 0; j < grid[i].length; j++) {
//       const el = document.getElementById(getId(i, j));
//       el.innerHTML = grid[i][j].value;

//       if (grid[i][j].selected === true) {
//         el.classList.add("selected");
//       } else if (el.classList.contains("selected")) {
//         el.classList.remove("selected");
//       }
//     }
//   }
// };

const showCell = (i, j) => {
  const el = document.getElementById(getId(i, j));
  el.innerHTML = grid[i][j];
  el.setAttribute("disabled", getId(i, j));
};

let gameIsOver = () => {
  for (let i = 0; i < columnSize; i++) {
    for (let j = 0; j < rowSize; j++) {
      if (grid[i][j] === "💣") {
        bombCellClass(i, j);
      }
      showCell(i, j);
    }
  }
};

const cellClass = (i, j) => {
  const el = document.getElementById(getId(i, j));
  el.classList.remove("cell");
  el.classList.add("newCell");
};

const bombCellClass = (i, j) => {
  const el = document.getElementById(getId(i, j));
  el.classList.remove("cell");
  el.classList.add("bombCell");
};

const markBombCellClass = (i, j) => {
  const el = document.getElementById(getId(i, j));
  el.classList.remove("cell");
  el.classList.add("markBombCell");
};

const rightClick = (i, j) => {
  if (gameOver) {
    return;
  }

  if (bombsLeft === 0) {
    let updateLeftBombs = document.getElementById("bombsLeft");
    updateLeftBombs.innerHTML = `No Bombs Left`;
    return;
  }

  const el = document.getElementById(getId(i, j));
  el.selected = !el.selected;

  if (el.selected) {
    el.innerHTML = "!";
    markBombCellClass(i, j);
    bombsLeft--;
  } else {
    el.innerHTML = "";
    bombsLeft++;
    el.classList.remove("markBombCell");
    el.className = "cell center";
  }

  let updateLeftBombs = document.getElementById("bombsLeft");
  updateLeftBombs.innerHTML = `BombsLeft : ${bombsLeft}`;
};

const handleClick = (cell, i, j) => {
  if (gameOver) {
    return;
  }

  if (cell.selected) {
    cell.classList.remove("markBombCell");
    cell.className = "cell center";
  }

  if (score === 0) {
    bombPosArray.push(i + "x" + j);
    // console.log(bombPosArray[0]);
    // console.log("checkpoint 1");
    createGrid();
    cellClass(i, j);
    showCell(i, j);
    // console.log("checkpoint");
    score++;
    // console.log(score);
    return;
  }

  if (grid[i][j] === "💣") {
    gameOver = true;
    gameIsOver();
    setTimeout(() => {
      alert("Game Over");
    }, 400);
  }

  showCell(i, j);
  cellClass(i, j);
};

const initBoard = () => {
  let board = document.getElementById("board");
  board.innerHTML = "";

  for (let i = 0; i < rowSize; i++) {
    let rowEl = document.createElement("div");
    rowEl.className = "row";
    for (let j = 0; j < columnSize; j++) {
      let cellEl = document.createElement("div");
      cellEl.setAttribute("id", getId(i, j));
      cellEl.setAttribute("selected", false);
      cellEl.className = "cell center";
      cellEl.addEventListener("click", () => handleClick(cellEl, i, j));
      cellEl.addEventListener("contextmenu", () => rightClick(i, j));
      cellEl.addEventListener(
        "contextmenu",
        function (e) {
          e.preventDefault();
        },
        false
      );
      rowEl.appendChild(cellEl);
    }
    board.appendChild(rowEl);
  }
};

const startGame = () => {
  initBoard();
};

const restartGame = () => {
  score = 0;
  gameOver = false;
  grid = [[], [], [], [], [], [], [], [], []];
  bombPosArray = [];
  bombsLeft = 9;
  startGame();
};
