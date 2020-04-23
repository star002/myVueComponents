<template>
	<div id="swiper-demo" class="app-page">
		<div class="app-page-header">
			<navigation-bar page-title="swiper"></navigation-bar>
		</div>
		<div class="app-page-section">
			<swiper>
				<swiper-item v-for="(item,index) in swiperItemLength" v-bind:key="index">
					<div class="swiper-item" :style="{background:colors[index]}" @click="swiperItemClickFun(index)">
						<div class="app-remark-view" style="color: #ffffff;">
							<div>{{item}}参数列表：</div>
							<div>1.value</div>
							<div>swiper的初始值。</div>
							<div>2.autoPlay</div>
							<div>是否自动播放，默认为true。</div>
							<div>3.interval（ms）</div>
							<div>自动切换间隔时长，默认3000。</div>
							<div>4.duration（ms）</div>
							<div>自动切换的动画时长，默认1000。</div>
							<div>5.indicatorDots</div>
							<div>是否显示面板指示点，默认true。</div>
							<div>6.indicatorColor</div>
							<div>指示点颜色，默认rgba(0,0,0,0.25)。</div>
							<div>7.indicatorActiveColor</div>
							<div>当前选中的指示点颜色，默认#ffffff。</div>
						</div>
					</div>
				</swiper-item>
			</swiper>
		</div>
	</div>
</template>

<script>
	import componentNavigationBar from "@/components/navigation-bar"
	import componentSwiper from "@/components/swiper"
	import componentSwiperItem from "@/components/swiper-item"
	export default {
		name: "choose-image-demo",
		components: {
			'navigation-bar': componentNavigationBar,
			'swiper': componentSwiper,
			'swiper-item': componentSwiperItem
		},
		data() {
			return {
				imgSrc: '',
				swiperItemLength: [0, 1, 2, 3, 4, 5, 6, 7],
				colors: ["#33B5E5", "#0099CC", "#AA66CC", "#9933CC", "#99CC00", "#669900", "#FFBB33", "#FF8800", "#FF4444",
					"#CC0000"
				]
			}
		},
		methods: {
			swiperLengthChangeFun(value) {
				if (value > 0) {
					this.swiperItemLength.push(this.swiperItemLength.length);
				} else if (value < 0) {
					this.swiperItemLength.splice(this.swiperItemLength.length - 1, 1);
				}
			},
			swiperItemClickFun(value) {
				console.log(value);
			}
		}
	}
</script>

<style scoped="scoped">
	.swiper-item {
		width: 100%;
		height: 100%;
		display: flex;
		align-items: center;
		justify-content: center;
	}
</style>
