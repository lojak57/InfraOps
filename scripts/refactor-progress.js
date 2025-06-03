// scripts/refactor-progress.js - Track refactoring completion
import fs from 'fs';
import { glob } from 'glob';
import path from 'path';

function trackRefactorProgress() {
  console.log('🔍 Scanning component sizes...\n');
  
  const svelteFiles = glob.sync('src/**/*.svelte');
  let refactoredCount = 0;
  let totalSize = 0;
  let refactoredSize = 0;
  
  const components = svelteFiles.map(file => {
    const content = fs.readFileSync(file, 'utf8');
    const lines = content.split('\n').length;
    const isRefactored = content.includes('@refactored:');
    
    totalSize += lines;
    if (isRefactored) {
      refactoredCount++;
      refactoredSize += lines;
    }
    
    return {
      file: file.replace('src/', ''),
      lines,
      isRefactored,
      compliant: lines <= 200
    };
  });
  
  const complianceRate = components.filter(c => c.compliant).length / components.length;
  const refactorRate = refactoredCount / components.length;
  
  console.log('📊 REFACTORING PROGRESS REPORT');
  console.log('================================');
  console.log(`Total Components: ${components.length}`);
  console.log(`Refactored: ${refactoredCount} (${(refactorRate * 100).toFixed(1)}%)`);
  console.log(`Compliant (≤200 lines): ${components.filter(c => c.compliant).length} (${(complianceRate * 100).toFixed(1)}%)`);
  console.log(`Average Size: ${Math.round(totalSize / components.length)} lines`);
  
  // Phase targets
  const phases = {
    'Phase 1': { target: 50, description: 'Critical Components (1000+ lines)' },
    'Phase 2': { target: 70, description: 'High Priority (500-999 lines)' },
    'Phase 3': { target: 85, description: 'Medium Priority (200-499 lines)' },
    'Phase 4': { target: 100, description: 'Complete Compliance' }
  };
  
  console.log('\n🎯 PHASE PROGRESS:');
  Object.entries(phases).forEach(([phase, data]) => {
    const current = complianceRate * 100;
    const status = current >= data.target ? '✅' : '🔄';
    console.log(`${status} ${phase}: ${current.toFixed(1)}% / ${data.target}% - ${data.description}`);
  });
  
  // Show remaining violations
  const violations = components.filter(c => !c.compliant).sort((a, b) => b.lines - a.lines);
  if (violations.length > 0) {
    console.log('\n🚨 REMAINING VIOLATIONS:');
    console.log('Component | Lines | Status');
    console.log('----------|-------|--------');
    violations.slice(0, 15).forEach(v => {
      const status = v.isRefactored ? 'REFACTORED' : 'PENDING';
      const statusIcon = v.isRefactored ? '🔄' : '❌';
      console.log(`${statusIcon} ${v.file.padEnd(40)} | ${v.lines.toString().padStart(3)} | ${status}`);
    });
    
    if (violations.length > 15) {
      console.log(`... and ${violations.length - 15} more violations`);
    }
  } else {
    console.log('\n🎉 ALL COMPONENTS COMPLIANT! 🎉');
  }
  
  // Critical violations (1000+ lines)
  const critical = violations.filter(v => v.lines >= 1000);
  if (critical.length > 0) {
    console.log('\n🚨 CRITICAL VIOLATIONS (1000+ lines):');
    critical.forEach(v => {
      console.log(`💥 ${v.file}: ${v.lines} lines (${(v.lines / 200).toFixed(1)}x limit)`);
    });
  }
  
  console.log('\n');
  return {
    total: components.length,
    compliant: components.filter(c => c.compliant).length,
    refactored: refactoredCount,
    complianceRate,
    refactorRate,
    violations: violations.length
  };
}

// Run the progress tracking
trackRefactorProgress();

export { trackRefactorProgress }; 