// eslint underlines in red any code that violates the rules set below and will remove the red underline when the error is corrected.
// you can modify the rules to suit your team's project,
// and eslint will ensure the project meets the rule requirements you've set.
// useful for javascript projects to keep your project organized and keep code the same style for everyone.
module.exports = {
	root: true,
	env: { browser: true, es2020: true },
	extends: [
		"eslint:recommended",
		"plugin:react/recommended",
		"plugin:react/jsx-runtime",
		"plugin:react-hooks/recommended",
	],
	ignorePatterns: ["dist", ".eslintrc.cjs"],
	parserOptions: { ecmaVersion: "latest", sourceType: "module" },
	settings: { react: { version: "18.2" } },
	plugins: ["react-refresh"],
	rules: {
		"react/prop-types": "off",
		"react/jsx-no-target-blank": "off",
		"react-refresh/only-export-components": ["warn", { allowConstantExport: true }],
	},
};
