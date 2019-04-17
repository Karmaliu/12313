const { User } = require('../lib/model');
const crypto = require('crypto');
const md5 = crypto.createHash('md5');
async function queryMaxId() {
  let temp = 0;
  await User.find({}).sort({ 'id': -1 }).limit(1)
    .then((doc) => {
      if (doc.length > 0) {
        temp = parseInt(doc[0].id);
      } else {
        console.log('collection is empty');
      }
    });
  return temp;
}

module.exports = {
  // 登录
  login: async ctx => {
    const { email, password } = ctx.request.body;
    let md5 = crypto.createHash("md5");
    md5.update(password);
    let passres = md5.digest("hex");
    let query = { email, password: passres };

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
    const { email, phone, password } = ctx.request.body;
    let id = await queryMaxId() + 1;
    const cryptostr = md5.update(password).digest('hex');
    var record = new User({ email, phone, password: cryptostr, id: parseInt(id) });
    record.save(err => {
      if (err) {
        console.log(err);
        return ctx.body = 'error';
      }
    });
    return ctx.body = 'success';
  }
}