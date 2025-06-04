import type { AnimationState, AnimationConfig, TableAnimations, CostData } from '../types/table.types';

export function createAnimationState(): AnimationState {
	return {
		animatedMonthly: 0,
		animatedAnnual: 0,
		animatedSavings: 0,
		animationRunning: false,
		animationTimeouts: [],
		lastAnimatedValues: { monthly: 0, annual: 0, savings: 0 }
	};
}

export function cleanupAnimations(state: AnimationState): void {
	state.animationTimeouts.forEach(timeout => clearTimeout(timeout));
	state.animationTimeouts = [];
	state.animationRunning = false;
}

export function animateValue(
	start: number, 
	end: number, 
	duration: number, 
	callback: (value: number) => void,
	onComplete?: () => void
): () => void {
	const startTime = performance.now();
	const diff = end - start;
	let animationId: number;
	
	function update(currentTime: number) {
		const elapsed = currentTime - startTime;
		const progress = Math.min(elapsed / duration, 1);
		
		// Easing function for smooth animation
		const easeOut = 1 - Math.pow(1 - progress, 3);
		const current = start + (diff * easeOut);
		
		callback(Math.round(current));
		
		if (progress < 1) {
			animationId = requestAnimationFrame(update);
		} else {
			onComplete?.();
		}
	}
	
	animationId = requestAnimationFrame(update);
	
	// Return cleanup function
	return () => {
		if (animationId) {
			cancelAnimationFrame(animationId);
		}
	};
}

export function getTableAnimations(): TableAnimations {
	return {
		monthly: {
			duration: 1200,
			delay: 0,
			easing: (progress: number) => 1 - Math.pow(1 - progress, 3)
		},
		annual: {
			duration: 1500,
			delay: 200,
			easing: (progress: number) => 1 - Math.pow(1 - progress, 3)
		},
		savings: {
			duration: 1800,
			delay: 400,
			easing: (progress: number) => 1 - Math.pow(1 - progress, 3)
		}
	};
}

export function shouldTriggerAnimation(
	state: AnimationState,
	costData: CostData
): boolean {
	if (!costData || state.animationRunning) return false;
	
	return state.lastAnimatedValues.monthly !== costData.monthlyTotal ||
		   state.lastAnimatedValues.annual !== costData.annualTotal ||
		   state.lastAnimatedValues.savings !== costData.annualSavings;
}

export function triggerTableAnimations(
	state: AnimationState,
	costData: CostData,
	updateCallbacks: {
		updateMonthly: (value: number) => void;
		updateAnnual: (value: number) => void;
		updateSavings: (value: number) => void;
	}
): void {
	cleanupAnimations(state);
	state.animationRunning = true;
	
	const animations = getTableAnimations();
	let completedAnimations = 0;
	const totalAnimations = 3;
	
	function onAnimationComplete() {
		completedAnimations++;
		if (completedAnimations === totalAnimations) {
			state.animationRunning = false;
			state.lastAnimatedValues = {
				monthly: costData.monthlyTotal,
				annual: costData.annualTotal,
				savings: costData.annualSavings
			};
		}
	}

	// Start animations with cleanup tracking
	const cleanup1 = animateValue(
		state.animatedMonthly, 
		costData.monthlyTotal, 
		animations.monthly.duration, 
		updateCallbacks.updateMonthly,
		onAnimationComplete
	);
	
	const cleanup2 = animateValue(
		state.animatedAnnual, 
		costData.annualTotal, 
		animations.annual.duration, 
		updateCallbacks.updateAnnual,
		onAnimationComplete
	);
	
	const cleanup3 = animateValue(
		state.animatedSavings, 
		costData.annualSavings, 
		animations.savings.duration, 
		updateCallbacks.updateSavings,
		onAnimationComplete
	);
	
	// Store cleanup functions with delays
	state.animationTimeouts.push(
		setTimeout(cleanup1, animations.monthly.duration + 100),
		setTimeout(cleanup2, animations.annual.duration + 100),
		setTimeout(cleanup3, animations.savings.duration + 100)
	);
}

export function initializeAnimationValues(
	state: AnimationState,
	costData: CostData
): void {
	if (costData) {
		state.animatedMonthly = costData.monthlyTotal;
		state.animatedAnnual = costData.annualTotal;
		state.animatedSavings = costData.annualSavings;
		state.lastAnimatedValues = {
			monthly: costData.monthlyTotal,
			annual: costData.annualTotal,
			savings: costData.annualSavings
		};
	}
} 