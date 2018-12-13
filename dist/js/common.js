
//对选中的元素进行封装，如果选中的元素名在多个地方用到，如果长度为0，就返回null，如果长度为1，就返回为此函数名的第一个值,否则就返回所有为此函数名的数据；
function _(selector){
      var ele = document.querySelectorAll(selector);
      if(ele.length == 0) return null;
      return  ele.length == 1 ? ele[0] : ele; 
}


//ajax的promise封装
function _ajax(url){
      return new Promise(function(resolve,reject){
            var xhr = new XMLHttpRequest();
            xhr.open("GET",url);
            xhr.send(null);
            xhr.onload = function(){
                  if(xhr.status === 200){
                        resolve(xhr.response)
                  }
            }
      })
}

//jsonp的封装
function _jsonp(url,cb){
      return new Promise(function(resolve,reject){
            cb = cb ? cb : "callback";
            var randomName = "cb"+Date.now();
            var script = document.createElement("script");
            url+= (/\?/.test(url) ? "&" : "?") + `${cb}=${randomName}`;
            script.src=url;
            document.body.appendChild(script);
            script.onload = function(){
                  this.remove();
            }
            window[randomName] = function(res){
                  resolve(res)
            }
      })
}

//封装一个函数使伪数组转成真数组
function _slice(args){
      return Array.prototype.slice.call(args)
}


function cookie(name,value,options){
      // 通过参数的个数进行判断; 严谨验证参数类型;
      // --- 获取cookie -----
      if(arguments.length == 1 && typeof name == "string"){
          var cookieArray = document.cookie.split("; ");
          for(var i = 0 ; i < cookieArray.length ; i ++){
              if(cookieArray[i].split("=")[0] === name){
                  return cookieArray[i].split("=")[1];
              }
          }
          return "";
      }
      // --- 设置cookie -----
      var cookieStr = name+"="+value;
      if(options == undefined || typeof options != "object"){
          return document.cookie = cookieStr;
      }
      if(typeof options.path == "string"){
          cookieStr += ";path="+options.path;
      }
      if(typeof options.expires == "number" || typeof options.expires == "string"){
          var d = new Date();
          d.setDate(d.getDate() + options.expires);
          cookieStr += ";expires=" + d;
      }
      return document.cookie = cookieStr;
  }
  function removeCookie(name,path){
      setCookie(name,"",{
          expires:-1,
          // 做一个参数判断 , 不让path 为undefined;
          path: path ? path : ""
      })
  }