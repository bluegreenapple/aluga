angular.module('MyApp')
	.controller('AlugueisCtrl', ['$scope','$filter','$stateParams','$state','$http','Todos','Imoveis', function($scope,$filter,$stateParams,$state, $http, Todos, Imoveis) {

	if ($stateParams.aluguelid) 
	{
		if (!$stateParams.aluguel) 
		{
			Todos.getId($stateParams.aluguelid)
				.success(function(data) {
					$stateParams.aluguel = data;
					$scope.aluguel = data;
					$scope.aluguel.dataDeEntrada = new Date($scope.aluguel.dataDeEntrada);
					$scope.aluguel.dataDeSaida = new Date($scope.aluguel.dataDeSaida);
				});
		}
	}
	$scope.aluguel = $stateParams.aluguel;
	$scope.aluguelid = $stateParams.aluguelid;
	if ($scope.aluguel) 
	{
		$scope.aluguel.dataDeEntrada = new Date($scope.aluguel.dataDeEntrada);
		$scope.aluguel.dataDeSaida = new Date($scope.aluguel.dataDeSaida);
	};
	

	//imoveis
	// $scope.imoveis = [];
	// $scope.loadImoveis = function() {
	// 	console.log('aa');
	// 	// console.log('loadimoveis0: ',$scope.imoveis);
	// 	return $scope.imoveis.length ? null : Imoveis.get().success(function(data) {
	// 		$scope.imoveis = data;
	// 		console.log('loadimoveis1: ',$scope.imoveis);
	// 	});
	// };


	$scope.showImoveis = function() 
	{
	    // if($scope.imoveis.length) 
	    // {
	    //   var selected = $filter('filter')($scope.imoveis, {nome: $scope.aluguel.text});
	    //   return selected.length ? selected[0].text : 'Not set';
	    // } 
	    // else 
	    // {
	    //   return $scope.aluguel.text;
	    // }
  	};


 
	$scope.imoveis2 = [];
  	Imoveis.get()
	    .success(function(data) {
	    	// console.log(data);
	    	$scope.imoveis2 = data;  
	    });
	    

 	$scope.showImovel = function() {
		if($scope.imoveis2.length) {
		  var selected = [];
	      var selected = $filter('filter')($scope.imoveis2, {idNome: $scope.aluguel.imovel});
	      return selected.length ? selected[0].idNome : 'Not set';
	    } else {
	      return 'lalala';//$scope.user.groupName;
	    }
   //  if($scope.imoveis2.length) {
	  // var selected = [];
   //    var selected = $filter('filter')($scope.imoveis2, {idNome: $scope.aluguel.imovel});
   //    return selected.length ? selected[0].idNome : 'Not set';
   //  } else {
   //    return 'lalala';//$scope.user.groupName;
   //  }
  };
    
  	// $scope.imoveis2 = ;

  	$scope.imoveis = [
	    {value: 'Ev64', nome: 'Ev64'},
	    {value: 'Ev75', nome: 'Ev75'},
	    {value: 'Casagrande', nome: 'Casagrande'},
	    {value: 'Acqua', nome: 'Acqua'},
	    {value: 'CapMartin', nome: 'CapMartin'},
	    {value: 'RioVerde', nome: 'RioVerde'},
	    {value: 'PortoBelo', nome: 'PortoBelo'},
	    {value: 'Laguna', nome: 'Laguna'},
	  ]; 

	 $scope.contas = [
	    {value: 'TaiYang_BB', nome: 'TaiYang_BB'},
	    {value: 'Rony_Bradesco', nome: 'Rony_Bradesco'},
	    {value: 'Tjin_Santander', nome: 'Tjin_Santander'},
	    {value: 'Tjin_Hsbc', nome: 'Tjin_Hsbc'},
	    {value: 'Lam_Bradesco', nome: 'Lam_Bradesco'},
	    {value: 'Paulo_Itau', nome: 'Paulo_Itau'},
	  ]; 

	  $scope.assinaturas = [
	    {value: 'Rony', nome: 'Rony'},
	    {value: 'Milly', nome: 'Milly'},
	    {value: 'Tjin', nome: 'Tjin'},
	    {value: 'TaiYang', nome: 'TaiYang'},
	    {value: 'Paulo', nome: 'Paulo'},
	  ];

	  $scope.locadores = [
	    {value: 'Tjin', nome: 'Tjin'},
	    {value: 'TaiYang', nome: 'TaiYang'},
	    {value: 'Paulo', nome: 'Paulo'},
	    {value: 'Lam', nome: 'Lam'},
	  ];

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
		$scope.formData.horarioDeSaida = new Date();
		$scope.formData.horarioDeSaida.setHours(12);
		$scope.formData.horarioDeSaida.setMinutes(0);
		$scope.formData.horarioDeEntrada = new Date();
		$scope.formData.horarioDeEntrada.setHours(12);
		$scope.formData.horarioDeEntrada.setMinutes(0);
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
						$scope.formData.horarioDeSaida = new Date();
						$scope.formData.horarioDeSaida.setHours(12);
						$scope.formData.horarioDeSaida.setMinutes(0);
						$scope.formData.horarioDeEntrada = new Date();
						$scope.formData.horarioDeEntrada.setHours(12);
						$scope.formData.horarioDeEntrada.setMinutes(0);
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