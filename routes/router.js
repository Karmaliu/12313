const router = require('koa-router')();
const user = require('../controllers/login');
// const { getBlogList, uploadBlog, getEssay } = require('../controllers/blog');

router.get('/', async ctx => {
  ctx.body = "xxxx";
})
router.post('/login', user.login);
router.post('/register', user.registered);
router.get('/login', async ctx => {
  ctx.body = 'xxxx'
})
module.exports = router;