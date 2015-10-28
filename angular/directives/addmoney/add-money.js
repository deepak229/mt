// //angular.module('mt', ['ngAnimate', 'ui.bootstrap']);
angular.module('mt').directive('addMoney',['AccountFactory','$uibModal', function(AccountFactory,$uibModal){
	return {
		//templateUrl: '/angular/directives/addmoney/add-money.html',
		restrict: 'E',
		scope:{
			toAccount: "=toAccount"
		},
		link:function($scope,element,attrs, filter){
			var modalInstance = $uibModal.open({
				animation: true,
				templateUrl: '/angular/directives/addmoney/add-money.html',
				controller: 'AddMoneyController',
				size: 'sm',
				resolve: {
					toAccount: function () {
						return $scope.toAccount;
					}
				}
			});
			modalInstance.result.then(function (selectedItem) {
				$scope.selected = selectedItem;
			}, function () {
			});
		}
	}
}]);

angular.module('mt').controller("AddMoneyController",['$scope','AccountFactory','$uibModalInstance','mtAPI', 'toAccount', function($scope,AccountFactory,$uibModalInstance, api, toAccount){
	$scope.accounts = null;
	$scope.exchangerate = null;
	$scope.addMoneyFailed = false;
	
	$scope.preDefinedToAccount = toAccount;

	api.getRequest("/exchangerate/1/USD/INR").then(function(response){
		
		if(response && response.Rate != null){
			$scope.exchangerate=parseFloat(response.Rate);
		}
	});
	$scope.money = {
		fromAccount:null,
		toAccount:null,
		dollars:null,
		rupees:null
	};

	if(toAccount != null){
		$scope.money.toAccount = toAccount.id;
	}



	$scope.udpateRupees =function (){
		
		$scope.money.rupees = parseInt($scope.exchangerate*$scope.money.dollars);
	}

	$scope.udpateDollars =function (){
		
		$scope.money.dollars = parseInt($scope.money.rupees/$scope.exchangerate);
	}

	$scope.submitAddMoney = function () {
		$scope.addMoneyFailed = false;
		AccountFactory.addMoney($scope.money,function(data){
			if(data == true)
			{
				$uibModalInstance.close($scope.selected.item);
			}	
			else{
				$scope.addMoneyFailed = true;
			}
		});
		//
	};

	$scope.cancel = function () {
		$uibModalInstance.dismiss('cancel');
	};

	AccountFactory.getAccounts(function(accounts){
		$scope.accounts = accounts;
	})
}]);