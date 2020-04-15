<template>
      <div id="mine-page" class="app-page">
        <div class="app-page-header">
          <navigation-bar :page-title="tabbarList[tabbarIndex].text"></navigation-bar>
        </div>
        <div class="app-page-section">
          <scroll-view v-bind:scroll-y="true">
            <component-list v-show="tabbarIndex==0"></component-list>
            <tool-list v-show="tabbarIndex==1"></tool-list>
          </scroll-view>
        </div>
        <tab-bar v-bind:tabbarList="tabbarList" v-bind:activeIndex="tabbarIndex" @change="tabBarChangeFun"></tab-bar>
      </div>
</template>

<script>
  import ComponentListPage from "@/pages/component-list"
  import ToolListPage from "@/pages/tool-list"
  import componentNavigationBar from "@/components/navigation-bar"
  import componentScrollView from "@/components/scroll-view"
  import componentTabBar from "@/components/tabbar"
  export default {
    name: "mine-page",
    components:{
      'component-list': ComponentListPage,
      'tool-list': ToolListPage,
      'navigation-bar': componentNavigationBar,
      'scroll-view': componentScrollView,
      'tab-bar': componentTabBar
    },
    data (){
      return {
        tabbarList: [{
          imgSrc: "static/image/tabbar-icon-02.png",
          activeSrc: "static/image/tabbar-icon-01.png",
          text: "组件库",
        },{
          imgSrc: "static/image/tabbar-icon-04.png",
          activeSrc: "static/image/tabbar-icon-03.png",
          text: "工具库",
        }],
        tabbarIndex: 0
      };
    },methods:{
      tabBarChangeFun (e){
        this.tabbarIndex = e.detail.value;
      }
    }
  }
</script>
<style scoped="scoped">
</style>
