<template>
  <div class="navigation-bar" _data-type="component">
    <div class="left-view" v-on:click="pageBackButtonClickFun" v-if="showBackButton">
      <div class="arrow-right"></div>
      <div class="text-view">返回</div>
    </div>
    <div class="center-view">{{pageTitle}}</div>
  </div>
</template>

<script>
  export default {
    name: "navigation-bar",
    props: {
      pageTitle: {
        type: String,
        default: ""
      }
    },
    data: function() {
      return {
        showBackButton: false, //是否显示返回按钮
      }
    },
    methods: {
      pageBackButtonClickFun: function() {
        history.back();
      }
    },
    mounted: function() {
      let that = this;
      that.showBackButton = window.history.length > 1;
    }
  }
</script>

<style scoped="scoped">
  .navigation-bar[_data-type="component"] {
    width: 100%;
    height: 50px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 16px;
    color: #FFFFFF;
    background: #18a0ff;
    flex-shrink: 0;
    position: relative;
  }

  .navigation-bar[_data-type="component"]>.left-view {
    position: absolute;
    left: 0;
    top: 50%;
    transform: translateY(-50%);
    padding: 9px 16px;
    box-sizing: border-box;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    font-size: 14px;
  }

  .navigation-bar[_data-type="component"]>.left-view>.arrow-right {
    display: block;
    width: 10px;
    height: 10px;
    box-sizing: border-box;
    border-top: 1px solid #FFFFFF;
    border-right: 1px solid #FFFFFF;
    transform-origin: center center;
    flex-shrink: 0;
    transform: rotateZ(-135deg);
  }
</style>
