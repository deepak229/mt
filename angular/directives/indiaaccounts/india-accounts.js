angular.module('mt').directive("indiaAccounts",['AccountFactory','$compile', function(AccountFactory, $compile){
	return {
		templateUrl: '/angular/directives/indiaaccounts/india-accounts.html',
		restrict: 'E',
		scope:{

		},
	   	link:function(scope,element,attrs, $filter){
	   		
			scope.accounts = null;
	   		scope.init = function(){
	   			AccountFactory.getAccounts(function(accounts){
	   				scope.accounts = accounts;
	   			});
	   		};

	   		scope.init();

	   		scope.addMoneyPopup = function(toAccount){
				var addMoney = angular.element(document.createElement('add-money'));
				addMoney.attr("to-account",JSON.stringify(toAccount));
  				var el = $compile( addMoney )( scope );
 	 			angular.element(document.body).append(addMoney);
	   		}
		}
	}	
}]);