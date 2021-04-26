import React, { useEffect, useRef } from "react";

import * as d3 from "d3";

import "./PieChart.css";

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

        // add in chart title
        svgElement
            .append("g")
            .attr("transform", `translate(${-20}, ${-height / 2 + 20})`)
            .append("text")
            .text(title)
            .style("text-decoration", "underline")
            .attr("class", "title");

        const createPie = d3
            .pie()
            .value((d) => d.value)
            .sort((a, b) => (a.emotion > b.emotion ? 1 : -1));
        const createArc = d3
            .arc()
            .innerRadius(innerRadius)
            .outerRadius(outerRadius);

        // adds associated colors based on which emotions are in data
        const colorMap = {
            anger: "#b30000",
            happy: "#b3b300",
            insecure: "#00b300",
            neutral: "#5a5a5a",
            sad: "#0000b3",
            secure: "#5a005a",
        };
        
        const colors = d3.scaleOrdinal(
            data.map((obj) => colorMap[obj.emotion])
        );

        // TODO: tooltip popup
        const div = d3
            .select(chartDivRef.current)
            .append("div")
            .attr("class", "tooltip")
            .style("opacity", 0);

        const formatted_data = createPie(data);
        const group = d3.select(ref.current);
        const groupWithData = group.selectAll("g.arc").data(formatted_data);

        groupWithData.exit().remove();

        const groupWithUpdate = groupWithData
            .enter()
            .append("g")
            .attr("class", "arc")
            .on("mouseover", function (d, i) {
                d3.select(this)
                    .transition()
                    .duration("50")
                    .attr("opacity", ".5");
                div.transition().duration("50").style("opacity", 1);
            })
            .on("mouseout", function (d, i) {
                d3.select(this)
                    .transition()
                    .duration("50")
                    .attr("opacity", "1");
            });

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
            .text((d) => d.value);
    }, [data, title]);

    return (
        <>
            {/* <div ref={chartDivRef} /> */}
            <svg width={width} height={height}>
                <g
                    ref={ref}
                    transform={`translate(${width / 2} ${height / 2})`}
                />
            </svg>
        </>
    );
};

export default PieChart;
