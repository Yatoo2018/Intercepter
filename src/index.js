import {Interceptor as LogInterceptor} from "./Interceptor"
import {Log} from "./Log"
var interceptor = new LogInterceptor({
  diff: function(o,n){
    return o.msg === n.msg
  }
})


// 添加测试用例
// interceptor.add(new Log({type: "type1", msg: "msg1"}))
// interceptor.add(new Log({type: "type2", msg: "msg2"}))
// interceptor.add(new Log({type: "type3", msg: "msg3"}))

// 循环添加10个相同记录

var times = 0;
var interval = setInterval(function intervalHandler() {
  times++;
  if(times > 10) {
    clearInterval(interval)
  }
  interceptor.add(new Log({type: "type3", msg: "msg3"}))
}, 500)
