app.controller('DefaultCtrl', ['$scope', '$http', '$rootScope', function($scope, $http, $rootScope) {
    
  	$rootScope.userDetails = null;
  	$scope.displayname = "";

  	var paramsObj = {
		"operation": "getUser",
   	};


	$.ajax({
		url: "services2.php",
		dataType: 'json',
		async: false,
		type: 'POST',
		data: {data:JSON.stringify(paramsObj)},
		success:function(result){
			$rootScope.userDetails = result.output;
			$scope.displayname = result.output.displayname;
		}
	});
	
}]);
