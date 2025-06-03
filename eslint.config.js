import eslint from '@eslint/js';
import tseslint from 'typescript-eslint';
import svelte from 'eslint-plugin-svelte';
import prettier from 'eslint-config-prettier';
import globals from 'globals';

/** @type {import('eslint').Linter.Config[]} */
export default [
	eslint.configs.recommended,
	...tseslint.configs.recommended,
	...svelte.configs['flat/recommended'],
	prettier,
	...svelte.configs['flat/prettier'],
	{
		languageOptions: {
			globals: {
				...globals.browser,
				...globals.node
			}
		}
	},
	{
		files: ['**/*.svelte'],
		languageOptions: {
			parserOptions: {
				parser: tseslint.parser
			}
		},
		rules: {
			// Component Size Enforcement - Part of Component Refactoring Plan
			// Using 'warn' during refactoring phase, will switch to 'error' after completion
			'max-lines': ['warn', {
				'max': 200,
				'skipBlankLines': true,
				'skipComments': true
			}],
			'max-lines-per-function': ['warn', { 
				max: 50, 
				skipBlankLines: true, 
				skipComments: true 
			}],
			'max-depth': ['warn', 4],
			'max-nested-callbacks': ['warn', 3],
			'max-params': ['warn', 4],
			'complexity': ['warn', 10]
		}
	},
	{
		ignores: ['build/', '.svelte-kit/', 'dist/']
	}
]; 