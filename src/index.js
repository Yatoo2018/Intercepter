import {Interceptor as LogInterceptor} from "./Interceptor"
import {Log} from "./Log"

/**
 * @description 主要业务应用入口类
 * @author 069810-言月 <tanpf2012@163.com>
 * @date 2019-05-24
 * @class Main
 */
class Main{

  constructor(){ 
    this.interceptor = new LogInterceptor({
      diff: function(o,n){
        return o.msg === n.msg
      }
    })
  }

  /**
   * @description 每500毫秒添加一条重复的日志记录，添加10条
   * @date 2019-05-24
   * @memberof Main
   */
  testRepeat() {
    var ths = this;
    var times = 0;
    var interval = setInterval(function intervalHandler() {
      times++;
      if(times > 10) {
        clearInterval(interval)
      }
      ths.interceptor.add(new Log({type: "type3", msg: "msg3"}))
    }, 500)
  }

  /**
   * @description 添加3个不同的日志记录
   * @date 2019-05-24
   * @memberof Main
   */
  testDifferent() {

    // 添加测试用例
    this.interceptor.add(new Log({type: "type1", msg: "msg1"}))
    this.interceptor.add(new Log({type: "type2", msg: "msg2"}))
    this.interceptor.add(new Log({type: "type3", msg: "msg3"}))

  }
}


// 循环添加10个相同记录

