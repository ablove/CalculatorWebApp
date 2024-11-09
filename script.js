const display = document.getElementById("display");
let currentInput = "";
let isNewInput = false;

document.querySelectorAll(".button").forEach((button) => {
  button.addEventListener("click", () => {
    const value = button.textContent;

    if (!isNaN(value) || value === ".") {
      handleNumber(value);
    } else if (value === "C") {
      clearDisplay();
    } else if (value === "=") {
      calculate();
    } else if (value === "CE") {
      deleteLast();
    } else {
      handleOperator(value);
    }
  });
});

function handleNumber(num) {
  if (isNewInput) {
    currentInput = num;
    isNewInput = false;
  } else {
    currentInput += num;
  }
  updateDisplay();
}

function handleOperator(op) {
  if (op === "√") {
    if (currentInput) {
      currentInput = Math.sqrt(parseFloat(currentInput)).toString();
      isNewInput = true;
    }
  } else if (!currentInput.endsWith(" ")) {
    currentInput += ` ${op} `;
  }
  updateDisplay();
}

function calculate() {
  try {
    let expression = currentInput.replace(/x/g, "*").replace(/÷/g, "/");
    const result = eval(expression);
    currentInput = result.toString();
    isNewInput = true;
  } catch (error) {
    currentInput = "Error";
    isNewInput = true;
  }
  updateDisplay();
}

function clearDisplay() {
  currentInput = "";
  updateDisplay();
}

function deleteLast() {
  if (currentInput.endsWith(" ")) {
    currentInput = currentInput.slice(0, -3);
  } else {
    currentInput = currentInput.slice(0, -1);
  }
  updateDisplay();
}

function updateDisplay() {
  display.textContent = currentInput || "0";
}
