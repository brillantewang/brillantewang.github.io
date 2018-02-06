import * as d3 from "d3";
import {
  initializeGraph,
  scienceScore,
  averageScore,
  mathScore,
  readingScore,
  score,
  salary,
  updateRegion,
  toggleSelectedBtn
} from "./graph";

initializeGraph();

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
  toggleSelectedBtn("upper-secondary", "school-type-btn");
  salary("upper_secondary")
})

document.getElementById("average-salary").addEventListener("click", () => {
  toggleSelectedBtn("average-salary", "school-type-btn");
  salary("average")
})

d3.selectAll(".my-checkbox").on("change", updateRegion);
