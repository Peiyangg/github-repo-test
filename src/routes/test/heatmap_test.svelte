<script>
  import { onMount } from 'svelte';
  import * as d3 from 'd3';

  export let data = [];

  // Constants
  const margin = { top: 20, right: 150, bottom: 100, left: 100 };
  let width;
  let height;
  
  const metadataPercentage = 0.3;
  const topicPercentage = 0.6;
  const gapPercentage = 0.05;
  const infoBoxHeight = 150; // Height for the fixed info box

  const topics = ["Topic_0", "Topic_1", "Topic_2", "Topic_3", "Topic_4", "Topic_5", "Topic_6", "Topic_7", "Topic_8"];
  const metadataFields = ["Greenhouse", "SampleTime", "Diagnosis", "Treatment", "Rootstock", "Scion"];

  // Color definitions remain the same
  const rootstockColors = ['#484C62', '#487E86', '#C3675D'];
  const sampleTimeColors = {
    1: '#eff3ff', 2: '#bdd7e7', 3: '#6baed6', 4: '#3182bd', 5: '#08519c'
  };
  const greenhouseColors = [
    'rgb(196, 216, 227)', 'rgb(105, 150, 180)', 'rgb(200, 223, 180)',
    'rgb(105, 160, 101)', 'rgb(251, 202, 202)', 'rgb(227, 126, 127)',
    'rgb(253, 222, 182)', 'rgb(255, 191, 127)', 'rgb(207, 196, 214)',
    'rgb(130, 107, 154)', 'rgb(255, 255, 204)', 'rgb(189, 144, 109)'
  ];
  const diagnosisColors = {
    "infested": "rgb(150, 84, 84)",
    "healthy": "rgb(123, 139, 111)",
    "before": "rgb(244, 186, 175)"
  };
  const treatmentColors = [
    'rgb(228, 127, 128)', 'rgb(119, 155, 184)', 'rgb(125, 175, 124)',
    'rgb(157, 120, 163)', 'rgb(255, 191, 127)', 'rgb(255, 255, 153)'
  ];

  let container;
  let infoBox;

  function getColor(value) {
    const otherChannels = Math.floor(240 * (1 - value));
    return `rgb(255, ${otherChannels}, ${otherChannels})`;
  }

  const colorScales = {};

  $: if (data && data.length > 0) {
    metadataFields.forEach((field) => {
      const uniqueValues = [...new Set(data.map(d => d[field]))];
      
      if (field === 'SampleTime') {
        colorScales[field] = (value) => sampleTimeColors[value] || '#ccc';
      } else if (field === 'Rootstock') {
        colorScales[field] = d3.scaleOrdinal().domain(uniqueValues).range(rootstockColors);
      } else if (field === 'Treatment') {
        colorScales[field] = d3.scaleOrdinal().domain(uniqueValues).range(treatmentColors);
      } else if (field === 'Greenhouse') {
        colorScales[field] = d3.scaleOrdinal().domain(uniqueValues).range(greenhouseColors);
      } else if (field !== 'Diagnosis') {
        colorScales[field] = d3.scaleOrdinal().domain(uniqueValues).range(d3.schemeCategory10);
      }
    });
  }

  function getMetadataColor(field, value) {
    if (field === "Diagnosis" && diagnosisColors[value]) {
      return diagnosisColors[value];
    } else if (colorScales[field]) {
      return colorScales[field](value);
    }
    return '#ccc';
  }

  function updateInfoBox(d, topic = null) {
  if (!infoBox) return;
  
  let content = '';
  
  // Add all metadata fields
  metadataFields.forEach(field => {
    content += `<div class="info-row"><span class="info-label">${field}:</span> ${d[field]}</div>`;
  });
  
  // Add current cell's topic value only if we're hovering over a topic cell
  if (topic) {
    content += `<div class="info-row topic-value"><span class="info-label">${topic}:</span> ${d[topic]?.toFixed(4) || 0}</div>`;
  }
  
  infoBox.innerHTML = content;
  infoBox.style.display = 'block';
}


  function hideInfoBox() {
    if (infoBox) {
      infoBox.style.display = 'none';
    }
  }

  function createInfoBox() {
    infoBox = d3.select(container.parentNode)
      .append('div')
      .attr('class', 'info-box')
      .style('display', 'none')
      .node();
  }

  function drawVisualization() {
    if (!container || !data || data.length === 0) return;

    // Clear previous content
    d3.select(container).selectAll("*").remove();

    const containerRect = container.getBoundingClientRect();
    width = containerRect.width - margin.left - margin.right;
    height = containerRect.height - margin.top - margin.bottom - infoBoxHeight;

    const metadataHeight = height * metadataPercentage;
    const topicHeight = height * topicPercentage;
    const gapHeight = height * gapPercentage;

    const svg = d3.select(container)
      .append('svg')
      .attr('width', width + margin.left + margin.right)
      .attr('height', height + margin.top + margin.bottom)
      .append('g')
      .attr('transform', `translate(${margin.left},${margin.top})`);

    const cellWidth = width / data.length;
    const metadataCellHeight = metadataHeight / metadataFields.length;
    const topicCellHeight = topicHeight / topics.length;

    // Draw metadata heatmap
    metadataFields.forEach((field, i) => {
      svg.selectAll(`.meta-${field}`)
        .data(data)
        .join('rect')
        .attr('x', (d, j) => j * cellWidth)
        .attr('y', i * metadataCellHeight)
        .attr('width', cellWidth)
        .attr('height', metadataCellHeight)
        .attr('fill', d => getMetadataColor(field, d[field]))
        .on('mouseover', function(event, d) {
          d3.select(this).attr('stroke', 'black').attr('stroke-width', 2);
          updateInfoBox(d);
        })
        .on('mouseout', function() {
          d3.select(this).attr('stroke', 'none');
        });
    });

    // Draw topic heatmap
    topics.forEach((topic, i) => {
      svg.selectAll(`.topic-${topic}`)
        .data(data)
        .join('rect')
        .attr('x', (d, j) => j * cellWidth)
        .attr('y', metadataHeight + gapHeight + i * topicCellHeight)
        .attr('width', cellWidth)
        .attr('height', topicCellHeight)
        .attr('fill', d => getColor(d[topic] || 0))
        .on('mouseover', function(event, d) {
          d3.select(this).attr('stroke', 'black').attr('stroke-width', 2);
          updateInfoBox(d);
        })
        .on('mouseout', function() {
          d3.select(this).attr('stroke', 'none');
        });
    });

    // Add labels
    metadataFields.forEach((field, i) => {
      svg.append('text')
        .attr('x', -10)
        .attr('y', i * metadataCellHeight + metadataCellHeight / 2)
        .attr('text-anchor', 'end')
        .attr('alignment-baseline', 'middle')
        .text(field);
    });

    topics.forEach((topic, i) => {
      svg.append('text')
        .attr('x', -10)
        .attr('y', metadataHeight + gapHeight + i * topicCellHeight + topicCellHeight / 2)
        .attr('text-anchor', 'end')
        .attr('alignment-baseline', 'middle')
        .text(topic);
    });

    // Add legend (same as before)
    // ... (legend code remains unchanged)
  }

  onMount(() => {
    createInfoBox();
    if (data && data.length > 0) {
      drawVisualization();
    }
  });

  $: if (data) {
    drawVisualization();
  }
</script>

<div 
  bind:this={container}
  class="heatmap-container"
>
  {#if !data || data.length === 0}
    <p>Loading data...</p>
  {/if}
</div>

<style>
  .heatmap-container {
    width: 80vw;
    height: 70vh;
    position: relative;
  }
  :global(.info-box) {
    position: absolute;
    bottom: 0;
    left: 100px;
    width: 20vw;
    height: 20vh;
    background: white;
    border: 1px solid #ddd;
    padding: 10px;
    overflow-y: auto;
  }
  :global(.info-content) {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
    gap: 10px;
  }
  :global(.info-row) {
    display: flex;
    justify-content: space-between;
  }
  :global(.info-label) {
    font-weight: bold;
    margin-right: 10px;
  }
</style>