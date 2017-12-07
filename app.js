import * as d3 from "d3";
import {
  initializeGraph,
  scienceScore,
  averageScore,
  mathScore,
  readingScore,
  score,
  salary
} from "./graph";

initializeGraph();
// d3.csv("./data/example.csv", rows => {
//   rows.forEach(d => console.log(`${d.col1} ${d.col2}`));
// });
document.getElementById("science").addEventListener("click", () => {
  score("science")
})

document.getElementById("average").addEventListener("click", () => {
  score("average")
})

document.getElementById("math").addEventListener("click", () => {
  score("math")
})

document.getElementById("reading").addEventListener("click", () => {
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
