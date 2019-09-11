module.exports = {
  publicPath: process.env.NODE_ENV === 'production'
    ? '.'
    : '.',
  configureWebpack: {
    devtool: 'source-map'
  },
  

  lintOnSave: false,
  devServer: {
    disableHostCheck: true,
    clientLogLevel: 'info'
  },
  configureWebpack: {
    resolve: {
      alias: {
        'vue$': 'vue/dist/vue.esm.js' // 'vue/dist/vue.common.js' for webpack 1
      }
    }
  }
}
