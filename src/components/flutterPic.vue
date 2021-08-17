<template>
  <canvas id="praiseCvs" style="width: 175px; height: 250px" width="375" height="500"></canvas>
</template>

<script>
import LikeHeart from './LikeHeart'

export default {
  data() {
    return {
      ctx: null, // canvas参数
      rafId: '', // 点赞动画返回的id
      ratio: 0,
      heartInterval: null, // 点赞定时器
      praiseNum: 0, // 点赞数
      cachePraiseNum: 0, // 缓存点赞数
      aletMsg: '', // 弹出框中的提示语
      displayStsates: 'none', // 弹出框展示隐藏
      toShake: false,
      // praiseTime: null,
      width: 175, // 初始宽度
      height: 250, // 初始高度
      heartList: [], // 初始数组
      heartCount: 0, // 累加计数初始值
      iconPic: [
        'https://images.ufutx.com/202008/12/1.png',
        'https://images.ufutx.com/202008/12/2.png',
        'https://images.ufutx.com/202008/12/3.png',
        'https://images.ufutx.com/202008/12/4.png',
        'https://images.ufutx.com/202008/12/5.png'
      ]
    }
  },
  created() {},
  mounted() {
    this.$nextTick(() => {
      this.initCtx()
    })
  },
  methods: {
    removeCtx(state) {
      this.ctx.clearRect(0, 0, 500, 500)
      clearInterval(this.heartInterval)
      cancelAnimationFrame(this.rafId)
      this.ctx = null
      this.rafId = 0
      this.ratio = 0
      this.heartInterval = null
      this.heartList = []
      this.heartCount = 0
      if (state === '1') {
        this.$nextTick(() => {
          this.initCtx()
        })
      }
    },
    // 点赞动画
    initCtx() {
      // 初始化画布
      const _this = this
      _this.ctx = document.getElementById('praiseCvs').getContext('2d')
      _this.ratio = window.devicePixelRatio
      _this.ctx.canvas.width = _this.width * _this.ratio
      _this.ctx.canvas.height = _this.height * _this.ratio
      _this.ctx.scale(_this.ratio, _this.ratio)
      // (_this.ctx.translate(0.5, 0.5));
      // (function loop() {
      //   _this.ctx.clearRect(0, 0, _this.width, _this.height)
      //   _this.heartList.forEach(function (item) {
      //     item && item.move(_this.ctx)
      //   })
      //   _this.rafId = requestAnimationFrame(loop)
      // })()
      function requestAnimation() {
        _this.ctx.clearRect(0, 0, _this.width, _this.height)
        _this.heartList.forEach(item => {
          item && item.move(_this.ctx)
        })
        _this.rafId = requestAnimationFrame(requestAnimation)
      }
      _this.rafId = requestAnimationFrame(requestAnimation)
      // _this.heartInterval = setInterval(function() {
      //   _this.heartList.push(_this.createHeart())
      // }, 1000)
      console.log(_this.rafId, '_this.rafId')
    },
    zanFn() {
      const vm = this
      vm.cachePraiseNum += 1
      if (parseInt(vm.praiseNum) <= 9998) {
        vm.praiseNum += 1
      }
      // let setIntervalFn = setInterval(function () {
      vm.heartList.push(vm.createHeart())
      this.toShake = true
      // demo for next animation.
      setTimeout(() => {
        this.toShake = false
      }, 1000)
      // }, 120)
      // setTimeout(() => {
      //   clearInterval(setIntervalFn)
      // }, 1200)
    },
    getRandomDis() {
      if (Math.random() > 0.5) {
        return -(Math.random() * 12)
      } else {
        return +(Math.random() * 12)
      }
    },
    createHeart() {
      // console.log(this.heartCount, '6666')
      // let vm = this
      this.heartCount++
      const positionArray = [
        {
          x: 60,
          y: 200,
          endX: 130,
          endY: -100
        }
      ]
      const img = new Image()
      img.src = `https://images.ufutx.com/202008/22/${Math.ceil(Math.random() * 6)}.png`
      const p1 = {
        x: 60 + this.getRandomDis(),
        y: 80 + this.getRandomDis()
      }
      const p2 = {
        x: 10 + this.getRandomDis(),
        y: 50 + this.getRandomDis()
      }
      return new LikeHeart({
        id: this.heartCount,
        x: positionArray[0].x,
        y: positionArray[0].y,
        endX: positionArray[0].endX,
        endY: positionArray[0].endY,
        onFadeOut: this.removeItem,
        // noAngel: true, // 决定是否从小到大
        noScale: true, // 决定是否左右摆动
        angleLeft: true,
        width: 20, // 决定心的大小
        height: 20,
        speed: 0.0017,
        image: img,
        bezierPoint: {
          p0: {
            x: positionArray[0].x,
            y: positionArray[0].y
          },
          p1: p1,
          p2: p2,
          p3: {
            x: positionArray[0].endX,
            y: positionArray[0].endY
          }
        }
      })
    }
  }
}
</script>

<style>
</style>
