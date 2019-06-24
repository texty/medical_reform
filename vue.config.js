module.exports = {
  publicPath: process.env.NODE_ENV === 'production'
    ? '/medical_reform/'
    : '/',
  configureWebpack: {
    devtool: 'source-map'
  },
  

  lintOnSave: false,
  devServer: {
    disableHostCheck: true,
    clientLogLevel: 'info'
  }
}
