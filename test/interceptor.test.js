/// <reference path="../node_modules/@types/jest/index.d.ts" />
const {Interceptor} = require('../src/Interceptor.js')

let diff = function(n, o) {
  return n.msg === o.msg
}

let delay = 5000

let report = function(item) {
  console.log(item)
}
let interceptor = new Interceptor({diff, delay, report})

describe("类测试", () => {
  describe("实例类型",() => {
    test('new Interceptor 应该是 Interceptor 的实例对象.', () => {
      expect(interceptor).toBeInstanceOf(Interceptor);
    });
  })
  describe('实例属性：实例对象 应该包含必须的属性和方法', () => {
    test('add 方法包含', () => {
      expect(interceptor).toHaveProperty('add')
    })
    test('type 属性包含', () => {
      expect(interceptor).toHaveProperty('report')
    })
    test('delay 属性包含', () => {
      expect(interceptor).toHaveProperty('delay')
    })
  })

  describe('实例方法功能测试', () => {
    test("add方法", () => {
      
    })
  })
})


