<template>
  <div class="login-box">
    <h1>
      <p class="ch">星地一体化仿真平台</p>
      <p class="en">Satellite ground integrated simulation platform</p>
    </h1>

    <el-form :model='form' status-icon>
      <el-form-item>
        <el-input v-model="form.username" prefix-icon='el-icon-user' placeholder='请输入您的账号'></el-input>
      </el-form-item>
      <el-form-item style="margin-bottom: 40px">
        <el-input v-model="form.password" prefix-icon='el-icon-lock' type='password' placeholder='请输入您的密码'></el-input>
      </el-form-item>
      <el-form-item>
        <el-col :span='8'>
          <el-button type='primary' @click="submitForm">
            快速登陆
          </el-button>
        </el-col>
        <el-col :span='8'>
          <el-button>
            <el-link type='primary' :underline='false' target=_blank :href="$store.state.REGISTER">
              快速注册
            </el-link>            
          </el-button>
        </el-col>
        <el-col :span='8'>
          <el-dropdown>
            <el-button type='primary' plain class="config-button">
              配置说明
            </el-button>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item>
                <el-link type="primary" :underline="false" target="_blank" href="https://docs.qq.com/doc/DZlVxWUh3aGNiUW1R">浏览器环境配置说明</el-link>
              </el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </el-col>
      </el-form-item>
    </el-form>

  </div>
</template>

<script>
import {request} from '@/network/request'
export default {
  data() {
    return {
      form: {
        username: '',
        password: ''
      },
    };
  },
  methods: {
    submitForm() {
      sessionStorage.removeItem('login');
      request({
        url: this.$store.state.USER_SERVER+'/login',
        data: {
          username: this.form.username,
          password: this.form.password,
        }
      }).then(res => {
        if (res.token) {
          sessionStorage.setItem('token', res.token);
          sessionStorage.setItem('username', this.form.username);
          this.$router.push('/')
        }else {
          this.$message.error(res.msg)
        }
      })
    }
  }
};
</script>

<style lang='scss'>
  @import url("~assets/css/login.css");
</style>