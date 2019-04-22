const CORS = {
  origin: function (ctx) {
    // if (ctx.url === '/test') {
    //   return "*"; // 允许来自所有域名请求
    // }
    return 'http://localhost:3000';
  },
  exposeHeaders: ['WWW-Authenticate', 'Server-Authorization'],
  maxAge: 5,
  credentials: true,
  allowMethods: ['GET', 'POST', 'DELETE', 'PUT'],
  allowHeaders: ['Content-Type', 'Authorization', 'Accept'],
}

module.exports = CORS;