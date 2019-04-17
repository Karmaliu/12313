const Koa = require('koa');
const app = new Koa();
const cors = require('koa2-cors');
const router = require('./routes/router');
const bodyParser = require('Koa-bodyparser');

app.use(cors({
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
}))

// error handing
app.use(async (ctx, next) => {
  try {
    await next();
  } catch (error) {
    ctx.status = error.status || 500;
    ctx.body = error.message;
    ctx.app.emit('error', error, ctx);
  }
});

//body parser
app.use(bodyParser());

//route
app.use(router.routes());

app.listen(4000);