angular.module('todoService', [])

	// super simple service
	// each function returns a promise object 
	.factory('Todos', ['$http',function($http) {
		return {
			get : function() {
				return $http.get('/api/todos');
			},
			create : function(todoData) {
				return $http.post('/api/todos', todoData);
			},
			update : function(todoData) {
				return $http.put('/api/todos/',todoData);
			},
			delete : function(id) {
				return $http.delete('/api/todos/' + id);
			},
			getId : function(id) {
				return $http.get('/api/todos/' + id);
			},
			getByCreatorId : function(creatorId) {
				return $http.get('/api/todos/creatorId/' + creatorId);
			},
			downloadContract : function(id) {
				console.log('ieieiei');
				return $http.get('/api/download');
			},

		}
	}]);