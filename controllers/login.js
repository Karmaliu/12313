const { User } = require('../lib/model');
module.exports = {
  // 登录
  login: async ctx => {
    const { email, password } = ctx.request.body;
    let query = { email, password };
    let data = await User.find(query);
    if (data && data.length > 0) {
      const result = {
        code: 1,
        data: data[0],
      }
      return ctx.body = result;
    }
    return ctx.body = 'password error';
  },
  // 注册
  registered: async ctx => {
    const { email, password } = ctx.request.body;
    // var record = new BlogList({ title, kind, id, filePath });
    // record.save(err => {
    //   if (err) {
    //     console.log(err);
    //     return ctx.body = 'error';
    //   }
    // });
    return ctx.body = 'xxxx';
  }
}