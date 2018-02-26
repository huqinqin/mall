const path = require("path");
const webpack = require("webpack");

module.exports = {
    // 你想要打包的模块的数组
    entry: {
        vendor: ['vue/dist/vue.esm', 'vue-router', 'jquery', 'vue-resource', 'vue-i18n', 'element-ui']
    },
    output: {
        path: path.join(__dirname, '../static/js'), // 打包后文件输出的位置
        filename: 'common.dll.js',
        library: 'common_library'
        // common.dll.js中暴露出的全局变量名。
        // 主要是给DllPlugin中的name使用，
        // 故这里需要和webpack.DllPlugin中的`name: '[name]_library',`保持一致。
    },
    plugins: [
        new webpack.DllPlugin({
            path: path.join(__dirname, '.', '../common.manifest.json'),
            name: 'common_library',
            context: __dirname
        }),
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false
            }
        }),
    ]
};
