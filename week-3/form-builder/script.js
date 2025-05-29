const fieldType = document.getElementById("fieldType");
const fieldLabel = document.getElementById("fieldLabel");
const addFieldBtn = document.getElementById("addField");
const previewForm = document.getElementById("previewForm");

addFieldBtn.addEventListener("click", () => {
  const type = fieldType.value;
  const labelText = fieldLabel.value.trim();

  if (!labelText) {
    alert("Please enter a label");
    return;
  }

  const fieldWrapper = document.createElement("div");

  const label = document.createElement("label");
  label.innerText = labelText;

  let input;
  switch (type) {
    case "text":
      input = document.createElement("input");
      input.type = "text";
      break;
    case "checkbox":
      input = document.createElement("input");
      input.type = "checkbox";
      break;
    case "radio":
      input = document.createElement("input");
      input.type = "radio";
      input.name = labelText;
      break;
  }

  fieldWrapper.appendChild(label);
  fieldWrapper.appendChild(input);
  previewForm.appendChild(fieldWrapper);

  fieldLabel.value = "";
});
