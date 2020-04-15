var util = (function(){
  let cookie = function (key, value){
    //读取、设置cookie
  	if(key && value){
  		setCookieFun(key, value);
  	}else if(key){
  		return getCookieFun(key);
  	}
  }
  let getAllCookieFun = function(){
  	let cookie = document.cookie;
  	let cookieList = cookie.split(";");
  	let cookies={};
  	for(let i = 0;i<cookieList.length;i++){
      if(cookieList[i]){
        let key = decodeURI(decodeURI((cookieList[i].split("=")[0]).trim()));
        let value = decodeURI(decodeURI(cookieList[i].split("=")[1]));
        cookies[key] = value;
      }
  	}
  	return cookies;
  }
  let setCookieFun = function(key, value){
  	document.cookie = encodeURI(encodeURI(key))+"="+encodeURI(encodeURI(value))+"; expires="+new Date()+"; path=/";
  }
  let getCookieFun = function(key){
  	let cookies = getAllCookieFun();
  	return cookies[key] || "";
  }
  let removeCookieFun = function(key){
    document.cookie = encodeURI(encodeURI(key))+"=; expires="+new Date(1970,01,01)+"; path=/";
  }
  let clearCookieFun = function(){
    let cookies = getAllCookieFun();
    for(let key in cookies){
      removeCookieFun(key);
    }
  }
  return {
    cookie: cookie,//设置、读取cookie
    getAllCookieFun: getAllCookieFun,//获取所有的cookie
    setCookieFun: setCookieFun,//设置cookie
    getCookieFun: getCookieFun,//获取cookie
    removeCookieFun: removeCookieFun,//删除cookie
    clearCookieFun: clearCookieFun,//清除所有cookie
  }
})()
