import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import util from './utils/util.js'
Object.defineProperty(Object.prototype, 'cloneFun', {
	configurable: true,
	enumerable: false,
	writable: true,
	value: function() {
		let Orgin = this;
		let target, childType, objectToString = Object.prototype.toString;
		let objectHasOwnProperty = Object.prototype.hasOwnProperty;
		if (objectToString.call(Orgin) == "[object Array]" || objectToString.call(Orgin) == "[object Object]" &&
			Orgin != null) {
			target = objectToString.call(Orgin) == "[object Array]" ? [] : {};
			for (let i in Orgin) {
				if (objectHasOwnProperty.call(Orgin, i)) {
					childType = typeof(Orgin[i]);
					if (childType == "string" || childType == "number" || childType == "boolean" || childType ==
						"undefined" || childType == "function") {
						target[i] = Orgin[i];
					} else {
						target[i] = Orgin[i].cloneFun();
					}
				}
			}
		} else {
			return Orgin;
		}
		return target;
	}
})
Vue.config.productionTip = false
Vue.prototype.$util = util;

new Vue({
	router,
	store,
	render: h => h(App)
}).$mount('#app')
// Vue.prototype.cloneFun = function() {
// 	let Orgin = this;
// 	let target, childType, objectToString = Object.prototype.toString;
// 	let objectHasOwnProperty = Object.prototype.hasOwnProperty;
// 	if (objectToString.call(Orgin) == "[object Array]" || objectToString.call(Orgin) == "[object Object]" &&
// 		Orgin != null) {
// 		target = objectToString.call(Orgin) == "[object Array]" ? [] : {};
// 		for (let i in Orgin) {
// 			if (objectHasOwnProperty.call(Orgin, i)) {
// 				childType = typeof(Orgin[i]);
// 				if (childType == "string" || childType == "number" || childType == "boolean" || childType ==
// 					"undefined" || childType == "function") {
// 					target[i] = Orgin[i];
// 				} else {
// 					target[i] = Orgin[i].cloneFun();
// 				}
// 			}
// 		}
// 	} else {
// 		return Orgin;
// 	}
// 	return target;
// }
// Array.prototype.unique = function(fun) {
// 	var obj = {},
// 		newArr = [],
// 		funReturn, len = this.length;
// 	if (typeof(fun) != "function") {
// 		fun = fun1;
// 	}
// 	for (var i = 0; i < len; i++) {
// 		funReturn = fun(this[i]);
// 		if (!obj[funReturn]) {
// 			newArr.push(this[i]);
// 			obj[funReturn] = true;
// 		}
// 	}

// 	function fun1(num) {
// 		return num;
// 	}
// 	return newArr;
// }
