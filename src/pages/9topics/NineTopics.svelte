<script>
	import { onMount } from 'svelte';
	import Heatmap from './heatmap_9.svelte'; // Use Heatmap component for both visualizations
	import Topicmap from './topic_9.svelte';
	import { loadData, loadTopicData, loadData_Diagnosis, loadData_SampleTime, loadData_Treatment } from './dataLoader.js'; // Loaders for both datasets
	
	let topicdis = [];
	let worddis = [];


  
	// Load both datasets when the component mounts
	onMount(async () => {
	  topicdis = await loadData(); // Load topic distribution data
      console.log("First 2 topicdis data:", topicdis.slice(0, 2));
	  worddis = await loadTopicData(); // Load word distribution data
      console.log("First 2 worddis data:", worddis.slice(0, 2));
	});

	async function updateHeatmapData(loaderFunction) {
        topicdis = await loaderFunction();
        console.log("Updated topicdis (first 2):", topicdis.slice(0, 2));
    }
  </script>
  
  <main>
	<a href="/">Back to Menu</a>
	<h1>9 Topics</h1>
	<h2>Topic Distribution</h2>
	

	
	<div>
		<div class="buttons_swiftting">
			<!-- Buttons to switch between different data sequences -->
			<button on:click={() => updateHeatmapData(loadData)}>reordered by Clustering</button>
			<button on:click={() => updateHeatmapData(loadData_Diagnosis)}>reordered by Diagnosis</button>
			<button on:click={() => updateHeatmapData(loadData_Treatment)}>reordered by Treatment</button>
			<button on:click={() => updateHeatmapData(loadData_SampleTime)}>reordered by Sample Time</button>
		</div>
		<Heatmap data={topicdis} />
	</div>


	<h2>ASV weights</h2>

	<div>
		<Topicmap />
	</div>
	
  </main> 

<style>
    .buttons_swiftting {
        display: flex;
        margin-left:20vw; /* Center buttons horizontally */
		margin-bottom: 2vh;
        gap: 10px; /* Add some space between buttons */

    }

    .buttons_swiftting button {
        padding: 10px 10px;
        font-size: 14px;
        background-color: #f0f0f0; /* Default background */
        border: 1px solid #ccc;
        border-radius: 5px;
        cursor: pointer;
        transition: background-color 0.3s, transform 0.2s; /* Smooth transition */
    }

    .buttons_swiftting button:hover {
        background-color: #e0e0e0; /* Slightly darker on hover */
    }

    .buttons_swiftting button.active {
        background-color: #4a90e2; /* Highlight color for the active button */
        color: #fff;
        border-color: #4a90e2;
    }

    .buttons_swiftting button:focus {
        outline: none;
        box-shadow: 0 0 0 2px rgba(74, 144, 226, 0.5); /* Add a subtle focus ring */
    }
</style>