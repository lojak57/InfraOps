<script lang="ts">
	import type { LoadCalculatorInputs } from './types/load-calculator.types';
	import { getInputFields, getRoadConditionsOptions } from './utils/load-calculations';
	import { createEventDispatcher } from 'svelte';

	export let inputs: LoadCalculatorInputs;

	const dispatch = createEventDispatcher<{
		'input-change': LoadCalculatorInputs;
	}>();

	const inputFields = getInputFields();
	const roadConditionsOptions = getRoadConditionsOptions();

	function handleInputChange() {
		dispatch('input-change', inputs);
	}

	function handleRoadConditionChange(condition: 'Good' | 'Fair' | 'Poor') {
		inputs.roadConditions = condition;
		handleInputChange();
	}
</script>

<div class="input-section">
	<h4>Vehicle Specifications</h4>
	<div class="input-grid">
		{#each inputFields as field}
			<div class="input-group">
				<label for={field.id}>{field.label}</label>
				<div class="input-with-unit">
					<input 
						id={field.id}
						type="number" 
						bind:value={inputs[field.key]}
						min={field.min}
						max={field.max}
						step={field.step}
						on:input={handleInputChange}
					/>
					<span class="unit">{field.unit}</span>
				</div>
			</div>
		{/each}
	</div>

	<div class="road-conditions">
		<label>Road Conditions</label>
		<div class="condition-buttons">
			{#each roadConditionsOptions as option}
				<button 
					class="condition-btn" 
					class:active={inputs.roadConditions === option.value}
					on:click={() => handleRoadConditionChange(option.value)}
				>
					{option.label}
				</button>
			{/each}
		</div>
	</div>
</div>

<style>
	.input-section {
		margin-bottom: 32px;
	}

	.input-section h4 {
		font-size: 16px;
		font-weight: 600;
		color: #1e293b;
		margin: 0 0 16px 0;
	}

	.input-grid {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
		gap: 16px;
		margin-bottom: 24px;
	}

	.input-group {
		display: flex;
		flex-direction: column;
		gap: 6px;
	}

	.input-group label {
		font-size: 14px;
		font-weight: 500;
		color: #374151;
	}

	.input-with-unit {
		position: relative;
		display: flex;
		align-items: center;
	}

	.input-with-unit input {
		flex: 1;
		padding: 10px 12px;
		border: 2px solid #e5e7eb;
		border-radius: 8px;
		font-size: 14px;
		transition: border-color 0.2s ease;
	}

	.input-with-unit input:focus {
		outline: none;
		border-color: #3b82f6;
	}

	.unit {
		position: absolute;
		right: 12px;
		font-size: 12px;
		color: #6b7280;
		font-weight: 500;
		pointer-events: none;
	}

	.road-conditions {
		display: flex;
		flex-direction: column;
		gap: 8px;
	}

	.road-conditions label {
		font-size: 14px;
		font-weight: 500;
		color: #374151;
	}

	.condition-buttons {
		display: flex;
		gap: 8px;
	}

	.condition-btn {
		flex: 1;
		padding: 10px 16px;
		border: 2px solid #e5e7eb;
		background: white;
		border-radius: 8px;
		font-size: 14px;
		font-weight: 500;
		cursor: pointer;
		transition: all 0.2s ease;
	}

	.condition-btn:hover {
		border-color: #3b82f6;
	}

	.condition-btn.active {
		background: #3b82f6;
		border-color: #3b82f6;
		color: white;
	}

	@media (max-width: 768px) {
		.input-grid {
			grid-template-columns: 1fr;
			gap: 12px;
		}

		.condition-buttons {
			flex-direction: column;
		}
	}
</style> 