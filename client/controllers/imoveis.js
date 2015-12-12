angular.module('MyApp')
	.controller('ImoveisCtrl', ['$scope','$stateParams','$state','$http','Imoveis','Account', function($scope,$stateParams,$state, $http, Imoveis,Account) {
		
		var updateLoading = function() {
	    	if (angular.isDefined( $scope.user)) {
				$scope.isLoading = false;
				console.log('isLoading=false');	
			}
			else{
				$scope.isLoading = true;
				console.log('isLoading=true');	
			}
	  	};

		Account.getProfile()
	        .success(function(data) {
	          $scope.user = data;
	          console.log('user returned',$scope.user);
	          updateLoading();
	        })

	    

		$scope.resetForm = function() {
	    	$scope.formData = {};
			$scope.formData.tipo = "Apartamento";
			// $scope.formData.createdBy = $scope.user._id;
			// console.log('createdBy reset:',$scope.formData.createdBy);
			$scope.formData.horarioDeSaidaPadrao = new Date();
			$scope.formData.horarioDeSaidaPadrao.setHours(12);
			$scope.formData.horarioDeSaidaPadrao.setMinutes(0);
			$scope.formData.horarioDeEntradaPadrao = new Date();
			$scope.formData.horarioDeEntradaPadrao.setHours(12);
			$scope.formData.horarioDeEntradaPadrao.setMinutes(0);

			updateLoading();
			
	  	};

	  	

		$scope.resetForm();



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

        $scope.ufs = ['AC','AL','AM','AP','BA','CE','DF','ES','GO','MA','MG','MS','MT','PA','PB','PE','PI','PR','RJ','RN','RO','RR','RS','SC','SE','SP','TO'];
        $scope.tipos = ['Apartamento','Casa','Condomínio'];
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
				$scope.formData.createdBy = $scope.user._id;
				console.log('createdBy em createImovel:',$scope.user);
				// call the create function from our service (returns a promise object)
				Imoveis.create($scope.formData)

					// if successful creation, call our get function to get all the new imoveis
					.success(function(data) {
						$scope.resetForm();
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