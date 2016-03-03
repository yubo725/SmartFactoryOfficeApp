
var Terminal = {
    // 辨别移动终端类型
    platform : function() {
        var u = navigator.userAgent, app = navigator.appVersion;
        return {
            // 是否为iPhone或者QQHD浏览器
            iPhone : u.indexOf('iPhone') > -1,
            // 是否iPad
            iPad : u.indexOf('iPad') > -1,
            // 是否微信
            weixin : u.toLowerCase().indexOf("micromessenger") > -1,
            // android终端或者uc浏览器
            android : u.indexOf('Android') > -1 || u.indexOf('Linux') > -1,
            // 是否WinPhone
            wp : u.indexOf('Windows Phone') > -1
        };
    }(),
}

function getToken(){
    if(typeof(window.js_interface) == "undefined"){
        var storage = window.localStorage;
        var token = storage.getItem('token');
        if(token == null){
            storage.setItem('token','mlqhvwTAvXDQNvrUJiyUBcb6fGEUTHUDtBVJ3t+oWz8=')
            return 'mlqhvwTAvXDQNvrUJiyUBcb6fGEUTHUDtBVJ3t+oWz8=';
        }
        return token;
    }

	var token = window.js_interface.getAccessToken();
    if (!Terminal.platform.android){
        var storage = window.localStorage;
        storage.setItem('token',token);
    }
    return token;
}
var is_boss = false;
token = getToken();

function unixToTime(format,unix_time){
   	var now = new Date(parseInt(unix_time) * 1000);
	return now.format(format)
}

/**
 * 时间对象的格式化;
 */
Date.prototype.format = function(format) {
    /*
     * eg:format="yyyy-MM-dd hh:mm:ss";
     */
    var o = {
        "M+" :this.getMonth() + 1, // month
        "d+" :this.getDate(), // day
        "h+" :this.getHours(), // hour
        "m+" :this.getMinutes(), // minute
        "s+" :this.getSeconds(), // second
        "q+" :Math.floor((this.getMonth() + 3) / 3), // quarter
        "S" :this.getMilliseconds()
    // millisecond
    }
    if (/(y+)/.test(format)) {
        format = format.replace(RegExp.$1, (this.getFullYear() + "")
                .substr(4 - RegExp.$1.length));
    }
    for ( var k in o) {
        if (new RegExp("(" + k + ")").test(format)) {
            format = format.replace(RegExp.$1, RegExp.$1.length == 1 ? o[k]
                    : ("00" + o[k]).substr(("" + o[k]).length));
        }
    }
    return format;
}

//获取URL参数
function getUrlParam(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"); //构造一个含有目标参数的正则表达式对象
    var r = window.location.search.substr(1).match(reg);  //匹配目标参数
    if (r != null) return unescape(r[2]); return null; //返回参数值
}


//是否是上级，如果是上级则有审核选项
function isBoss(){
    $.ajax({
        url :'/v1/companies/users/isboss',
        method:"GET",
        dataType:'json',
        async:false,
        beforeSend:function(request){
            request.setRequestHeader('Authorization','Bearer '+ token);
        },
        success:function(data){
            if(data.status == 10001){
                is_boss = true;
            }else{
                is_boss = false;
            }
        }
    });
}

var role = 0;

function getRole(){
    $.ajax({
        url :'/v1/companies/users/roles',
        method:"GET",
        dataType:'json',
        async:false,
        beforeSend:function(request){
            request.setRequestHeader('Authorization','Bearer '+ token);
        },
        success:function(data){
            if(data.status == 10001){
                role = data.data.id;
            }
        }
    });
}
isBoss();