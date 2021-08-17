<template>
  <!--<div class="number-grow-warp">-->
    <span ref="numberGrow" :data-time="time" class="number-grow" :data-value="value">0</span>
  <!--</div>-->
</template>

<script>
export default {
  props: {
    time: {
      type: Number,
      default: 2
    },
    value: {
      type: Number,
      default: 999999999
    }
  },
  watch: {
    value(newValue, oldValue) {
      if (oldValue === 0) {
        this.start = 0
        this.current = 0
        this.value = newValue
        this.numberGrow(this.$refs.numberGrow)
        return
      }
      this.start = newValue
      this.current = oldValue
      this.numberGrow(this.$refs.numberGrow)
    }
  },
  data() {
    return {
      current: 0,
      start: 0
      // time: 2,
      // value: 720000
    }
  },
  methods: {
    numberGrow(ele) {
      const _this = this
      const step = (_this.value * 10) / (_this.time * 1000)
      // let current = 0
      // let start = 0
      // console.log(_this.start, '7897978')
      let t = setInterval(function() {
        _this.start += step
        if (_this.start > _this.value) {
          clearInterval(t)
          _this.start = _this.value
          t = null
        }
        if (_this.current === _this.start) {
          return
        }
        _this.current = _this.start
        _this.$el.innerHTML = parseInt(_this.start)
      }, 20)
    }
  },
  mounted() {
    this.current = 0
    this.start = 0
    this.numberGrow(this.$refs.numberGrow)
  }
}
</script>

<style lang="scss" scoped>
  .number-grow-warp{
    transform: translateZ(0);
  }
  .number-grow {
    /*letter-spacing: 2.67px;*/
    /*margin:110px 0 20px;*/
    /*display: block;*/
    /*line-height:64px;*/
  }
</style>
