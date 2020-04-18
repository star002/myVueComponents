<template>
  <div id="tool-list-page">
    <div class="list-view">
      <list-item v-for="(item,index) in myToolList" :key="item.path" :left-text="item.name" :center-text="item.introduce" :data-index="index" @click="listItemClickFun"></list-item>
    </div>
  </div>
</template>

<script>
  import ListItem from "@/components/list-type1"
  export default{
    name: "tool-list-page",
    components: {
      'list-item': ListItem
    },data (){
      return {
        myToolList:[{
          name: "cookie",
          introduce: "设置、获取、删除、清空cookie",
          path: "/cookie"
        }]
      }
    },methods:{
      listItemClickFun (res){
        let { myToolList } = this;
        let { index } = res.dataset;
        this.$router.push({
          path:myToolList[index].path,
          query:{
            "name": myToolList[index].name
          }
        })
      }
    }
  }
</script>

<style scoped="scoped">
</style>
