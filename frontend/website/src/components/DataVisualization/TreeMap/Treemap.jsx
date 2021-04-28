import React, { useEffect, useRef } from "react";

import * as d3 from "d3";

import "./Treemap.css";

import { emotionsMap } from "src/utils/emotions";
import { arrToHex, contrastColor } from "src/utils/utils";

const TreeMap = ({ data, title = "Tree Map" }) => {
    const svgRef = useRef(null);

    function renderTreemap() {
        const svg = d3.select(svgRef.current);

        const width = 600;
        const height = 300;
        svg.attr("width", width).attr("height", height)

        const root = d3
            .hierarchy(data)
            .sum((d) => d.value)
            .sort((a, b) => b.value - a.value);

        const treemapRoot = d3.treemap().size([width, height]).padding(1)(root);

        const nodes = svg
            .selectAll('g')
            .data(treemapRoot.leaves())
            .join('g')
            .attr('transform', (d) => `translate(${d.x0},${d.y0})`);
        
        const fader = (color) => d3.interpolateRgb(color, '#fff')(0.3);
        const colorScale = d3.scaleOrdinal(d3.schemeCategory10.map(fader));

        nodes
            .append('rect')
            .attr('width', (d) => d.x1 - d.x0)
            .attr('height', (d) => d.y1 - d.y0)
            .attr('fill', (d) => colorScale(d.data.name));

        const fontSize = 12;

        nodes
            .append('text')
            .text((d) => `${d.data.name} ${d.data.value}`)
            .attr('font-size', `${fontSize}px`)
            .attr('x', 3)
            .attr('y', fontSize);
    }

    


    useEffect(() => {
        renderTreemap();
    }, [data, title]);

    return (
        <>
            {/* <div ref={chartDivRef} /> */}
            <svg ref={svgRef} />
        </>
    );
};

export default TreeMap;
