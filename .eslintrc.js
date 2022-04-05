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
    ],
    settings: {
        // Commented out for now; this caused consistent memory exhaustion when running ESLint in IntelliJ IDEs
        // Possibly due to cyclic dependency hell?
        // 'import/resolver': { typescript: {}, node: { extensions: ['.ts', '.tsx'] } },
    },
    rules: {
        indent: ['off'], // Because of our non default prettier config.
        'prettier/prettier': ['off'], // Can't get --fix to play nice with Prettier
        '@typescript-eslint/indent': ['off'], // Because of our non default prettier config.
        'import/no-default-export': ['off'],
        'import/no-named-as-default': ['off'],
        'import/order': ['warn', { 'newlines-between': 'always' }],
        'react/jsx-boolean-value': ['error'],
        'import/no-extraneous-dependencies': ['off'],
        'react/react-in-jsx-scope': ['off'],
        'react/jsx-one-expression-per-line': ['off'],
        'react/jsx-filename-extension': ['error', { extensions: ['.tsx'] }],
        '@typescript-eslint/ban-ts-comment': 'warn',
    },
};

