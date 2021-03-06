var app = angular.module('MyApp', ['ngResource', 'ngMessages', 'ui.router', 'ui.bootstrap', 'trNgGrid', 'todoService', 'imovelService', 'mgcrea.ngStrap', 'satellizer',require('../server/node/node_modules/angular-input-masks'),'smart-table','ct.ui.router.extras','xeditable']);
  
app.config(function($stateProvider, $urlRouterProvider, $authProvider) {  
  $stateProvider
    .state('home', {
      url: '/',
      templateUrl: 'partials/home.html',
      resolve: {
        authenticated: function($q, $location, $auth) {
          var deferred = $q.defer();

          if ($auth.isAuthenticated()) {
            $location.path('/dashboard');
          } 
          else {
            deferred.resolve();
          }
          
          return deferred.promise;
        }
      }
    })
    .state('login', {
      url: '/login',
      templateUrl: 'partials/login.html',
      controller: 'LoginCtrl'
    })
    .state('signup', {
      url: '/signup',
      templateUrl: 'partials/signup.html',
      controller: 'SignupCtrl'
    })
    .state('logout', {
      url: '/logout',
      template: null,
      controller: 'LogoutCtrl'
    })

    .state('dashboard', {
      url: '/dashboard',
      // redirectTo: 'dashboard.alugueis',
      // dsr: true,
      views: {
          '': {
              templateUrl: 'partials/dashboard.html',
              controller: 'DashboardCtrl',
          }
      },
      resolve: {
        authenticated: function($q, $location, $auth) {
          var deferred = $q.defer();

          if (!$auth.isAuthenticated()) {
            $location.path('/login');
          } else {
            deferred.resolve();
          }

          return deferred.promise;
        }
      }
    })

    // estado abstrato da aba aluguéis
    .state('dashboard.alugueis', {
      url: '/alugueis',
      sticky: true,
      deepStateRedirect: { default: "dashboard.alugueis.lista" },
      views: {
          'alugueis': {
              templateUrl: 'partials/alugueis.html',
              // controller: 'AlugueisCtrl'
          }
      },
    })
    
    // estado para lista de alugueis
    .state('dashboard.alugueis.lista', {
      url: '/lista',      
      views: {
        '': { // this is the unique name you can reference later
            templateUrl: 'partials/alugueis.lista.html',
            controller: 'AlugueisCtrl'
        }
      }
    })

    // estado para aluguel especifico
    .state('dashboard.alugueis.aluguel', {    
      url: '/aluguel/:aluguelid',
      params: {
        aluguel: null
      },
      views: {
        '': { 
          templateUrl: 'partials/alugueis.aluguel.html',
          controller: 'AlugueisCtrl'
        }
      }
    })

    // estado para aluguel novo
    .state('dashboard.alugueis.novo', {    
      url: '/novo',
      views: {
        '': { 
          templateUrl: 'partials/alugueis.novo.html',
          controller: 'AlugueisCtrl'
        }
      }
    })

    // estado para popups e sliders laterais
    .state('dashboard.alugueis.editar', {
      url: '/editar',      
      views: {
        'editar': { // this is the unique name you can reference later
            templateUrl: 'partials/alugueis.editar.html',
            // controller: 'ListPageEditCtrl'
        }
      }
    })
     // estado abstrato da aba imóveis
    // .state('dashboard.imoveis', {
    //   // abstract: true,
    //   url: '/imoveis',
    //   templateUrl: 'partials/imoveis.html',
    //   controller: 'DashboardCtrl'
    // })
    // estado abstrato da aba imóveis
    .state('dashboard.imoveis', {
      url: '/imoveis',
      sticky: true,
      deepStateRedirect: { default: "dashboard.imoveis.novo" },
      views: {
          'imoveis': {
              templateUrl: 'partials/imoveis.html',
              // controller: 'AlugueisCtrl'
          }
      },
    })

    // estado para imóvel novo
    .state('dashboard.imoveis.novo', {    
      url: '/novo',
      views: {
        '': { 
          templateUrl: 'partials/imoveis.novo.html',
          controller: 'ImoveisCtrl'
        }
      }
    })

     // estado abstrato da aba imóveis
    .state('dashboard.hospedes', {
      // abstract: true,
      url: '/hospedes',
      templateUrl: 'partials/hospedes.html',
      controller: 'DashboardCtrl'
    })

    

   

    // // estado criar novo da aba aluguéis
    // .state('dashboard.tabs.alugueis.lista', {
    //   url: '/lista',
    //   templateUrl: 'partials/alugueis.lista.html',
    //   // controller: 'DashboardCtrl'
    // })

    // // estado criar novo da aba aluguéis
    // .state('dashboard.tabs.alugueis.novo', {
    //   url: '/novo',
    //   templateUrl: 'partials/alugueis.novo.html',
    //   // controller: 'DashboardCtrl'
    // })



    // .state('dashboard.imoveis', {
    //   url: '/dashboard/imoveis',
    //   templateUrl: 'partials/imoveis.html',
    //   controller: 'ImoveisCtrl'
    // })

    // .state('dashboard.hospedes', {
    //   url: '/dashboard/hospedes',
    //   templateUrl: 'partials/hospedes.html',
    //   controller: 'HospedesCtrl'
    // })

    .state('profile', {
      url: '/profile',
      templateUrl: 'partials/profile.html',
      controller: 'ProfileCtrl',
      resolve: {
        authenticated: function($q, $location, $auth) {
          var deferred = $q.defer();

          if (!$auth.isAuthenticated()) {
            $location.path('/login');
          } else {
            deferred.resolve();
          }

          return deferred.promise;
        }
      }
    });

  $urlRouterProvider.otherwise('/');

  $authProvider.facebook({
    clientId: '1669660303269862'
  });

  $authProvider.google({
    clientId: '631036554609-v5hm2amv4pvico3asfi97f54sc51ji4o.apps.googleusercontent.com'
  });

  $authProvider.linkedin({
    clientId: '77cw786yignpzj'
  });

  $authProvider.twitter({
    url: '/auth/twitter'
  });
  
});


// app.run(['$rootScope', '$state', 
//  function($rootScope, $state) {

//   $rootScope.$on('$stateChangeStart',
//     function(evt, to, params) {
//       if (to.redirectTo) {
//         evt.preventDefault();
//         $state.go(to.redirectTo, params)
//       }
//     }
//   );
// }]);

app.run(['$rootScope', '$state', '$stateParams',
  function ($rootScope, $state, $stateParams) {
    $rootScope.$state = $state;
    $rootScope.$stateParams = $stateParams;
}])
