import React, { useEffect, useRef } from "react";

import * as d3 from "d3";

import "./DoubleBarChart.css";

import { emotionsMap, sortedEmotions } from "src/utils/emotions";
import { arrToHex, roundUpX, roundDecimal2 } from "src/utils/utils";

const DoubleBarChart = ({
  dataIBM,
  dataDA,
  baseHeight,
  baseWidth,
  title = "Double Bar Chart",
}) => {
  const ref = useRef();
  // HACK: makes hover work on chart, isn't really proper in react nor html
  const chartDivRef = useRef();

  useEffect(() => {
    // NOTE: upon rerenders, since d3 is mutative, we have to reset our refs
    if (ref.current) {
      ref.current.innerHTML = "";
    }
    if (chartDivRef.current) {
      chartDivRef.current.innerHTML = "";
    }

    // TODO: move this outside and hook it into the screen size
    const margin = { top: 20, right: 20, bottom: 60, left: 50 };
    const width = baseWidth - margin.left - margin.right;
    const height = baseHeight - margin.top - margin.bottom;

    const da_sum = d3.sum(dataDA, ({ value }) => value);
    const ibm_sum = d3.sum(dataIBM, ({ value }) => value);
    const max =
      100 *
      Math.max(
        d3.max(dataDA, ({ value }) => value) / da_sum,
        d3.max(dataIBM, ({ value }) => value) / ibm_sum
      );

    const barData = [
      {
        API: "IBM",
        values: dataIBM,
      },
      {
        API: "DeepAffects",
        values: dataDA,
      },
    ];

    let APIs = barData.map(function (d) {
      return d.API;
    });

    // HACK: makes hover work on chart, isn't really proper in react nor html
    const div = d3.select(chartDivRef.current);
    div.attr("class", "tooltip").style("opacity", 0);

    const svgElement = d3.select(ref.current);

    // make svg element with the width and height and make it sensible
    svgElement
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr(
        "transform",
        "translate(" + margin.left + "," + margin.bottom + ")"
      );

    // add in chart title
    svgElement
      .append("g")
      .attr("transform", `translate(${width / 2}, ${margin.top})`)
      .append("text")
      .text(title)
      .style("text-decoration", "underline")
      .attr("class", "title");

    // make axes proper length with labels
    const x = d3
      .scaleBand()
      .domain(sortedEmotions)
      .range([0, width])
      .round(0.05)
      .padding(0.05);

    const yPadding = (() => {
      const ticks = d3.scaleLinear().domain([0, max]).ticks();
      return ticks.length > 0 ? ticks[1] : 0;
    })();

    const y = d3
      .scaleLinear()
      .domain([0, roundUpX(max, yPadding)])
      .range([height, 0]);

    // Another scale for subgroup position?
    var xSubgroup = d3.scaleBand().domain(APIs).range([0, x.bandwidth()]);

    // make axes into scales that can be plotted
    const xAxis = d3.axisBottom().scale(x);
    const yAxis = d3.axisLeft().scale(y);

    // add axes to the graph
    svgElement
      .append("g")
      .attr("class", "x axis")
      .attr(
        "transform",
        `translate(${margin.left}, ${height + margin.bottom - margin.top})`
      )
      .call(xAxis)
      .selectAll("text")
      .style("text-anchor", "center");

    svgElement
      .append("g")
      .attr("class", "y axis")
      .call(yAxis)
      .attr(
        "transform",
        `translate(${margin.left}, ${margin.bottom - margin.top})`
      )
      .append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", 10)
      .attr("dy", ".71em")
      .style("text-anchor", "end");

    // make bar chart based on values
    svgElement
      .selectAll("bar")
      .data(dataIBM)
      .enter()
      .append("rect")
      .style("stroke", "black")
      .style("fill", ({ emotion }) => arrToHex(emotionsMap[emotion].color))
      .attr("x", ({ emotion }) => x(emotion))
      .attr("width", xSubgroup.bandwidth())
      .attr(
        "transform",
        `translate(${margin.left}, ${margin.bottom - margin.top})`
      )
      // HACK: this is all a bad hack, we need to refactor this later
      .on("mouseover", (event, { emotion, value }) => {
        div.transition().duration(200).style("opacity", 0.9);
        div
          .html(
            `<b>API:</b> IBM` +
              `<br><b>Emotion:</b> ${emotion}` +
              `<br><b>Occurences:</b> ${value}` +
              `<br><b>Percentage:</b> ${roundDecimal2(
                (value / ibm_sum) * 100
              )}%`
          )
          .style("left", event.pageX + 30 + "px")
          .style("top", event.pageY - 30 + "px");
      })
      .on("mousemove", (event) => {
        div
          .style("left", event.pageX + 30 + "px")
          .style("top", event.pageY - 30 + "px");
      })
      .on("mouseout", () => {
        div.transition().duration(500).style("opacity", 0);
      })
      .attr("y", y(0))
      .attr("height", height - y(0))
      .transition()
      .duration(2000)
      .attr("y", ({ value }) => y((100 * value) / ibm_sum))
      .attr("height", ({ value }) => height - y((100 * value) / ibm_sum));

    svgElement
      .selectAll("bar")
      .data(dataDA)
      .enter()
      .append("rect")
      .style("stroke", "black")
      .style("fill", ({ emotion }) => arrToHex(emotionsMap[emotion].color))
      .attr("x", ({ emotion }) => x(emotion))
      .attr("width", xSubgroup.bandwidth())
      .attr(
        "transform",
        `translate(${margin.left + xSubgroup.bandwidth()}, ${
          margin.bottom - margin.top
        })`
      )
      // HACK: this is all a bad hack, we need to refactor this later
      .on("mouseover", (event, { emotion, value }) => {
        div.transition().duration(200).style("opacity", 0.9);
        div
          .html(
            `<b>API:</b> DeepAffects` +
              `<br><b>Emotion:</b> ${emotion}` +
              `<br><b>Occurences:</b> ${value}` +
              `<br><b>Percentage:</b> ${roundDecimal2((value / da_sum) * 100)}%`
          )
          .style("left", event.pageX + 30 + "px")
          .style("top", event.pageY - 30 + "px");
      })
      .on("mousemove", (event) => {
        div
          .style("left", event.pageX + 30 + "px")
          .style("top", event.pageY - 30 + "px");
      })
      .on("mouseout", (d) => {
        div.transition().duration(500).style("opacity", 0);
      })
      .attr("y", y(0))
      .attr("height", height - y(0))
      .transition()
      .duration(3000)
      .attr("y", ({ value }) => y((100 * value) / da_sum))
      .attr("height", ({ value }) => height - y((100 * value) / da_sum));

    svgElement
      .append("text")
      .attr(
        "transform",
        `translate( ${margin.left + (width - margin.left) / 2}, ${
          height + margin.bottom + 20
        })`
      )
      .style("text-anchor", "middle")
      .text("Emotion");

    svgElement
      .append("text")
      .attr("transform", "rotate(-90)")
      .attr("x", 0 - (margin.bottom + (height - margin.bottom) / 2))
      .attr("y", 12)
      .style("text-anchor", "middle")
      .text("Percentage");
  }, [dataIBM, dataDA, title, baseHeight, baseWidth]);
  return (
    <>
      <div ref={chartDivRef} />
      <svg ref={ref} />
    </>
  );
};

export default DoubleBarChart;
