<template>
  <div class="home-menu">
    <Menu>
      <template #left>
        <img src="@/assets/img/logo.png" alt="" class="logo" />
        <h1>星地一体化仿真平台</h1>
        <img src="@/assets/img/tip.png" alt="" class="tip" />
      </template>
      <template #center>
        <div class="title">卫星资源能力分析</div>
        <!-- <span class="title">卫星资源能力分析</span> -->
      </template>
      <template #right>
        <el-menu
          mode="horizontal"
          background-color="#002236"
          text-color="#fff"
          active-text-color="#0F2D6B"
        >
          <el-menu-item index='1'>
            首页
          </el-menu-item>
          <el-submenu index='2'>
            <template slot="title">系统管理</template>
            <el-menu-item index='2-1'>退出账户</el-menu-item>
          </el-submenu>
        </el-menu>
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
      isHover: true,
    };
  },
};
</script>

<style scoped lang='scss'>
.logo {
  width: 50px;
  margin: 0px 20px;
  vertical-align: middle;
}
h1 {
  font-size: 1.2vw;
  color: white;
  display: inline-block;
  margin: 0;
}

.tip {
  width: 20px;
  vertical-align: middle;
}

.title {
  font-size: 1.3vw;
  color: white;
  text-align: center;
}

.menu .el-row,
.menu .el-col,
.menu .el-menu,
.menu .el-menu li,
.menu .el-menu li.el-submenu .el-submenu__title{
  height: 100%;
}
</style>