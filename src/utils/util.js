let cookie = (key, value) => {
	//读取、设置cookie
	if (key && value) {
		setCookieFun(key, value);
	} else if (key) {
		return getCookieFun(key);
	}
}
let getAllCookieFun = () => {
	//获取所有的cookie
	let cookie = document.cookie;
	let cookieList = cookie.split(";");
	let cookies = {};
	for (let i = 0; i < cookieList.length; i++) {
		if (cookieList[i]) {
			let key = decodeURI(decodeURI((cookieList[i].split("=")[0]).trim()));
			let value = decodeURI(decodeURI(cookieList[i].split("=")[1]));
			cookies[key] = value;
		}
	}
	return cookies;
}
let setCookieFun = (key, value) => {
	//设置cookie
	
	document.cookie = encodeURI(encodeURI(key)) + "=" + encodeURI(encodeURI(value)) + "; expires=" + new Date() +
		"; path=/";
}
let getCookieFun = (key) => {
	//获取cookie
	let cookies = getAllCookieFun();
	return cookies[key] || "";
}
let removeCookieFun = (key) => {
	//删除cookie
	document.cookie = encodeURI(encodeURI(key)) + "=; expires=" + new Date(new Date().getTime()-864000000) + "; path=/";
}
let clearCookieFun = () => {
	//清除所有的cookie
	let cookies = getAllCookieFun();
	for (let key in cookies) {
		removeCookieFun(key);
	}
}
let cloneObjFun = (Orgin = {}) => {
	//深度拷贝数组、对象
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
					target[i] = cloneObjFun(Orgin[i]);
				}
			}
		}
	} else {
		return Orgin;
	}
	return target;
}
let inherit = function(Orgin, Target) {
	function F() {}
	Target = Target || {};
	F.prototype = Orgin.prototype;
	Target.prototype = new F();
	Target.prototype.constructor = Target;
	Target.prototype.uber = Orgin;
}

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
Array.prototype.unique = function(fun) {
	var obj = {},
		newArr = [],
		funReturn, len = this.length;
	if (typeof(fun) != "function") {
		fun = fun1;
	}
	for (var i = 0; i < len; i++) {
		funReturn = fun(this[i]);
		if (!obj[funReturn]) {
			newArr.push(this[i]);
			obj[funReturn] = true;
		}
	}

	function fun1(num) {
		return num;
	}
	return newArr;
}
const util = {
	cookie: cookie, //设置、读取cookie
	getAllCookieFun: getAllCookieFun, //获取所有的cookie
	setCookieFun: setCookieFun, //设置cookie
	getCookieFun: getCookieFun, //获取cookie
	removeCookieFun: removeCookieFun, //删除cookie
	clearCookieFun: clearCookieFun, //清除所有cookie
	cloneObjFun: cloneObjFun, //深度拷贝数组、对象
	inherit: inherit, //继承的圣杯模式
};
export default util