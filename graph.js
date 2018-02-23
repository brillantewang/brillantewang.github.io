import * as d3 from 'd3';
import ordinal from 'ordinal';

const outerWidth = 1400;
const outerHeight = 620;
const margin = { left: 220, top: 70, right: 100, bottom: 50 };

const innerWidth = outerWidth - margin.left - margin.right;
const innerHeight = outerHeight - margin.top - margin.bottom;
const rMin = 12;
const rMax = 17;
let xColumn;
let yColumn;
const rColumn = "GDP";
const colorColumn = "region";

const xAxisLabelText = "Annual Teacher Salary in USD (converted using PPP)";
const xAxisLabelOffset = 75;

const yAxisLabelText = "Student Test Score Ranking";
const yAxisLabelOffset = 50;

const svgContainer = d3.select("body").insert("div", ".school-type-btns-container").attr("class", "svg-container");

const svg = d3.select(".svg-container").append("svg")
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

const xAxisHelpTipGroup = xAxisG.append("g")
  // .attr("x", 500)
  // .attr("y", xAxisLabelOffset)
  .attr("transform", `translate(775, ${xAxisLabelOffset - 8})`)
  .on("mouseover", () => xAxisHelpTipText.style("display", "block"))
  .on("mousemove", () => xAxisHelpTipText.style("top", `${event.pageY - 160}px`).style("left", `${event.pageX + 10}px`))
  .on("mouseout", () => xAxisHelpTipText.style("display", "none"))

const xAxisHelpTip = xAxisHelpTipGroup.append("circle")
  .attr("r", "10px")
  .attr("fill", "#1c6e8c")
  .attr("class", "help-tip subjects-tip")

const xAxisHelpTipQuestionMark = xAxisHelpTipGroup.append("text")
  .attr("dy", "6px")
  .style("text-anchor", "middle")
  .text("?")
  .attr("fill", "white")
  .attr("class", "question-mark")

const xAxisHelpTipText = d3.select("body").append("p")
  .attr("class", "help-tip-text")
  .style("display", "none")
  .text("This axis represents a country's annual teacher salary in 2015 converted to US dollars using purchasing power parity to account for cost of living. You can filter between primary, lower secondary, and upper secondary school. For example, Poland's lower secondary school teachers had a mean salary equivalent to earning $25,375 in the US.")

const yAxisG = g.append("g")
  .attr("class", "y axis");

const yAxisLabel = yAxisG.append("text")
  .style("text-anchor", "middle")
  .attr("transform", `translate(-${yAxisLabelOffset}, ${innerHeight / 2}) rotate(-90)`)
  .attr("class", "label")
  .text(yAxisLabelText);

const yAxisHelpTipGroup = yAxisG.append("g")
  .attr("transform", `translate(-${yAxisLabelOffset + 5}, 85)`)
  .on("mouseover", () => yAxisHelpTipText.style("display", "block"))
  .on("mousemove", () => yAxisHelpTipText.style("top", `${event.pageY - 5}px`).style("left", `${event.pageX + 10}px`))
  .on("mouseout", () => yAxisHelpTipText.style("display", "none"))

const yAxisHelpTip = yAxisHelpTipGroup.append("circle")
  .attr("r", "10px")
  .attr("fill", "#1c6e8c")
  .attr("class", "help-tip subjects-tip")

const yAxisHelpTipQuestionMark = yAxisHelpTipGroup.append("text")
  .attr("dy", "6px")
  .style("text-anchor", "middle")
  .text("?")
  .attr("fill", "white")
  .attr("class", "question-mark")

const yAxisHelpTipText = d3.select("body").append("p")
  .attr("class", "help-tip-text")
  .style("display", "none")
  .text("This axis represents the percentile ranking of a country's mean score on the 2015 Programme for International Student Assessment (PISA). You can filter by math, science, or reading scores. For example, Poland's mean score on the science PISA was higher than 61% of all other countries.")

// const yAxisHelpTipText = yAxisHelpTip.append("svg:title")
//   .text("This axis represents the percentile ranking of a country's mean score on the 2015 Programme for International Student Assessment (PISA). You can filter by math, science, or reading scores. For example, Poland's mean score on the science PISA was higher than 61% of all other countries.")

const xScale = d3.scaleLog().rangeRound([innerWidth, 0]);
const yScale = d3.scaleLinear().rangeRound([innerHeight, 0]);
const rScale = d3.scaleSqrt().rangeRound([rMin, rMax]);
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
      .attr("opacity", 0.8)
      .attr("transform", d => `translate(0, ${innerHeight})`)
      .on("click", function() {
        let circleGroup = d3.select(this);

        // if (circleGroup.select("circle").attr("class") === "clicked") {
        if (circleGroup.attr("class") === "circle-group clicked") {
          circleGroup.select("circle").transition().attr("r", d => rScale(d[rColumn]))
          circleGroup.select(".info").transition().attr("opacity", 0).on("end", () => circleGroup.select(".info").attr("class", "info hidden"));
          circleGroup.select(".code").transition().attr("opacity", 1).on("start", () => circleGroup.select(".code").attr("class", "code"));
          // circleGroup.select(".info").attr("class", "info hidden");
          circleGroup.attr("class", "circle-group");
          circleGroup.transition().attr("opacity", 0.8);
          // circleGroup.select("circle").attr("class", "");
        } else {
          circleGroup.select("circle").transition().attr("r", 100);
          // circleGroup.select("circle").attr("class", "clicked");
          circleGroup.attr("class", "circle-group clicked");
          // circleGroup.select(".info").attr("class", "info");
          // circleGroup.select(".info").transition().attr("opacity", 1);
          circleGroup.select(".info").transition().attr("opacity", 1).on("start", () => circleGroup.select(".info").attr("class", "info"));
          circleGroup.select(".code").transition().attr("opacity", 0).on("end", () => circleGroup.select(".code").attr("class", "code hidden"));
          circleGroup.transition().attr("opacity", 0.9);
          circleGroup.raise();
        }
      })
      .on('mouseenter', function() {
        let circleGroup = d3.select(this);
        let circle = circleGroup.select("circle");
        // console.log(circleGroup.attr("class"), 'mouseenter');
        if (!circleGroup.attr("class").includes("clicked")) circle.transition().attr("r", d => rScale(d[rColumn]) + 10)
      })
      .on('mouseleave', function() {
        let circleGroup = d3.select(this);
        let circle = circleGroup.select("circle");
        // console.log(circleGroup.attr("class"), 'mouseleave');
        if (!circleGroup.attr("class").includes("clicked")) circle.transition().attr("r", d => rScale(d[rColumn]))
      })
      // .on('mouseout', function() {
      //   d3.select(this).select("circle").transition().attr("r", d => rScale(d[rColumn]))
      // })
      // .on('mouseout', function() {
      //   d3.select(this).select("circle").transition().attr("r", d => rScale(d[rColumn]))
      //   d3.select(this).select("text").transition().attr("opacity", 0);
      // })
    g.selectAll("g.circle-group").append("circle")
      .attr("r", 0)
      // .attr("opacity", 0.8)

    // g.selectAll("circle").data(data)
    //   .on('mouseover', function() {
    //     d3.select(this).transition().attr("r", d => rScale(d[rColumn]) * 1.05)
    //   })
    //   .on('mouseout', function() {
    //     d3.select(this).transition().attr("r", d => rScale(d[rColumn]))
    //   })

    //adding text to circle groups
    g.selectAll("g.circle-group").data(data)
      .append("text")
      .attr("class", "code")
      .attr("dy", "6px")
      .style("text-anchor", "middle")
      .attr("opacity", 0)

    g.selectAll("g.circle-group").select(".code")
      .text(d => d.country_code)

    g.selectAll("g.circle-group").data(data)
      .append("text")
      .attr("class", "info hidden")
      // .attr("class", "info")
      .style("text-anchor", "middle")
      .attr("opacity", 0)

    g.selectAll("g.circle-group").select(".info")
      .append("tspan")
      .attr("x", 0)
      .attr("dy", "-10px")
      .text(d => d.country_name)
      .style("font-size", "24px")

    g.selectAll("g.circle-group").select(".info")
      .append("tspan")
      .attr("class", "salary-info")
      .attr("x", -2)
      .attr("dy", "1.2em")
      .text(d => {
        let salary = Math.round(d[xColumn]).toLocaleString();
        return `$${salary}`
      })

    g.selectAll("g.circle-group").select(".info")
      .append("tspan")
      .attr("class", "score-info")
      .attr("x", 0)
      .attr("dy", "1.2em")
      .text(d => `${ordinal(parseInt(d[yColumn]))} percentile`)

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

    g.selectAll("g.circle-group").select("circle").data(data).transition()
      .attr("r", d => rScale(d[rColumn]))
      .attr("fill", d => colorScale(d[colorColumn]))
      .delay((d, i) => i * 100)

    g.selectAll(".code").transition()
      .attr("opacity", 1)
      .delay((d, i) => i * 100)

    // circles
    //   .attr("cx", function(){ console.log('hello'); })
    //   .attr("cy", function(d){ return yScale(d.score); })

    //Exit
    circleGroups.exit().remove();
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
    // yScale.domain(d3.extent(data, d => d[yColumn]));

    g.selectAll("g.circle-group").data(data, d => d.country_name).transition()
      .attr("transform", d => `translate(${xScale(d[xColumn])}, ${yScale(d[yColumn])})`)
      // .attr("cy", d => yScale(d[yColumn]))
      .duration(2000)
      .ease(d3.easeElastic.period(0.7));

    g.selectAll(".score-info").data(data, d => d.country_name)
      .text(d => `${ordinal(parseInt(d[yColumn]))} percentile`)
  }

  d3.csv("./data/master_filtered.csv", render)
}

export const salary = school_type => {
  xColumn = `salary_${school_type}`;

  const render = data => {
    // xScale.domain(d3.extent(data, d => d[xColumn]));

    g.selectAll("g.circle-group").data(data, d => d.country_name).transition()
      .attr("transform", d => `translate(${xScale(d[xColumn])}, ${yScale(d[yColumn])})`)
      // .attr("cx", d => xScale(d[xColumn]))
      .duration(2000)
      .ease(d3.easeElastic.period(0.7));

    g.selectAll(".salary-info").data(data, d => d.country_name)
      .text(d => {
        let salary = Math.round(d[xColumn]).toLocaleString();
        return `$${salary}`;
      })
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
    g.selectAll(".circle-group").data(data, d => d.country_name).transition()
      .attr("opacity", d => checkedRegions.includes(d.region) ? 0.8 : 0)
      .duration(500)
      .on("start", function(d) {
        let circleGroup = d3.select(this);
        if (checkedRegions.includes(d.region)) circleGroup.classed("hidden", false);
      })
      .on("end", function(d) {
        let circleGroup = d3.select(this);
        if (!checkedRegions.includes(d.region)) circleGroup.classed("hidden", true);
      })
      // .attr("class", d => checkedRegions.includes(d.region) ? "circle-group" : "circle-group hidden")
      // see how to do something after a transition
  }

  d3.csv("./data/master_filtered.csv", render)
}

export const toggleSelectedBtn = (btnId, btnClass) => {
  let selectedNode = document.getElementById(btnId);
  let otherNodes = document.getElementsByClassName(btnClass);

  for (let i = 0; i < otherNodes.length; i++) {
    let currNode = otherNodes[i];

    if (currNode === selectedNode) {
      currNode.classList.add("selected-btn");
    } else {
      currNode.classList.remove("selected-btn");
    }
  }
}
