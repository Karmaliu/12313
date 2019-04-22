const Koa = require('koa');
const app = new Koa();
const cors = require('koa2-cors');
const router = require('./routes/router');
const bodyParser = require('Koa-bodyparser');
const CORS = require('./config/cors');
const koaJwt = require('koa-jwt');
app.keys = ['some secret hurr'];

// 密钥
const jwtSecret = 'xzxzddezes';

app.use(cors(CORS))

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

// 拦截
app.use(koaJwt({ secret: jwtSecret }).unless({
  path: [/^\/login/, /^\/register/]
}))


//body parser
app.use(bodyParser());

//route
app.use(router.routes());

app.listen(4000);
