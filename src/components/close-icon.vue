<template>
	<div class="close-icon" _data-type="component" :style="{width: size,height: size, background: background, 'border-radius': borderRadius}">
		<span :style="{ background: color, height: lineHeight}"></span>
		<span :style="{ background: color, height: lineHeight}"></span>
	</div>
</template>

<script>
	export default{
		name: "close-icon",
		props: {
			size:{
				type: String,
				default: "24px"
			},
			background: {
				type: String,
				default: "#999999"
			},
			color:{
				type: String,
				default: "rgba(255,255,255,1)"
			},
			borderRadius: {
				type: String,
				default: "50%"
			},
			lineHeight:{
				type: String,
				default: "2px"
			}
		}
	}
</script>

<style scoped="scoped">
	.close-icon[_data-type="component"]{
		position: relative;
	}
	.close-icon[_data-type="component"]>span{
		position: absolute;
		top: 50%;
		left: 50%;
		z-index: 1;
		width: 70%;
		transform-origin: center center;
	}
	.close-icon[_data-type="component"]>span:nth-of-type(1){
		transform: translate(-50%, -50%) rotateZ(45deg);
	}
	.close-icon[_data-type="component"]>span:nth-of-type(2){
		transform: translate(-50%, -50%) rotateZ(-45deg);
	}
</style>
