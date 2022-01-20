const withAntdLess = require("next-plugin-antd-less");
const { getThemeVariables } = require("antd/dist/theme");

module.exports = withAntdLess({
	lessLoaderOptions: {
		modifyVars: getThemeVariables({
			dark: true, // Enable dark mode
			// compact: true, // Enable compact mode
		}),
		javascriptEnabled: true,
	},
	cssLoaderOptions: {
		// ...
		mode: "local",
		localIdentName: "[path][name]__[local]--[hash:base64:5]", // invalid! for Unify getLocalIdent (Next.js / CRA), Cannot set it, but you can rewritten getLocalIdentFn
		exportLocalsConvention: "camelCase",
		exportOnlyLocals: false,
		// ...
		getLocalIdent: (context, localIdentName, localName, options) => {
			return "whatever_random_class_name";
		},
	},

	// Other Config Here...

	webpack(config) {
		return config;
	},
});
