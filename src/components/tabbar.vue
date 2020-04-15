<template>
  <div class="tabbar" _data-type="component">
    <div class="item" v-for="(item,index) in tabbarList" v-bind:key="item.text" v-on:click="tabbarItemClickFun(index)">
      <img v-bind:src="index==myActiveIndex?item.activeSrc:item.imgSrc" alt="">
      <span v-show="index==myActiveIndex" v-bind:style="{color:activeColor}">{{item.text}}</span>
      <span v-show="index!=myActiveIndex">{{item.text}}</span>
    </div>
  </div>
</template>

<script>
  export default {
    name: "tabbar",
    props: {
      tabbarList: {
        type: Array,
        default (){
          return [{
            imgSrc: "",
            activeSrc: "",
            text: "",
          }];
        }
      },activeIndex: {
        type: Number,
        default: 0
      },activeColor: {
        type: String,
        default: "#18a0ff"
      }
    },
    data (){
      return {
        myActiveIndex: 0
      };
    },
    methods: {
      tabbarItemClickFun (myActiveIndex){
        if(myActiveIndex == this.myActiveIndex){
          return false;
        }
        this.myActiveIndex = myActiveIndex;
        this.$emit("change",{
          detail:{
            value: myActiveIndex
          }
        })
      }
    },
    watch: {
      activeIndex (newValue, oldValue) {
        this.myActiveIndex = newValue;
      }
    }
  }
</script>

<style scoped="scoped">
  .tabbar[_data-type="component"]{
    width: 100%;
    height: 50px;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
    position: relative;
    padding: 0 0 constant(safe-area-inset-bottom) 0;
    box-sizing:border-box;
    background: #FFFFFF;
    box-shadow: 0px 4px 24px 0 rgba(0, 0, 0, 0.25);
  }
  .tabbar[_data-type="component"]>.item{
    width: 1px;
    flex: 1 0 auto;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    padding-top: 6px;
    box-sizing: border-box;
    cursor: pointer;
    user-select: none;
  }
  .tabbar[_data-type="component"]>.item>img{
    width: 24px;
    height: 24px;
  }
  .tabbar[_data-type="component"]>.item>span{
    font-size: 10px;
    line-height: 14px;
    margin-top: 2px;
    color: #cccccc;
  }
</style>
