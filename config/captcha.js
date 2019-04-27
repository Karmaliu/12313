var QcloudSms = require("qcloudsms_js");

// 短信应用SDK AppID
var appid = 1400206403;  // SDK AppID是1400开头

// 短信应用SDK AppKey
var appkey = "49b9bde84bf5314bc49ab79fec03a5d5";

// 需要发送短信的手机号码
// var phoneNumbers = ["21212313123", "12345678902", "12345678903"];

// 短信模板ID，需要在短信应用中申请
var templateId = 7839;  // NOTE: 这里的模板ID`7839`只是一个示例，真实的模板ID需要在短信控制台中申请

// 签名
var smsSign = "腾讯云";  // NOTE: 这里的签名只是示例，请使用真实的已申请的签名, 签名参数使用的是`签名内容`，而不是`签名ID`

// 实例化QcloudSms
var qcloudsms = QcloudSms(appid, appkey);

var ssender = qcloudsms.SmsSingleSender();




// 设置请求回调处理, 这里只是演示，用户需要自定义相应处理回调
function callback(err, res, resData) {
  if (err) {
    console.log("err: ", err);
  } else {
    console.log("request data: ", res.req);
    console.log("response data: ", resData);
  }
}

module.exports = {
  send: phoneNumber => {
    console.log(phoneNumber);
    ssender.send(0, 86, phoneNumber,
      "【腾讯云】您的验证码是: 5678", "", "", callback);
  }
}