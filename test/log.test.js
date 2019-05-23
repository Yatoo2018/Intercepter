const {Log} = require('../src/Log.js')

let type = 'type', msg = 'msg';
let log = new Log({type, msg})
test('log should be a instance of Log.', () => {
  expect(log).toBeInstanceOf(Log);
});