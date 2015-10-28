angular.module('mt').factory("AccountFactory",['$http', 'mtAPI', function(http,api){

	var self = this;
	self.accounts = null;

	self.loadAccounts = function(){
		return api.getRequest("/api/getAllAccounts")
		.then(function(response){
			self.accounts = response.data;
		});
	};

	self.addMoney = function(money, callback){
		return api.postRequest("/api/addMoney")
		.then(function(response){
			if(callback){
				callback(response.data);
			}
		}).
		catch(function(error){
			if(callback){
				callback(error);
			}
		});
	};

	
	var factory = {};
	
	// Get all the accounts. This includes both US accounts and Indian accounts.
	factory.getAccounts = function(callback){
		// if(self.accounts != null){
		// 	callback(self.accounts);
		// }
		// else
		{
			self.loadAccounts().then(function(){
				callback(self.accounts);
			});
		}
	}

	//add money to a given account
	factory.addMoney = function(money, callback){
		self.addMoney(money,callback);
	}

	return factory;
}]);