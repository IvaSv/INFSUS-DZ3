const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
  try {
    app.use(
      '/api',
      createProxyMiddleware({
        target: 'http://localhost:8080',
        changeOrigin: true
      })
    );
  } catch (err) {
    console.log(err);
  }
};
