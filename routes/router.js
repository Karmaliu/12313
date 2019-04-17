const router = require('koa-router')();
const user = require('../controllers/login');
// const { getBlogList, uploadBlog, getEssay } = require('../controllers/blog');

router.post('/login', user.login);
module.exports = router;