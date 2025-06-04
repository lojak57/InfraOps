<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import type { LoadCalculatorInputs, LoadCalculatorResults } from './load-calculator/types/load-calculator.types';
	import { calculateLoadResults } from './load-calculator/utils/load-calculations';
	
	// Import orchestrator components
	import LoadCalculatorHeader from './load-calculator/LoadCalculatorHeader.svelte';
	import LoadCalculatorInputsComponent from './load-calculator/LoadCalculatorInputs.svelte';
	import LoadCalculatorResultsComponent from './load-calculator/LoadCalculatorResults.svelte';

	// Props with defaults for typical logistics truck
	export let truckTare = 15000;
	export let trailerTare = 8000;
	export let driverWeight = 180;
	export let equipment = 500;
	export let materialDensity = 8.5; // lbs per gallon (typical for liquid product)
	export let weatherPenalty = 0;
	export let roadConditions: 'Good' | 'Fair' | 'Poor' = 'Good';

	const dispatch = createEventDispatcher<{
		'calculation-complete': {
			maxUnits: number;
			totalVolume: number;
			availableWeight: number;
			weightUtilization: number;
		};
	}>();

	// Reactive inputs object
	$: inputs = {
		truckTare,
		trailerTare,
		driverWeight,
		equipment,
		materialDensity,
		weatherPenalty,
		roadConditions
	} as LoadCalculatorInputs;

	// Reactive calculations
	$: results = calculateLoadResults(inputs) as LoadCalculatorResults;

	// Dispatch calculation results
	$: {
		dispatch('calculation-complete', {
			maxUnits: results.maxUnits,
			totalVolume: results.totalVolume,
			availableWeight: results.availableWeight,
			weightUtilization: results.weightUtilization
		});
	}

	function handleInputChange(event: CustomEvent<LoadCalculatorInputs>) {
		const updatedInputs = event.detail;
		truckTare = updatedInputs.truckTare;
		trailerTare = updatedInputs.trailerTare;
		driverWeight = updatedInputs.driverWeight;
		equipment = updatedInputs.equipment;
		materialDensity = updatedInputs.materialDensity;
		weatherPenalty = updatedInputs.weatherPenalty;
		roadConditions = updatedInputs.roadConditions;
	}
</script>

<div class="load-calculator">
	<LoadCalculatorHeader capacityStatus={results.capacityStatus} />

	<div class="calculator-content">
		<LoadCalculatorInputsComponent {inputs} on:input-change={handleInputChange} />
		<LoadCalculatorResultsComponent {results} />
	</div>
</div>

<style>
	.load-calculator {
		background: white;
		border-radius: 16px;
		box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
		overflow: hidden;
		margin: 24px 0;
	}

	.calculator-content {
		padding: 24px;
	}

	@media (max-width: 768px) {
		.calculator-content {
			padding: 20px;
		}
	}
</style> 