import { Directive } from "vue"

const noop = Function.prototype // 这里构造一个空函数

const makeInterSectionObserver = (() => {
  let cleanup = noop
  return (el: HTMLElement, callback: IntersectionObserverCallback) => {
    cleanup()
    const io = new IntersectionObserver(callback)
    io.observe(el)
    cleanup = () => {
      io.disconnect()
      cleanup = noop
    }
  }
})()

export const vInterSectionObserver: Directive<HTMLElement, IntersectionObserverCallback> = {
  mounted(el, binding) {
    makeInterSectionObserver(el, binding.value)
  },
}
