var app = angular.module('MyApp', ['ngResource', 'ngMessages', 'ui.router', 'ui.bootstrap', 'trNgGrid', 'todoService', 'mgcrea.ngStrap', 'satellizer',require('../server/node/node_modules/angular-input-masks'),'smart-table']);
  
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
      abstract: 'true',
      url: '/dashboard',
      templateUrl: 'partials/dashboard.html',
      controller: 'DashboardCtrl',
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

    // .state('dashboard.tabs', {
    //   // abstract: 'true',
    //   url: '',
    //   views: {
    //       'imoveis': {
    //           templateUrl: 'partials/imoveis.html'
    //       },
    //       'alugueis': {
    //           templateUrl: 'partials/alugueis.html',
    //           // controller: 'AlugueisCtrl'
    //       },
    //       'hospedes': {
    //           templateUrl: 'partials/alugueis.html',
    //           // controller: 'DashboardController'
    //       }
    //   }
    // })

  

    // estado abstrato da aba aluguéis
    .state('dashboard.alugueis', {
      // abstract: true,
      url: '/alugueis',
      templateUrl: 'partials/alugueis.html',
      controller: 'AlugueisCtrl'
    })
    
    // // estado abstrato da aba aluguéis
    // .state('dashboard.alugueis.lista', {
    //   url: '/lista',
    //   templateUrl: 'partials/alugueis.lista.html',
    //   controller: 'AlugueisCtrl'
    // })
     // estado abstrato da aba imóveis
    .state('dashboard.imoveis', {
      // abstract: true,
      url: '/imoveis',
      templateUrl: 'partials/imoveis.html',
      controller: 'DashboardCtrl'
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

  $urlRouterProvider.otherwise('/dashboard/alugueis/lista');

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
