<template>
	<div class="checkbox" _data-type="component">
		<div v-on:click="checkBoxChangeFun" v-bind:class="{checked:checkboxValue}">
			<div class="left-view"></div>
			<div class="right-view">
				<slot></slot>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		name: "checkbox",
		props: {
			value: {
				type: Boolean,
				default: false
			}
		},
		data() {
			return {
				checkboxValue: false
			}
		},
		methods: {
			initFun() {
				this.checkboxValue = this.value;
			},
			checkBoxChangeFun: function() {
				this.checkboxValue = !this.checkboxValue;
				this.$emit("change", {
					current: this.$attrs,
					detail: {
						value: this.checkboxValue
					}
				})
			}
		},
		created() {
			this.initFun();
		},
		watch: {
			value() {
				this.initFun();
			}
		}
	}
</script>

<style scoped="scoped">
	.checkbox[_data-type="component"]{
		display: inline-block;
		flex-shrink: 0;
	}
	.checkbox[_data-type="component"]>div{
		display: flex;
		align-items: center;
		justify-content: flex-start;
	}
	.checkbox[_data-type="component"]>div>.left-view{
		position: relative;
		border: 1px solid #dcdfe6;
		border-radius: 4px;
		box-sizing: border-box;
		width: 28px;
		height: 28px;
		background-color: #fff;
		z-index: 1;
		margin-right: 8px;
		flex-shrink: 0;
		display: inline-block;
	}
	.checkbox[_data-type="component"]>div>.right-view{
		color: #333333;
		font-size: 14px;
		flex-shrink: 0;
	}
	.checkbox[_data-type="component"]>.checked>.left-view{
		background-color: #18a0ff;
		border-color: #18a0ff;
	}
	.checkbox[_data-type="component"]>.checked>.left-view::after {
		box-sizing: content-box;
		content: "";
		width: 16px;
		height: 8px;
		display: block;
		box-sizing: border-box;
		transition: transform .15s ease-in .05s;
		transform-origin: center;
		border-left: 2px solid #ffffff;
		border-bottom: 2px solid #ffffff;
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -70%) rotate(-45deg);
	}
	.checkbox[_data-type="component"]>.checked>.right-view{
		color: #18a0ff;
	}
</style>
