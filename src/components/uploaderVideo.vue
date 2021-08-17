<template>
  <div>
    <input type="file" @change="onChange" class="uploaderInput" accept="video/*" capture="user" />
  </div>
</template>

<script>
import service from '@/utils/request'
import { $toastClear, $toastText, $toastLoading } from '@/config/toast'

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
    onChange(event) {
      const vm = this
      vm.file = event.target.files[0]
      console.log(vm.file, '798797')
      if (!vm.file) return
      $toastLoading('认证中..')
      vm.submit(vm.file)
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
.uploaderInput{
  position: absolute;
  width: 100%;
  height: 100%;
  overflow: hidden;
  right: 0;
  top: 0;
  opacity: 0;
}
</style>
