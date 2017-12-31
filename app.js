import * as d3 from "d3";
import {
  initializeGraph,
  scienceScore,
  averageScore,
  mathScore,
  readingScore,
  score,
  salary,
  updateRegion
} from "./graph";

initializeGraph();
// d3.csv("./data/example.csv", rows => {
//   rows.forEach(d => console.log(`${d.col1} ${d.col2}`));
// });

const toggleSelectedBtn = (btnId, btnClass) => {
  let selectedNode = document.getElementById(btnId);
  let otherNodes = document.getElementsByClassName(btnClass);
  // let otherNodes = [];

  for (let i = 0; i < otherNodes.length; i++) {
    let currNode = otherNodes[i];

    if (currNode === selectedNode) {
      currNode.classList.add("selected-btn");
    } else {
      currNode.classList.remove("selected-btn");
    }
  }

  console.log(selectedNode);
  console.log(otherNodes);
}

document.getElementById("science").addEventListener("click", () => {
  toggleSelectedBtn("science", "subject-btn");
  score("science")
})

document.getElementById("average").addEventListener("click", () => {
  toggleSelectedBtn("average", "subject-btn");
  score("average")
})

document.getElementById("math").addEventListener("click", () => {
  toggleSelectedBtn("math", "subject-btn");
  score("math")
})

document.getElementById("reading").addEventListener("click", () => {
  toggleSelectedBtn("reading", "subject-btn");
  score("reading")
})

//school type buttons

document.getElementById("primary").addEventListener("click", () => {
  toggleSelectedBtn("primary", "school-type-btn");
  salary("primary")
})

document.getElementById("lower-secondary").addEventListener("click", () => {
  toggleSelectedBtn("lower-secondary", "school-type-btn");
  salary("lower_secondary")
})

document.getElementById("upper-secondary").addEventListener("click", () => {
  salary("upper_secondary")
})

document.getElementById("average-salary").addEventListener("click", () => {
  salary("average")
})

d3.selectAll(".my-checkbox").on("change", updateRegion);
