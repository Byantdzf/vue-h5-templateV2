<template>
  <div>
    <van-uploader :after-read="afterRead" :multiple='true' :max-count="3" :max-size="5200 * 1024" @oversize="onOversize">
      <slot name="upload"></slot>
    </van-uploader>
  </div>
</template>

<script>
import service from '@/utils/request'
import { $toastLoading, $toastClear, $toastText } from '@/config/toast'

export default {
  computed: {},
  components: {},
  data() {
    return {
      ossConfig: {},
      file: '',
      host: ''
    }
  },
  watch: {},
  methods: {
    onOversize(file) {
      console.log(file)
      $toastText('图片大小不能超过 5M')
    },
    afterRead(event) {
      const vm = this
      $toastLoading('上传中...')
      if (event.status === 'failed') {
        $toastText('网络延时，请重新上传')
      }
      if (event.length > 1) {
        event.forEach((item) => {
          vm.submit(item.file)
        })
      } else {
        vm.submit(event.file)
      }
    },
    submit(file) {
      var self = this
      var formData = new FormData()
      var fileName = self.$md5(file.name) + Math.random() + '.' + file.type.split('/').pop().toLowerCase()
      var filePath = self.host + '/' + self.ossConfig.dir + fileName
      formData.append('name', self.ossConfig.dir + fileName)
      formData.append('key', self.ossConfig.dir + fileName)
      formData.append('policy', self.ossConfig.policy)
      formData.append('OSSAccessKeyId', self.ossConfig.accessid)
      formData.append('success_action_status', '200')
      formData.append('signature', self.ossConfig.signature)
      formData.append('file', file)
      formData.append('filename', file.name)
      service.post(self.host, formData, { headers: { 'Content-Type': 'multipart/form-data' }}).then(data => {
        $toastClear()
        self.$emit('onSuccess', filePath)
      }).catch(error => {
        $toastText('网络延时，请重新上传')
        console.log(error)
      })
    },
    // 获取上传签证
    getSignature() {
      const vm = this
      service.get('/upload/signature').then(data => {
        vm.ossConfig = data
        vm.host = data.host
      }).catch(error => {
        console.log(error)
      })
    }
  },
  created() {
  },
  mounted() {
    this.getSignature()
  }
}
</script>
<style lang="scss" scoped>
.van-uploader__input{
  width: 100%;
  height: 100%;
  position: absolute;
  opacity: 0;
}
</style>
