module.exports = {
  devServer: {
    open: true
    // proxy: {
    //   '/api': {
    //     target: 'http://85eornk2.xiaomy.net',
    //     // target: 'http://localhost:3000',
    //     pathRewrite: {
    //       '^/api': ''
    //     }
    //   }
    // }
  },
  css: {
    loaderOptions: {
      sass: {
        prependData: `@import "./src/assets/scss/_variable";`
      }
    }
  },
  outputDir: '/dh/webapps/ROOT'
}
