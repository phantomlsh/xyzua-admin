module.exports = {
  publicPath: '/admin/',
  outputDir: 'admin',
  devServer: {
    proxy: {
      '/v1/': {
        target: 'http://localhost:9999/',
        changeOrigin: true,
      }
    },
    before: (app) => {}
  },
}