<script lang="ts">
	import type { JobTicketData } from './job-ticket.types';
	import JobTicketProductInfo from './JobTicketProductInfo.svelte';
	import JobTicketMeasurements from './JobTicketMeasurements.svelte';
	import JobTicketTemperature from './JobTicketTemperature.svelte';
	import JobTicketCoriolis from './JobTicketCoriolis.svelte';
	import JobTicketSafety from './JobTicketSafety.svelte';
	
	export let jobData: JobTicketData;
</script>

<div class="job-ticket-extended">
	<JobTicketProductInfo productInfo={jobData.product} />
	<JobTicketMeasurements measurements={jobData.measurements} />
	<JobTicketTemperature temperature={jobData.temperature} />
	<JobTicketCoriolis coriolis={jobData.coriolis} />
	<JobTicketSafety safety={jobData.safety} />
</div>

<style>
	.job-ticket-extended {
		display: flex;
		flex-direction: column;
		gap: 24px;
	}
</style> 