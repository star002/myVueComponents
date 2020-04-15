<template>
  <div class="list-item" _data-type="component" v-on:click="listItemClickFun">
    <div class="left-view">{{leftText}}</div>
    <div class="center-view">{{centerText}}</div>
    <div class="right-view"></div>
    <div class="bottom-line"></div>
  </div>
</template>

<script>
  export default {
    name: "list-item",
    props:{
      leftText:{
        type: String,
        default: ""
      },
      centerText:{
        type: String,
        default: ""
      }
    },methods:{
      listItemClickFun (){
        this.$emit("click",{
          dataset: this.$el.dataset,
        })
      }
    }
  }
</script>

<style scoped="scoped">
  .list-item[_data-type="component"]{
    display: flex;
    align-items: center;
    justify-content: flex-start;
    padding: 0 12px;
    box-sizing: border-box;
    height: 36px;
    background: #FFFFFF;
    position: relative;
  }
  .list-item[_data-type="component"]>.left-view{
    flex-shrink: 0;
    margin-right: 12px;
    color: #333333;
    font-size: 14px;
  }
  .list-item[_data-type="component"]>.center-view{
    width: 1px;
    flex: 1 1 auto;
    margin-right: 4px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    text-align: right;
    color: #999999;
    font-size: 12px;
  }
  .list-item[_data-type="component"]>.right-view{
  	display: block;
  	width: 8px;
  	height: 8px;
  	box-sizing: border-box;
  	border-top: 1px solid #999999;
  	border-right: 1px solid #999999;
  	transform-origin: center center;
  	transform: rotateZ(45deg);
  	flex-shrink: 0;
  }
  .list-item[_data-type="component"]>.bottom-line{
    position: absolute;
    left: 0;
    bottom: 0;
    width: 100%;
    height: 1px;
    background: #aaaaaa;
    transform-origin: left bottom;
    transform: scaleY(0.5);
  }
</style>
