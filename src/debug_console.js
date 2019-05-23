var debug = /debug_console/.test(location.search)
function debug_console() {
  if(debug) {
    console.log.apply(console.log, arguments)
  } 
}
export {debug_console}