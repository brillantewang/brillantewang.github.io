import * as d3 from 'd3';

const outerWidth = 1250;
const outerHeight = 600;
const margin = { left: 250, top: 70, right: 50, bottom: 100 };

const innerWidth = outerWidth - margin.left - margin.right;
const innerHeight = outerHeight - margin.top - margin.bottom;
const rMin = 8;
const rMax = 12;
const xColumn = "salary_average";
const yColumn = "percentile_average_mean_score";
const rColumn = "GDP";
const colorColumn = "region";

const xAxisLabelText = "Teacher Salary in USD (converted using PPP)";
const xAxisLabelOffset = 75;

const yAxisLabelText = "Score Percentile";
const yAxisLabelOffset = 50;

const svg = d3.select("body").insert("svg", ".school-type-btns")
  .attr("width", outerWidth)
  .attr("height", outerHeight)

const g = svg.append("g")
  .attr("transform", `translate(${margin.left}, ${margin.top})`);

const xAxisG = g.append("g")
  .attr("class", "x axis")
  .attr("transform", `translate(0, ${innerHeight})`);

const xAxisLabel = xAxisG.append("text")
  .style("text-anchor", "middle")
  .attr("x", innerWidth / 2)
  .attr("y", xAxisLabelOffset)
  .attr("class", "label")
  .text(xAxisLabelText);

// const xAxisButtons = xAxisG.append("div")
//   .attr("class", "subject-btns");
//
// xAxisButtons
//   .append("button")
//   .attr("class", "subject-btn")
//   .attr("id", "average")
//   .html("average")

const yAxisG = g.append("g")
  .attr("class", "y axis");

const yAxisLabel = yAxisG.append("text")
  .style("text-anchor", "middle")
  .attr("transform", `translate(-${yAxisLabelOffset}, ${innerHeight / 2}) rotate(-90)`)
  .attr("class", "label")
  .text(yAxisLabelText);

const xScale = d3.scaleLog().range([innerWidth, 0]);
const yScale = d3.scaleLinear().range([innerHeight, 0]);
const rScale = d3.scaleSqrt().range([rMin, rMax]);
const colorScale = d3.scaleOrdinal(d3.schemeCategory10);
const xAxis = d3.axisBottom(xScale).ticks(20).tickFormat(d3.format(".0s"));
const yAxis = d3.axisLeft(yScale).ticks(10);

export const initializeGraph = () => {
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
      .attr("cx", 0)
      .attr("cy", innerHeight)
      .attr("r", 0)

    g.selectAll("circle").data(data).transition()
      .attr("cx", d => xScale(d[xColumn]))
      .attr("cy", d => yScale(d[yColumn]))
      .attr("r", d => rScale(d[rColumn]))
      .attr("fill", d => colorScale(d[colorColumn]))
      .duration(1200)
      .delay((d, i) => i * 100)
      .ease(d3.easeElastic.period(0.7));


    // circles
    //   .attr("cx", function(){ console.log('hello'); })
    //   .attr("cy", function(d){ return yScale(d.score); })

    //Exit
    circles.exit().remove();
  }

  // const type = d => {
  //   d.salary = +d.salary;
  //   d.score = +d.score;
  //   return d;
  // }

  d3.csv("./data/master_filtered.csv", render);
}

export const score = subject => {
  const yColumn = `percentile_${subject}_mean_score`;

  const render = data => {
    yScale.domain(d3.extent(data, d => d[yColumn]));

    g.selectAll("circle").data(data).transition()
      .attr("cy", d => yScale(d[yColumn]))
      .duration(2000)
      .ease(d3.easeElastic.period(0.7));
  }

  d3.csv("./data/master_filtered.csv", render)
}

export const salary = school_type => {
  const xColumn = `salary_${school_type}`;

  const render = data => {
    xScale.domain(d3.extent(data, d => d[xColumn]));

    g.selectAll("circle").data(data).transition()
      .attr("cx", d => xScale(d[xColumn]))
      .duration(2000)
      .ease(d3.easeElastic.period(0.7));
  }

  d3.csv("./data/master_filtered.csv", render)
}

export const updateRegion = () => {
  const checkedRegions = [];

  d3.selectAll(".my-checkbox").each(function(d) {
    let checkbox = d3.select(this);
    if (checkbox.property("checked")) {
      checkedRegions.push(checkbox.property("value"));
    }
  });

  const render = data => {
    g.selectAll("circle").data(data).transition()
      .attr("opacity", d => checkedRegions.includes(d.region) ? 0.8 : 0)
      .duration(500)
  }

  d3.csv("./data/master_filtered.csv", render)
}
