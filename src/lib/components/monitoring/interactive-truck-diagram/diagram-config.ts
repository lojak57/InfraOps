// Valve configuration for clean, maintainable setup
export const valveConfig = [
	{
		id: 'vent',
		top: '48%',
		left: '51%',
		status: 'closed' as const,
		label: 'Vent Valve - CLOSED',
		align: 'top' as const
	},
	{
		id: 'pressure-relief-tank',
		top: '45%',
		left: '30%',
		status: 'closed' as const,
		label: 'Pressure Relief - CLOSED',
		align: 'left' as const
	},
	{
		id: 'pressure-relief-cab',
		top: '45%',
		left: '28%',
		status: 'closed' as const,
		label: 'PR CAB - CLOSED',
		align: 'left' as const
	},
	{
		id: 'load-left',
		top: '52%',
		left: '20%',
		status: 'closed' as const,
		label: 'Load Left - CLOSED',
		align: 'left' as const
	},
	{
		id: 'belly',
		top: '62%',
		left: '45%',
		status: 'open' as const,
		label: 'Belly Valve - OPEN',
		align: 'left' as const
	},
	{
		id: 'fire',
		top: '58%',
		left: '51%',
		status: 'closed' as const,
		label: 'Fire Valve - CLOSED',
		align: 'right' as const
	},
	{
		id: 'load-right',
		top: '52%',
		left: '80%',
		status: 'open' as const,
		label: 'Load Right - OPEN',
		align: 'right' as const
	}
];

// Sensor configuration for clean positioning
export const sensorConfig = [
	{
		id: 'temp-1',
		top: '52%',
		left: '25%',
		value: '145°F',
		status: 'normal'
	},
	{
		id: 'temp-2',
		top: '65%',
		left: '25%',
		value: '142°F',
		status: 'normal'
	},
	{
		id: 'temp-3',
		top: '58%',
		left: '22%',
		value: '148°F',
		status: 'warning'
	}
]; 