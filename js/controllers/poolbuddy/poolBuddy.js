app.controller('PoolBuddyCtrl', ['$scope', '$location', function($scope, $location) {
    
     var poolActions =  {
        'click .notifyOwner': function (e, value, row, index) {
            
            bootbox.dialog({
              message: "<textarea rows='10' style='width:100%; max-width:100%' id='customMailBody' placeholder='Please enter personal note here..'></textarea>",
              title: "We will send a notification mail on your behalf. You can add a personal note.",
              buttons: {
                success: {
                  label: "Notify Owner",
                  className: "btn-success",
                  callback: function() {

                    var notifyOwner = {
                        "operation": "notify",
                        "data": {
                            "ownerid": Number(row.uid),
                            "msg": $("#customMailBody").html()
                        }
                    }

                    $.ajax({
                        url: "services2.php",
                        dataType: 'json',
                        type: 'POST',
                        data: {data:JSON.stringify(notifyOwner)},
                        success:function(result){
                                var errorRes = result;
					           if(errorRes.errorCode == 0) {
						          bootbox.alert("Your request has been sent to the pooler", function () {
  		            		          location.replace("/vehiclepool");
						          });
                               } else {
                                   bootbox.alert(errorRes.errorMsg,function(){
							             location.replace("/vehiclepool");
						          }); 
                               }
                        },
                        error: function(result){
                            bootbox.alert("There is some error");
                        }
                    });

                  }
                },
                danger: {
                  label: "Cancel",
                  className: "btn-danger"
                }
              }
            });
        },
        'click .chatWithOwner': function (e, value, row, index) {
            //window.open("sip:" + row.username  + "@commvault.com");
            $("#myPoolOwnerAnchor")[0].href =  "sip:" + row.emailaddress;
            $("#myPoolOwnerAnchor")[0].click();
        }
    };
    
    $scope.initBootstrapTable = function() {
        
        $('#poolOwnersTable').bootstrapTable({
            columns: 
                [{
                    field: 'displayname',
                    title: 'Pooler',
                    align: 'center',
                    valign: 'middle'
                }, {
                    field: 'vehicletype',
                    title: 'Vehicle Type',
                    align: 'center',
                    valign: 'middle'
                }, {
                    field: 'location',
                    title: 'Location',
                    align: 'center',
                    valign: 'middle'
                }, {
                    field: 'noofvacantseats',
                    title: 'No of seats left',
                    align: 'center',
                    valign: 'middle'
                }, {
                    field: 'begintime',
                    title: 'Start Time',
                    align: 'center'
                }, {
                    field: 'endtime',
                    title: 'End Time',
                    align: 'center'
                }, {
                    field: 'actions',
                    title: 'Actions',
                    align: 'center',
                    valign: 'middle',
                    events: poolActions,
                    formatter: actionFormatter
                }],
            data: $scope.poolOwnersModel,
            search: true,
            refresh: true,
            showColumns: true
        });
    };
    
    
    
    
    function actionFormatter() {
        return [
            '<button class="notifyOwner" href="javascript:void(0)" title="Notify Vehicle Owner">',
            '<i class="glyphicon glyphicon-envelope"></i>',
            '</button>',
            '<button class="chatWithOwner" href="javascript:void(0)" title="Chat with Vehicle Owner">',
            '<i class="glyphicon glyphicon-pencil">',
            '</i>',
            '</button>'
        ].join('');
        
    
    };
    
    $scope.getPoolOwners = function() {
        
        var paramsObj = {
            "operation": "fetchowners"
        };

        $.ajax({
			url: "services2.php",
			dataType: 'json',
			type: 'POST',
			data: {data:JSON.stringify(paramsObj)},
			success:function(result) {
                $scope.poolOwnersModel = result.output;
                $scope.parsePoolOwnersModel();
                
                $scope.initBootstrapTable();
                
			}
		});
    };
    
    $scope.getPoolOwners();
    
    $scope.parsePoolOwnersModel = function() {
        //Sample Pool Owner Data Object
        
        for(pooler in $scope.poolOwnersModel) {
        
            var d = new Date($scope.poolOwnersModel[pooler].begintime*1000);
            var hh = d.getHours();
            var mm = d.getMinutes();
            var ap=(hh>=12?"PM":"AM");
            hh=(hh>12?hh-12:hh);
            hh=(hh<10?"0":"")+hh;
            mm=(mm<10?"0":"")+mm;
            $scope.poolOwnersModel[pooler].begintime =hh+":"+mm+" "+ap;
        
            d = new Date($scope.poolOwnersModel[pooler].endtime*1000);
            hh = d.getHours();
            mm = d.getMinutes();
            ap = (hh>=12?"PM":"AM");
            hh = (hh>12?hh-12:hh);
            hh = (hh<10?"0":"")+hh;
            mm = (mm<10?"0":"")+mm;
            $scope.poolOwnersModel[pooler].endtime = hh+":"+mm+" "+ap;

            $scope.poolOwnersModel[pooler].vehicletype = $scope.poolOwnersModel[pooler].vehicletype==1?"Bike":"Car";
        }
        
    
    
    };
    
}]);
