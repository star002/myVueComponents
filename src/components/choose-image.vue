<template>
	<div class="choose-image" _data-type="component">
		<div class="slot-view" v-on:click="slotButtonClickFun">
			<slot></slot>
		</div>
		<input type="file" ref="imageButton" v-on:change="imageChooseFun" class="choose-image-input" accept="image/png,image/jpeg,image/jpg" multiple />
	</div>
</template>

<script>
	export default {
		name: "choose-image",
		props: {
			max: {
				type: Number, //图片大小 的限制值
				default: 3
			},
			scale: {
				type: Number, //图片的缩放比例
				default: 1
			},
			format: {
				type: String, //图片的缩放比例
				default: "png"
			}
		},
		methods: {
			slotButtonClickFun() {
				this.$refs.imageButton.click();
			},
			imageChooseFun(event) {
				let max = this.max;
				if (event.target.files && event.target.files.length > 0) {
					let regu = /^(\s|\S)+(jpg|png|JPG|PNG|jpeg|JPEG)+$/;
					let re = new RegExp(regu);
					if (!re.test(event.target.files[0].type)) {
						return this.callBackFun({
							type: 1,
							value: "",
							errorMsg: "选择的不是图片"
						});
					}
					if (event.target.files[0].size > (1024 * 1024 * max)) {
						return this.callBackFun({
							type: 1,
							value: "",
							errorMsg: "文件过大"
						});
					}
					return this.readerImageFun(event.target.files[0]);
				}
				return this.callBackFun({
					type: 1,
					value: "",
					errorMsg: "没有选择内容"
				});
			},
			readerImageFun(imgfile) {
				let that = this;
				let reader = new FileReader();
				reader.readAsDataURL(imgfile);
				reader.onload = function(e) {
					let oImage = new Image();
					oImage.src = e.currentTarget.result;
					that.scaleImageFun(oImage);
				}
			},
			scaleImageFun(oImage) {
				let that = this;
				oImage.onload = function() {
					let w = this.width,
						h = this.height;
					let scale = that.scale;
					let canvas = document.createElement('canvas');
					canvas.setAttribute("width", w * scale);
					canvas.setAttribute("height", h * scale);
					let ctx = canvas.getContext('2d');
					ctx.drawImage(this, 0, 0, w, h, 0, 0, w * scale, h * scale);
					return that.callBackFun({
						type: 0,
						value: canvas.toDataURL('image/' + that.format),
						errorMsg: ""
					});
				}
			},
			callBackFun(obj) {
				this.$emit("change", {
					detail: obj
				})
			}
		}
	}
</script>

<style scoped="scoped">
	.choose-image[_data-type="component"] {
		position: relative;
		overflow: hidden;
		flex-shrink: 0;
	}

	.choose-image[_data-type="component"]>input {
		position: absolute;
		top: -200%;
		left: -200%;
		z-index: -1;
	}
</style>
