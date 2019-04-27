const router = require('koa-router')();
const user = require('../controllers/login');
// const { getBlogList, uploadBlog, getEssay } = require('../controllers/blog');

router.get('/', async ctx => {
  ctx.body = "xxxx";
})
router.post('/login', user.login);
router.post('/register', user.registered);
router.post('/captcha', user.captcha);
module.exports = router;