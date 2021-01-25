<template>
  <div class="home-menu">
    <Menu>
      <template #left>
        <img src="@/assets/img/logo.png" alt="" class="logo" />
        <h1>星地一体化仿真平台</h1>
        <img src="@/assets/img/tip.png" alt="" class="tip">
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
};
</script>

<style scoped>
.logo {
  width: 50px;
  margin: 0px 20px;
  vertical-align: middle;
}
h1 {
  font-size: 1vw;
  color: white;
  display: inline-block;
  margin: 0;
}

.tip{
  width: 20px;
  vertical-align: middle;
}
</style>