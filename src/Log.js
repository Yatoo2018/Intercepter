/**
 * @description 日志记录类
 * @author 069810-言月 <tanpf2012@163.com>
 * @date 2019-05-24
 * @class Log
 */
class Log {
  
  /**
   * @description 日志id
   * @static
   * @memberof Log
   */
  static logId = 0;
  
  constructor({type, msg}){
    this._id = Log.logId++
    this._type = type
    this._msg = msg
  }
  /**
   * @description 日志的类型
   * @memberof Log
   */
  set type(value) {
    this._type = value
  }
  get type() {
    return this._type
  }
  /**
   * @description 日志的id
   * @readonly
   * @memberof Log
   */
  get id() {
    return this._id
  }
  /**
   * @description 日志的信息
   * @memberof Log
   */
  set msg(value) {
    this._msg = value
  }
  get msg() {
    return this._msg
  }
}
export {Log}