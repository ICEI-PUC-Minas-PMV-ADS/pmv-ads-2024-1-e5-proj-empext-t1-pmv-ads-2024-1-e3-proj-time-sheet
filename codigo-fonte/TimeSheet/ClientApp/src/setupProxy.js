const { createProxyMiddleware } = require('http-proxy-middleware');
const { env } = require('process');

const target = env.ASPNETCORE_HTTPS_PORT ? `https://localhost:${env.ASPNETCORE_HTTPS_PORT}` :
  env.ASPNETCORE_URLS ? env.ASPNETCORE_URLS.split(';')[0] : 'http://localhost:20590';

const context =  [
    "/user/create",
    "/user/all",
    "/user/disable",
    "/user/authenticate",
    "/user/disable",
    "/user/enable",
    "/user/changepassword",
    "/user/update",
    "/user/delete",
    "/user/verify",
    "/user/authenticated"
];

module.exports = function(app) {
  const appProxy = createProxyMiddleware(context, {
    proxyTimeout: 10000,
    target: target,
    secure: false,
    headers: {
      Connection: 'Keep-Alive'
    }
  });

  app.use(appProxy);
};
