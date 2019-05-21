module.exports = {
  configureWebpack: {
    devtool: 'source-map'
  },

  lintOnSave: false,
  devServer: {
    disableHostCheck: true,
    clientLogLevel: 'info'
  }
}
