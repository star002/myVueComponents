<template>
  <div id="cookie-demo-page" class="app-page">
    <div class="app-page-header">
      <navigation-bar page-title="cookie"></navigation-bar>
    </div>
    <div class="app-page-section">
      <scroll-view v-bind:scroll-y="true">
        <div class="scroll-section1">
        	<div class="item">
        		<div class="left-view app-text-ellipsis">缓存名：</div>
        		<input type="text" v-model="setCookieName" placeholder="请输入缓存的key值" />
        	</div>
        	<div class="item">
        		<div class="left-view app-text-ellipsis">缓存值：</div>
        		<input type="text" v-model="setCookieValue" placeholder="请输入缓存的value值" />
        	</div>
        </div>
        <div class="app-button" v-on:click="setCookieFun">设置缓存</div>
        <div class="app-media-bottom-view"></div>
        <div class="scroll-section1">
        	<div class="item">
        		<div class="left-view app-text-ellipsis">缓存名：</div>
        		<input type="text" v-model="getCookieName" placeholder="请输入缓存的key值" />
        	</div>
        	<div class="item">
        		<div class="left-view app-text-ellipsis">缓存值：</div>
        		<input type="text" v-model="getCookieValue" disabled="disabled" placeholder="" />
        	</div>
        </div>
        <div class="app-button" v-on:click="getCookieFun">获取缓存</div>
        <div class="app-media-bottom-view"></div>
        <div class="scroll-section1">
        	<div class="item">
        		<div class="left-view app-text-ellipsis">缓存名：</div>
        		<input type="text" v-model="removeCookieName" placeholder="请输入缓存的key值" />
        	</div>
        </div>
        <div class="app-button" v-on:click="removeCookieFun">清除缓存</div>
        <div class="app-media-bottom-view"></div>
        <div class="scroll-section2" v-if="getCookieAll">{{getCookieAll}}</div>
        <div class="app-button" v-on:click="getCookieAllFun">获取所有缓存</div>
        <div class="app-media-bottom-view"></div>
        <div class="app-button" v-on:click="clearCookieAllFun">清除所有缓存</div>
        <div class="app-media-bottom-view"></div>
      </scroll-view>
    </div>
  </div>
</template>

<script>
  import componentNavigationBar from "@/components/navigation-bar"
  import componentScrollView from "@/components/scroll-view"
  export default{
    name: "cookie-demo-page",
    components: {
      'navigation-bar': componentNavigationBar,
      'scroll-view': componentScrollView
    },
    data (){
      return {
        setCookieName: "",
        setCookieValue: "",
        getCookieName: "",
        getCookieValue: "",
        removeCookieName: "",
        getCookieAll: ""
      }
    },
    methods:{
      setCookieFun (){
        let errorList = [];
        if(this.setCookieName.trim()==""){
          errorList.push("请输入缓存名")
        }
        if(this.setCookieValue.trim()==""){
          errorList.push("请输入缓存值")
        }
        if(errorList.length>0){
          return alert(errorList[0]);
        }
        util.cookie(this.setCookieName,this.setCookieValue);
        this.setCookieName = "";
        this.setCookieValue = "";
      },getCookieFun (){
        let errorList = [];
        if(this.getCookieName.trim()==""){
          errorList.push("请输入缓存名")
        }
        if(errorList.length>0){
          return alert(errorList[0]);
        }
        this.getCookieValue = util.cookie(this.getCookieName);
      },removeCookieFun (){
        let errorList = [];
        if(this.removeCookieName.trim()==""){
          errorList.push("请输入缓存名")
        }
        if(errorList.length>0){
          return alert(errorList[0]);
        }
        util.removeCookieFun(this.removeCookieName);
      },getCookieAllFun (){
        this.getCookieAll = JSON.stringify(util.getAllCookieFun())|| "没获取到缓存";
      },clearCookieAllFun (){
        util.clearCookieFun();
      }
    }
  }
</script>

<style scoped="scoped">
  .scroll-section1{
  	background: #FFFFFF;
  	border-top: 1px solid #D9D9D9;
  	border-bottom: 1px solid #D9D9D9;
    padding: 0 16px;
    box-sizing: border-box;
  }
  .scroll-section1>.item{
  	width: 100%;
  	display: flex;
  	align-items: center;
  	box-sizing: border-box;
  	height: 48px;
  	border-bottom: 1px solid #D9D9D9;
  }
  .scroll-section1>.item:nth-last-of-type(1){
  	border-bottom: none;
  }
  .scroll-section1>.item>.left-view{
  	/* width: 100px; */
  	flex-shrink: 0;
  	font-size: 16px;
  }
  .scroll-section1>.item>input{
  	width: 1px;
  	flex: 1 1 auto;
  	height: 100%;
  	padding: 0;
  	margin: 0;
  	outline: none;
  	border: none;
  	font-size: 16px;
  }
  .scroll-section1>.item>.right-view{
  	flex-shrink: 0;
  	border-left: 1px solid #D9D9D9;
  	box-sizing: border-box;
  	padding: 0 12px;
  	height: 100%;
  	display: flex;
  	align-items: center;
  	justify-content: center;
  	font-size: 16px;
  	color: #18a0ff;
  }
  .scroll-section1>.item>.right-view.disabled{
  	color: #999999;
  }
  .scroll-section2{
    background-color: #FFFFFF;
    padding: 6px 12px;
    box-sizing: border-box;
    font-size: 14px;
    color: #333333;
  }
  .app-button{
    width: 92%;
    margin-top: 32px;
  }
</style>
