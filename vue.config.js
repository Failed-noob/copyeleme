module.exports = {
  lintOnSave:false, //将eslint检查关闭
  devServer: {
    open: true,
    host: '',
    port: 8080,
    https: false,
    hotOnly: false,
    proxy: {
      // 配置跨域
      '/api': {
        target: 'http://127.0.0.1:5000/api/',
        ws: true,
        changOrigin: true,
        pathRewrite: {
          '^/api': ''
        }
      }
    },
    before: app => {}
  }
};
