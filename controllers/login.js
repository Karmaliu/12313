const { User } = require('../lib/model');
const crypto = require('crypto');
const jwt = require('jwt-simple');
const md5 = crypto.createHash('md5');
const redis = require('../config/redis');
const { send } = require('../config/captcha');
// 密钥
const jwtSecret = 'xzxzddezes';
const tokenExpiresTime = 1000 * 60 * 60 * 24 * 7

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
    const { email = "", password = "" } = ctx.request.body;
    let md5 = crypto.createHash("md5");
    md5.update(password);
    let passres = md5.digest("hex");
    let query = { email, password: passres };
    let data = await User.find(query);
    if (data && data.length > 0) {
      let payload = {
        exp: Date.now() + tokenExpiresTime,
        name: data[0].id,
      }
      let token = jwt.encode(payload, jwtSecret);
      const userData = data[0];
      const result = {
        code: 1,
        data: { userData, token }
        // data: { ...data[0], token },
        // { ...data[0], token },
      }
      return ctx.body = result;
      // 存入数据库
    }
    return ctx.body = 'error';
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
  },
  // 验证码
  captcha: async ctx => {
    const { phone } = ctx.request.body;
    return ctx.body = phone;
    // console.log(phone);
    // send(phone);
  }
  // 退出登录
  // logout: async ctx => {
  //   ctx.session = null;
  // }
}