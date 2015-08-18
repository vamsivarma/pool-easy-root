app.controller('PoolOwnerCtrl', ['$scope', '$rootScope', '$location', '$http',  function($scope, $rootScope, $location, $http) {

	$scope.newVehicle = {
		"ownerName": $rootScope.userDetails.displayname,
		"Vehicletype": "1",
		"vehicleNumber": "AP 9  1234",
		"Noofvacantseats": 1,
		"Location": "Madhapur",
		"poolTime": "1",
        "Begintime": null,
        "Endtime": null,
        "Details": "null"
	};

	var timeDiff = [300, 15*60, 30*60, 60*60];

	$scope.addVechicleInfo = function() {

		console.log($scope.newVehicle.ownerName);
        
        console.log($scope.newVehicle.startTime);
		
        $scope.parseVehicleTimeInfo();

       	var paramsObj = {
       				"operation": "add",
       				"data": $scope.newVehicle
       	};

		$.ajax({
			url: "services2.php",
			dataType: 'json',
			type: 'POST',
			data: {data:JSON.stringify(paramsObj)},
			success:function(result){
					var errorRes = result;
					if(errorRes.errorCode==0)
						bootbox.alert("Your vehicle details are saved.", function () {
  		            		location.replace("/vehiclepool");
						});
					else
						bootbox.alert(errorRes.errorMsg,function(){
							location.replace("/vehiclepool");
						});
			},
			error: function(result) {
				 bootbox.alert("There is some error");	
			}
		});
	};

	$scope.vechTypeChange = function(){
		
		if($scope.newVehicle.Vehicletype == 1)
			$("#Noofvacantseats").attr('max','1');
		else if($scope.newVehicle.Vehicletype == 2)
			$("#Noofvacantseats").attr('max','8');

		if($scope.newVehicle.Noofvacantseats > Number($("#Noofvacantseats").attr('max')))
		{
			$scope.newVehicle.Noofvacantseats = Number($("#Noofvacantseats").attr('max'));
		}

	};

	$scope.vechTypeChange();

	$scope.parseVehicleTimeInfo = function() {

		if($scope.newVehicle.poolTime != "4") {
			$scope.newVehicle.Begintime = Math.floor(new Date().getTime() / 1000);
			$scope.newVehicle.Endtime = $scope.newVehicle.Begintime + timeDiff[$scope.newVehicle.poolTime];
		} else {
			var today = new Date();
			var dd = today.getDate();
			var mm = today.getMonth(); //January is 0!
			var yyyy = today.getFullYear();
			var fulldate=new Date(yyyy,mm,dd,0,0,0,0);
			$scope.newVehicle.Begintime = Math.floor(fulldate.getTime()/1000+5*60*60+30*60+($scope.newVehicle.Begintime).getTime()/ 1000);
			$scope.newVehicle.Endtime = Math.floor(fulldate.getTime()/1000+5*60*60+30*60+($scope.newVehicle.Endtime).getTime() / 1000);
		}
	};

}]);