/**
 * @function 并发控制核心函数
 * @param {Object} Options 接收一个对象参数
 * @param {Number} Options.limit 同一时间内并发的最大请求数量
 * @param {any[]} Options.array array里面的每一项都会传递给fn
 * @param {Function} Options.fn 用户真正的异步请求函数,第一个参数是array里面的当前项,第二个参数是整个array
 * @return Promise
 * @author ljh 2022-02-08
 */
async function requestLimit({ limit, array, fn }) {
  requestLimit.RESULT = []; // 用于存放所有请求的结果,包含成功和失败
  requestLimit.pool = []; // 请求池
  for (const item of array) {
    // console.log("item", item);
    /*
     为了能在所有请求都结束后再统一取结果,这里用了promise包裹每一个返回的结果,
     并且都置为resolve,再循环外面通过Promise.all来等待所有结果都resolve后就能统一取到结果了,
     还有一个好处就是只需要通过then判断当前请求是否回来,无论结果时成功还是失败,都会放到成功的状态里面
    */

    let task = Promise.resolve().then(() => fn(item, array));
    requestLimit.RESULT.push(task); // 将结果统一放到结果集合

    if (requestLimit.pool.length < limit) {
      // 请求回来后(这里必定为成功,因为上面Promise.resolve),将请求池内的对应请求删除

      const e = task.then(res => {
        // console.log(`当前请求池内请求个数: ${requestLimit.pool.length}`);
        requestLimit.pool.splice(requestLimit.pool.indexOf(e), 1);
        // console.log(`当前请求池内请求个数: ${requestLimit.pool.length}`);
      });

      // 先将请求池塞满
      requestLimit.pool.push(task);
      // 当请求池内请求数量大于等于限制的并发数量时,开始发请求(await会等待请求池内最快的一个请求返回后,再继续循环)
      //   console.log(`当前请求池内请求个数: ${requestLimit.pool.length}`);
      if (requestLimit.pool.langth >= limit) {
        await Promise.race(requestLimit.pool);
        // console.log(`当前请求池内请求个数: ${requestLimit.pool.length}`);
      }
    }
  }

  return Promise.all(requestLimit.RESULT);
}

if (typeof exports === "object" && typeof module !== undefined) {
  exports = module.exports = requestLimit;
} else {
  window.requestLimit = requestLimit;
}
