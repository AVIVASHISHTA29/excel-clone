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
  // console.log(currCell.style.cssText);
  // console.log(cssStringToJson(currCell.style.cssText));
  // console.log(currCell.id);
}

// event listeners for buttons

boldBtn.addEventListener("click", () => {
  if (currCell.style.fontWeight == "bold") {
    currCell.style.fontWeight = "normal";
  } else {
    currCell.style.fontWeight = "bold";
  }
  console.log("bold", currCell);
  updateJson(currCell);
});

italicsBtn.addEventListener("click", () => {
  if (currCell.style.fontStyle == "italic") {
    currCell.style.fontStyle = "normal";
  } else {
    currCell.style.fontStyle = "italic";
  }
  console.log("italics", currCell);
  updateJson(currCell);
});

underlineBtn.addEventListener("click", () => {
  if (currCell.style.textDecoration == "underline") {
    currCell.style.textDecoration = null;
  } else {
    currCell.style.textDecoration = "underline";
  }
  console.log("underline", currCell);
  updateJson(currCell);
});

bgColor.addEventListener("change", () => {
  currCell.style.backgroundColor = bgColor.value;
  updateJson(currCell);
});

textColor.addEventListener("change", () => {
  currCell.style.color = textColor.value;
  updateJson(currCell);
});

leftAlign.addEventListener("click", () => {
  currCell.style.textAlign = "left";
  updateJson(currCell);
});

rightAlign.addEventListener("click", () => {
  currCell.style.textAlign = "right";
  updateJson(currCell);
});
centerAlign.addEventListener("click", () => {
  currCell.style.textAlign = "center";
  updateJson(currCell);
});

fontSize.addEventListener("change", () => {
  currCell.style.fontSize = fontSize.value;
  updateJson(currCell);
});

fontFamily.addEventListener("change", () => {
  currCell.style.fontFamily = fontFamily.value;
  updateJson(currCell);
});

cutBtn.addEventListener("click", () => {
  cutValue = {
    style: currCell.style.cssText,
    text: currCell.innerText,
  };
  updateJson(currCell);
  currCell.style = null;
  currCell.innerText = null;
});

copyBtn.addEventListener("click", () => {
  cutValue = {
    style: currCell.style.cssText,
    text: currCell.innerText,
  };
  updateJson(currCell);
});

pasteBtn.addEventListener("click", () => {
  currCell.style.cssText = cutValue.style;
  currCell.innerText = cutValue.text;
  updateJson(currCell);
});

// get current cells data in this format
//  {
//   "bold": false,
//   "italic": "normal",
//   "underline": "none",
//   "fontFamily": "Arial",
//   "fontSize": "10",
//   "textAlign": "left"
// }

// save all elements data in a json.

const matrix = new Array(rows);

for (let i = 0; i < rows; i++) {
  matrix[i] = new Array(columns);
  for (let j = 0; j < columns; j++) {
    matrix[i][j] = {}; // Initialize each element with 0 or any default value you prefer
  }
}

function updateJson(cell) {
  let currCellJson = cssStringToJson(cell.style.cssText);
  currCellJson = { ...currCellJson, text: cell.innerText, id: cell.id };
  var id = cell.id.split("");
  var i = id[0].charCodeAt(0) - 65;
  var j = id[1] - 1;
  matrix[i][j] = currCellJson;
  console.log(matrix);
  // font-weight: bold; font-style: italic; text-decoration: underline; color: rgb(255, 0, 0); background-color: rgb(0, 0, 0); text-align: center; font-size: 16px;
}

function cssStringToJson(cssString) {
  const json = {};
  const properties = cssString.split(";");

  properties.forEach((property) => {
    const [key, value] = property.split(":");

    if (key.trim() && value.trim()) {
      json[key.trim()] = value.trim();
    }
  });

  return json;
}

function downloadJson() {
  // Define your JSON data

  // Convert JSON data to a string
  const jsonString = JSON.stringify(matrix);

  // Create a Blob with the JSON data and set its MIME type to application/json
  const blob = new Blob([jsonString], { type: "application/json" });

  // Create an anchor element and set its href attribute to the Blob URL
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = "data.json"; // Set the desired file name

  // Append the link to the document, click it to start the download, and remove it afterward
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

document.getElementById("jsonFile").addEventListener("change", readJsonFile);

function readJsonFile(event) {
  const file = event.target.files[0];

  if (file) {
    const reader = new FileReader();

    reader.onload = function (e) {
      const fileContent = e.target.result;

      // Parse the JSON file content and process the data
      try {
        const jsonData = JSON.parse(fileContent);
        console.log(jsonData);
        jsonData.forEach((row) => {
          row.forEach((cell) => {
            if (cell.id) {
              var myCell = document.getElementById(cell.id);
              myCell.innerText = cell.text;
              delete cell.text;
              delete cell.id;
              Object.keys(cell).map((key) => {
                myCell.style[key] = cell[key];
              });
            }
          });
        });
        // Process the JSON data as needed
      } catch (error) {
        console.error("Error parsing JSON file:", error);
      }
    };

    reader.readAsText(file);
  }
}
