<template>
  <div id="choose-image-demo" class="app-page">
    <div class="app-page-header">
      <navigation-bar page-title="choose-image"></navigation-bar>
    </div>
    <div class="app-page-section">
      <scroll-view :scroll-y="true">
        <div class="app-list-title">请选择图片</div>
        <img class="image" v-if="imgSrc" :src="imgSrc" alt="">
        <choose-image @change="chooseImageFun">
          <div class="app-button">选择图片</div>
        </choose-image>
      </scroll-view>
    </div>
  </div>
</template>

<script>
  import componentNavigationBar from "@/components/navigation-bar"
  import componentScrollView from "@/components/scroll-view"
  import componentChooseImage from "@/components/choose-image"
  export default {
    name: "choose-image-demo",
    components: {
      'navigation-bar': componentNavigationBar,
      'scroll-view': componentScrollView,
      'choose-image': componentChooseImage
    },data(){
      return {
        imgSrc: ''
      }
    },methods:{
      chooseImageFun (res){
        if(res.detail.type!=0){
          this.imgSrc = "";
          return alert(res.detail.errorMsg);
        }
        this.imgSrc = res.detail.value;
      }
    }
  }
</script>

<style scoped="scoped">
  .image{
    width: 92%;
    display: block;
    margin: 32px auto 0 auto;
  }
  .app-button {
    width: 92%;
    margin-top: 32px;
  }
</style>
