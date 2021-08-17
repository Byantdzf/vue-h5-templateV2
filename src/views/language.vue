<template>
  <div class="login_box ">
    <van-picker
      title="请选择你的语言"
      show-toolbar
      :columns="columns"
      @confirm="onConfirm"
      @cancel="onCancel"
      @change="onChange"
    />
<!--    <van-popup v-model="show" round position="bottom" :style="{ height: '30%' }" />-->
  </div>

</template>

<script>
import { $toastSuccess, $toastText, $toastClear, $toastLoading } from '@/config/toast'
import service from '@/utils/request'
import { Toast } from 'vant';

export default {
  components: {
  },
  data() {
    return {
      show:true,
      columns: ['杭州', '宁波', '温州', '绍兴', '湖州', '嘉兴', '金华', '衢州'],
    }
  },
  methods: {
    onConfirm(value, index) {
      Toast(`当前值：${value}, 当前索引：${index}`);
    },
    onChange(picker, value, index) {
      Toast(`当前值：${value}, 当前索引：${index}`);
    },
    onCancel() {
      Toast('取消');
    },
    goToUrl(url) {
      this.$router.push({
        name: url
      })
    }
  },
  mounted() {

  }
}
</script>
<style lang="scss" scoped>
</style>
