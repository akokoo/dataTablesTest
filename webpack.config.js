const path = require('path');

module.exports = {
    entry: './src/app.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js',
        publicPath: 'dist/'
    },
    devServer: {
        contentBase: [path.join(__dirname, 'public')],
        watchContentBase: true,
        open: true
    }
};