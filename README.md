# ljh-request-limit
promise并发请求控制

在做node中台时候，要转发后端dubbo服务为前端提供http服务，经常遇到这样的需求，
前端上传excel文件到node, node解析到数据后，批量对数据进行校验，校验需要调后dubbo接口，但是后台的接口不支持批量校验，
而且excel数据量有时候很大，达到两万多条，若使用promise.all并发一次2000个请求，服务器内存会爆满，有很多请求因为阻塞而处于等待状态，最终失败，
这个并发控制就可以很好的解决问题

# 使用
## 1. 安装
```bash
$ npm install ljh-request-limit --save
```

## 2. 示例
```js
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

```

# 参数说明

`requestLimit`接收一个对象Options，对象内的三个字段都是必须的

`options.limit`
- 类型：Number
- 描述：同一时间发请求的最大数量

`options.array`
- 类型：Array
- 描述：array里面的每一项都会传递给fn

`options.fn`
- 类型：Function
- 描述：真正的异步请求函数,第一个参数是array里面的当前项,第二个参数是整个array





