import * as d3 from "d3";
import {
  initializeGraph,
  scienceScore,
  averageScore,
  mathScore,
  readingScore,
  score
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
