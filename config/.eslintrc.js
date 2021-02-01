module.exports = {
	extends: 'react-app',
	overrides: [
		{
			files: ['**/*.js?(x)'],
			rules: {
				indent: [
					'error',
					'tab',
					{
						SwitchCase: 1,
					},
				],
				'linebreak-style': ['error', 'unix'],
				quotes: [
					'error',
					'single',
					{
						avoidEscape: true,
					},
				],
				semi: ['error', 'always'],
				'no-console': 'off',
				'no-fallthrough': 'off',
				'no-prototype-builtins': 'off',
				'no-useless-escape': 'off',
				'no-throw-literal': 'off',
				'import/no-anonymous-default-export': 'off',
			},
		},
	],
};
