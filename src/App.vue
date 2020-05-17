<template>
  <div>
    <div :class="$style.red">{{text}}</div>
    <div class="blue">{{text}}</div>
    <Button @click="open">点击打开1</Button>
    <Button @click="open2">点击打开 Modal2</Button>
    <test1>
    </test1>
  </div>
</template>

<script>
import hello from './components/HelloWorld.vue'
import test1 from "./components/test1";
export default {
  data() {
    return {
      text: 33333,
      modalid: null,
      modalid2: null
    }
  },
  components: {
    test1
  },
  methods: {
    open () {
      console.log(this.$style, this['$style.b'])
      this.modalid = this.$Vmodal.show(this.modalid || {
        props: {title: "提示", mask: false, draggable: true},
        on: {
          'on-ok': ({_modalId, getContext}) => {
            this.$Vmodal.close(_modalId)
            console.log(getContext('header'))
          },
          'on-cancel': ({getContext, _modalId}) => {
            console.log('on-cancel', getContext('content'))
            this.modalid = this.$Vmodal.close(_modalId, true)
          },
        },
        renderHeader: h => h('div',{ref: 'header'}, 'dsaiudhia'),
        renderClose: h => h('span',{ref: 'close'}, '关闭'),
        render: h => {
          return [
            h('div', 1111111111),
            h('div',{ref: 'content'}, 222222)
          ]
        },
        // renderFooter: h => {
        //   return [
        //     h('Button', {on: {click: this.cancel}}, '取消' ),
        //     h('Button', {props: {type: 'primary'}, on: {click: this.confirm}}, '确认' )
        //   ]
        // }
      })
    },
      open2 () {
      this.modalid2 = this.$Vmodal.show(this.modalid2 || {
        props: {title: "第二个弹出框", mask: false, loading: true, draggable: true},
        on: {
          'on-ok': ({getContext, _modalId}) => {
            console.log('on-ok', _modalId, getContext)
            this.$Vmodal.close(_modalId)
          },
          'on-cancel': ({getContext, _modalId}) => {
            console.log('on-cancel', getContext('content'))
            this.modalid2 = this.$Vmodal.close(_modalId, true)
          },
          // 'on-visible-change'(getContext, value) {
          //   console.log('on-visible-change', getContext, value)
          // }
        },
        renderHeader: h => h('div',{ref: 'content'}, '123'),
        render: h => {
          return h(hello, {ref: 'content'})
          // return h('Button', {props: {type: 'primary'},on: {click: this.cancel2}}, '取消' )
        },
        renderFooter: h => {
          return [
            h('Button', {on: {click: this.cancel2}}, '取消' ),
            h('Button', {props: {type: 'primary'}, on: {click: this.confirm2}}, '确认' )
          ]
        }
      })
    },
    confirm() {
      console.log(this.$Vmodal.getContext(this.modalid, 'content'))
    },
    cancel() {
      this.$Vmodal.close(this.modalid)
      // console.log('取消')
    },
    cancel2() {
      this.modalid2 = this.$Vmodal.close(this.modalid2, true)
    },
    confirm2() {
      console.log(this.$Vmodal.getContext(this.modalid2, 'content'))
      this.$Vmodal.close(this.modalid2)
    }
  }
}
</script>
<style module>
  .red {
    color: yellow;
  }
</style>
<style lang="css" scoped>
  .blue {
    color: blue;
  }
</style>