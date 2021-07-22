const path = require("path");
const TerserPlugin = require("terser-webpack-plugin");

module.exports = {
    mode: "production",
    devtool: "source-map",
    entry: {
        "obsidian-core": {
            import: "./Core/core.ts",
            library: {
                type: "window",
                name: "Obsidian",
                export: "default"
            }
        }
    },
    output: {
        path: path.resolve(__dirname, "dist"),
        filename: "[name].js",
    },
    resolve: {
        extensions: [".ts", ".js"]
    },
    /* Enable caching so rebuilds are faster. */
    cache: {
        type: 'filesystem',
        buildDependencies: {
            config: [__filename],
        },
    },
    module: {
        rules: [
            /* all files with a `.ts` extension will be handled by `ts-loader`. */
            {
                test: /\.ts$/,
                loader: "ts-loader"
            },
        ],
    },
    optimization: {
        minimizer: [
            new TerserPlugin({
                /* Disable the LICENSE.txt file that normally gets generated. */
                extractComments: false,
            }),
        ],
    },
    /* Warn if any file goes over 500KB. */
/*    performance: {
        maxEntrypointSize: 512000,
        maxAssetSize: 512000
    }*/
};
