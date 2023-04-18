const thead = document.getElementById("table-heading-row");
const tbody = document.getElementById("table-body");
const columns = 26;
const rows = 100;
let currCell;
let cutValue = {};
const boldBtn = document.getElementById("bold-btn");
const italicsBtn = document.getElementById("italics-btn");
const underlineBtn = document.getElementById("underline-btn");

const textColor = document.getElementById("text-color");
const bgColor = document.getElementById("bg-color");

const leftAlign = document.getElementById("left-align");
const rightAlign = document.getElementById("right-align");
const centerAlign = document.getElementById("center-align");

const fontSize = document.getElementById("font-size");
const fontFamily = document.getElementById("font-family");

const cutBtn = document.getElementById("cut-btn");
const copyBtn = document.getElementById("copy-btn");
const pasteBtn = document.getElementById("paste-btn");

// alphabets.forEach((alphabet) => {
//   var th = document.createElement("th");
//   th.innerText = alphabet;
//   thead.appendChild(th);
// });

for (let column = 0; column < columns; column++) {
  let th = document.createElement("th");
  th.innerText = String.fromCharCode(65 + column);
  thead.appendChild(th);
}

for (let row = 0; row < rows; row++) {
  let tr = document.createElement("tr");
  let th = document.createElement("th");
  th.innerText = row + 1;
  tr.appendChild(th);

  for (let col = 0; col < columns; col++) {
    let td = document.createElement("td");
    td.setAttribute("contenteditable", "true");
    td.setAttribute("spellcheck", "false");
    td.setAttribute("id", `${String.fromCharCode(65 + col)}${row + 1}`);
    td.addEventListener("focus", (event) => onFocusFnc(event));
    tr.appendChild(td);
  }
  //append the row into the bodyw
  tbody.appendChild(tr);
}

function onFocusFnc(event) {
  console.log("In focus:", event.target);
  currCell = event.target;
  document.getElementById("current-cell").innerText = event.target.id;
}

// event listeners for buttons

boldBtn.addEventListener("click", () => {
  if (currCell.style.fontWeight == "bold") {
    currCell.style.fontWeight = "normal";
  } else {
    currCell.style.fontWeight = "bold";
  }
  console.log("bold", currCell);
});

italicsBtn.addEventListener("click", () => {
  if (currCell.style.fontStyle == "italic") {
    currCell.style.fontStyle = "normal";
  } else {
    currCell.style.fontStyle = "italic";
  }
  console.log("italics", currCell);
});

underlineBtn.addEventListener("click", () => {
  if (currCell.style.textDecoration == "underline") {
    currCell.style.textDecoration = null;
  } else {
    currCell.style.textDecoration = "underline";
  }
  console.log("underline", currCell);
});

bgColor.addEventListener("change", () => {
  currCell.style.backgroundColor = bgColor.value;
});

textColor.addEventListener("change", () => {
  currCell.style.color = textColor.value;
});

leftAlign.addEventListener("click", () => {
  currCell.style.textAlign = "left";
});

rightAlign.addEventListener("click", () => {
  currCell.style.textAlign = "right";
});
centerAlign.addEventListener("click", () => {
  currCell.style.textAlign = "center";
});

fontSize.addEventListener("change", () => {
  currCell.style.fontSize = fontSize.value;
});

fontFamily.addEventListener("change", () => {
  currCell.style.fontFamily = fontFamily.value;
});

cutBtn.addEventListener("click", () => {
  cutValue = {
    style: currCell.style.cssText,
    text: currCell.innerText,
  };
  currCell.style = null;
  currCell.innerText = null;
});

copyBtn.addEventListener("click", () => {
  cutValue = {
    style: currCell.style.cssText,
    text: currCell.innerText,
  };
});

pasteBtn.addEventListener("click", () => {
  currCell.style.cssText = cutValue.style;
  currCell.innerText = cutValue.text;
});
