<script>
  import { onMount } from 'svelte';
  import * as d3 from 'd3';
  import { loadTopicData } from './dataLoader';  // Adjust the path to your dataLoader.js

  let data = [];
  let margin = { top: 10, right: 30, bottom: 150, left: 100 };




  onMount(async () => {
    data = await loadTopicData();
    let logged_minValue = d3.min(data, d => d.normalized_value);
    let logged_maxValue = d3.max(data, d => d.normalized_value);

  // Log the min and max values to the console
  console.log("Min percentage_value:", logged_minValue);
  console.log("Max percentage_value:", logged_maxValue);
    drawHeatmap();
  });

  function drawHeatmap() {
    const container = d3.select('.heatmap-container').node();
    const containerWidth = container.clientWidth;
    const containerHeight = container.clientHeight;

    const adjustedWidth = containerWidth * 18;
    const adjustedHeight = containerHeight - margin.top - margin.bottom;

    const svg = d3.select('#heatmap')
      .attr('width', adjustedWidth + margin.left + margin.right)
      .attr('height', adjustedHeight + margin.top + margin.bottom)
      .append('g')
      .attr('transform', `translate(${margin.left},${margin.top})`);

    const topics = Array.from(new Set(data.map(d => d.Topic)));
    let taxa = Array.from(new Set(data.map(d => d.Taxon)));

    let xScale = d3.scaleBand()
      .domain(taxa)
      .range([0, adjustedWidth])
      .padding(0.05);

    const yScale = d3.scaleBand()
      .domain(topics)
      .range([0, adjustedHeight])
      .padding(0.05);

    const colorScale = d3.scaleSequential(d3.interpolateBlues)
      .domain([0, d3.max(data, d => d.normalized_value)]);
    
      

    const tooltip = d3.select('body').append('div')
      .attr('class', 'tooltip')
      .style('opacity', 0)
      .style('position', 'absolute')
      .style('background-color', 'white')
      .style('border', 'solid 1px black')
      .style('padding', '5px')
      .style('pointer-events', 'none');

    function updateHeatmap(sortedTaxa) {
      xScale.domain(sortedTaxa);

      svg.selectAll('rect')
        .data(data)
        .transition()
        .duration(750)
        .attr('x', d => xScale(d.Taxon));

      svg.select('.x-axis')
        .transition()
        .duration(750)
        .call(d3.axisBottom(xScale))
        .selectAll('text')
        .attr('transform', 'rotate(45)')
        .style('text-anchor', 'start');
    }

    svg.append('g')
      .selectAll('rect')
      .data(data)
      .enter()
      .append('rect')
      .attr('x', d => xScale(d.Taxon))
      .attr('y', d => yScale(d.Topic))
      .attr('width', xScale.bandwidth())
      .attr('height', yScale.bandwidth())
      .attr('fill', d => colorScale(d.normalized_value))
      .on('mouseover', (event, d) => {
        tooltip.transition()
          .duration(200)
          .style('opacity', .9);
        tooltip.html(`
          <strong>Taxon:</strong> ${d.Taxon}<br>
          <strong>Topic:</strong> ${d.Topic}<br>
          <strong>Normalized Value:</strong> ${d.normalized_value.toFixed(4)}<br>
          <strong>Percent from LDA (%):</strong> ${(d.percentage_value*100).toFixed(4)}`) // Adjust according to your data structure
          .style('left', (event.pageX + 5) + 'px')
          .style('top', (event.pageY - 28) + 'px');
      })
      .on('mouseout', () => {
        tooltip.transition()
          .duration(500)
          .style('opacity', 0);
      });

    svg.append('g')
      .attr('class', 'x-axis')
      .attr('transform', `translate(0,${adjustedHeight})`)
      .call(d3.axisBottom(xScale))
      .selectAll('text')
      .attr('transform', 'rotate(45)')
      .style('text-anchor', 'start');

    svg.append('g')
      .call(d3.axisLeft(yScale))
      .selectAll('text')
      .style('font-size', '10px')
      .style('cursor', 'pointer')
      .on('click', (event, clickedTopic) => {
        const sortedTaxa = taxa.slice().sort((a, b) => {
          const valueA = data.find(d => d.Taxon === a && d.Topic === clickedTopic)?.percentage_value || 0;
          const valueB = data.find(d => d.Taxon === b && d.Topic === clickedTopic)?.percentage_value || 0;
          return valueB - valueA;
        });
        updateHeatmap(sortedTaxa);
      });
  }

  let logged_minValue = d3.min(data, d => d.normalized_value);
  let logged_maxValue = d3.max(data, d => d.normalized_value);
</script>

<div class="content_container">
  <div class="heatmap-container">
    <svg id="heatmap"></svg>
  </div>
  <div class="color-bar">
    <div class="color-bar-text max-value">1</div>
    <div class="color-bar-bar"></div>
    <div class="color-bar-text min-value">0</div>
    <div class="color-bar-title"> Taxon's probability (logged)</div>
  </div>
</div>


<style>
  .content_container{
    display: flex;
    flex-direction: row;
  }
  .heatmap-container {
    display: flex;
    flex-direction: column;
    width: 80vw;
    height: 90vh;
    margin-top: 2vh;
    margin-left: 1vw;
    padding: 1px;
    overflow-x: auto;
  }

  svg {
    font-size: 10px;
    padding-bottom: 4vh;
  }

  .tooltip {
    font-size: 12px;
    color: black;
  }



.color-bar {
  display: flex;
  flex-direction: column;
  width: 20px; /* Adjust width as needed */
  margin-top: 20vh;
  height: 30vh; /* Match the height of the heatmap grid */
  margin-left: 5vw; /* Add space between the heatmap and the color bar */
  
}
.color-bar-bar{
  border: 1px solid #ddd; /* Optional: add a border for better visibility */
  background: linear-gradient(to top, #f7fbff, #08306b); /* Gradient from light to deep red */
  width: 20px;
  height: 30vh;

}
.color-bar-title {
  white-space: nowrap; /* Prevents the text from wrapping to the next line */
  overflow: visible; /* Ensures that any overflowing content is visible */
  text-align: center; /* Optional: Center the text within the container */
  margin-left: -3vw;
  margin-top: 3vh;
}
</style>
