angular.module('imovelService', [])

	// super simple service
	// each function returns a promise object 
	.factory('Imoveis', ['$http',function($http) {
		return {
			getCep: function(cep) {
				return $http.get('/api/imoveis/cep/' + cep);
			},
			get : function() {
				return $http.get('/api/imoveis');
			},
			create : function(imovelData) {
				return $http.post('/api/imoveis', imovelData);
			},
			update : function(imovelData) {
				return $http.put('/api/imoveis/',imovelData);
			},
			delete : function(id) {
				return $http.delete('/api/imoveis/' + id);
			},
			getId : function(id) {
				return $http.get('/api/imoveis/' + id);
			},
		}
	}]);