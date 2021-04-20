import React, { useEffect, useRef } from "react";

import * as d3 from "d3";

import "./PieChart.css";

import { sortedEmotions } from "src/utils/emotions";
import { roundUpX, roundDecimal2 } from "src/utils/utils";

const PieChart = ({ data, title = "Pie Chart" }) => {
    const svgRef = useRef();
    // HACK: makes hover work on chart, isn't really proper in react nor html
    const chartDivRef = useRef();

    useEffect(() => {
        // TODO: move this outside and hook it into the screen size
        let width = 450;
        let height = 450;
        let margin = 40;

        // The radius of the pieplot is half the width or half the height (smallest one). I subtract a bit of margin.
        let radius = Math.min(width, height) / 2 - margin;

        // append the svg object to the div called 'my_dataviz'
        let svg = d3
            .select(chartDivRef.current)
            .append("svg")
            .attr("width", width)
            .attr("height", height)
            .append("g")
            .attr(
                "transform",
                "translate(" + width / 2 + "," + height / 2 + ")"
            );

        // Create dummy data
        let data1 = { a: 9, b: 20, c: 30, d: 8, e: 12 };
        
        // for(const val in data1) {
        //     console.log(val);
        // }

        const dataObj = {};

        for(const pair of data) {
            // console.log(pair);
            dataObj[pair["emotion"]] = pair["value"]
        }

        console.log(dataObj);
        console.log(data1);

        // // set the color scale
        // Domain fails because it can't do a "for _ in _" 
        let color = d3.scaleOrdinal()
            // .domain(dataObj)
            // .range(["#98abc5", "#8a89a6", "#7b6888", "#6b486b", "#a05d56"]);

        // // Compute the position of each group on the pie:
        // let pie = d3.pie().value(function (d) {
        //     return d.value;
        // });

        // let data_ready = pie(d3.entries(data));

        // // Build the pie chart: Basically, each part of the pie is a path that we build using the arc function.
        // svg.selectAll("whatever")
        //     .data(data_ready)
        //     .enter()
        //     .append("path")
        //     .attr("d", d3.arc().innerRadius(0).outerRadius(radius))
        //     .attr("fill", function (d) {
        //         return color(d.data.key);
        //     })
        //     .attr("stroke", "black")
        //     .style("stroke-width", "2px")
        //     .style("opacity", 0.7);
    }, [data, title]);

    return (
        <>
            <div ref={chartDivRef} />
        </>
    );
};

export default PieChart;
