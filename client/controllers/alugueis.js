angular.module('MyApp')
	.controller('AlugueisCtrl', ['$scope','$stateParams','$state','$http','Todos', function($scope,$stateParams,$state, $http, Todos) {

		// if ($stateParams.mid) {
		// 	alert('ssss');
		// 	console.log($stateParams.mid);
	 //      // $scope.manager =   angular.copy(_.find(exampleData.managers, function(mgr) { return mgr.id == $stateParams.mid; }));
	 //    } else {
	 //      // $scope.managers =  angular.copy(exampleData.managers);
	 //    }
	$scope.aluguel = $stateParams.aluguel;
	$scope.aluguelid = $stateParams.aluguelid;
	// $scope.saveUser = function() {
	//   // $scope.user already updated!
	//   return $http.post('/saveUser', $scope.user).error(function(err) {
	//     if(err.field && err.msg) {
	//       // err like {field: "name", msg: "Server-side error for this username!"} 
	//       $scope.editableForm.$setError(err.field, err.msg);
	//     } else { 
	//       // unknown error
	//       $scope.editableForm.$setError('name', 'Unknown error!');
	//     }
	//   });
	// };

	$scope.update = function() {
	    // alert('I update');
	    // validate the formData to make sure that something is there
	    // if form is empty, nothing will happen
	    // if ($scope.formData.nSerieDoEquipamento != undefined) {
	    //   $scope.loading = true;
	      
	      // call the create function from our service (returns a promise object)
	      Todos.update($scope.aluguel)

	        // if successful creation, call our get function to get all the new analises
	        .success(function(data) {
	          // $scope.loading = false;
	          // $scope.formData = {}; // clear the form so our user is ready to enter another
	          // $scope.analises = data; // assign our new list of analises
	          // $modalInstance.close($scope.analises);
	        });
	    // }
	  };


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

	  $scope.dateOptions = {
	    formatYear: 'yy',
	    startingDay: 1
	  };

	  $scope.$state = $state;


    	
	}]);