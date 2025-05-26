const buttonContainer = document.getElementById("button-cnt");
const input = document.getElementById("customColorInput");
const addBtn = document.getElementById("addColorBtn");
const buttons = document.querySelectorAll("#button-cnt button");
const lightColors = ["yellow", "white"];

function applyStyleButton(btn, color) {
  btn.style.backgroundColor = color;
  btn.style.color = lightColors.includes(color.toLowerCase())
    ? "black"
    : "white";
}

buttons.forEach((btn) => {
  applyStyleButton(btn, btn.id);
});

buttonContainer.addEventListener("click", (e) => {
  if (e.target.tagName === "BUTTON") {
    document.body.style.backgroundColor = e.target.id;
  }
});

// Handle custom buttons
addBtn.addEventListener("click", () => {
  const color = input.value.trim();

  if (color) {
    const newBtn = document.createElement("button");
    newBtn.id = color.toLowerCase();
    newBtn.textContent = color;
    applyStyleButton(newBtn, color);
    buttonContainer.appendChild(newBtn);
    input.value = "";
  }
});
