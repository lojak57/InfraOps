#!/usr/bin/env node

import { execSync } from 'child_process';
import { writeFileSync } from 'fs';

/**
 * Component Size Report Generator
 * Tracks component sizes and identifies refactoring targets
 */

function generateComponentSizeReport() {
  console.log('🔍 Analyzing component sizes...\n');

  // Get component sizes
  const sizeOutput = execSync(
    `find src/lib/components -name "*.svelte" -exec wc -l {} + | sort -n`,
    { encoding: 'utf8' }
  );

  const lines = sizeOutput.trim().split('\n');
  const components = [];
  let totalLines = 0;

  // Parse component data
  for (const line of lines) {
    if (line.includes('total')) continue;
    
    const match = line.trim().match(/(\d+)\s+(.+)/);
    if (match) {
      const [, lineCount, filePath] = match;
      const lines = parseInt(lineCount);
      totalLines += lines;
      
      components.push({
        path: filePath,
        lines: lines,
        name: filePath.split('/').pop()
      });
    }
  }

  // Generate statistics
  const stats = {
    total: components.length,
    under200: components.filter(c => c.lines < 200).length,
    under300: components.filter(c => c.lines < 300).length,
    over300: components.filter(c => c.lines >= 300).length,
    over500: components.filter(c => c.lines >= 500).length,
    over800: components.filter(c => c.lines >= 800).length,
    largest: components[components.length - 1]
  };

  // Print report
  console.log('📊 COMPONENT SIZE REPORT');
  console.log('='.repeat(50));
  console.log(`Total Components: ${stats.total}`);
  console.log(`Total Lines: ${totalLines.toLocaleString()}`);
  console.log(`Average Size: ${Math.round(totalLines / stats.total)} lines\n`);

  console.log('📈 SIZE DISTRIBUTION:');
  console.log(`Under 200 lines: ${stats.under200} (${Math.round(stats.under200/stats.total*100)}%) ✅`);
  console.log(`200-299 lines:   ${stats.under300 - stats.under200} (${Math.round((stats.under300 - stats.under200)/stats.total*100)}%) ⚠️`);
  console.log(`300-499 lines:   ${stats.over300 - stats.over500} (${Math.round((stats.over300 - stats.over500)/stats.total*100)}%) ❌`);
  console.log(`500+ lines:      ${stats.over500} (${Math.round(stats.over500/stats.total*100)}%) 🔥`);
  console.log(`800+ lines:      ${stats.over800} (${Math.round(stats.over800/stats.total*100)}%) 💥\n`);

  // Show worst offenders
  if (stats.over500 > 0) {
    console.log('🚨 IMMEDIATE REFACTORING TARGETS (500+ lines):');
    components
      .filter(c => c.lines >= 500)
      .forEach(c => {
        const severity = c.lines >= 800 ? '💥' : '🔥';
        console.log(`${severity} ${c.name}: ${c.lines} lines`);
      });
    console.log();
  }

  // Show progress towards goals
  console.log('🎯 REFACTORING GOALS:');
  const goalUnder300 = Math.round((stats.under300 / stats.total) * 100);
  const goalUnder200 = Math.round((stats.under200 / stats.total) * 100);
  console.log(`Components under 300 lines: ${goalUnder300}% (Target: 95%)`);
  console.log(`Components under 200 lines: ${goalUnder200}% (Target: 80%)`);
  console.log(`Zero 500+ line components: ${stats.over500 === 0 ? '✅' : '❌'} (Target: ✅)\n`);

  // Save report to file
  const report = {
    timestamp: new Date().toISOString(),
    stats,
    components: components.map(c => ({ name: c.name, lines: c.lines }))
  };

  writeFileSync('component-size-report.json', JSON.stringify(report, null, 2));
  console.log('📄 Report saved to component-size-report.json');

  // Exit with error if we have components over 500 lines
  if (stats.over500 > 0) {
    console.log('\n❌ Found components over 500 lines. Refactoring required!');
    process.exit(1);
  }

  console.log('\n✅ All components are reasonably sized!');
}

generateComponentSizeReport(); 