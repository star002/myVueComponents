<template>
	<div class="scroll-view" _data-type="component" v-on:scroll="scrollFun" v-bind:style="{'overflow-x':scrollX?'auto':'hidden','overflow-y':scrollY?'auto':'hidden'}">
		<slot></slot>
	</div>
</template>
<!-- overflow-x: hidden;
    overflow-y: auto; -->
<script>
	export default {
		name: "scroll-view",
		props: {
			scrollY: {
				type: Boolean,
				defalut: false,
			},
			scrollX: {
				type: Boolean,
				defalut: false,
			},
			scrolltop: {
				type: Number,
				defalut: 0
			},
			scrollleft: {
				type: Number,
				defalut: 0
			}
		},
		data() {
			return {
				rollingDirection: "", //滚动方向
				prevScrollTop: 0, //上一次垂直的滚动的位置
				prevScrollLeft: 0, //上一次水平滚动的位置
				tolowerToggle: false,
			};
		},
		methods: {
			scrollFun(even) {
				let {
					scrollWidth,
					scrollHeight,
					scrollTop,
					scrollLeft,
					clientHeight,
					clientWidth
				} = even.target;
				let bottomValue = 50;
				if (scrollTop > this.prevScrollTop) {
					this.rollingDirection = "toLower";
				} else if (scrollTop < this.prevScrollTop) {
					this.rollingDirection = "toTop";
					this.tolowerToggle = false;
				} else if (scrollLeft > this.prevScrollLeft) {
					this.rollingDirection = "toRight";
				} else if (scrollLeft < this.prevScrollLeft) {
					this.rollingDirection = "toLeft";
				}
				this.prevScrollTop = scrollTop;
				this.prevScrollLeft = scrollLeft;
				if ((scrollHeight - scrollTop - clientHeight < bottomValue && this.rollingDirection == "toLower") || (scrollWidth -
						scrollLeft - clientWidth < bottomValue && this.rollingDirection == "toRight")) {
					if (this.tolowerToggle == false) {
						this.tolowerToggle = true;
						this.$emit("scrolltolower", {
							dataset: this.$el.dataset,
							target: {
								scrollWidth,
								scrollHeight,
								scrollTop,
								scrollLeft,
								clientHeight,
								clientWidth,
								rollingDirection: this.rollingDirection
							}
						})
					}
				} else {
					this.tolowerToggle = false;
				}
				this.$emit("scroll", {
					dataset: this.$el.dataset,
					target: {
						scrollWidth,
						scrollHeight,
						scrollTop,
						scrollLeft,
						clientHeight,
						clientWidth,
						prevScrollTop: this.prevScrollTop
					}
				})
			},
			scrollTopFun(value) {
				this.$el.scrollTop = value;
			},
			scrollLeftFun(value) {
				this.$el.scrollLeft = value;
			}
		},
		mounted() {
			this.scrollTopFun(this.scrolltop);
			this.scrollLeftFun(this.scrollleft);
		},
		watch: {
			scrolltop(newValue) {
				this.scrollTopFun(newValue);
			},
			scrollleft(newValue) {
				this.scrollLeftFun(newValue);
			},
		}
	}
</script>

<style scoped="scoped">
	.scroll-view[_data-type="component"] {
		position: absolute;
		left: 0;
		top: 0;
		width: 100%;
		height: 100%;
		z-index: 9;
	}
</style>
