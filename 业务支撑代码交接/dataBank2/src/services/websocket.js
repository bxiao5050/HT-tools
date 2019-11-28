let origin = window.location.origin.split(':')
let requrl = 'http://121.10.140.56'
// IS_PROD ? (origin[0] + ':' + origin[1]) : 'http://121.10.140.56' // 'http://172.16.1.171' // 服务端地址
const port = 8111 // 服务端端口号
const baseUrl = requrl + ':' + port
export default {
	initConnect() {
		//判断当前浏览器是否支持WebSocket
		if ('WebSocket' in window) {
			var SockJS = require('sockjs-client');
			var Stomp = require('stompjs');
			var socket = new SockJS(baseUrl + '/message');
			var stompClient = Stomp.over(socket);
			stompClient.connect({}, function (frame) {
				console.log('Connected: ' + frame);
				stompClient.subscribe('/topic/info', function (greeting) {
					console.log(greeting);
				});
				stompClient.subscribe('/user/info', function (greeting) {
					console.log(greeting);
				});
			});
			function subscribe(url) {
				stompClient.subscribe(url, function (greeting) {
					console.log(greeting);
				});
			}
			function disconnect() {
				if (stompClient != null) {
					stompClient.disconnect();
				}
				console.log("Disconnected");
			}
		} else {
			alert('Not support websocket');
		}
	},
	sendMessage(url, value) {
		stompClient.send(url, {}, value);
	}
};