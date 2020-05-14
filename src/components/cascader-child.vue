<template>
	<div class="cascader-child" _data-type="component">
		<template v-for="(item,index) in rang">
			<template v-if="multiple">
				<!-- 多选区域 -->
				<template v-if="item.children&&item.children.length>0">
					<!-- 目录 -->
					<div v-bind:class="{item: true, checked: selectLengthObj[index] == item.children.length, checked2: selectLengthObj[index] > 0 && selectLengthObj[index] < item.children.length}"
					v-bind:key="item[rangKey]+'1'" v-on:click="cascaderItemClickFun(index)">
						<div class="checbox" v-on:click.stop="cascaderCheckListSelectFun(index)"></div>
						<div class="text-view">{{item[rangKey]}}</div>
						<div class="arrow-right" v-bind:style="{transform: 'rotateZ('+(showIndex==index?'135deg':'45deg')+')'}"></div>
					</div>
				</template>
				<template v-if="(!item.children)||item.children.length == 0">
					<!-- 文件 -->
					<div v-bind:class="{item: true, checked: selectValue[index]}" v-bind:key="item[rangKey]+'1'" v-on:click="cascaderCheckItemSelectFun(index)">
						<div class="checbox"></div>
						<div class="text-view">{{item[rangKey]}}</div>
					</div>
				</template>
			</template>
			<template v-if="!multiple">
				<!-- 单选区域 -->
				<template v-if="item.children&&item.children.length>0">
					<!-- 目录 -->
					<div v-bind:class="{item: true, checked: selectValue[index]}" v-bind:key="item[rangKey]+'1'" v-on:click="cascaderItemClickFun(index)">
						<div class="text-view">{{item[rangKey]}} {{selectValue[index]}}</div>
						<div class="arrow-right" v-bind:style="{transform: 'rotateZ('+(showIndex==index?'135deg':'45deg')+')'}"></div>
					</div>
				</template>
				<template v-if="(!item.children)||item.children.length == 0">
					<!-- 文件 -->
					<div v-bind:class="{item: true, checked: selectValue[index]}" v-bind:key="item[rangKey]+'1'" v-on:click="cascaderRadioItemSelectFun(index)">
						<div class="text-view">{{item[rangKey]}}</div>
						<div class="radio" v-if="selectValue[index]"></div>
					</div>
				</template>
			</template>
			<template v-if="item.children&&item.children.length>0">
				<cascader-child ref="cascaderChild" v-show="showIndex==index" v-bind:key="item[rangKey]+'3'" v-bind:rang="item.children"
				v-bind:multiple="multiple" v-bind:rang-key="rangKey" v-bind:value="initSelectValue[index]" v-bind:position-text="positionText+index+','"
				v-on:change="cascaderChangeFun" v-on:check="cascaderCheckFun($event,index)"></cascader-child>
			</template>
		</template>
	</div>
</template>

<script>
	export default {
		name: 'cascader-child',
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
				// 值
				type: [Number, Array, String],
				default: ""
			},
			positionText: {
				type: String,
				default: ""
			}
		},
		data() {
			return {
				showIndex: -1,
				selectValue: {},
				selectLengthObj: {},
				initSelectValue: {}
			}
		},
		methods: {
			cascaderItemClickFun(value) {
				if (this.showIndex == value) {
					value = -1;
				}
				this.showIndex = value;
			},
			menuClickFun(toggle) {
				let that = this;
				let selectValue = this.selectValue;
				that.rang.forEach((item, index) => {
					if (item.children && item.children.length > 0) {
						return that.$refs.cascaderChild.forEach((cItem) => {
							cItem.menuClickFun(toggle);
						})
					} else if (Boolean(selectValue[index]) != toggle) {
						that.fun2(index, toggle);
					}
				})
			},
			fun2(index, toggle) {
				let selectValue = this.selectValue;
				this.selectValue = null;
				selectValue[index] = toggle;
				this.selectValue = selectValue;
				this.checkboxChangeFun(index);
				this.$emit("change", {
					detail: {
						value: this.positionText + index
					}
				})
			},checkboxChangeFun (){
				let selectValue = this.selectValue,
					selectLength = 0;
				for (let key in selectValue) {
					if (selectValue[key]) {
						selectLength += 1;
					}
				}
				this.$emit("check", {
					detail: {
						selectLength
					}
				})
			},
			cascaderCheckListSelectFun(value) {
				let selectValue = this.selectValue;
				this.selectValue = null;
				selectValue[value] = !selectValue[value];
				this.selectValue = selectValue;
				this.$refs.cascaderChild[value].menuClickFun(selectValue[value]);
			},
			cascaderCheckItemSelectFun(value) {
				this.fun2(value,!this.selectValue[value]);
			},
			cascaderRadioItemSelectFun(value) {
				let selectValue = {};
				selectValue[value] = true;
				this.selectValue = selectValue;
				this.$emit("change", {
					detail: {
						value: this.positionText + value
					}
				})
			},cascaderCheckFun (res, index){
				let selectLength = 0;
				let selectValue = this.selectValue, selectLengthObj = this.selectLengthObj;
				selectLengthObj[index] = res.detail.selectLength;
				selectValue[index] = res.detail.selectLength;
				this.selectLengthObj = {};
				this.selectValue = {};
				for (let key in selectValue) {
					if (selectValue[key]) {
						selectLength += 1;
					}
				}
				if (this.rang[index].children.length != res.detail.selectLength) {
					selectLength *= 0.9;
				}
				this.selectLengthObj = selectLengthObj;
				this.selectValue = selectValue;
				this.$emit("check", {
					detail: {
						selectLength
					}
				})
			},
			cascaderChangeFun(res) {
				this.$emit("change", {
					detail: {
						value: res.detail.value
					}
				})
			},
			initFun() {
				let selectValue = {};
				let initSelectValue = {};
				let valueCopy = this.value;
				if (this.multiple) {
					if (!valueCopy.forEach) {
						return false;
					}
					let obj = {};
					valueCopy.forEach((item) => {
						let start = item[0],
							valueList = [];
						for (let i = 1; i < item.length; i++) {
							valueList.push(item[i]);
						}
						if (!obj[start]) {
							obj[start] = [];
						}
						obj[start].push(valueList);
					})
					for (let key in obj) {
						selectValue[key] = obj[key]? true: false;
						initSelectValue[key] = obj[key] || [];
					}
				} else {
					let start = valueCopy[0],
						valueList = [];
					for (let i = 1; i < valueCopy.length; i++) {
						valueList.push(valueCopy[i]);
					}
					selectValue[start] = valueList;
				}
				this.selectValue = null;
				this.selectValue = selectValue;
				this.initSelectValue = null;
				this.initSelectValue = initSelectValue;
				if(JSON.stringify(selectValue)!="{}" && this.multiple){
					this.checkboxChangeFun();
				}
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
	.cascader-child[_data-type="component"] {
		padding: 0 0 0 18px;
		box-sizing: border-box;
	}

	.cascader-child[_data-type="component"]>.item {
		display: flex;
		align-items: center;
		justify-content: flex-start;
		height: 42px;
		padding-right: 12px;
		box-sizing: border-box;
		border-bottom: 1px solid #EEEEEE;
	}

	.cascader-child[_data-type="component"]>.item>.checbox {
		position: relative;
		border: 1px solid #dcdfe6;
		border-radius: 2px;
		box-sizing: border-box;
		width: 28px;
		height: 28px;
		background-color: #fff;
		z-index: 1;
		margin-right: 8px;
		flex-shrink: 0;
	}

	.cascader-child[_data-type="component"]>.item>.text-view {
		width: 1px;
		flex: 1 1 auto;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
		font-size: 16px;
		color: #333333;
	}

	.cascader-child[_data-type="component"]>.item>.arrow-right {
		display: block;
		width: 8px;
		height: 8px;
		box-sizing: border-box;
		border-top: 1px solid #000000;
		border-right: 1px solid #000000;
		transform-origin: center center;
		transform: rotateZ(45deg);
		flex-shrink: 0;
	}
	.cascader-child[_data-type="component"]>.item>.radio {
		width: 16px;
		height: 8px;
		box-sizing: border-box;
		transform: rotate(-45deg) scaleY(1);
		transition: transform .15s ease-in .05s;
		transform-origin: center;
		border-left: 2px solid #18a0ff;
		border-bottom: 2px solid #18a0ff;
	}
	.cascader-child[_data-type="component"]>.item.checked>.checbox,
	.cascader-child[_data-type="component"]>.item.checked2>.checbox {
		background-color: #18a0ff;
		border-color: #18a0ff;
	}
	.cascader-child[_data-type="component"]>.item.checked2>.checbox::before {
		content: "";
		display: block;
		background-color: #fff;
		height: 2px;
		width: 16px;
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
	}
	.cascader-child[_data-type="component"]>.item.checked>.checbox::after {
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
	.cascader-child[_data-type="component"]>.item.checked>.text-view,
	.cascader-child[_data-type="component"]>.item.checked2>.text-view {
		color: #18a0ff;
	}
</style>
