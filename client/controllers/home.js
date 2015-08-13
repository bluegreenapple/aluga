angular.module('todoController', [])

	// inject the Todo service factory into our controller
	.controller('mainController', ['$scope','$http','Todos', function($scope, $http, Todos) {
		$scope.formData = {};
		$scope.formData.imovel = "Ev64";
		$scope.formData.locador = "TaiYang";
		$scope.formData.locador_nomeAssinatura = "Rony";
		$scope.formData.locador_conta = "TaiYang_BB";
		$scope.loading = true;

		// GET =====================================================================
		// when landing on the page, get all todos and show them
		// use the service to get all the todos
		Todos.get()
			.success(function(data) {
				$scope.todos = data;
				$scope.loading = false;
			});

		// CREATE ==================================================================
		// when submitting the add form, send the text to the node API
		$scope.createTodo = function() {

			// validate the formData to make sure that something is there
			// if form is empty, nothing will happen
			if ($scope.formData.text != undefined) {
				$scope.loading = true;

				// call the create function from our service (returns a promise object)
				Todos.create($scope.formData)

					// if successful creation, call our get function to get all the new todos
					.success(function(data) {
						$scope.loading = false;
						$scope.formData = {}; // clear the form so our user is ready to enter another
						$scope.formData.imovel = "Ev64";
						$scope.formData.locador = "TaiYang";
						$scope.formData.locador_nomeAssinatura = "Rony";
						$scope.formData.locador_conta = "TaiYang_BB";
						$scope.todos = data; // assign our new list of todos
					});
			}
		};

		// DELETE ==================================================================
		// delete a todo after checking it
		$scope.deleteTodo = function(id) {
			$scope.loading = true;

			Todos.delete(id)
				// if successful creation, call our get function to get all the new todos
				.success(function(data) {
					$scope.loading = false;
					$scope.todos = data; // assign our new list of todos
				});
		};

		// DOWNLOAD ================================================================
		// download a todo after clicking download
		$scope.downloadContract = function(id) {
			console.log('uauaua');
			Todos.downloadContract(id);
		};

	  $scope.open = function($event) {
	    $event.preventDefault();
	    $event.stopPropagation();

	    $scope.opened = true;
	  };

	  $scope.open2 = function($event) {
	    $event.preventDefault();
	    $event.stopPropagation();

	    $scope.opened2 = true;
	  };

	  $scope.dateOptions = {
	    formatYear: 'yy',
	    startingDay: 1
	  };

	}]);