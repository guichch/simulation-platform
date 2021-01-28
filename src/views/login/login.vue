<template>
  <div class="login-box">
    <h1>
      <p class="ch">星地一体化仿真平台</p>
      <p class="en">Satellite ground integrated simulation platform</p>
    </h1>

    <form action="">
      <i class="iconfont icon-ren" style="color: white"></i>
      <input type="text" placeholder="请输入您的账号" v-model="username" />
      <div class="line"></div>
      <i class="iconfont icon-suo" style="color: white"></i>
      <input type="password" placeholder="请输入您的密码" v-model="password" />
      <div class="line"></div>
    </form>

    <div class="log">
      <button class="login" @click="loginsubmit">快速登陆</button>
      <button class="register">快速注册</button>
      <button
        class="configure"
        @mouseover="showconfigure"
        @mouseleave="notshowconfigure"
      >
        配置说明
      </button>
    </div>

    <transition name="fade">
      <div id="configure" v-if="isShow">
        <div class="triangle"></div>
        <a href="https://docs.qq.com/doc/DZlVxWUh3aGNiUW1R" target="_black"
          >浏览器环境配置说明</a
        >
      </div>
    </transition>
  </div>
</template>

<script>
import {request} from '@/network/request'
export default {
  data() {
    return {
      username: "",
      password: "",
      isShow: false,
    };
  },

  methods: {
    loginsubmit() {
      request({
        url: this.$store.state.USER_SERVER + '/login',
        data: {
          username: this.username,
          password: this.password,
        },
        method: 'post'
      }).then((res) => {
          if (res.token) {
            this.$router.push({
              path: "/home",
            });
          } else {
            alert(res.msg);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    showconfigure() {
      this.isShow = true;
    },
    notshowconfigure() {
      this.isShow = false;
    },
  },
};
</script>

<style>
@import url("~assets/css/iconfont/iconfont.css");
@import url("~assets/css/login.css");
</style>