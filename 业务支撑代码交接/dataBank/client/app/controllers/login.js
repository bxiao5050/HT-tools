/**
 * Created by xiaoyi on 2015/8/6.
 */
app.controller('loginController', ['$rootScope', '$scope', '$http', '$timeout', '$q', '$state', '$access', function ($rootScope, $scope, $http, $timeout, $q, $state, $access) {
	/**
	 * @desc:回车切换焦点
	 */
	$("#username,#pwd").bind("keydown", function (event) {
		var $this = $(this);
		if (event.keyCode == 13) {
			if ($this.attr("id") == 'username') {
				$("#pwd").focus();
			} else {
				if ($("#pwd").val()) {
					//$("#sendBtn").focus();
					$scope.login();
				}
			}
		}
	});
	$scope.login = function () {
		localStorage.clear();
		sessionStorage.clear();
		var username = $scope.username;
		var pwd = $scope.password;
		if (username && pwd) {
			$http({
				method: 'GET',
				url: 'user/login',
				params: {
					username: username,
					password: pwd
				}
			}).
			success(function (data, status, headers, config) {
				if (data.code == 0) {
					var sysGameInfo = data.result;
					if (sysGameInfo.length <= 0) {
						alert("未获取到系统信息!");
					} else {
						$access.setSystems(sysGameInfo);
						var sys_id = sysGameInfo[0].system_id;
						if (sysGameInfo[0].flag) {
							if (sysGameInfo[0].systemGames.length <= 0) {
								alert("未获取到游戏信息!");
							} else {
								var game_id = sysGameInfo[0].systemGames[0].game_id;
								getLoginInfoBySysGame(sys_id, game_id);
							}
						} else {
							getLoginInfoBySys(sys_id);
						}
					}
				} else {
					alert(data.msg);
				}

			}).
			error(function (data, status, headers, config) {});


		} else {
			alert('请输入用户名或者密码');
		}
	}

	function getLoginInfoBySysGame(sys_id, game_id) {
		$http({
			method: 'GET',
			url: 'user/system/game/perm',
			params: {
				system_id: sys_id,
				game_id: game_id
			}
		}).
		success(function (data, status, headers, config) {
			if (data.code == 0) {
				console.log('systemGame');
				$access.setSysAccess(data.result);
				//$access.setMenus(data.result.menus);
				//$access.setAdRoad(data.result.adRoad);
				goMenu(data.result.menus);
			} else {
				alert(data.msg);
			}

		}).
		error(function (data, status, headers, config) {});
	}

	function getLoginInfoBySys(sys_id) {
		$http({
			method: 'GET',
			url: 'user/system/perm',
			params: {
				system_id: sys_id
			}
		}).
		success(function (data, status, headers, config) {
			if (data.code == 0) {
				console.log('system');
				console.log(data.result);
				$access.setGameAccess(data.result);
				goMenu(data.result.menus);
			} else {
				alert(data.msg);
			}

		}).
		error(function (data, status, headers, config) {});
	}

	function goMenu(menus) {
		if (!menus || menus.length <= 0) {
			alert("未获取到菜单权限!");
			return;
		}
		var defaultMenuUrl = '';
		outerLoop: //命名外圈循环语句
			for (var i = 0; i < menus.length; i++) {
				var temp = menus[i];
				if (temp.menu_url) {
					defaultMenuUrl = temp.menu_url;
					break outerLoop;
				}
				if (temp.children)
					for (var j = 0; j < temp.children.length; j++) {
						var temp2 = temp.children[j];
						if (temp2.menu_url) {
							defaultMenuUrl = temp2.menu_url;
							break outerLoop;
						}
						if (temp2.children)
							for (var k = 0; k < temp2.children.length; k++) {
								var temp3 = temp2.children[k];
								if (temp3.menu_url) {
									defaultMenuUrl = temp3.menu_url;
									break outerLoop;
								}
							}
					}
			}

		$.cookie("userName", $scope.username);

		$state.go(defaultMenuUrl);
	}
}]);