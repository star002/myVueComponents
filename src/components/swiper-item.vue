<template>
	<div class="swiper-item" _data-type="component" :style="{width:elWidth,height:elHeight}">
		<slot></slot>
	</div>
</template>

<script>
	export default{
		name: "swiper-item",
		data(){
			return {
				elWidth: "0",
				elHeight: "0"
			}
		},methods:{
			resizeFun(elWidth, elHeight){
				this.elWidth = elWidth + "px";
				this.elHeight = elHeight + "px";
			}
		},created() {
			this.$parent&&this.$parent.swiperItemsChangeFun&&this.$parent.swiperItemsChangeFun(this.swiperItemsChangeFun);
		},destroyed() {
			this.$parent&&this.$parent.swiperItemsChangeFun&&this.$parent.swiperItemsChangeFun();
		}
	}
</script>

<style scoped="scoped">
</style>
