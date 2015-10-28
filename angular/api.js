angular.module('mt').service('mtAPI', ['$http','$q',
	function ($http, $q) {
	
		var transform = function(data){
			return $.param(data);
		};
		return {
			/*server get request*/        	
			getRequest: function (url, data, toJson) {
				if(toJson == null || toJson == false){
					var dfd = $q.defer();
					$http.get(url,data).success(function (res) {
						dfd.resolve(res);
					}).error(function(err) {
						dfd.reject(err);
					});
				}
				else if( toJson == true){
					var dfd = $q.defer();
					var request = $http({
						 method: "get",
						 url: url,
						 headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'},
						 data:data,
						 transformRequest: transform
					});

					request.success(function( res ) {
						dfd.resolve(res);
					})
					.error(function(err) {
						dfd.reject(err);
					});
				   }
				return dfd.promise;
			},
			
			/*server post request*/
			postRequest: function (url, data, toJson) {
				if(toJson == null || toJson == false){
					
					var dfd = $q.defer();
					$http.post(url, data).success(function (res) {
						dfd.resolve(res);

					}).error(function(err) {
						dfd.reject(err);
					});
					
				}
				
				else if( toJson == true ){
					var dfd = $q.defer();        		
					var request = $http({
						method: "post",
						url: url,
						headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'},
						data:data,
						transformRequest: transform
					});
				
					request.success(function( res ) {
						dfd.resolve(res);
					})
					.error(function(err) {
						dfd.reject(err);
					});
				 }

				return dfd.promise;
			}
		};
}]);


