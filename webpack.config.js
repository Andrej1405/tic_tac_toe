const path = require('path')
const webpack = require('webpack')

module.exports = (env, argv) => {
    // Точки входа
    const entryPoints = [
        {
            entry: './public/src',
        },
    ]
    const vendors = ['@babel/polyfill']

    return {
        entry: () => {
            const entry = {}
            
            entryPoints.forEach((v) => (entry[v.entry] = [...vendors, v.entry + '/index.js']))
            return entry
        },
        output: {
            path: path.resolve(__dirname),
            filename: './public/dist/bundle.js',
        },
        resolve: {
            extensions: ['.ts', '.tsx', '.js', '.jsx', '.json'],
            modules: ['.', path.join(__dirname, 'node_modules')],
        },
        devtool: 'inline-source-map',
        module: {
            rules: [
                {
                    test: /\.(js|ts)x?$/,
                    loader: 'babel-loader',
                },
                {
                    test: /\.css$/,
                    use: ['style-loader', 'css-loader', 'less-loader'],
                },
                {
                    test: /\.(woff|woff2|eot|ttf|otf|svg|png|gif|jpg|jpeg)$/,
                    loader: 'file-loader',
                    options: {
                        outputPath: './public/dist',
                    },
                },
            ],
        },
    }
}
