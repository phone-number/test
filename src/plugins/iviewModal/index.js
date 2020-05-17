import {show, close, getContext} from './modal'

export default function (Vue) {
  Vue.prototype.$Vmodal = {show, close, getContext}
}