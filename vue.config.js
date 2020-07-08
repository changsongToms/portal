const webpack = require('webpack')
module.exports = {
  publicPath: '/dzz/portal/template/vue/dist',
  lintOnSave: false,
  devServer: {
    proxy: {
      "/api": {
        target: "http://127.0.0.3",
        ws: true,
        changeOrigin: true,
        pathRewrite: { //重写路径 比如'/api/aaa/ccc'重写为'/aaa/ccc'
          '^/api': ''
        }
      }
    }
  },
  configureWebpack:{
    plugins: [
      new webpack.ProvidePlugin({
        $: "jquery",
        jQuery: "jquery",
        "windows.jQuery": "jquery"
      })
    ]
  },

}
