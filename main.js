const popupEl = document.querySelector("#popup");
const rootDOM = document.querySelector("#root");
const btnCreateBoxList = document.querySelectorAll(".btn-create");

let position = [0, 0];
let number = 0;

const main = () => {
  rootDOM.addEventListener("contextmenu", function (e) {
    e.preventDefault();
    openPopUp(e.clientX, e.clientY);
    position = [e.clientX, e.clientY];
  });

  btnCreateBoxList.forEach((btn) => {
    btn.addEventListener("click", createBox);
  });
};
function openPopUp(x, y) {
  popupEl.style.display = "block";
  popupEl.style.left = `${x}px`;
  popupEl.style.top = `${y}px`;
}
function closePopUp() {
  popupEl.style.display = "none";
}
function createBox(e) {
  const boxEle = document.createElement("div");
  boxEle.classList.add("box");
  boxEle.style.top = `${position[1]}px`;
  boxEle.style.left = `${position[0]}px`;
  boxEle.setAttribute(
    "center-point",
    `[${position[0] + 25}, ${position[1] + 25}]`
  );
  boxEle.setAttribute("top-point", `[${position[0] + 25}, ${position[1]}]`);
  boxEle.setAttribute("left-point", `[${position[0]}, ${position[1] + 25}]`);
  boxEle.setAttribute(
    "right-point",
    `[${position[0] + 50}, ${position[1] + 25}]`
  );
  boxEle.setAttribute(
    "bottom-point",
    `[${position[0] + 25}, ${position[1] + 50}]`
  );
  let type = e.target.getAttribute("type-button");
  switch (type) {
    case "create-square":
      boxEle.classList.add("square-box");
      boxEle.setAttribute("type", "square");
      break;
    case "create-circle":
      boxEle.classList.add("circle-box");
      boxEle.setAttribute("type", "circle");
      break;
    case "create-eclip":
      boxEle.classList.add("eclip-box");
      boxEle.setAttribute("type", "eclip");
      break;
    case "create-diamond":
      boxEle.classList.add("diamond-box");
      boxEle.setAttribute("type", "diamond");
      break;
    default:
      alert("Giá trị không hợp lệ !");
      break;
  }

  boxEle.addEventListener("click", function () {
    selectBox(boxEle);
  });
  rootDOM.appendChild(boxEle);
  closePopUp();
}
function selectBox(boxEle) {
  let selectedBoxes = document.querySelectorAll(".selected");
  if (boxEle.classList.contains("selected")) {
    boxEle.classList.remove("selected");
    number--;
  } else {
    boxEle.classList.add("selected");
    number++;
  }
  if (number === 2) {
    drawLine();
  }
  if (number > 2) {
    selectedBoxes.forEach((s) => {
      s.classList.remove("selected");
    });
    boxEle.classList.add("selected");
    number = 1;
  }
}
function drawLine() {
  let svg = document.createElement('svg')
  let line = document.createElement('line')
  let selectedBoxEle1 = document.querySelectorAll('.selected')[0]
  let selectedBoxEle2 = document.querySelectorAll('.selected')[1]

  let selectedBoxCenterPoint1 = JSON.parse(selectedBoxEle1.getAttribute('center-point'))
  let selectedBoxCenterPoint2 = JSON.parse(selectedBoxEle2.getAttribute('center-point'))
  let x1 = selectedBoxCenterPoint1[0]
  let y1 = selectedBoxCenterPoint1[1]
  let x2 = selectedBoxCenterPoint2[0]
  let y2 = selectedBoxCenterPoint2[1]
  let svgWidth = Math.abs(x2 - x1 )
  let svgHeight = Math.abs(y2 - y1 )

  line.setAttribute('stroke','white')
  line.setAttribute('x1',x1)
  line.setAttribute('y1',y1)
  line.setAttribute('x2',x2)
  line.setAttribute('y2',y2)
  svg.setAttribute('width',svgWidth)
  svg.setAttribute('height',svgHeight)

  svg.appendChild(line)
  rootDOM.appendChild(svg)
}
document.addEventListener("DOMContentLoaded", main);
document.addEventListener("click", function () {
  closePopUp();
});
