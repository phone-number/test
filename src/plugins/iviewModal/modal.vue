
<template>
  <Modal
    v-model="visible"
    v-bind="props" 
    @on-ok="onOk"
    @on-cancel="onCancel"
    @on-visible-change="onVisibleChange">
    <renderHandle slot="close" v-if="!!renderClose" :render="renderClose" />
    <renderHandle slot="header" v-if="!!renderHeader" :render="renderHeader" />
    <renderHandle slot="default" v-if="!!render" :render="render" />
    <renderHandle slot="footer" v-if="!!renderFooter" :render="renderFooter" />
  </Modal>
</template>

<script>
import { Modal } from 'view-design'
import 'view-design/dist/styles/iview.css'
import renderHandle from './renderHandle'
export default {
  components: { Modal, renderHandle },
  props: {
    props:  {
      type: Object,
      default: () => ({})
    },
    render: Function,
    renderHeader: Function,
    renderFooter: Function,
    renderClose: Function
  },
  data() {
    return {
      visible: false
    }
  },
  created () {
    console.log('创建modal实例')
  },
  methods: {
    onOk() {
      this.$emit(
        'on-ok',
        { _modalId: this.$parent._modalId, _modalOn: this.$parent._modalOn },
        this.getContext
      )
    },
    onCancel() {
      this.$emit(
        'on-cancel',
        { _modalId: this.$parent._modalId, _modalOn: this.$parent._modalOn },
        this.getContext
      )
    },
    onVisibleChange(value) {
      this.$emit(
        'on-visible-change',
        { _modalId: this.$parent._modalId, _modalOn: this.$parent._modalOn },
        this.getContext,
        value
      )
    },
    getContext(refname) {
      return this.$refs[refname]
    }
  }
}
</script>
