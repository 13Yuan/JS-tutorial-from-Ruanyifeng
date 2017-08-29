/**
 * Promise原理
 * 参数：fn
 * 属性：missions, status, next_resolve
 * 方法：resolve(执行), then(队列), handle(promise, result)
 * new Promise(coding).then(testing).then(goLive)
 * 1. 
 */

function myPromise(fn) {
  const missions = [];
  let val = null;
  let status = "pending";
  const next_resolve = null;
  //执行传入的方法
  fn(resolve);
  //当传入的方法中调用resolve(value)时，异步执行mission
  function resolve(_return_value) {
    val = _return_value;
    status = "fulfilled";
    setTimeout(() => {
      missions.forEach(mission => {
        handle(mission);
      });
    }, 0);
  }
  this.then = function(mission) {
    const fn = function(resolve) {
      next_resolve = resolve;
      if (status === "pending") {
        missions.push(mission);
      } else {
        handle(mission);
      }
    };
    return new myPromise(fn);
  };
  function handle(mission) {
    const result = mission(val);
    //当处理结果为promise时，将next_resolve推入待执行队列
    if (
      result && (typeof result === "object" || typeof result === "function")
    ) {
      result.then(next_resolve);
    } else {
      next_resolve(result);
    }
  }
}

function coding(resolve) {
  console.log("coding");
  resolve("coding completed");
}
function testing(resolve) {
  console.log("testing");
  resolve("testing completed");
}
new myPromise(conding).then(testing);
