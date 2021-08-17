<template>
  <div>
    <!-- :max-size="5200 * 1024" -->
    <van-uploader :after-read="afterRead" multiple :max-count="9" @oversize="onOversize">
      <slot name="uploads"></slot>
    </van-uploader>
  </div>
</template>

<script>
import service from '@/utils/request'
import { $toastLoading, $toastClear, $toastText } from '@/config/toast'

export default {
  computed: {},
  components: {},
  props: {
    indexs: Number
  },
  data() {
    return {
      ossConfig: {},
      file: [],
      host: ''
    }
  },
  watch: {},
  methods: {
    onOversize(file) {
      // console.log(file)
      $toastText('图片大小不能超过 5M')
    },
    afterRead(event) {
      const vm = this
      console.log(event)
      $toastLoading('上传中...')
      if (event.status === 'failed') {
        $toastText('网络延时，请重新上传')
      }
      if (event.length > 1) {
        event.forEach(item => {
          vm.compress(item)
        })
      } else {
        vm.compress(event)
      }
    },
    compress(ele) {
      const vm = this
      if (ele.file.size > 1048576) {
        console.log('压缩执行')
        console.log(ele)
        var canvas = document.createElement('canvas') // 创建Canvas对象(画布)
        var context = canvas.getContext('2d')
        var img = new Image()
        img.src = ele.content // 指定图片的DataURL(图片的base64编码数据)
        img.onload = () => {
          canvas.width = img.width
          canvas.height = img.height
          context.drawImage(img, 0, 0, img.width, img.height)
          ele.content = canvas.toDataURL(ele.file.type, 0.95) // 0.92为默认压缩质量
          var files = vm.dataURLtoFile(ele.content, ele.file.name)
          this.submit(files)
          // console.log(files)
        }
      } else {
        // 符合大小的，直接上传
        this.submit(ele.file)
      }
    },
    dataURLtoFile(dataurl, filename) {
      var arr = dataurl.split(',')
      var mime = arr[0].match(/:(.*?);/)[1]
      var bstr = atob(arr[1])
      var n = bstr.length
      var u8arr = new Uint8Array(n)
      while (n--) {
        u8arr[n] = bstr.charCodeAt(n)
      }
      return new File([u8arr], filename, {
        type: mime
      })
    },
    submit(file) {
      var self = this
      var formData = new FormData()
      var fileName =
        self.$md5(file.name) +
        Math.random() +
        '.' +
        file.type
          .split('/')
          .pop()
          .toLowerCase()
      var filePath = self.host + '/' + self.ossConfig.dir + fileName
      formData.append('name', self.ossConfig.dir + fileName)
      formData.append('key', self.ossConfig.dir + fileName)
      formData.append('policy', self.ossConfig.policy)
      formData.append('OSSAccessKeyId', self.ossConfig.accessid)
      formData.append('success_action_status', '200')
      formData.append('signature', self.ossConfig.signature)
      formData.append('file', file)
      formData.append('filename', file.name)
      service
        .post(self.host, formData, { headers: { 'Content-Type': 'multipart/form-data' }})
        .then(data => {
          $toastClear()
          if (self.indexs) {
            self.$emit('onSuccess', filePath, self.indexs)
          } else {
            self.$emit('onSuccess', filePath)
          }
        })
        .catch(error => {
          $toastText('网络延时，请重新上传')
          console.log(error)
        })
    },
    // 获取上传签证
    getSignature() {
      const vm = this
      service
        .get('/upload/signature')
        .then(data => {
          vm.ossConfig = data
          vm.host = data.host
        })
        .catch(error => {
          console.log(error)
        })
    }
  },
  created() {},
  mounted() {
    this.getSignature()
  }
}
</script>
<style lang="scss" scoped></style>
