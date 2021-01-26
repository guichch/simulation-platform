<template>
  <div class="tab">
    <ul>
      <li>
        <img src="@/assets/img/3dmap.png" title="三维地图" @click='change("/3dmap")'>
      </li>
      <li>
        <img src="@/assets/img/2dmap.png" title="二维地图" @click='change("/2dmap")'>
      </li>
      <li>
        <img src="@/assets/img/china.png" title="中国视角" @click='chinaView'>
      </li>
      <li>
        <img src="@/assets/img/full-screen.png" title="全屏" @click="fullView">
      </li>
      <li>
        <img src="@/assets/img/print.png" title="打印" @click="toImg">
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  methods: {
    change(path) {
      // console.log(this.$route);
      this.$router.replace(
        this.$route.fullPath + path
      )
    },
    chinaView() {
      console.log('我是中国视角');
    },
    fullView() {
      console.log('我是全屏视角');
    },
    toImg() {
      console.log('我是打印按钮');
    }
  }
}
</script>

<style scoped>
  .tab {
    position: absolute;
    top: 85px;
    /* background-color: #02182f; */
    left: 50%;
    transform: translateX(-50%);
  }
  ul{
    padding: 0;
    margin: 0;
    display: flex;
    justify-content: center;
  }
  ul::after{
    content: '';
    display: table;
    clear: both;
  }
  ul li{
    float: left;
    list-style: none;
    margin: 0 10px;
    cursor: pointer;
  }

  li img{
    width: 40px;
  }

  li:hover{
    animation: tada 1.5s 0.2s ease both;
  }

  @keyframes tada{
    0% {
      transform: scale(1)
    }

    10%,
    20% {
      transform: scale(0.9) rotate(-10deg)
    }

    30%,
    50%,
    70%,
    90% {
      transform: scale(1.1) rotate(10deg)
    }

    40%,
    60%,
    80% {
      transform: scale(1.1) rotate(-10deg)
    }

    100% {
      transform: scale(1) rotate(0)
    }
  }
</style>