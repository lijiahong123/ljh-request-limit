var child_process = require("child_process");
const requestLimit = require("ljh-request-limit");

function request(url, arr) {
  //   console.log(`${url}-----开始请求了`);
  //   var curl = `curl ${url}`;
  //   return new Promise((resolve, reject) => {
  //     var child = child_process.exec(curl, function(err, stdout, stderr) {
  //       if (err) {
  //         console.log(`${url}-----请求出错了`);
  //         reject(err);
  //       } else {
  //         console.log(`${url}-----请求成功了`);
  //         resolve(stdout);
  //       }
  //     });
  //   });
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      //   if (arr[url] % 2 === 0) {
      resolve(url);
      //   } else {
      //     reject(url);
      //   }
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
