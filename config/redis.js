const Redis = require('ioredis');
module.exports = new Redis({
  // host: '127.0.0.1',
  // port: 8069,
  family: 4,
  prefix: 'sam:',   //存储前缀
  ttl: 60 * 60 * 23,// 过期时间
  db: 0,
});