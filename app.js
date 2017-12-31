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

const toggleSelectedNode = subject => {
  let selectedNode = document.getElementById(subject);
  let subjectNodes = document.getElementsByClassName("subject-btn");
  // let otherNodes = [];

  for (let i = 0; i < subjectNodes.length; i++) {
    let currNode = subjectNodes[i];

    if (currNode === selectedNode) {
      currNode.classList.add("selected-btn");
    } else {
      currNode.classList.remove("selected-btn");
    }
  }

  console.log(selectedNode);
  console.log(subjectNodes);
}

document.getElementById("science").addEventListener("click", () => {
  toggleSelectedNode("science");
  score("science")
})

document.getElementById("average").addEventListener("click", () => {
  toggleSelectedNode("average");
  score("average")
})

document.getElementById("math").addEventListener("click", () => {
  toggleSelectedNode("math");
  score("math")
})

document.getElementById("reading").addEventListener("click", () => {
  toggleSelectedNode("reading");
  score("reading")
})

//school type buttons

document.getElementById("primary").addEventListener("click", () => {
  salary("primary")
})

document.getElementById("lower-secondary").addEventListener("click", () => {
  salary("lower_secondary")
})

document.getElementById("upper-secondary").addEventListener("click", () => {
  salary("upper_secondary")
})

document.getElementById("average-salary").addEventListener("click", () => {
  salary("average")
})

d3.selectAll(".my-checkbox").on("change", updateRegion);
