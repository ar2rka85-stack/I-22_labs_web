// Пікселі для цифр (координати 3x5)
const digits = {
  "0": [[1,1],[2,1],[3,1],[1,2],[3,2],[1,3],[3,3],[1,4],[3,4],[1,5],[2,5],[3,5]],
  "1": [[2,1],[2,2],[2,3],[2,4],[2,5]],
  "2": [[1,1],[2,1],[3,1],[3,2],[1,3],[2,3],[3,3],[1,4],[1,5],[2,5],[3,5]],
  "3": [[1,1],[2,1],[3,1],[3,2],[1,3],[2,3],[3,3],[3,4],[1,5],[2,5],[3,5]],
  "4": [[1,1],[3,1],[1,2],[3,2],[1,3],[2,3],[3,3],[3,4],[3,5]],
  "5": [[1,1],[2,1],[3,1],[1,2],[1,3],[2,3],[3,3],[3,4],[1,5],[2,5],[3,5]],
  "6": [[1,1],[2,1],[3,1],[1,2],[1,3],[2,3],[3,3],[1,4],[3,4],[1,5],[2,5],[3,5]],
  "7": [[1,1],[2,1],[3,1],[3,2],[2,3],[2,4],[2,5]],
  "8": [[1,1],[2,1],[3,1],[1,2],[3,2],[1,3],[2,3],[3,3],[1,4],[3,4],[1,5],[2,5],[3,5]],
  "9": [[1,1],[2,1],[3,1],[1,2],[3,2],[1,3],[2,3],[3,3],[3,4],[1,5],[2,5],[3,5]]
};

let generatedNumber;

function generateNumber() {
  return String(Math.floor(10 + Math.random() * 90)); // 10–99
}

function drawNumber(num) {
  const c = document.getElementById("canvas");
  const ctx = c.getContext("2d");
  ctx.clearRect(0, 0, c.width, c.height);
  let pixels = [];

  const first = digits[num[0]];
  const second = digits[num[1]].map(p => [p[0] + 5, p[1]]); // смещение второй цифры вправо

  pixels = first.concat(second);

  // Fisher–Yates shuffle
  for (let i = pixels.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    const tmp = pixels[i];
    pixels[i] = pixels[j];
    pixels[j] = tmp;
  }

  // рисуем
  const size = 18;
  pixels.forEach(p => {
    const x = p[0] * size;
    const y = p[1] * size;
    ctx.fillRect(x, y, size - 4, size - 4);
  });
}

function setup() {
  generatedNumber = generateNumber();
  drawNumber(generatedNumber);

  document.getElementById("checkBtn").addEventListener("click", check);
  document.getElementById("userInput").addEventListener("keydown", e => {
    if (e.key === "Enter") check();
  });
}

function check() {
  const input = document.getElementById("userInput").value.trim();
  const result = document.getElementById("result");
  if (input === generatedNumber) {
    result.textContent = "✅ Успіх!";
  } else {
    result.textContent = "❌ Помилка";
  }
}

window.onload = setup;
