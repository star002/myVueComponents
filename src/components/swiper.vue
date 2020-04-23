<template>
	<div class="swiper" _data-type="component">
		<div class="swiper-view" :style="{width:elWidth*swiperItemLength*3+'px',transition:'transform '+animationTime+'ms linear',transform: 'translate3d('+transformX+'px,0,0)'}" @touchstart.stop="touchStartFun" @touchmove.stop="touchMoveFun" @touchend.stop="touchEndFun">
			<div class="slot-view" :style="{width:elWidth*swiperItemLength+'px'}">
				<slot></slot>
			</div>
			<div class="slot-view" :style="{width:elWidth*swiperItemLength+'px'}">
				<slot></slot>
			</div>
			<div class="slot-view" :style="{width:elWidth*swiperItemLength+'px'}">
				<slot></slot>
			</div>
		</div>
		<div class="indicator-dots-view" v-if="indicatorDots">
			<div class="item" :style="{background:index==activeValue?indicatorActiveColor:indicatorColor}" v-for="(item,index) in swiperItemLength" :key="index"></div>
		</div>
	</div>
</template>

<script>
	export default {
		name: "swiper",
		props:{
			value:{//
				type: Number,
				default: 0
			},
			autoPlay:{//自动切换开关
				type: Boolean,
				default: true
			},interval: {//自动切换时间
				type: Number,
				default: 3000
			},duration:{//切换时的动画时长
				type: Number,
				default: 1000
			},indicatorDots:{// 是否显示面板指示点
				type: Boolean,
				default: true
			},indicatorColor:{//指示点颜色
				type: String,
				default: 'rgba(0,0,0,0.25)'
			},indicatorActiveColor:{//当前选中的指示点颜色
				type: String,
				default: '#ffffff'
			}
		},
		data() {
			return {
				timer: "",
				activeValue: 0,
				animationTime: 0,
				elWidth: 0,
				elHeight: 0,
				swiperItemLength: 0,
				transformX: 0,
				touchObj: {
					time: 0,
					touchX: 0,
					touchY: 0,
					screenX: 0
				}
			}
		},
		methods: {
			swiperItemsChangeFun(callBack) {
				let swiperItemLength = 0;
				this.$slots.default.forEach((item) => {
					if (item.elm && item.elm.className == "swiper-item") {
						swiperItemLength += 1;
					}
				})
				this.swiperItemLength = swiperItemLength;
				callBack && callBack(this.elWidth, this.elHeight);
			},
			resizeFun() {
				let that = this;
				this.elWidth = this.$el.clientWidth;
				this.elHeight = this.$el.clientHeight;
				that.$children.forEach((item) => {
					item.resizeFun && item.resizeFun(that.elWidth, that.elHeight);
				})
				that.initFun();
			},
			touchStartFun(event) {
				if (this.animationTime) {
					return false;
				}
				clearInterval(this.timer);
				this.touchObj.time = new Date().getTime();
				this.touchObj.touchX = event.touches[0].screenX;
				this.touchObj.touchY = event.touches[0].screenY;
				this.touchObj.screenX = event.touches[0].screenX;
			},
			touchMoveFun(event) {
				let screenX = event.touches[0].screenX;
				if (this.animationTime) {
					return false;
				}
				this.transformX += screenX - this.touchObj.screenX;
				this.touchObj.screenX = screenX;
				this.transformXFun();
			},
			touchEndFun() {
				let moveX = this.touchObj.touchX - this.touchObj.screenX;
				let moveAbs = Math.abs(moveX % this.elWidth);
				let yuShu = Math.abs(this.transformX % this.elWidth), linJieZhi = this.elWidth / 3;
				let computedX = 0, animationTime = 200;
				if(moveX>0&&moveAbs<linJieZhi){
					computedX = yuShu;
				}else if(moveX>0&&moveAbs>=linJieZhi){
					computedX = -this.elWidth + yuShu;
				}else if(moveX<0&&moveAbs<linJieZhi){
					computedX = -this.elWidth + yuShu;
				}else if(moveX<0&&moveAbs>=linJieZhi){
					computedX = yuShu;
				}
				this.animationTime = animationTime;
				this.transformX += computedX;
				setTimeout(()=>{
					this.animationTime = 0;
					this.transformXChangeFun();
				},animationTime)
				if(this.autoPlay){
					clearInterval(this.timer);
					this.setAutoPlayFun();
				}
			},
			transformXFun() {
				let maxValue = -this.swiperItemLength * this.elWidth;
				let minValue = maxValue * 2;
				if(this.transformX>maxValue){
					this.transformX = minValue;
				}else if(this.transformX < minValue){
					this.transformX = maxValue;
				}
			},initFun(){
				let value = this.value;
				if(value>=this.swiperItemLength){
					value = value % this.swiperItemLength;
				}
				this.transformX = -(this.swiperItemLength + this.value) * this.elWidth;
				clearInterval(this.timer);
				if(this.autoPlay){
					this.setAutoPlayFun();
				}
			},setAutoPlayFun(){
				let animationTimer;
				this.timer = setInterval(()=>{
					let maxValue = -this.swiperItemLength * this.elWidth, animationTime = this.duration;
					let minValue = maxValue * 2;
					this.animationTime = animationTime;
					this.transformX -= this.elWidth;
					if(this.transformX>maxValue){
						this.animationTime = 0;
						this.transformX = minValue;
					}else if(this.transformX < minValue){
						this.animationTime = 0;
						this.transformX = maxValue;
					}
					clearTimeout(animationTimer);
					animationTimer = setTimeout(()=>{
						this.animationTime = 0;
						this.transformXChangeFun();
					},animationTime)
				},this.interval + 10)
			},transformXChangeFun (){
				let activeValue = Math.abs(this.transformX / this.elWidth)%this.swiperItemLength;
				if(activeValue!=this.activeValue){
					this.activeValue = activeValue;
					console.log(activeValue);
					this.$emit("change", {
						dataset: this.$el.dataset,
						detail: {
							value: activeValue,
						}
					})
				}
			}
		},
		mounted() {
			let that = this;
			that.resizeFun();
			window.addEventListener("resize", function() {
				that.resizeFun();
			}, false);
		},watch:{
			value: (newValue)=>{
				if(this.activeValue!=newValue){
					this.initFun();
				}
			},autoPlay: ()=>{
				this.initFun();
			},interval: ()=>{
				this.initFun();
			}
		}
	}
</script>

<style scoped="scoped">
	.swiper[_data-type="component"] {
		width: 100%;
		height: 100%;
		position: absolute;
		top: 0;
		left: 0;
		z-index: 1;
		overflow: hidden;
	}

	.swiper[_data-type="component"]>.swiper-view {
		height: 100%;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.swiper[_data-type="component"]>.swiper-view>.slot-view {
		height: 100%;
		display: flex;
		align-items: center;
		justify-content: center;
		flex-shrink: 0;
	}
	.swiper[_data-type="component"]>.indicator-dots-view{
		position: absolute;
		left: 0;
		width: 100%;
		z-index: 9;
		bottom: 20px;
		display: flex;
		align-items: center;
		justify-content: center;
	}
	.swiper[_data-type="component"]>.indicator-dots-view>.item{
		width: 8px;
		height: 8px;
		border-radius: 50%;
		margin-left: 6px;
	}
	.swiper[_data-type="component"]>.indicator-dots-view>.item:nth-of-type(1){
		margin-left: 0;
	}
</style>
