const requestLimit = require("ljh-request-limit");

function request(url, arr) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(url);
    }, 3000);
  });
}

let array = [
  "www.baidu.com",
  "www.163.com",
  "www.qq.com",
  "www.fendou.host",
  "www.aliyun.com"
];

// 请求示例
requestLimit({ limit: 2, array, fn: request })
  .then(result => {
    console.log("最终请求结果", result);
  })
  .catch(e => {
    console.log("出错了", e);
  });
