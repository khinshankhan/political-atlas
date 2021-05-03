import React, { useEffect, useRef } from "react";

import * as d3 from "d3";

import "./PieChart.css";

import { emotionsMap } from "src/utils/emotions";
import { arrToHex, contrastColor, roundDecimal2 } from "src/utils/utils";

const PieChart = ({ data, title = "Pie Chart" }) => {
  // const margin = { top: 20, right: 20, bottom: 60, left: 40 };
  // const width = 600 - margin.left - margin.right;
  // const height = 300 - margin.top - margin.bottom;
  const width = 600;
  const height = 300;
  const ref = useRef(null);
  const chartDivRef = useRef();

  useEffect(() => {
    const innerRadius = 40;
    const outerRadius = 100;

    const svgElement = d3.select(ref.current);

    const sum = d3.sum(data, ({ value }) => value);

    // add in chart title
    svgElement
      .append("g")
      .attr("transform", `translate(${-20}, ${-height / 2 + 20})`)
      .append("text")
      .text(title)
      .style("text-decoration", "underline")
      .attr("class", "title");

    const createPie = d3.pie().value((d) => d.value);
    const createArc = d3
      .arc()
      .innerRadius(innerRadius)
      .outerRadius(outerRadius);

    const colors = d3.scaleOrdinal(
      // TODO: use value to increase or decrease darkness
      data.map(({ emotion }) => arrToHex(emotionsMap[emotion].color))
    );

    // TODO: tooltip popup
    const div = d3.select(chartDivRef.current);
    div.attr("class", "tooltip").style("opacity", 0);

    const formatted_data = createPie(data);
    const group = d3.select(ref.current);
    const groupWithData = group.selectAll("g.arc").data(formatted_data);

    groupWithData.exit().remove();

    const groupWithUpdate = groupWithData
      .enter()
      .append("g")
      .attr("class", "arc")
      // HACK: this is all a bad hack, we need to refactor this later
      .on("mouseover", (event, { data: d, value }) => {
        div.transition().duration(50).style("opacity", 1);
        div.transition().duration(200).style("opacity", 0.9);
        div.html(
            `<b>Emotion:</b> ${d.emotion}` +
                `<br><b>Occurences:</b> ${value}` +
                `<br><b>Percentage:</b> ${roundDecimal2(
                    (value / sum) * 100
                )}%`
        )
            .style("left", event.pageX + 30 + "px")
            .style("top", event.pageY - 30 + "px");
      })
      .on("mousemove", (event) => {
        div.style("left", event.pageX + 30 + "px").style(
            "top",
            event.pageY - 30 + "px"
        );
      })
      .on("mouseout", (d) => {
        div.transition().duration(500).style("opacity", 0);
      });

    const path = groupWithUpdate
      .append("path")
      .merge(groupWithData.select("path.arc"));

    path
      .attr("class", "arc")
      .attr("d", createArc)
      .attr("fill", (d, i) => colors(i));

    const text = groupWithUpdate
      .append("text")
      .merge(groupWithData.select("text"));

    text
      .attr("text-anchor", "middle")
      .attr("alignment-baseline", "middle")
      .attr("transform", (d) => `translate(${createArc.centroid(d)})`)
      .style(
        "fill", ({ data: d }) => contrastColor(emotionsMap[d.emotion].color))
      .style("font-size", 10)
      .text((d) => d.value);
  }, [data, title]);

  return (
    <>
      <div ref={chartDivRef} />
      <svg width={width} height={height}>
        <g ref={ref} transform={`translate(${width / 2} ${height / 2})`} />
      </svg>
    </>
  );
};

export default PieChart;
