var logId = 0;
class Log {
  constructor({type, msg}){
    this._id = logId++
    this._type = type
    this._msg = msg
  }
  set type(value) {
    this._type = value
  }
  get type() {
    return this._type
  }
  get id() {
    return this._id
  }
  set msg(value) {
    this._msg = value
  }
  get msg() {
    return this._msg
  }
}
export {Log}