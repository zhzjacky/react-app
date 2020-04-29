const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = (mode) => {

    const isDev = mode === "development";

    return {
        entry: {
            app: ["./src/index.tsx"]
        },
        mode: isDev ? "development" : "production",
        devtool: isDev ? "source-map" : false,
        output: {
            path: path.resolve(__dirname, "dist"),
            filename: "[name].bundle.js",
            chunkFilename: "[name].chunk.js",
            publicPath: "/" // 必须，HtmlWebpackPlugin 注入的 js 路径会以这个路径作为起始路径
        },
        resolve: {
            extensions: [".ts", ".tsx", ".js", ".jsx", ".json"]
        },
        module: {
            rules: [
                {
                    test: /\.tsx?$/i,
                    loader: "ts-loader"
                },
                {
                    test: /\.s?css$/i,
                    exclude: /\.module\.s?css$/i,
                    loader: "style-loader!css-loader!sass-loader"
                },
                {
                    test: /\.module.s?css$/i,
                    use: [
                        {
                            loader: "style-loader"
                        },
                        {
                            loader: "css-loader",
                            options: {
                                modules: isDev ? {
                                    localIdentName: '[path]page__[local]',
                                    context: path.resolve(__dirname, 'src/example'),
                                } : {
                                    localIdentName: '[hash:base64]',
                                },
                                localsConvention: 'dashes'
                            }
                        },
                        {
                            loader: "sass-loader"
                        }
                    ]

                },
                {
                    test: /\.(gif|jpg|png|woff|svg|eot|ttf)\??.*$/,
                    loader: "url-loader"
                }
            ]
        },
        plugins: [
            new HtmlWebpackPlugin({
                template: "./index.html"
            })
        ],
        devServer: {
            hot: true,
            port: 3000,
            transportMode: "ws",
            open: true,
            historyApiFallback: true,
            //contentBase: "/stock",
            //openPage: "stock"
            // proxy: {
            //     '/Home': {
            //         target: 'https://www.zmace.net:8010/',
            //         changeOrigin: true,
            //         ws: true
            //     },
            //     '/Cc': {
            //         target: 'https://www.zmace.net:8010/',
            //         changeOrigin: true,
            //         ws: true
            //     },
            //     '/Fscc': {
            //         target: 'https://www.zmace.net:8011/',
            //         changeOrigin: true,
            //         ws: true
            //     }
            // }
        }
    };
};