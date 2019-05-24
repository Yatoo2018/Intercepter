var debug = /debug_console/.test(location.search)

/**
 * @description 根据search中的debug_console字段判断是否需要输出节流过程调试日志
 * @author 069810-言月 <tanpf2012@163.com>
 * @date 2019-05-24
 * @returns null
 */
function debug_console() {
  if(debug) {
    console.log.apply(console.log, arguments)
  } 
  return null
}
export {debug_console}