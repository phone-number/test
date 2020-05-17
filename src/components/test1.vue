<template>
  <div>
    <test2 a="111"  @click="a++">
      <!-- <slot /> -->
      <button @click="a++">DD</button>
    </test2>
  </div>
</template>

<script>
import test2 from "./test2";
export default {
  unwatch: null,
  data () {
    return {
      a: 1
    }
  },
  components: {
    test2
  },
  mounted () {
    this.$options.unwatch = this.$watch('a', () => {
      console.log('123asd')
      if (this.a > 3) this.$options.unwatch()
    })
    // 之后取消观察
    // unwatch()
  }
}
</script>

<style>

</style>