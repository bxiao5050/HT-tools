/**
 * Created by karl.zheng on 2018/3/14.
 */
import { server, api } from './index'
import { HTTPUtil, HTTPGet } from './http'
import { insertAccount, initOrder, showAlert } from '../actions'
import { createStore } from 'redux'
import { hashHistory } from 'react-router'
import reducer from '../reducers'
// import assign from 'core-js/library/fn/object/assign'

export const store = createStore(reducer);

//参数签名
export const signed = (params) => {
	var str = "";
	for (var key in params) {
		str += params[key];
	}

	console.log(str + server.appKey);
	return md5(str + server.appKey);
}

//设备信息
export const deviceMsg = () => {
	var arr = ["source", "advChannel", "network", "model", "operatorOs", "deviceNo", "device", "version", "sdkVersion"];
	var linkParam = JSON.parse(localStorage.getItem("linkParam"));
	var params = {};
	arr.forEach(key =>
		params[key] = "0"
	);

	var source = getSource();

	if (source == 0) {
		params.source = 0;
		params.deviceNo = "IDFV";
		params.device = "IDFV";
	} else if (source == 1) {
		params.source = 1;
		params.deviceNo = "IMEI";
		params.device = "MAC#ANDRIDID";
	} else {
		params.source = 3;
	}
	params.network = 0;
	params.appId = server.appId;
	params.advChannel = linkParam.advChannel ? linkParam.advChannel : server.advChannel;

	return params;
}

//fb sdk 初始化
export const fbInit = () => {
	(function (d, s, id) {
		var js, fjs = d.getElementsByTagName(s)[0];
		if (d.getElementById(id)) return;
		js = d.createElement(s); js.id = id;
		js.src = "https://connect.facebook.net/en_US/sdk.js";
		fjs.parentNode.insertBefore(js, fjs);
	}(document, 'script', 'facebook-jssdk'));

	window.fbAsyncInit = function () {
		FB.init({
			appId: server.fbId,
			// appId      : '1170290033098881',
			cookie: true,  // enable cookies to allow the server to access
			// the session
			xfbml: true,  // parse social plugins on this page
			version: 'v2.8' // use graph api version 2.8
		});

		FB.getLoginStatus(function (response) {
			statusChangeCallback(response);
		});
	};
}

//登录
export const reqLogin = (username, password) => {
	var data = {
		appId: server.appId,
		userName: username,
		password: password,
	};
	data = Object.assign(deviceMsg(), data);
	data.sign = signed({
		appId: server.appId,
		userName: username,
		password: password,
		source: data.source
	});

	var url = api.ip + api.login;
	LoginRequest(url, data)
};

//注册 & fb 登录
export const reqRegister = (params) => {
	params.password = md5(params.password);
	var data = Object.assign(deviceMsg(), params);
	data.sign = signed({
		appId: server.appId,
		userName: params.userName,
		password: params.password,
		source: data.source
	})
	var url = api.ip + api.register;
	LoginRequest(url, data)
}

//fb sdk 调起登录插件
export const fbLogin = () => {
	// var response = '{"authResponse":{"accessToken":"EAAQDWTTZAVEIBAALSnOLqpehbtPDOZC0IiaA4cScu5IRRKNtaLOZB2J2G8jZA9WZBVUj0nNGAbDYhGHZAZADOiaG60vZCV4MJbJTIeZCqbR7SVFnAIaeUZAZC6YV1wfdwiG1d7fbzJLVoKXKGs9wvqnFsPKZC40LCYJlM7RukNoKXyU5fPS11N27hCG2OcjWfiN4dD97SP3ZAxgQfigZDZD","userID":"353436268389818","expiresIn":4152,"signedRequest":"Rn0oZXjNOXGGKTKdG54bUAtz_9W6CNKnvrHpKqc-4YA.eyJhbGdvcml0aG0iOiJITUFDLVNIQTI1NiIsImNvZGUiOiJBUUM1Z3hPLTVUTkpMSVNCSFhGOEN2dGNxaWJ6UXhhVVZoM1MyX3lGRGtRQURPVzFjTHFrZVBndXVMSkVhVHNleVVZX1NHTEtIb3FwTHpaa1VhV2RZNHZRdkJCNC1KOC14LUdFcDVST3E5REFFaWFaREhONDVTMVNaNmN5ZXFjZ0VvZ1ZFUjhJREFpbEpqdEFXZmM1WnRjVnp4dm16Q2lneU5nQ3d5OFVhRXlpdHBuT2lRaW9rZ3V2UnZNRkg2X2lvcXlJaXY1QmRCMkVEVFF2eUJrR3NuS1c0ajZIVmlPeUxXcWEtTENwazBEaEU4OEYyVXNMdnhZOHh5aHFFYm1kYU1jWmQ0MEY3NEZVaEJsenFKRlhnNUJoLWMtenhxbDFLRHBYTXp6MGJoanVYek43d0FBTGVaR1NIYkpoOWlERWpQTkVrMERSYnJmR0lTMlZLSG1ZUTVzaSIsImlzc3VlZF9hdCI6MTUyMTcyMzA0OCwidXNlcl9pZCI6IjM1MzQzNjI2ODM4OTgxOCJ9"},"status":"connected"}';
	// response = JSON.parse(response);
	if (window.location.href.indexOf("ch=AClient") > 0) {
		var random = Math.random() * 1000;
		var loginURL = "https://www.facebook.com/v2.6/dialog/oauth?client_id=" + server.fbId
			+ "&redirect_uri=" + encodeURIComponent(api.login_uri) + "&r=" + random;
		window.location.href = loginURL;
	} else {
		console.log()
		FB.login(function (response) {
			console.log(JSON.stringify(response));
			if (response.status === 'connected') {
				var userId = response.authResponse.userID;
				var params = {
					userName: 'fb-' + userId,
					password: "",
					appId: server.appId,
					accountType: 2,
					thirdPartyId: "",
					email: "",
					telephone: '',
					userChannel: 0,
					exInfo: JSON.stringify([{ "scopeId": "1459051407752747", "fbId": server.fbId }])
				};
				reqRegister(params);
			} else {
				salert("fb login fail");
			}
		});
	}
};

export const checkToken = (code) => {
	var url = api.token_uri + "?client_id=" + server.fbId + "&client_secret=" + server.fbSecret + "&redirect_uri=" + api.login_uri + "&code=" + code;
	HTTPGet(url).then((res) => {
		if (res.access_token) {
			var me = "https://graph.facebook.com/me?access_token=" + res.access_token;
			HTTPGet(me).then(response => {
				if (response.id) {
					var userId = response.id;
					var params = {
						userName: 'fb-' + userId,
						password: "",
						appId: server.appId,
						accountType: 2,
						thirdPartyId: "",
						email: "",
						telephone: '',
						userChannel: 0,
						exInfo: JSON.stringify([{ "scopeId": "1459051407752747", "fbId": server.fbId }])
					};
					reqRegister(params);
				} else {
					salert("fb login fail");
				}
			})
		} else {
			salert("fb login fail");
		}
	})
};

export const getUserName = (accessToken) => {
	var url = "https://graph.facebook.com/me?access_token=" + accessToken;
	fetch(url, {
		method: 'GET',
		headers: {
			'Accept': 'application/json, text/javascript, */*; q=0.01',
			'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
		},
		mode: 'cors',
		credentials: 'credentials',
		cache: 'default'
	}).then((resp) => {
		try {
			return resp.json();
		} catch (err) { }
		return resp.text();
	}).then((data) => {
		console.log(data);
	}).catch((err) => {
		console.log(err);
	});
};

/**
 * 登录部分请求函数
 * url 请求链接
 * params 请求参数
 * */
export const LoginRequest = (url, params) => {
	HTTPUtil(url, params).then((res) => {
		// res = '{"data":{"emailValid":1,"email":"Qiong@9266.com","userId":25086659,"accountType":1,"firstLogin":0,"userName":"Qiong@9266.com","userType":1},"token":"e802994c26bc4308aa343dd66b09b7d9","firstLogin":false,"code":200,"error_msg":""}';
		// res = '{"data":{"emailValid":0,"userId":1000001025,"accountType":0,"firstLogin":1,"userName":"9815813738","userType":0},"token":"5eddb542397648619b7a2f0669a568cc","firstLogin":false,"code":200,"error_msg":""}';
		// res = JSON.parse(res);
		// console.log(res);
		if (res.code == 200) {
			var data = {
				accountType: res.data.accountType,
				userId: res.data.userId,
				userName: res.data.userName,
				userType: res.data.userType,
				password: params.password,
				token: res.token,
				activeTime: new Date().getTime()
			};
			store.dispatch(insertAccount(data));
			hashHistory.push('/login/loading');
			return true;
		} else {
			hashHistory.push('/login/account');
			if (res.code == 102) {
				salert("Người dùng không tồn tại hoặc mật khẩu sa");
			} else if (res.code == 101) {
				salert("Tên người dùng đã tồn tại")
			} else {
				salert("request fail");
				return false;
			}
		}
	})
};

//绑定区服
export const bindZone = (params) => {
	var url = api.ip + api.bindZone;
	var data = Object.assign(params, deviceMsg());
	var signParams = {
		userId: params.userId,
		appId: server.appId,
		gameZoneId: params.gameZoneId,
		source: params.source
	};

	data.sign = signed(signParams);
	HTTPUtil(url, data).then((res) => {
		console.log(res);
	});
}


//自动登录
export const AutoLogin = (account) => {
	switch (account.accountType) {
		case 0:
			reqLogin(account.userName, account.password);
			break;
		case 1:
			reqLogin(account.userName, account.password);
			break;
		case 2:
			var params = {
				userName: account.userName,
				password: "",
				appId: server.appId,
				accountType: 2,
				thirdPartyId: "",
				email: "",
				telephone: '',
				userChannel: 0,
				exInfo: JSON.stringify([{ "scopeId": "1459051407752747", "fbId": server.fbId }])
			};
			reqRegister(params);
			break;
		default:
			break;
	}
}

let paytype;

/***
 * 获取支付方式
 * */
export const getPay = () => {
	var params = store.getState().order;
	params.appId = server.appId;
	var data = Object.assign(deviceMsg(), params);
	data.sign = signed({
		appId: server.appId,
		advChannel: data.advChannel,
		userId: data.userId,
		gameCoin: data.gameCoin,
		level: data.level,
		source: data.source,
		network: data.network
	});

	var url = api.ip + api.getPay;
	paytype = params.gameCoin;
	return HTTPUtil(url, data);
}

/**
 * 游戏那边获取订单id
 * 下单
 * */
export const loadPay = (params) => {
	var order = store.getState().order;
	var time = new Date();
	var params = {
		appId: server.appId,
		channel: params.channel,
		code: params.code,
		amount: params.selectedProduct.amount,
		currency: params.selectedProduct.currency,
		productName: params.selectedProduct.productName,
		itemType: params.selectedProduct.itemType,
		isOfficial: params.isOfficial,
		clientTime: time.format("yyyy-MM-dd hh:mm:ss"),
		exInfo: params.exInfo ? params.exInfo : "0"
	};

	var data = Object.assign(order, deviceMsg(), params);

	var url = api.ip + api.loadPay;

	data.sign = signed({
		appId: server.appId,
		advChannel: data.advChannel,
		userId: data.userId,
		roleId: data.roleId,
		gameOrderId: data.gameOrderId,
		gameZoneId: data.gameZoneId,
		code: data.code,
		source: data.source,
		channel: data.channel,
		amount: data.amount,
		currency: data.currency,
		productName: data.productName,
		exInfo: data.exInfo
	})


	return HTTPUtil(url, data);
}

Date.prototype.format = function (fmt) { // author: meizz
	var o = {
		"M+": this.getMonth() + 1, //月份
		"d+": this.getDate(), //日
		"h+": this.getHours(), //小时
		"m+": this.getMinutes(), //分
		"s+": this.getSeconds(), //秒
		"q+": Math.floor((this.getMonth() + 3) / 3), //季度
		"S": this.getMilliseconds() //毫秒
	};
	if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
	for (var k in o)
		if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
	return fmt;
}

export const login = () => {
};

export const login2 = () => {
	// if(store.getState().accounts.length > 0){
	//     var links = window.location.href;
	//     if(links.indexOf("type=change")>0){
	//         hashHistory.push('/login/choose');
	//     }else{
	//         hashHistory.push('/login/loading');
	//     }
	// }else{
	//     hashHistory.push('/login/main');
	// }
	let links = window.location.href;
	if (links.indexOf("/login") < 0) {
		hashHistory.push('/login');
	}
}


export const pay = (params) => {
	store.dispatch(initOrder(params));
	var html = document.documentElement;
	if (html.clientWidth < 750 && html.clientHeight > 375) {
		hashHistory.push('/payment');
	} else {
		hashHistory.push('/pay');
	}
}

export const Logout = () => {
	// store.dispatch(logout());
	let msg = "Xác nhận thoát? (Lưu game vào nút màn hình để tiện cho lần sau đăng nhập)";
	salert(msg);
}

export const salert = (msg) => {
	store.dispatch(showAlert(msg));
}


//屏幕适应
export const winResize = function () {
	var evt = "onorientationchange" in window ? "orientationchange" : "resize";
	window.addEventListener(evt, resizefn, false);//添加屏幕旋转事件
};

export const resizefn = function () {
	var html = document.documentElement;
	var k = 750; //设计稿宽度
	if (html.clientWidth < 750) {
		html.style.fontSize = html.clientWidth / k * 100 + "px";
	} else {
		html.style.fontSize = "100px";
	}
};

//更改密码
export const changePass = (oldpass, newpass) => {
	var data = {
		userId: store.getState().user.userId,
		appId: server.appId,
		password: oldpass,
		newPassword: newpass
	};
	data.sign = signed({
		appId: data.appId,
		userId: data.userId,
		password: data.password,
		newPassword: data.newPassword
	});

	var url = api.ip + api.changePass;
	return HTTPUtil(url, data);
}

/**
 * 分享
 * */
export const share = () => {
	(function (d, s, id) {
		var js, fjs = d.getElementsByTagName(s)[0];
		if (d.getElementById(id)) return;
		js = d.createElement(s); js.id = id;
		js.src = "https://connect.facebook.net/en_US/sdk.js";
		fjs.parentNode.insertBefore(js, fjs);
	}(document, 'script', 'facebook-jssdk'));

	window.fbAsyncInit = function () {
		FB.init({
			appId: server.fbId,
			// appId      : '1170290033098881',
			cookie: true,  // enable cookies to allow the server to access
			// the session
			xfbml: true,  // parse social plugins on this page
			version: 'v2.8' // use graph api version 2.8
		});
	};
	/*分享 start*/
	FB.ui({
		method: 'feed',
		link: api.share_uri,
	}, function (response) {
		if (response) {
			window.postMessage({ type: "ogCompleted", storyId: 9999 }, '*');
		}
	});
}

/**
 * 跳转到messenger
 * */
export const messager = () => {
	window.postMessage({ type: "callBackGM", result: true }, '*');
	if (window.location.href.indexOf("ch=AClient") > 0) {
		window.open("https://www.facebook.com/DocBoGiangHo/");
	} else {
		window.open("https://m.me/DocBoGiangHo");
	}
}


/**
 * 跳转到fb
 * */
export const fb = () => {
	var source = getSource();
	if (source == 0 || source == 1) {
		var useragent = navigator.userAgent; // cache the userAgent info
		var iPhone = (useragent.match(/(iPad|iPhone|iPod)/g));
		var scheme;
		if (iPhone)
			scheme = "fb://page/?id=350841588735718";
		else
			scheme = "fb://page/350841588735718";

		uriSchemeWithHyperlinkFallback(scheme, "https://www.facebook.com/DocBoGiangHo/");
	} else {
		window.open("https://www.facebook.com/DocBoGiangHo/");
	}

}

function uriSchemeWithHyperlinkFallback(uri, href) {
	if (!window.open(uri)) {
		window.location = href;
	}
}

/***
 * 获取用户信息
 * */
export const getUserInfo = () => {
	if (store.getState().user)
		return store.getState().user;
	return {}
}


/**
 * 打点
 * **/
export const point = (name) => {
	// if(window.location.href.indexOf("ch=AClient")>0 && window.location.href.indexOf("advChannel")>0){
	setPoint(name);
	// }else{
	// 	window.top.postMessage({type: "gaPoint", point: name }, '*');
	// }
};

/**
 * 获取用户订单列表
 * */
export const orderList = () => {
	var url = api.ip + api.orderList;
	var data = {
		appId: server.appId,
		userId: store.getState().user.userId,
		lastTime: 1525771365401
	}
	data.sign = signed({
		appId: data.appId,
		userId: data.userId
	});

	return HTTPGet(url, data);
};

window.SDK = {
	Login: login,
	Login2: login2,
	Pay: pay,
	BindZone: bindZone,
	Logout: Logout,
	FbInit: fbInit,
	Share: share,
	Messager: messager,
	Fb: fb,
	GetUserInfo: getUserInfo,
	Point: point,
	Order: orderList
}

export const setHeader = () => {

};

setHeader();

export const payPoint = () => {
	point(paytype);
}

export const setUser = (id) => {
	console.log(id);
}

fbInit();

//添加头部
var link = document.createElement("link");
link.rel = "apple-touch-icon";
link.href = "//sdk-android-vndbjh.bilivfun.com/h5sdk/dbjh/img/icon.png";
var head = document.getElementsByTagName("head")[0];
head.appendChild(link);

export const getSource = () => {
	var browser = {
		versions: function () {
			var u = navigator.userAgent;
			return {
				ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/),
				iPhone: u.indexOf('iPhone') > -1 || u.indexOf('Mac') > -1,
				iPad: u.indexOf('iPad') > -1,
				android: u.indexOf('Android') > -1
			};
		}(),
	};

	if (browser.versions.ios || browser.versions.iPhone || browser.versions.iPad) {
		return 0;
	} else if (browser.versions.android) {
		return 1;
	} else {
		return 3;
	}
}

//添加头部
var link = document.createElement("script");
var head = document.getElementsByTagName("head")[0];
if (window.location.href.indexOf("ch=AClient") > 0) {
	var flag0 = window.location.href.indexOf("advChannel=0") > 0;
	// var flag1 = window.location.href.indexOf("advChannel=1")>0;
	if (flag0) {
		link.src = "https://www.googletagmanager.com/gtag/js?id=UA-117997360-2";
	} else {
		link.src = "https://www.googletagmanager.com/gtag/js?id=UA-117997360-3";
	}
	head.appendChild(link);
	setTimeout(function () {
		window.dataLayer = window.dataLayer || [];
		function gtag() { dataLayer.push(arguments); }
		window.gtag = gtag;
		gtag('js', new Date());

		if (flag0) {
			gtag('config', 'UA-117997360-2');
		} else {
			gtag('config', 'UA-117997360-3');
		}
	}, 200);
} else {
	!function (f, b, e, v, n, t, s) {
		if (f.fbq) return; n = f.fbq = function () {
			n.callMethod ?
			n.callMethod.apply(n, arguments) : n.queue.push(arguments)
		};
		if (!f._fbq) f._fbq = n; n.push = n; n.loaded = !0; n.version = '2.0';
		n.queue = []; t = b.createElement(e); t.async = !0;
		t.src = v; s = b.getElementsByTagName(e)[0];
		s.parentNode.insertBefore(t, s)
	}(window, document, 'script',
		'https://connect.facebook.net/en_US/fbevents.js');
	fbq('init', '1490773921035020');
	fbq('track', 'PageView');
	window.fbq = fbq;

	link.src = "https://www.googletagmanager.com/gtag/js?id=UA-117997360-1";
	var head = document.getElementsByTagName("head")[0];
	head.appendChild(link);
	setTimeout(function () {
		window.dataLayer = window.dataLayer || [];
		function gtag() { dataLayer.push(arguments); }
		window.gtag = gtag;
		gtag('js', new Date());

		gtag('config', 'UA-117997360-1');
	}, 200);
}

export const setPoint = (name) => {
	switch (name) {
		case "create-role":
			gtag('event', 'create_role', {
				'event_category': 'engagement',
				'event_label': 'create_role'
			});
			if (typeof (fbq) != "undefined") fbq('track', 'CompleteRegistration');
			break;
		case "task-4":
			gtag('event', 'task', {
				'event_category': 'engagement',
				'event_label': 'task_4'
			});
			if (typeof (fbq) != "undefined") fbq('track', 'Search');
			break;
		case "auto-task":
			gtag('event', 'task', {
				'event_category': 'engagement',
				'event_label': 'Martial'
			});
			if (typeof (fbq) != "undefined") fbq('track', 'Lead');
			break;
		case "loginreward-2":
			gtag('event', 'get', {
				'event_category': 'gift',
				'event_label': 'loginreward_2'
			});
			if (typeof (fbq) != "undefined") fbq('track', 'AddToWishlist');
			break;
		case "first-purchase":
			gtag('event', 'purchase', {
				'event_category': 'ecommerce',
				'event_label': 'first_purchase'
			});
			if (typeof (fbq) != "undefined") fbq('track', 'Purchase', {
				value: 1,
				currency: 'USD',
			});
			break;
		case 50:
			gtag('event', 'purchase', {
				'event_category': 'ecommerce',
				'event_label': 'original_10k'
			});
			if (typeof (fbq) != "undefined") fbq('track', 'AddPaymentInfo');
			break;
		case 100:
			gtag('event', 'purchase', {
				'event_category': 'ecommerce',
				'event_label': 'original_20k'
			});
			if (typeof (fbq) != "undefined") fbq('track', 'AddToCart');
			break;
		case 150:
			gtag('event', 'purchase', {
				'event_category': 'ecommerce',
				'event_label': 'original_30k',
				'value': 1.32
			});
			break;
		case 250:
			gtag('event', 'purchase', {
				'event_category': 'ecommerce',
				'event_label': 'original_50k'
			});
			break;
		case 500:
			gtag('event', 'purchase', {
				'event_category': 'ecommerce',
				'event_label': 'original_100k'
			});
			if (typeof (fbq) != "undefined") fbq('track', 'InitiateCheckout');
			break;
		case 1000:
			gtag('event', 'purchase', {
				'event_category': 'ecommerce',
				'event_label': 'original_200k'
			});
			break;
		case 1500:
			gtag('event', 'purchase', {
				'event_category': 'ecommerce',
				'event_label': 'original_300k'
			});
			break;
		case 2500:
			gtag('event', 'purchase', {
				'event_category': 'ecommerce',
				'event_label': 'original_500k'
			});
			break;
		case 5000:
			gtag('event', 'purchase', {
				'event_category': 'ecommerce',
				'event_label': 'original_1000k'
			});
			if (typeof (fbq) != "undefined") fbq('track', 'ViewContent');
			break;
		case 10000:
			gtag('event', 'purchase', {
				'event_category': 'ecommerce',
				'event_label': 'original_2000k'
			});
			break;
		case 25000:
			gtag('event', 'purchase', {
				'event_category': 'ecommerce',
				'event_label': 'original_5000k'
			});
			break;
		default:
			break;
	}
}

