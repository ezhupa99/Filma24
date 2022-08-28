const { join } = require('path');

module.exports = {
    mode: 'development',
    devtool: 'inline-source-map',
    entry: {
        contentPage: join(__dirname, 'src/contentPage.ts'),
        serviceWorker: join(__dirname, 'src/serviceWorker.ts')
    },
    output: {
        path: join(__dirname, '../angular/dist'),
        filename: '[name].js'
    },
    module: {
        rules: [
            {
                test: /\.ts?$/,
                exclude: /node_modules/,
                loader: "ts-loader",
                options: {
                    configFile: "chrome/tsconfig.json",
                }
            }
        ]
    },
    resolve: {
        extensions: ['.ts', '.js']
    }
};
