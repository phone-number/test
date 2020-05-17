"use strict";
import Vue from 'vue'
import modal from './modal.vue'
let modalId = 1 // 自增id
let instanceMap = new Map()
function createInstance({props, on = {}, renderHeader, renderFooter, render, renderClose}) {
  return cacheInstance(new Vue({
    functional: true,
    render(h) {
      return h(modal, {
        props: {props, render, renderHeader, renderFooter, renderClose},
        on: {
          'on-ok': onOk,
          'on-cancel': onCancel,
          'on-visible-change': onVisibleChange
        }
      })
    }
  }).$mount(), on)
}

// 缓存实例
function cacheInstance(instance, on) {
  let id = `modal_${modalId++}`
  instance._modalId = id
  instance._modalOn = on
  instanceMap.set(id, instance)
  return id
}

// 更具id清除缓存实例
function delectCacheInstance(id) {
  getCacheInstance(id).$destroy()
  instanceMap.delete(id)
}

// 更具id获取实例
function getCacheInstance(id) {
  let instance = instanceMap.get(id)
  if (!instance) throw id ? `找不到id为:${id} 的modal` : '请通过id获取modal实例'
  return instance
}
function onOk(config, getContext) {
  onHandle('on-ok', config, getContext)
}
function onCancel(config, getContext) {
  onHandle('on-cancel', config, getContext)
}
function onVisibleChange(config, getContext, value) {
  onHandle('on-visible-change', config, getContext, {value})
}
function onHandle(type, {_modalId, _modalOn}, getContext, value = {}) {
  _modalOn[type] && _modalOn[type]({getContext, _modalId, ...value})
}
export function show(config) {
  let instance
  let currentModalId
  if (typeof config === 'string' && config.match(/^modal_/)) {
    instance = getCacheInstance(config)
    currentModalId = config
    // 将当前modal至于最顶层
    if ([...instanceMap.keys()].length > 1) instance.$children[0].$children[0].modalIndex = instance.$children[0].$children[0].handleGetModalIndex()
  } else {
    currentModalId = createInstance(config)
    instance = getCacheInstance(currentModalId)
  }
  if (!instance.$children[0].visible) {
    instance.$children[0].visible = true
    document.body.appendChild(instance.$el)
  }
  console.log([...instanceMap.keys()])
  return currentModalId
}

export function close(id, clearCache) {
  let instance = getCacheInstance(id)
  instance.$children[0].visible = false
  setTimeout(() => {
    document.body.removeChild(instance.$el)
    clearCache && delectCacheInstance(id)
  }, 500)
}
export function getContext(id, refname) {
  return getCacheInstance(id).$children[0].getContext(refname)
}
