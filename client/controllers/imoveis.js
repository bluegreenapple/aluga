angular.module('MyApp')
	.controller('ImoveisCtrl', ['$scope','$stateParams','$state','$http','Imoveis', function($scope,$stateParams,$state, $http, Imoveis) {

		$scope.formData = {};
		$scope.formData.tipo = "Apartamento";
		$scope.loading = true;
		
		// Imoveis.getCep('04060000')
		// .success(function(data) {
		// 	alert(data);
		// 		console.log('endereco: ', data);
		// 	});
		$scope.buscaCep = function(){
			Imoveis.getCep($scope.formData.cep)
				.success(function(data) {
					$scope.formData.logradouro = data.logradouro;
					$scope.formData.bairro = data.bairro;
					$scope.formData.localidade = data.cidade;
					$scope.formData.uf = data.uf;
					$scope.loading = false;
				});
        };
		// GET =====================================================================
		// when landing on the page, get all imoveis and show them
		// use the service to get all the imoveis
		Imoveis.get()
			.success(function(data) {
				$scope.imoveis = data;
				$scope.loading = false;
			});

		// CREATE ==================================================================
		// when submitting the add form, send the text to the node API
		$scope.createImovel = function() {
			// validate the formData to make sure that something is there
			// if form is empty, nothing will happen
			// if ($scope.formData.text != undefined) {
				$scope.loading = true;

				// call the create function from our service (returns a promise object)
				Imoveis.create($scope.formData)

					// if successful creation, call our get function to get all the new imoveis
					.success(function(data) {
						$scope.loading = false;
						$scope.formData = {}; // clear the form so our user is ready to enter another
						$scope.formData.tipo = "Apartamento";
						$scope.imoveis = data; // assign our new list of imoveis
					});
			// }
		};

		// DELETE ==================================================================
		// delete a imovel after checking it
		$scope.deleteImovel = function(id) {
			$scope.loading = true;

			Imoveis.delete(id)
				// if successful creation, call our get function to get all the new imoveis
				.success(function(data) {
					$scope.loading = false;
					$scope.imoveis = data; // assign our new list of imoveis
				});
		};


		  $scope.dateOptions = {
		    formatYear: 'yy',
		    startingDay: 1
		  };

		  $scope.$state = $state;


    	
	}]);