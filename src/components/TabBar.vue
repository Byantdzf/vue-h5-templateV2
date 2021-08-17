<template>
  <div>
    <van-tabbar
      fixed
      route
      v-model="active"
      @change="handleChange"
      placeholder="placeholder"
      :safe-area-inset-bottom='true'
      style="background: #ffffff"
      active-color="#d92553"
      inactive-color="#666666"
    >
      <van-tabbar-item to="/homeV2" :replace="true">
        <span>首页</span>
        <template #icon="props">
          <img :src="props.active ? homeIcon.active : homeIcon.inactive" />
        </template>
      </van-tabbar-item>
      <van-tabbar-item to="/discover" :replace="true">
        <span>发现</span>
        <template #icon="props">
          <img :src="props.active ? discoverIcon.active : discoverIcon.inactive" />
        </template>
      </van-tabbar-item>
      <van-tabbar-item :to="toName ? to1 : ''" :replace="true">
        <span>学习</span>
        <template #icon="props">
          <img :src="props.active ? makeFriendsIcon.active : makeFriendsIcon.inactive" />
        </template>
      </van-tabbar-item>
      <van-tabbar-item :to="toName ? to2 : ''" :replace="true">
        <span>我的</span>
        <template #icon="props">
          <img :src="props.active ? myIcon.active : myIcon.inactive" />
        </template>
      </van-tabbar-item>
    </van-tabbar>
  </div>
</template>
<script>
export default {
  name: 'TabBar',
  props: {
    toName: {
      type: String,
      default: null
    },
    defaultActive: {
      type: Number,
      default: 0
    },
    data: {
      type: Array,
      default: () => {
        return []
      }
    }
  },
  data() {
    return {
      to1: '/makeFriends',
      to2: '/my',
      homeIcon: {
        active: 'https://images.ufutx.com/202103/15/205c4635acf460f1a3b13e422d6d80b8.png',
        inactive: 'https://images.ufutx.com/202103/15/e35de036ab5b85e3e69105413171a769.png'
      },
      // communityIcon: {
      //   active: 'https://images.ufutx.com/202103/15/deccbbb84e118e06436a1b30072672fd.png',
      //   inactive: 'https://images.ufutx.com/202103/15/ffe22f375aca31409a930912e3268380.png'
      // },
      discoverIcon: {
        active: 'https://images.ufutx.com/202106/09/f372013e47a580725693171134f9e4ed.png',
        inactive: 'https://images.ufutx.com/202106/09/2559f6a646704df8fdb912376e90a7e2.png'
      },
      makeFriendsIcon: {
        active: 'https://images.ufutx.com/202103/15/9ec1554122110a61a1f381568689e02c.png',
        inactive: 'https://images.ufutx.com/202103/15/0da5c063610921e776e3433239c30f29.png'
      },
      myIcon: {
        active: 'https://images.ufutx.com/202103/15/967ef47a4e91454bf2f24649951ff93c.png',
        inactive: 'https://images.ufutx.com/202103/15/f8e0736161f2e060572ccca96c26dedd.png'
      },
      active: this.defaultActive,
      placeholder: true
    }
  },
  watch: {
  },
  methods: {
    handleChange(value) {
      this.$emit('change', value)
      // if (value === 2 && !localStorage.getItem('openid')) {
      //   window.location.replace(`https://love.ufutx.com/api/official/live/wechat/oauth`)
      // }
      // if (value === 3 && !localStorage.getItem('openid')) {
      //   window.location.replace(`https://love.ufutx.com/api/official/live/wechat/oauth`)
      // }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
<style lang="scss">
.van-tabbar{
  z-index: 999999999999!important;
}
</style>
