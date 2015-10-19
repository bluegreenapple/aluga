angular.module('MyApp')
	.controller('AlugueisCtrl', ['$scope','$state','$http','Todos', function($scope,$state, $http, Todos) {
		$scope.formData = {};
		$scope.formData.imovel = "Ev64";
		$scope.formData.locador = "TaiYang";
		$scope.formData.locador_nomeAssinatura = "Rony";
		$scope.formData.locador_conta = "TaiYang_BB";
		$scope.loading = true;
		$scope.isEditing = false;
		// GET =====================================================================
		// when landing on the page, get all todos and show them
		// use the service to get all the todos
		Todos.get()
			.success(function(data) {
				$scope.todos = data;
				$scope.loading = false;
			});

		// GETTERS
		//added for smarttable sort does not work with date strings
		$scope.getters={
		dataDeEntrada:function(row){
		  return new Date(row.dataDeEntrada);
		},
		dataDeSaida:function(row){
		  return new Date(row.dataDeSaida);
		}
		}

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

	 //  $scope.downloadContract = function(id) {
		// 	console.log('uauaua');
		// 	Todos.downloadContract(id);
		// };

	  $scope.edit = function(id) {

	  	alert('!!!');
	  	console.log('sswsws');
	    $scope.isEditing = !$scope.isEditing;
	   //  if ($scope.formData.text != undefined) {
	   //    $scope.loading = true;
      
	   //    // call the create function from our service (returns a promise object)
	   //    Todos.update($scope.formData)

	   //      // if successful creation, call our get function to get all the new analises
	   //      .success(function(data) {
	   //        	$scope.loading = false;
				// $scope.formData = {}; // clear the form so our user is ready to enter another
				// $scope.formData.imovel = "Ev64";
				// $scope.formData.locador = "TaiYang";
				// $scope.formData.locador_nomeAssinatura = "Rony";
				// $scope.formData.locador_conta = "TaiYang_BB";
				// $scope.todos = data; // assign our new list of todos
	   //      });
	   //  }
	  };

	  $scope.cancelEdit = function() {
	  	$scope.loading = false;
		$scope.formData = {}; // clear the form so our user is ready to enter another
		$scope.formData.imovel = "Ev64";
		$scope.formData.locador = "TaiYang";
		$scope.formData.locador_nomeAssinatura = "Rony";
		$scope.formData.locador_conta = "TaiYang_BB";
	    $scope.isEditing = false;
	  };

	  $scope.confirmEdit = function() {
	    $scope.isEditing = false;
	  };

	  $scope.$state = $state;

	  $scope.go = function(route){
        $state.go(route);
        alert('sas');
        console.log('aoaoa');
	};

    	
	}]);