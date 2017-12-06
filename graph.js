import * as d3 from 'd3';

const buildGraph = () => {
  const outerWidth = 250;
  const outerHeight = 250;
  const rMin = 5;
  const rMax = 20;
  const xColumn = "salary";
  const yColumn = "score";
  const rColumn = "GDP";
  const colorColumn = "continent";

  const svg = d3.select("body").append("svg")
    .attr("width", 250)
    .attr("height", 250)

  const xScale = d3.scaleLinear().range([0, outerWidth]);
  const yScale = d3.scaleLinear().range([outerHeight, 0]);
  const rScale = d3.scaleLinear().range([rMin, rMax]);
  const colorScale = d3.scaleOrdinal(d3.schemeCategory10);

  const render = data => {
    xScale.domain(d3.extent(data, d => d[xColumn]));
    yScale.domain(d3.extent(data, d => d[yColumn]));
    rScale.domain(d3.extent(data, d => d[rColumn]));

    //Enter
    const circles = svg.selectAll("circle").data(data);
    circles.enter().append("circle");

    //Update
    svg.selectAll("circle").data(data)
      .attr("cx", d => xScale(d[xColumn]))
      .attr("cy", d => yScale(d[yColumn]))
      .attr("r", d => rScale(d[rColumn]))
      .attr("fill", d => colorScale(d[colorColumn]))

    // circles
    //   .attr("cx", function(){ console.log('hello'); })
    //   .attr("cy", function(d){ return yScale(d.score); })

    //Exit
    circles.exit().remove();
  }

  const type = d => {
    d.salary = +d.salary;
    d.score = +d.score;
    return d;
  }

  d3.csv("./data/example.csv", type, render);
}

export default buildGraph;
