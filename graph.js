import * as d3 from 'd3';

const buildGraph = () => {
  const outerWidth = 500;
  const outerHeight = 250;
  const innerWidth = outerWidth - 30;
  const innerHeight = outerHeight - 30;
  const rMin = 5;
  const rMax = 8;
  const xColumn = "salary_average";
  const yColumn = "percentile_average_mean_score";
  const rColumn = "GDP";
  const colorColumn = "region";

  const svg = d3.select("body").append("svg")
    .attr("width", 500)
    .attr("height", 500)

  const xScale = d3.scaleLog().range([0, innerWidth]);
  const yScale = d3.scaleLinear().range([innerHeight, 0]);
  const rScale = d3.scaleSqrt().range([rMin, rMax]);
  const colorScale = d3.scaleOrdinal(d3.schemeCategory10);

  const render = data => {
    xScale.domain(d3.extent(data, d => d[xColumn]));
    yScale.domain(d3.extent(data, d => d[yColumn]));
    rScale.domain([0, d3.max(data, d => d[rColumn])]);

    //Enter
    const circles = svg.selectAll("circle").data(data);
    circles.enter().append("circle").attr("opacity", 0.7);

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

  d3.csv("./data/master_filtered.csv", type, render);
}

export default buildGraph;
