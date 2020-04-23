<template>
  <div id="component-list-page">
    <div class="list-view">
      <list-item v-for="(item,index) in myComponentsList" :key="item.path" :left-text="item.name" :center-text="item.introduce" :data-index="index" @click="listItemClickFun"></list-item>
    </div>
  </div>
</template>

<script>
  import ListItem from "@/components/list-type1"
  export default{
    name: "component-list-page",
    components: {
      'list-item': ListItem
    },data (){
      return {
        myComponentsList:[{
          name: "picker",
          introduce: "模仿微信小程序而写的select选择器",
          path: "/picker"
        },{
          name: "choose-image",
          introduce: "图片选择",
          path: "/choose-image"
        },{
          name: "swiper",
          introduce: "swiper",
          path: "/swiper"
        }]
      }
    },methods:{
      listItemClickFun (res){
        let { myComponentsList } = this;
        let { index } = res.dataset;
        this.$router.push({
          path:myComponentsList[index].path,
          query:{
            "name": myComponentsList[index].name
          }
        })
      }
    }
  }
</script>

<style scoped="scoped">
</style>
