var store = {
  cells: ["1", "2", "3", "4", "5", "6", "7", "8", "9"],
  player1: [],
  player2: [],
  combinations: [
    ["1", "2", "3"],
    ["4", "5", "6"],
    ["7", "8", "9"],
    ["1", "4", "7"],
    ["2", "5", "8"],
    ["3", "6", "9"],
    ["1", "5", "9"],
    ["3", "5", "7"],
  ],
  isGameOver: false,
  turnCount: 1,
};

// генерация полей

var container = document.querySelector(".container");

function createField() {
  var field = document.createElement("div");
  field.className = "field";
  container.prepend(field);
}
createField();

function createTitle(textTitle) {
  var title = document.createElement("h1");
  title.className = "title";
  title.textContent = textTitle;
  container.prepend(title);
}
createTitle("X vs 0");

function createBtn(text) {
  var btn = document.createElement("button");
  btn.className = "btn";
  btn.setAttribute("id", text);
  var field = document.querySelector(".field");
  field.append(btn);
}

for (var i = 0; i < store.cells.length; i++) {
  createBtn(store.cells[i]);
}

// определение победителя

var buttons = document.querySelectorAll(".btn");
var resultField = document.querySelector(".result");

function checkWinner(e) {
  console.log(store);
  var elem = e.target;
  if (store.turnCount % 2 === 0) {
    elem.innerHTML = "0";
    store.player2.push(elem.id);
  } else {
    elem.innerHTML = "x";
    store.player1.push(elem.id);
  }

  store.turnCount++;

  store.combinations.forEach(function (combination) {
    if (compareValues(store.player1, combination)) {
      resultField.textContent = "Победил Игрок 1";
      store.isGameOver = true;
    } else if (compareValues(store.player2, combination)) {
      resultField.textContent = "Победил Игрок 2";
      store.isGameOver = true;
    }
  });

  if (store.isGameOver) {
    buttons.forEach(function (button) {
      button.removeEventListener("click", checkWinner);
    });
    return;
  }

  if (store.turnCount === 10) {
    resultField.textContent = "Ничья!";
    store.isGameOver = true;
  }
}

buttons.forEach(function (button) {
  button.addEventListener("click", checkWinner, { once: true });
});

function compareValues(arr, combination) {
  return combination.every(function (elem) {
    return arr.includes(elem);
  });
}

// кнопка перезапуска игры

var resetBtn = document.createElement("button");
resetBtn.className = "reset-game";
resetBtn.textContent = "Перезапустить";
container.append(resetBtn);

resetBtn.addEventListener("click", function () {
  for (var i = 0; i < buttons.length; i++) {
    buttons[i].innerHTML = "";
    buttons[i].addEventListener("click", checkWinner, { once: true });
  }
  store.player1 = [];
  store.player2 = [];
  store.turnCount = 1;
  store.isGameOver = false;
  resultField.textContent = "Играть заново!";
});
