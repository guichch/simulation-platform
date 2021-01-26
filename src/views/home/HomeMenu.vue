<template>
  <div class="home-menu">
    <Menu>
      <template #left>
        <img src="@/assets/img/logo.png" alt="" class="logo" />
        <h1>星地一体化仿真平台</h1>
        <img src="@/assets/img/tip.png" alt="" class="tip"/>
      </template>
      <template #center>
        <div class="title">卫星资源能力分析</div>
        <!-- <span class="title">卫星资源能力分析</span> -->
      </template>
      <template #right>
        <a href="http://www.baidu.com" class="home-link">首页</a>
        <div class="administration">
          
          <span>系统管理</span>
          <img src="@/assets/img/arrow.png" alt="">
          <!-- <img src="@/assets/img/arrow.png" alt="" v-else> -->
        </div>
      </template>
    </Menu>
  </div>
</template>

<script>
import Menu from "@/components/common/Menu";
export default {
  components: {
    Menu,
  },
  data() {
    return {
      isHover: true
    }
  }
};
</script>

<style scoped>
.logo {
  width: 50px;
  margin: 0px 20px;
  vertical-align: middle;
}
h1 {
  font-size: 1.5vw;
  color: white;
  display: inline-block;
  margin: 0;
}

.tip {
  width: 20px;
  vertical-align: middle;
}

.title {
  font-size: 1.5vw;
  color: white;
  text-align: center;
}

.administration{
  color: white;
  float: left;
  cursor: pointer;
}

.administration span{
  margin-right: 5px;
}

.administration img{
  transition: transform 100ms 50ms;
}

.administration:hover img{
  transform: rotate(180deg);
  
}

.home-link{
  color: white;
  margin-right: 20px;
  display: block;
  float: left;
  text-decoration: none;
}
</style>