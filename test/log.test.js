/// <reference path="../node_modules/@types/jest/index.d.ts" />
const {Log} = require('../src/Log.js')

let type = 'type', msg = 'msg';
let log = new Log({type, msg})

describe("类测试", () => {

  describe('静态属性', () => {
    test("应包含标识属性logId", () => {
      expect(Log).toHaveProperty('logId')
    })
  })
  describe("实例类型",() => {
    test('new Log 应该是 Log 的实例对象.', () => {
      expect(log).toBeInstanceOf(Log);
    });
  })
  describe('实例属性：实例对象 应该包含固有属性', () => {
    test('id 属性包含', () => {
      expect(log).toHaveProperty('id')
    })
    test('type 属性包含', () => {
      expect(log).toHaveProperty('type')
    })
    test('msg 属性包含', () => {
      expect(log).toHaveProperty('msg')
    })
  })
})




