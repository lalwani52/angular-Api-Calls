var app = angular.module('loginApp',['ngRoute','ngStorage']);

app.config(function($routeProvider){
	$routeProvider
	.when('/',{
		templateUrl: 'login.html',
		controller: 'loginCtrl'
	})
	.when('/welcome',{
		
		templateUrl: 'ListApiCall.html',
		controller: 'listEmp'
	})

	.when('/detail/:param1',{
		templateUrl: 'DetailApiCall.html',
		controller: 'EMPdets',
		
	})
	.otherwise({
		redirectTo: '/'
	});
});

var users = ["admin1", "admin2", "admin3", "admin4"];
var passwords = ["pass1", "pass2", "pass3", "pass4"];
app.controller('loginCtrl', function($scope,$location,$rootScope,$sessionStorage){
	 

	$scope.submit = function() {
		
	var user = $scope.username;
	var pass = $scope.password;
	for(var i=0;i<users.length;i++){
	if(user==users[i] && pass==passwords[i]){

		$sessionStorage.SessionMessage = user;
		
		$location.path('/welcome');
		
		}
	else 
	{ 
	document.getElementById("invalidcreds").innerHTML = "Invalid Credentials";
		}
	}	
	
	};
});


app.controller('listEmp',function($scope,$location,$routeParams,HttpService,$sessionStorage){
$scope.userN = $sessionStorage.SessionMessage;
HttpService.getPost()
    .then(function(response) {
    $scope.post = response;
	 
  });

  $scope.third = function(pos) {
	  $location.path('/detail/'+pos.id);
  }

	
});	
app.controller('EMPdets',function($scope,$location,HttpService2,$routeParams){

	$scope.user={};
	HttpService2.getUsers($routeParams.param1)
	.then(function(response) {
	   
	  $scope.user = response;
  
    });

});


app.service('HttpService', function($http) {
  return {
    getPost: function() {
		var itm = 3;
      // $http returns a promise, which has a then function, which also returns a promise.
      return $http.get('http://192.168.0.74:4000/employee/get')
       .then(function (response) {
       // In the response, resp.data contains the result. Check the console to see all of the data returned.
       console.log('Get Post', response);
       return response.data;
	   
      });
    }
  };
});


app.service('HttpService2', function($http) {
  return {
	getUsers: function(param) {
		
	
      // $http returns a promise, which has a then function, which also returns a promise.
      return $http.get('http://192.168.0.74:4000/employee/'+param)
        .then(function(response) {
        // In the response, resp.data contains the result. Check the console to see all of the data returned.
        console.log('Get Users', response);
        return response.data;
      });
    }
  }
});