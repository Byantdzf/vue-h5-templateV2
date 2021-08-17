<template>
  <div class=''>
    <div class='addressBox'>
      <van-popup v-model="showAddress" :lock-scroll="true" :duration="0.5" position="bottom">
        <div style='padding: 0 30px;'>
          <div class='alignment'>
            <div class='cancelFill font15 color3' @click='close'>取消</div>
            <div class='alignment_center completeFill font15 color9'>完成</div>
          </div>
          <div style='padding-top: 30px'>
            <div class='alignment_left'>
              <van-field class='inputBox' label="联系人" type="text" v-model="userData.name" placeholder="姓名" />
            </div>
            <div class='line'></div>
            <div class='alignment_left'>
              <van-field class='inputBox' label="手机号码" type="number" maxlength="11" v-model="userData.mobile" placeholder="请输入您的手机号码" />
            </div>
            <div class='line'></div>
            <div class='alignment_left'>
              <van-field class='inputBox' @click='showCloose = true' label="选择地区" type="number" maxlength="11" v-model="userData.mobile" placeholder="地区信息" />
            </div>
            <div class='line'></div>
            <div class='alignment_left'>
              <van-field class='inputBox1' label="详细地址" type="textarea" maxlength="11" v-model="userData.detailed" placeholder="街道门牌信息" />
            </div>
            <div class='line'></div>
          </div>
        </div>
      </van-popup>
    </div>
    <div class='clooseAddress'>
      <van-popup v-model="showCloose" :lock-scroll="true" :duration="0.5" position="bottom">
        <van-area title="标题" :area-list="areaList" />
      </van-popup>
    </div>
  </div>
</template>
<script>
import { areaList } from '@vant/area-data'

export default {
  props: {
    showAddress: {
      type: Boolean,
      default: null
    }
  },
  data() {
    return {
      areaList: areaList,
      showCloose: false,
      userData: {
        mobile: '',
        name: '',
        detailed: ''
      }
    }
  },
  watch: {
  },
  methods: {
    close() {
      this.$emit('closepop')
    }
  },
  mounted() {
    console.log(this.areaList, '7898797')
  }
}
</script>

<style lang="scss" scoped>
.addressBox{
  .completeFill{
    padding: 2px 10px;
    background: #f5f5f5;
    border-radius: 3px;
  }
  .inputBox, .inputBox1{
    outline: none;
    appearance: none;
    border: none;
  }
  .inputBox{
    width: 84%;
    padding: initial;
  }
  .inputBox1{
    padding: initial;
    width: 90%;
  }
  .van-field__label{
    width: 60px;
    font-weight: bold;
    margin-right: 30px;
  }
  .line{
    width: 100%;
    height: 1px;
    background: #f5f5f5;
    margin: 10px 0 15px 0;
  }
}
.addressBox .van-popup{
  top: auto !important;
  height: 100vh!important;
  border-radius: initial!important;
  overflow-y: scroll!important;
}
.clooseAddress{
  .van-ellipsis{
  }
}
.clooseAddress .van-popup{
  top: auto !important;
  height: 50vh!important;
  border-radius: initial!important;
}
</style>
<style lang='scss'>
.clooseAddress{
  .van-overlay{
    z-index: 565456545!important;
  }
}
</style>
