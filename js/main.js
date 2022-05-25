function createField() {
  var field = document.createElement("div");
  field.className = "field";
  var container = document.querySelector(".container");
  container.prepend(field);
}
createField();

function createBtn(count) {
  var btn = document.createElement("button");
  btn.className = "btn";
  btn.setAttribute("id", count);
  document.querySelector(".field").append(btn);
}

function generateField(number) {
  var countBtn = number;
  for (var i = 0; i < countBtn; i++) {
    createBtn(i + 1);
  }
}
generateField(9);

var buttons = document.querySelectorAll(".btn");
var turnCount = 0;
buttons.forEach(function (button) {
  button.addEventListener("click", function (e) {
    turnCount++;
    var elem = e.target;
    elem.innerHTML = turnCount % 2 === 0 ? "X" : "0";
  });
});

// console.log(field);
