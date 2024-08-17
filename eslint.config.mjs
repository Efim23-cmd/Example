import js from '@eslint/js';
import eslintPluginPrettier from 'eslint-plugin-prettier';
import globals from 'globals';
import tseslint from 'typescript-eslint';

export default [
	{
		plugins: {
			'@typescript-eslint': tseslint.plugin,
			prettier: eslintPluginPrettier,
		},
	},
	{
		files: ['src/**/*.{js, ts}'],
	},
	{
		languageOptions: {
			globals: { ...globals.browser },
			/* parserOptions: {
				project: ['tsconfig.json'],
			}, */
		},
	},
	{
		ignores: ['node_modules', 'webpack.config.js', 'dist'],
	},
	js.configs.recommended,
	...tseslint.configs.recommended,
];
