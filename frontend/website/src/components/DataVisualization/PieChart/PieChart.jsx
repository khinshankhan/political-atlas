import React, { useEffect, useRef } from "react";

import * as d3 from "d3";

import "./PieChart.css";

import { sortedEmotions } from "src/utils/emotions";
import { roundUpX, roundDecimal2 } from "src/utils/utils";

const PieChart = ({ data, title = "Pie Chart" }) => {
    const ref = useRef(null);
    // HACK: makes hover work on chart, isn't really proper in react nor html
    const chartDivRef = useRef();

    useEffect(() => {
        // TODO: move this outside and hook it into the screen size
        let width = 450;
        let height = 450;
        let margin = 40;

        const innerRadius = 60;
        const outerRadius = 100;
        
        const createPie = d3
            .pie()
            .value((d) => d.value)
            .sort(null);
        const createArc = d3
            .arc()
            .innerRadius(innerRadius)
            .outerRadius(outerRadius);
        const colors = d3.scaleOrdinal(d3.schemeCategory10);
        const format = d3.format(".2f");

        // The radius of the pieplot is half the width or half the height (smallest one). I subtract a bit of margin.
        // let radius = Math.min(width, height) / 2 - margin;

        // const svgElement = d3.select(svgRef.current);
        // svgElement
        //     .attr("width", width)
        //     .attr("height", height)
        //     .append("g")
        //     .attr("transform", `translate(${width / 2}, ${height / 2})`);

        const formatted_data = createPie(data);
        const group = d3.select(ref.current);
        const groupWithData = group.selectAll("g.arc").data(formatted_data);
        
        groupWithData.exit().remove();

        const groupWithUpdate = groupWithData
            .enter()
            .append("g")
            .attr("class", "arc");

        const path = groupWithUpdate
            .append("path")
            .merge(groupWithData.select("path.arc"));

        path.attr("class", "arc")
            .attr("d", createArc)
            .attr("fill", (d, i) => colors(i));

        const text = groupWithUpdate
            .append("text")
            .merge(groupWithData.select("text"));

        text.attr("text-anchor", "middle")
            .attr("alignment-baseline", "middle")
            .attr("transform", (d) => `translate(${createArc.centroid(d)})`)
            .style("fill", "white")
            .style("font-size", 10)
            .text((d) => format(d.value));
    }, [data, title]);

    return (
        <>
            {/* <div ref={chartDivRef} /> */}
            <svg width={450} height={450}>
                <g
                    ref={ref}
                    transform={`translate(${100} ${100})`}
                />
            </svg>
        </>
    );
};

export default PieChart;
