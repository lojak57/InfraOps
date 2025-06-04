import { writable } from 'svelte/store';
import type { VisualizerTheme } from '../types/cost-visualizer.types';

function createThemeStore() {
	const { subscribe, set, update } = writable<boolean>(false);

	return {
		subscribe,
		init: () => {
			// Check for saved theme preference
			const savedTheme = localStorage.getItem('calibration-theme');
			if (savedTheme === 'dark') {
				set(true);
			}
		},
		toggle: () => {
			update(isDark => {
				const newValue = !isDark;
				localStorage.setItem('calibration-theme', newValue ? 'dark' : 'light');
				return newValue;
			});
		}
	};
}

export const themeStore = createThemeStore(); 