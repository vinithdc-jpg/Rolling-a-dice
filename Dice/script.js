const diceCountInput = document.getElementById('dice-count');
const rollButton = document.getElementById('roll');
const resultsDiv = document.getElementById('results');
const historyDiv = document.getElementById('history');

function rollDie() {
  return Math.floor(Math.random() * 6) + 1;
}

function clamp(value, min, max) {
  return Math.max(min, Math.min(max, value));
}

function validateInputs() {
  const diceCount = clamp(parseInt(diceCountInput.value, 10) || 1, 1, 100);
  diceCountInput.value = String(diceCount);
  return { diceCount };
}

function create3DDice(value) {
  const diceContainer = document.createElement('div');
  diceContainer.className = 'dice-3d';
  
  // Create faces in the correct order for 3D positioning
  // Face 1 (front) - shows 1 dot
  const face1 = document.createElement('div');
  face1.className = 'dice-face face-1';
  diceContainer.appendChild(face1);
  
  // Face 2 (right) - shows 2 dots  
  const face2 = document.createElement('div');
  face2.className = 'dice-face face-2';
  diceContainer.appendChild(face2);
  
  // Face 3 (back) - shows 3 dots
  const face3 = document.createElement('div');
  face3.className = 'dice-face face-3';
  const dot3_1 = document.createElement('div');
  dot3_1.className = 'dot-3';
  face3.appendChild(dot3_1);
  diceContainer.appendChild(face3);
  
  // Face 4 (left) - shows 4 dots
  const face4 = document.createElement('div');
  face4.className = 'dice-face face-4';
  const dot4_1 = document.createElement('div');
  dot4_1.className = 'dot-3';
  const dot4_2 = document.createElement('div');
  dot4_2.className = 'dot-4';
  face4.appendChild(dot4_1);
  face4.appendChild(dot4_2);
  diceContainer.appendChild(face4);
  
  // Face 5 (top) - shows 5 dots
  const face5 = document.createElement('div');
  face5.className = 'dice-face face-5';
  const dot5_1 = document.createElement('div');
  dot5_1.className = 'dot-3';
  const dot5_2 = document.createElement('div');
  dot5_2.className = 'dot-4';
  const dot5_3 = document.createElement('div');
  dot5_3.className = 'dot-5';
  face5.appendChild(dot5_1);
  face5.appendChild(dot5_2);
  face5.appendChild(dot5_3);
  diceContainer.appendChild(face5);
  
  // Face 6 (bottom) - shows 6 dots
  const face6 = document.createElement('div');
  face6.className = 'dice-face face-6';
  const dot6_1 = document.createElement('div');
  dot6_1.className = 'dot-3';
  const dot6_2 = document.createElement('div');
  dot6_2.className = 'dot-4';
  const dot6_3 = document.createElement('div');
  dot6_3.className = 'dot-5';
  const dot6_4 = document.createElement('div');
  dot6_4.className = 'dot-6';
  face6.appendChild(dot6_1);
  face6.appendChild(dot6_2);
  face6.appendChild(dot6_3);
  face6.appendChild(dot6_4);
  diceContainer.appendChild(face6);
  
  // Set the final rotation to show the correct face
  setTimeout(() => {
    const rotations = {
      1: 'rotateX(0deg) rotateY(0deg)',      // Show face 1 (front)
      2: 'rotateX(0deg) rotateY(90deg)',     // Show face 2 (right)
      3: 'rotateX(0deg) rotateY(180deg)',    // Show face 3 (back)
      4: 'rotateX(0deg) rotateY(-90deg)',    // Show face 4 (left)
      5: 'rotateX(90deg) rotateY(0deg)',     // Show face 5 (top)
      6: 'rotateX(-90deg) rotateY(0deg)'     // Show face 6 (bottom)
    };
    diceContainer.style.transform = rotations[value];
    diceContainer.classList.add('final-position');
  }, 1000);
  
  return diceContainer;
}

function renderResults(rolls) {
  const total = rolls.reduce((sum, n) => sum + n, 0);
  const row = document.createElement('div');
  row.className = 'row';
  
  rolls.forEach((value) => {
    const dice3D = create3DDice(value);
    row.appendChild(dice3D);
  });
  
  const totalChip = document.createElement('div');
  totalChip.className = 'total';
  totalChip.textContent = `Total: ${total}`;
  row.appendChild(totalChip);

  resultsDiv.innerHTML = '';
  resultsDiv.appendChild(row);

  const histItem = document.createElement('div');
  histItem.className = 'history-item';
  histItem.textContent = `Rolled ${rolls.length}d6 → [ ${rolls.join(', ')} ] = ${total}`;
  historyDiv.prepend(histItem);
}

function performRoll() {
  const { diceCount } = validateInputs();
  const rolls = Array.from({ length: diceCount }, () => rollDie());
  renderResults(rolls);
}

rollButton.addEventListener('click', performRoll);
document.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') {
    performRoll();
  }
});
