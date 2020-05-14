<template>
	<div>
		<div class="slot-view" v-on:click="slotButtonClickFun(true)">
			<slot></slot>
		</div>
		<div class="cascader" _data-type="component" v-if="showCascaderToggle" v-on:click="slotButtonClickFun(false)">
			<div class="cascader-section" v-on:click.stop="">
				<div class="header">
					<div class="button cancle-button" v-on:click="slotButtonClickFun(false)">取消</div>
					<div class="button" v-on:click="confirmFun">确定</div>
				</div>
				<div class="section">
					<cascader-child v-bind:rang="rang" v-bind:multiple="multiple" v-bind:rang-key="rangKey" v-bind:value="selectList"
					v-on:change="cascaderSelectFun"></cascader-child>
					<div class="app-media-bottom-view"></div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import cascaderChildComponent from '@/components/cascader-child'
	export default {
		name: 'cascader',
		components: {
			'cascader-child': cascaderChildComponent
		},
		props: {
			multiple: { //是否开启多选模式
				type: Boolean,
				default: false
			},
			rang: { //数据列表
				type: Array,
				default () {
					return false;
				}
			},
			rangKey: { //
				type: String,
				default: ""
			},
			value: {
				type: Array,
				default () {
					return [];
				}
			}
		},
		data() {
			return {
				showCascaderToggle: false,
				selectList: [],
				selectObj: {}
			}
		},
		methods: {
			slotButtonClickFun(value) {
				this.showCascaderToggle = value;
				if(!value){
					this.initFun();
				}
			},confirmFun(){
				let value = [];
				if (this.multiple){
					for (let key in this.selectObj) {
						if (this.selectObj[key]) {
							let item = key.split(",");
							value.push(item);
						}
					}
				}else{
					value = this.selectList;
				}
				this.$emit("change", {
					dataset: this.$el.dataset,
					detail: {
						value
					}
				})
				this.showCascaderToggle = false;
			},
			cascaderSelectFun(res) {
				if (this.multiple) {
					let selectList = [];
					if (this.selectObj[res.detail.value]) {
						this.selectObj[res.detail.value] = false;
					} else {
						this.selectObj[res.detail.value] = true;
					}
					for (let key in this.selectObj) {
						if (this.selectObj[key]) {
							let item = key.split(",");
							selectList.push(item);
						}
					}
					this.selectList = selectList;
				} else {
					this.selectObj = {};
					this.selectObj[res.detail.value] = true;
					this.selectList = res.detail.value.split(",");
				}
			},
			initFun() {
				//初始化
				let selectList = [];
				if (this.multiple) {
					for (let i = 0; i < this.value.length; i++) {
						let listItem = [...this.value[i]];
						selectList.push(listItem);
						this.selectObj[listItem.join(",")] = true;
					}
				} else {
					selectList = [...this.value];
					this.selectObj[this.value.join(",")] = true;
				}
				this.selectList = selectList;
			}
		},
		created() {
			this.initFun();
		},
		computed: {
			cascaderSectionFun() {
				return "";
			}
		},
		watch: {
			value() {
				this.initFun();
			}
		}
	}
</script>

<style scoped="scoped">
	.cascader[_data-type="component"] {
		position: fixed;
		top: 0;
		left: 50%;
		width: 100%;
		height: 100%;
		z-index: 99;
		max-width: 750px;
		transform: translateX(-50%);
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		background: rgba(0, 0, 0, 0.45);
	}

	.cascader[_data-type="component"]>.cascader-section {
		width: 100%;
		background: #FFFFFF;
		position: absolute;
		bottom: 0;
		left: 0;
		z-index: 9;
	}

	.cascader[_data-type="component"]>.cascader-section>.header {
		display: flex;
		align-items: center;
		justify-content: space-between;
		border-bottom: 1px solid #eeeeee;
		box-sizing: border-box;
	}

	.cascader[_data-type="component"]>.cascader-section>.header>.button {
		padding: 0 16px;
		box-sizing: border-box;
		line-height: 36px;
		font-size: 14px;
		color: #18a0ff;
		overflow: hidden;
		white-space: nowrap;
		text-overflow: ellipsis;
	}

	.cascader[_data-type="component"]>.cascader-section>.header>.cancle-button {
		color: #999999;
	}

	.cascader[_data-type="component"]>.cascader-section>.section {
		height: 280px;
		overflow: auto;
	}
</style>
