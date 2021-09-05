const { createProxyMiddleware } = require('http-proxy-middleware')

module.exports = function expressMiddleware (router) {
  router.use('/upload', createProxyMiddleware({
    target: 'http://81.69.13.224:8080',
    changeOrigin: true,
    pathRewrite: {
      '^/upload': '/upload', // rewrite path
    },
  }))

  router.use('/images', createProxyMiddleware({
    target: 'http://81.69.13.224:80',
    changeOrigin: true,
    pathRewrite: {
      '^/images': '/images', // rewrite path
    },
  }))
}