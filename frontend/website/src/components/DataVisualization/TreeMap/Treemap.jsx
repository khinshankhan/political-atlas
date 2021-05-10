import React, { useEffect, useRef } from "react";

import * as d3 from "d3";

import "./Treemap.css";

import { emotionsMap } from "src/utils/emotions";
import { arrToHex, contrastColor, roundDecimal2 } from "src/utils/utils";

const TreeMap = ({ data, baseHeight, baseWidth, title = "Tree Map" }) => {
  const svgRef = useRef(null);
  const chartDivRef = useRef();

  useEffect(() => {
    // NOTE: upon rerenders, since d3 is mutative, we have to reset our refs
    if (svgRef.current) {
      svgRef.current.innerHTML = "";
    }
    if (chartDivRef.current) {
      chartDivRef.current.innerHTML = "";
    }

    const div = d3.select(chartDivRef.current);
    div.attr("class", "tooltip").style("opacity", 0);

    const sum = d3.sum(data, ({ value }) => value);

    // conforming data to D3 tree hierarchy
    const treeData = {
      name: "",
      children: [
        {
          name: "Emotions",
          children: data,
        },
      ],
    };

    const margin = { top: 20, right: 20, bottom: 60, left: 40 };
    const width = baseWidth - margin.left - margin.right;
    const height = baseHeight - margin.top - margin.bottom;

    const root = d3
      .hierarchy(treeData)
      .sum((d) => d.value)
      .sort((a, b) => b.value - a.value);

    const treemapRoot = d3.treemap().size([width, height]).padding(1)(root);

    const svgElement = d3
      .select(svgRef.current)
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .selectAll("g")
      .data(treemapRoot.leaves())
      .join("g")
      .attr(
        "transform",
        (d) => `translate(${d.x0 + margin.right},${d.y0 + margin.bottom})`
      );

    // adds chart title
    d3.select(svgRef.current)
      .append("g")
      .attr("transform", `translate(${width / 2}, ${margin.top})`)
      .append("text")
      .text(title)
      .style("text-decoration", "underline")
      .attr("class", "title");

    svgElement
      .append("rect")
      .attr("width", (d) => d.x1 - d.x0)
      .attr("height", (d) => d.y1 - d.y0)
      .attr("fill", ({ data: d }) => arrToHex(emotionsMap[d.emotion].color))
      // HACK: this is all a bad hack, we need to refactor this later
      .on("mouseover", (event, { data: d, value }) => {
        div.transition().duration(200).style("opacity", 0.9);
        div
          .html(
            `<b>Emotion:</b> ${d.emotion}` +
              `<br><b>Occurences:</b> ${value}` +
              `<br><b>Percentage:</b> ${roundDecimal2((value / sum) * 100)}%`
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
      });

    const fontSize = 12;
    // adds text to treeMap elements
    svgElement
      .append("text")
      .text((d) => `${d.data.emotion} ${d.data.value}`)
      .attr("font-size", `${fontSize}px`)
      .attr("x", 3)
      .attr("y", fontSize)
      .style(
        "fill",
        // TODO: use value to increase or decrease darkness
        ({ data: d }) => contrastColor(emotionsMap[d.emotion].color)
      );
  }, [data, title, baseHeight, baseWidth]);

  return (
    <>
      <div ref={chartDivRef} />
      <svg ref={svgRef} />
    </>
  );
};

export default TreeMap;
