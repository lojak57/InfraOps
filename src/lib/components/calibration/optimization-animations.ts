import type { AnimationConfig, CounterAnimationState } from './optimization.types';

export class OptimizationAnimations {
  private animationTimeouts: number[] = [];
  private animationTimeout?: number;

  // Clean up function
  cleanupAnimations() {
    this.animationTimeouts.forEach(timeout => clearTimeout(timeout));
    this.animationTimeouts = [];
  }

  // Animation for counters with proper cleanup
  animateCounter(
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
      
      // Easing function
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

  // Debounced animation trigger
  triggerAnimations(
    state: CounterAnimationState,
    fleetStats: { calibrationsAvoided: number; moneySaved: number },
    updateCallbacks: {
      setCalibrationsAvoided: (value: number) => void;
      setMoneySaved: (value: number) => void;
      setIsAnimating: (value: boolean) => void;
      setLastAnimatedValues: (values: { avoided: number; saved: number }) => void;
    }
  ) {
    if (!fleetStats || state.isAnimating) return;
    
    // Clear any pending animation
    if (this.animationTimeout) {
      clearTimeout(this.animationTimeout);
    }
    
    // Debounce animations to prevent rapid firing
    this.animationTimeout = setTimeout(() => {
      // Check if values actually changed to avoid unnecessary animations
      const valuesChanged = 
        state.lastAnimatedValues.avoided !== fleetStats.calibrationsAvoided ||
        state.lastAnimatedValues.saved !== fleetStats.moneySaved;
        
      if (!valuesChanged) return;
      
      this.cleanupAnimations();
      updateCallbacks.setIsAnimating(true);
      
      let completedAnimations = 0;
      const totalAnimations = 2;
      
      function onAnimationComplete() {
        completedAnimations++;
        if (completedAnimations === totalAnimations) {
          updateCallbacks.setIsAnimating(false);
          // Store last animated values
          updateCallbacks.setLastAnimatedValues({
            avoided: fleetStats.calibrationsAvoided,
            saved: fleetStats.moneySaved
          });
        }
      }

      // Start animations with cleanup tracking
      const cleanup1 = this.animateCounter(
        state.animatedCalibrationsAvoided, 
        fleetStats.calibrationsAvoided, 
        1500, 
        updateCallbacks.setCalibrationsAvoided,
        onAnimationComplete
      );
      
      const cleanup2 = this.animateCounter(
        state.animatedMoneySaved, 
        fleetStats.moneySaved, 
        2000, 
        updateCallbacks.setMoneySaved,
        onAnimationComplete
      );
      
      // Store cleanup functions
      this.animationTimeouts.push(
        setTimeout(cleanup1, 1600),
        setTimeout(cleanup2, 2100)
      );
    }, 100); // 100ms debounce
  }

  // Initialize animated values
  initializeValues(
    fleetStats: { calibrationsAvoided: number; moneySaved: number }
  ): CounterAnimationState {
    return {
      animatedCalibrationsAvoided: fleetStats.calibrationsAvoided,
      animatedMoneySaved: fleetStats.moneySaved,
      isAnimating: false,
      lastAnimatedValues: {
        avoided: fleetStats.calibrationsAvoided,
        saved: fleetStats.moneySaved
      }
    };
  }

  // Cleanup on destroy
  destroy() {
    this.cleanupAnimations();
    if (this.animationTimeout) {
      clearTimeout(this.animationTimeout);
    }
  }
} 