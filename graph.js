import * as d3 from 'd3';

const outerWidth = 1250;
const outerHeight = 600;
const margin = { left: 250, top: 70, right: 50, bottom: 100 };

const innerWidth = outerWidth - margin.left - margin.right;
const innerHeight = outerHeight - margin.top - margin.bottom;
const rMin = 8;
const rMax = 12;
let xColumn;
let yColumn;
const rColumn = "GDP";
const colorColumn = "region";

const xAxisLabelText = "Teacher Salary in USD (converted using PPP)";
const xAxisLabelOffset = 75;

const yAxisLabelText = "Score Percentile";
const yAxisLabelOffset = 50;

const svgContainer = d3.select("body").insert("div", ".school-type-btns").attr("class", "svg-container");

const svg = d3.select(".svg-container").insert("svg", ".school-type-btns")
  .attr("width", outerWidth)
  .attr("height", outerHeight)

// const tip = d3.select('.svg-container').append('div')
//   .attr('class', 'tip')
//   .html('I am a tooltip...')
//   .style('border', '1px solid black')
//   .style('position', 'absolute')
//   .style('display', 'none')
//   .on('mouseover', d => {
//     tip.transition().duration(0)
//   })
//   .on('mouseout', d => {
//     tip.style('display', 'none')
//   })

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
  xColumn = "salary_average";
  yColumn = "percentile_average_mean_score";

  const render = data => {
    xScale.domain(d3.extent(data, d => d[xColumn]));
    yScale.domain(d3.extent(data, d => d[yColumn]));
    rScale.domain([0, d3.max(data, d => d[rColumn])]);

    xAxisG.call(xAxis);
    yAxisG.call(yAxis);

    //Enter
    const circleGroups = g.selectAll("g.circle-group").data(data);
    circleGroups.enter().append("g")
      .attr("class", "circle-group")
      .attr("transform", d => `translate(0, ${innerHeight})`)
      .on("click", function() {
        d3.select(this).select("circle").transition().attr("r", 100);
        d3.select(this).select("text").transition().attr("opacity", 1);
      })
      // .on('mouseout', function() {
      //   d3.select(this).select("circle").transition().attr("r", d => rScale(d[rColumn]))
      //   d3.select(this).select("text").transition().attr("opacity", 0);
      // })
    g.selectAll("g.circle-group").append("circle")
      .attr("r", 0)
      .attr("opacity", 0.8)

    g.selectAll("circle").data(data)
      .on('mouseout', function() {
        d3.select(this).transition().attr("r", d => rScale(d[rColumn]))
        d3.select(this.parentNode).select("text").transition().attr("opacity", 0);
      })

    //adding text to circle groups
    g.selectAll("g.circle-group").data(data)
      .append("text")
      .attr("class", "info")
      .style("text-anchor", "middle")
      .attr("opacity", 0)

    g.selectAll("g.circle-group").select("text")
      .append("tspan")
      .attr("x", 0)
      .attr("dy", "-10px")
      .text(d => d.country_name)
      .style("font-size", "20px")

    g.selectAll("g.circle-group").select("text")
      .append("tspan")
      .attr("class", "salary-info")
      .attr("x", 0)
      .attr("dy", "1.2em")
      .text(d => `$${d[xColumn]}`)

    g.selectAll("g.circle-group").select("text")
      .append("tspan")
      .attr("class", "score-info")
      .attr("x", 0)
      .attr("dy", "1.2em")
      .text(d => `${d[yColumn]}%`)

    //Update
    // g.selectAll("g.circle-group").data(data)
    //   .attr("x", 0)
    //   .attr("y", innerHeight)
      // .attr("r", 0)
      // .on('mouseover', d => {
      //   tip.transition().duration(0);
      //   tip.style('top', `${yScale(d[yColumn]) + margin.top}px`);
      //   tip.style('left', `${xScale(d[xColumn]) + margin.left}px`);
      //   tip.style('display', `block`);
      // })
      // .on('mouseout', d => {
      //   tip.transition()
      //     .style('display', 'none')
      //     .delay(500)
      // })

    g.selectAll("g.circle-group").data(data).transition()
      .attr("transform", d => `translate(${xScale(d[xColumn])}, ${yScale(d[yColumn])})`)
      .duration(1200)
      .delay((d, i) => i * 100)
      .ease(d3.easeElastic.period(0.7));
      // .attr("cx", d => xScale(d[xColumn]))
      // .attr("cy", d => yScale(d[yColumn]))

    g.selectAll("circle").data(data).transition()
      .attr("r", d => rScale(d[rColumn]))
      .attr("fill", d => colorScale(d[colorColumn]))
      .delay((d, i) => i * 100)

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
  yColumn = `percentile_${subject}_mean_score`;

  const render = data => {
    yScale.domain(d3.extent(data, d => d[yColumn]));

    g.selectAll("g.circle-group").data(data).transition()
      .attr("transform", d => `translate(${xScale(d[xColumn])}, ${yScale(d[yColumn])})`)
      // .attr("cy", d => yScale(d[yColumn]))
      .duration(2000)
      .ease(d3.easeElastic.period(0.7));

    g.selectAll(".score-info").data(data)
      .text(d => `${d[yColumn]}%`)
  }

  d3.csv("./data/master_filtered.csv", render)
}

export const salary = school_type => {
  xColumn = `salary_${school_type}`;

  const render = data => {
    xScale.domain(d3.extent(data, d => d[xColumn]));

    g.selectAll("g.circle-group").data(data).transition()
      .attr("transform", d => `translate(${xScale(d[xColumn])}, ${yScale(d[yColumn])})`)
      // .attr("cx", d => xScale(d[xColumn]))
      .duration(2000)
      .ease(d3.easeElastic.period(0.7));

    g.selectAll(".salary-info").data(data)
      .text(d => `$${d[xColumn]}`)
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
