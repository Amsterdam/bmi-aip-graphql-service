module.exports = {
	parser: '@typescript-eslint/parser',
	parserOptions: {
		ecmaVersion: 2018,
		sourceType: 'module',
		project: ['tsconfig.json'],
	},
	env: {
		node: true,
		jest: true,
		es6: true,
		browser: true,
	},
	extends: [
		'plugin:@typescript-eslint/recommended',
		'plugin:import/recommended',
		'plugin:import/typescript',
		'airbnb-typescript',
		'plugin:prettier/recommended',
		'prettier',
		'eslint:recommended',
	],
	rules: {
		'react/jsx-filename-extension': ['off'], // Because of our non default prettier config.
		indent: ['off'], // Because of our non default prettier config.
		'prettier/prettier': ['off'], // Can't get --fix to play nice with Prettier
		'@typescript-eslint/indent': ['off'], // Because of our non default prettier config.
		'import/no-default-export': ['off'],
		'import/no-named-as-default': ['off'],
		'import/order': ['warn', { 'newlines-between': 'always' }],
		'import/no-extraneous-dependencies': ['off'],
		'@typescript-eslint/ban-ts-comment': 'warn',
	},
};
