<template>
  <div class="login_box animation-slide-top">

    <div style='position: absolute;top: 0;z-index: 2'>
      <div class="login_title">
        <p> {{$t('hello')}}，</p>
        <p>{{$t('welcome')}}!</p>
        <img class="butterfly_icon" src="https://images.ufutx.com/202007/18/be8220b0cc9c1e4df7707ab5683d25c2.png" alt="">
      </div>
      <div class='language' @click.stop='showPicker = true'>{{ language }}</div>
      <van-popup v-model="showPicker" position="bottom">
        <van-picker
          show-toolbar
          :columns="columns"
          @confirm="onConfirm"
          @cancel="showPicker = false"
        />
      </van-popup>

      <div class="bindingBox">
        <div class="bindingMobile">
          <input type="number" v-model="bindingMobile" class="font16 color3 z_mobile" :placeholder="$t('iphone_Tips')" @blur="fixScroll" ref="phone" @click.stop="inputClicked">
          <img src="https://images.ufutx.com/201903/28/f04cd2fd382dbd6da45260e825ff61ef.png" alt="icon" class="z_del_icon" v-show="bindingMobile" @click="bindingMobile = ''">
          <p class="line"></p>
        </div>
        <div class="bindingCode">
          <input type="number" oninput="if(value.length>6)value=value.slice(0,6)" v-model="code" class="font16 color6 z_code" :placeholder="$t('code_Tips')" @blur="fixScroll" ref="phoneInput" @click.stop="inputClick">
<!--          <p class="z_getCode font14" @click="getCode" v-if="downTime == 60">{{bindingText}}</p>-->
          <p class="z_getCode font14" @click="getCode" v-if="downTime == 60">{{$t('get_code')}}</p>
          <p class="z_getCode font14" v-else>{{downTime}} 秒后重试</p>
          <p class="line"></p>
        </div>
      </div>
      <div class="get_token colorff font16" @click="postToken">{{$t('login')}}</div>
      <div class="certifyButtomBox">
        <div class="font12 agreeBox">
          <img class="agreeCircle" @click.stop="agreeCircle" src="https://images.ufutx.com/202009/01/6ac36be5881c39aad867b485eb9b1b4b.png" alt="" v-if="!agree">
          <img class="agreeCircle" @click.stop="agreeCircle" src="https://images.ufutx.com/202009/01/3262730a7745017bacdd6d24aec9f7de.png" alt="" v-else>
          <span>{{$t('Please_read')}}</span>
          <span class="colorTheme" @click.stop="goToUrl('serviceAgreement')">《{{$t('Privacy_agreement')}}》</span>
          <span>{{$t('and')}}</span>
          <span class="colorTheme" @click.stop="goToUrl('PrivacyAgreement')">《{{$t('Service_agreement')}}》</span>
        </div>
      </div>
    </div>
    <img class="end_bg" src="https://images.ufutx.com/202104/21/f3c8f583fbee1158dbaca3be26887b77.png" alt="">
    <van-popup v-model="showPrompt" :close-on-click-overlay='false' :lock-scroll='true' :duration='0.5'>
      <div class='promptBox bold color6 font13 text-center'>
        <div class='font16 color3' style='padding-bottom: 16px'>温馨提示</div>
        <div class='title'>该微信已绑定{{mobile}}</div>
        <div class='title'>请使用该手机号登录</div>
        <div class="determine bold font15 alignment_center colorff" @click="showPrompt = false">确定</div>
      </div>
    </van-popup>
    <div class="z_loading_position" v-if="loading">
      <div class="z_loading_box">
        <img class="z_loading_icon" src="https://images.ufutx.com/202007/29/6099fa31d31f5aa1f2c92986f45d3cfa.gif" alt="">
        <div class="hint font28 colorTheme"><p>系统检测登录中，请稍等...</p></div>
      </div>
    </div>
  </div>
</template>

<script>
import { $toastSuccess, $toastText, $toastClear, $toastLoading } from '@/config/toast'
import service from '@/utils/request'

export default {
  components: {
  },
  data() {
    return {
      warn: false,
      loading: false,
      codeThrottle: false,
      showPrompt: false,
      agree: true,
      area: '86',
      code: '',
      state: 0,
      mobile: '',
      downTime: 60,
      bindingTime: null,
      bindingText: '获取验证码',
      bindingMobile: '',
      columns: ['中文', 'English'],
      showPicker: false,
      language: '中文'
    }
  },
  watch: {
    downTime() {
      if (this.downTime === 0) {
        clearInterval(this.bindingTime)
        this.bindingTime = null
        this.codeThrottle = false
        this.downTime = 60
        this.bindingText = '重新发送'
      }
    },
    bindingMobile() {
      if (!(/^1(3|4|5|6|7|8|9)\d{9}$/.test(this.bindingMobile))) {
        this.warn = true
      } else {
        this.warn = false
      }
    }
  },
  methods: {
    onConfirm(value) {
      this.language = value
      this.showPicker = false
      this.$i18n.locale = value == '中文' ? 'zh' : 'en'
    },
    agreeCircle() {
      this.agree = !this.agree
    },
    inputClick() {
      if (this.$refs.phoneInput) {
        this.$refs.phoneInput.focus()
      }
    },
    inputClicked() {
      if (this.$refs.phone) {
        this.$refs.phone.focus()
      }
    },
    fixScroll() {
      const u = navigator.userAgent
      const isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/) // ios终端
      if (isiOS) {
        window.scrollTo(0, 0)
      }
    },
    getCode() {
      const vm = this
      const data = {
        mobile: vm.bindingMobile
      }
      if (!vm.bindingMobile) {
        return $toastText('无手机号码')
      }
      if (vm.warn === true) {
        return $toastText('手机号码错误')
      }
      if (!vm.codeThrottle) {
        vm.codeThrottle = true
        service.post('/official/sms/register', data).then(data => {
          $toastSuccess('发送成功')
          vm.codeThrottle = false
          vm.bindingTime = setInterval(() => {
            vm.downTime--
          }, 1000)
        }).catch(error => {
          console.log(error)
        })
      }
    },
    postToken() {
      const vm = this
      if (!vm.bindingMobile) {
        return $toastText('请输入手机号')
      }
      if (!vm.code) {
        return $toastText('请输入验证码')
      }
      if (vm.warn === true) {
        return $toastText('手机号码错误')
      }
      if (!vm.agree) {
        return $toastText('请阅读并同意协议')
      }
      const data = {
        mobile: vm.bindingMobile,
        code: vm.code,
        openid: vm.openid
      }
      $toastLoading('登录中...')
      service.post(`official/live/login`, data).then(data => {
        if (data.status === -1) {
          $toastClear()
          vm.mobile = data.mobile
          vm.code = ''
          vm.downTime = 60
          vm.bindingText = '重新发送'
          clearInterval(vm.bindingTime)
          vm.mobile = vm.mobile.substr(0, 3) + '****' + vm.mobile.substr(7, 11)
          vm.showPrompt = true
          setTimeout(() => {
            localStorage.removeItem('first')
          }, 1000)
          return false
        } else {
          localStorage.setItem('token', data.token)
          localStorage.setItem('user_id', data.viewer.user_id)
          localStorage.setItem('openid', data.viewer.openid)
          localStorage.setItem('user_name', data.viewer.nickname)
          localStorage.setItem('mobile', data.viewer.mobile)
          setTimeout(() => {
            localStorage.removeItem('first')
          }, 1000)
          if (vm.state) {
            vm.$router.go(-1)
            return
          }
          setTimeout(() => {
            const path = localStorage.getItem('cachePath')
            $toastClear()
            if (!path || path.includes('login')) {
              vm.$router.push({
                name: 'homeV2'
              })
              return
            }
            window.location.href = path
          }, 500)
        }
      }).catch(error => {
        console.log(error)
      })
    },
    getToken() {
      const vm = this
      service.post(`/official/live/login`).then(data => {
        if (data.token) {
          localStorage.setItem('token', data.token)
          localStorage.setItem('user_id', data.viewer.id)
          localStorage.setItem('openid', data.viewer.openid)
          localStorage.setItem('user_name', data.viewer.nickname)
          localStorage.setItem('mobile', data.viewer.mobile)
          setTimeout(() => {
            const path = localStorage.getItem('cachePath')
            $toastClear()
            if (!path || path.includes('login')) {
              vm.$router.replace({
                name: 'homeV2'
              })
              return
            }
            window.location.replace(path)
          }, 500)
        } else {
          vm.loading = false
        }
      })
    },
    goToUrl(url) {
      this.$router.push({
        name: url
      })
    }
  },
  mounted() {
    if (this.$route.query.state) {
      this.state = this.$route.query.state
    }
    if (this.$route.query.openid) {
      this.openid = this.$route.query.openid
    } else {
      this.openid = localStorage.getItem('openid')
    }
    console.log('111')
    // this.getToken()
  }
}
</script>
<style lang="scss" scoped>
  .login_box{
    width: 100vw;
    height: 100vh;
    background: #ffffff;
    .language{
      padding: 2px 0;
      width: 60px;
      text-align: center;
      border: 1px solid #d0d0d0;
      border-radius: 12px;
      display: inline-block;
      position: absolute;
      top: 52px;
      right: 22px;
    }
    .login_title{
      padding-top: 50px;
      margin-left: 20px;
      font-size: 26px;
      letter-spacing: 2px;
      color: #f33b6c;
      position: relative;
      .butterfly_icon{
        position: absolute;
        top: 60px;
        left: 160px;
        width: 29px;
        height: 23px;
      }
    }
    input::-webkit-input-placeholder {
      color: #c2c2c2;
      font-size: 16px;
    }
    .bindingBox {
      margin: 50px 25px 0 25px;
      .bindingMobile{
        position: relative;
        .z_mobile {
          width: 84%;
          height: 40px;
          padding: 0 12% 0 4%;
        }
        .z_del_icon {
          width: 18px;
          position: absolute;
          right: 3vw;
          top: 11px;
        }
      }
      .bindingCode{
        position: relative;
        margin-top: 36px;
        .z_code {
          width: 70%;
          height: 40px;
          padding: 0 26% 0 4%;
        }
        .z_getCode {
          position: absolute;
          top: 11px;
          right: 2vw;
          color: #f33b6c;
          z-index: 3;
        }
      }
      .z_code, .z_mobile {
        outline: none;
        appearance: none;
        border: none;
      }
      .line{
        width: 100%;
        height: 1px;
        background: #f5f5f5;
      }
    }
    .get_token {
      width: 325px;
      height: 44px;
      margin: 70px auto 0 auto;
      display: flex;
      justify-content: center;
      align-items: center;
      letter-spacing: 4px;
      background: linear-gradient(270deg, #FF85A5 0%, #FF5380 100%);
      border-radius: 22px;
    }
    .certifyButtomBox{
      margin-top: 20px;
      width: 100vw;
      .Complete{
        opacity: 0.6;
      }
      .agreeBox{
        text-align: center;
        .agreeCircle{
          width: 13px;
          height: 13px;
          vertical-align: middle;
          margin-top: -2px;
          margin-right: 3px;
        }
      }
    }
    .end_bg{
      position: absolute;
      bottom: 0;
      width: 100%;
      z-index: 1;
    }
    .z_loading_position {
      position: relative;
      position: fixed;
      z-index: 1001;
      background: #ffffff;
      top: 0;
      width: 100vw;
      height: 100vh;
      .z_loading_box{
        position: absolute;
        position: relative;
        top: 23vh;
        .z_loading_icon {
          width: 300px;
          margin-left: 40px;
        }
        .hint{
          width: 100vw;
          text-align: center;
        }
      }
    }
  }
  .promptBox{
    width: 300px;
    padding: 20px 0;
    .title{
      padding-bottom: 10px;
    }
    .determine{
      width: 140px;
      height: 30px;
      border-radius: 24px;
      margin: 20px auto 0 auto;
      background: #ff5380;
    }
  }
</style>
