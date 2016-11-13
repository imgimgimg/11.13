	var app = angular.module("app1", ['ui.router']);
	//添加路由
	app.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {
		$stateProvider.state('index', {
			url: '/index',
			templateUrl: 'views/index.html',
			controller:'indexctr'
			
		})
		.state('detail', {
			url: '/detail/:id',
			templateUrl: 'views/detail.html',
				controller:'detailctr'
		})
		.state('index.zhong', {
			url: '/zhong',
			templateUrl: 'views/zhong.html',
				controller:'zhongctr'
		})
		.state('index.b', {
			url: '/b',
			templateUrl: 'views/indexB.html',
			controller:"bctr"
		})
		.state('index.c', {
			url: '/c',
			templateUrl: 'views/indexC.html',
			controller:"ctrc"
		})
		
		//ui-route的默认路由
		$urlRouterProvider.when('', '/index')
		
		
		
	}])
	//$state获取路由上面的哈希值
	app.controller('detailctr', function($scope, $state, $http) {
			//$state获取url上的哈希值 $routeParams
			$scope.name = 'home';
			console.log($state.params.id)
			$http.jsonp('news.php', {
				params: {
					callback: 'JSON_CALLBACK',
					page: 1
				}
				
			}).success(function(data) {
				console.log(data.showapi_res_body.pagebean.contentlist[$state.params.id])
				$scope.new = data.showapi_res_body.pagebean.contentlist[$state.params.id];
		
				})
			})
	app.controller('indexctr', function($scope) {
	
	});
	
	
	app.controller('zhongctr', function($scope,$http,$rootScope) {
		
			$scope.loading = true;
			$rootScope.tab = 1;
			//默认第一页
			$scope.offset = 1;
			//定义一个空数组存放的是列表显示的新闻
			$scope.arrs = [];
			var getNews = function() {
				$http.jsonp('news.php', {
					params: {
						callback: 'JSON_CALLBACK',
						page: $scope.offset
					}
				}).success(function(data) {
					$scope.loading = false;
					console.log(data);
					//每次我们加载下一页的数据的时候我们就往arrs合并
					$scope.arrs = $scope.arrs.concat(data.showapi_res_body.pagebean.contentlist);
					$scope.news = $scope.arrs;
				})
			}
			//进来的时候先加载数据一次
			getNews();
			$scope.loadMore = function() {
				//每点击加载更多前，出现loading
				$scope.loading = true;
				//每点击一次的时候，请求下一页
				$scope.offset++;
				console.log("加载更多");
				getNews();
			}
		})
	
	
	app.controller('bctr', function($scope, $state, $http) {
		//定义一个空的数组
		$scope.arr2 = [];
			$http.jsonp('news.php', {
				params: {
					callback: 'JSON_CALLBACK',
					page: 1
				}
				
			}).success(function(data) {
				
			$scope.arr2 = $scope.arr2.concat(data.showapi_res_body.pagebean.contentlist);
			$scope.news = $scope.arr2;	
		
		
				})
	});
	
	app.controller('ctrc',function($scope, $state,$http, $rootScope){
		$rootScope.tab = 3;
		console.log($state.params.id)
			$http.jsonp('news.php', {
				params: {
					callback: 'JSON_CALLBACK',
					page: 1
				}
			}).success(function(data) {
				console.log(data.showapi_res_body.pagebean.contentlist[$state.params.id])
				$scope.new = data.showapi_res_body.pagebean.contentlist[$state.params.id];
			})
	})
	
	//添加组件
	app.directive('weuiTab', function() {
			return {
				templateUrl: 'directives/weuiTab.html'
			}
		})
	
	//app.directive("xhead", function() {
	//	return {
	//		templateUrl: "directive/head.html",
	//		link: function(scope, ele, attr) {
	//			ele.css('color', 'red')
	//		}
	//	}
	//})
	//app.directive("end", function() {
	//	return {
	//		templateUrl: "directive/end.html"
	//	}
	//})
