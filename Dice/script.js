const $ = (id) => document.getElementById(id);

const diceCountInput = $("dice-count");
const rollButton = $("roll");
const resultsDiv = $("results");
const historyDiv = $("history");


// Enhanced random roll with a little delay for animation
const rollDie = () => Math.floor(Math.random() * 6) + 1;

const clamp = (v, min, max) => Math.max(min, Math.min(max, v));

const validateInputs = () => {
  const diceCount = clamp(+diceCountInput.value || 1, 1, 100);
  diceCountInput.value = diceCount;
  return diceCount;
};

const rotations = {
  1: "rotateX(0) rotateY(0)",
  2: "rotateY(90deg)",
  3: "rotateY(180deg)",
  4: "rotateY(-90deg)",
  5: "rotateX(90deg)",
  6: "rotateX(-90deg)",
};

// Dot map (which dots appear on each face)
const faceDots = {
  1: [],
  2: [],
  3: ["dot-3"],
  4: ["dot-3", "dot-4"],
  5: ["dot-3", "dot-4", "dot-5"],
  6: ["dot-3", "dot-4", "dot-5", "dot-6"],
};

function createFace(num) {
  const face = document.createElement("div");
  face.className = `dice-face face-${num}`;

  faceDots[num].forEach((dot) => {
    const d = document.createElement("div");
    d.className = dot;
    face.appendChild(d);
  });

  return face;
}

function create3DDice(value) {
  const dice = document.createElement("div");
  dice.className = "dice-3d";

  // create all 6 faces
  for (let i = 1; i <= 6; i++) {
    dice.appendChild(createFace(i));
  }

  // Animate: reset transform, then apply final rotation with bounce
  dice.style.transform = '';
  dice.classList.remove('final-position');
  setTimeout(() => {
    dice.style.transform = rotations[value] + ' scale(1.08)';
    dice.classList.add("final-position");
    setTimeout(() => {
      dice.style.transform = rotations[value];
    }, 180);
  }, 800);

  return dice;
}

function renderResults(rolls) {
  const total = rolls.reduce((a, b) => a + b, 0);

  const row = document.createElement("div");
  row.className = "row";

  rolls.forEach((v) => row.appendChild(create3DDice(v)));

  const totalDiv = document.createElement('div');
  totalDiv.className = 'total';
  totalDiv.textContent = `Total: ${total}`;
  row.appendChild(totalDiv);

  resultsDiv.innerHTML = "";
  resultsDiv.appendChild(row);

  historyDiv.innerHTML =
    `<div class="history-item">🎲 Rolled <b>${rolls.length}d6</b> → [ <span style='color:var(--accent)'>${rolls.join(", ")}</span> ] = <b>${total}</b></div>` +
    historyDiv.innerHTML;
}

function performRoll() {
  const count = validateInputs();
  const rolls = Array.from({ length: count }, rollDie);
  renderResults(rolls);
}

rollButton.onclick = performRoll;
document.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    rollButton.classList.add('active');
    setTimeout(() => rollButton.classList.remove('active'), 200);
    performRoll();
  }
});