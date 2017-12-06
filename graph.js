import * as d3 from 'd3';

const buildGraph = () => {
  const outerWidth = 1000;
  const outerHeight = 500;
  const margin = { left: 70, top: 70, right: 70, bottom: 70 };

  const innerWidth = outerWidth - margin.left - margin.right;
  const innerHeight = outerHeight - margin.top - margin.bottom;
  const rMin = 5;
  const rMax = 8;
  const xColumn = "salary_average";
  const yColumn = "percentile_average_mean_score";
  const rColumn = "GDP";
  const colorColumn = "region";

  const svg = d3.select("body").append("svg")
    .attr("width", outerWidth)
    .attr("height", outerHeight)

  const g = svg.append("g")
    .attr("transform", `translate(${margin.left}, ${margin.top})`);

  const xAxisG = g.append("g")
    .attr("transform", `translate(0, ${innerHeight})`);

  const yAxisG = g.append("g");

  const xScale = d3.scaleLinear().range([innerWidth, 0]);
  const yScale = d3.scaleLinear().range([innerHeight, 0]);
  const rScale = d3.scaleSqrt().range([rMin, rMax]);
  const colorScale = d3.scaleOrdinal(d3.schemeCategory10);
  const xAxis = d3.axisBottom(xScale);
  const yAxis = d3.axisLeft(yScale);

  const render = data => {
    xScale.domain(d3.extent(data, d => d[xColumn]));
    yScale.domain(d3.extent(data, d => d[yColumn]));
    rScale.domain([0, d3.max(data, d => d[rColumn])]);

    xAxisG.call(xAxis);
    yAxisG.call(yAxis);

    //Enter
    const circles = g.selectAll("circle").data(data);
    circles.enter().append("circle").attr("opacity", 0.8);

    //Update
    g.selectAll("circle").data(data)
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
