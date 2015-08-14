(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
angular.module('MyApp', ['ngResource', 'ngMessages', 'ui.router', 'ui.bootstrap', 'todoService', 'mgcrea.ngStrap', 'satellizer'])
  .config(function($stateProvider, $urlRouterProvider, $authProvider) {
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

},{}]},{},[1])
//# sourceMappingURL=data:application/json;charset:utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3Vzci9sb2NhbC9saWIvbm9kZV9tb2R1bGVzL3dhdGNoaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCIuLi8uLi9jbGllbnQvYXBwLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FDQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsImFuZ3VsYXIubW9kdWxlKCdNeUFwcCcsIFsnbmdSZXNvdXJjZScsICduZ01lc3NhZ2VzJywgJ3VpLnJvdXRlcicsICd1aS5ib290c3RyYXAnLCAndG9kb1NlcnZpY2UnLCAnbWdjcmVhLm5nU3RyYXAnLCAnc2F0ZWxsaXplciddKVxuICAuY29uZmlnKGZ1bmN0aW9uKCRzdGF0ZVByb3ZpZGVyLCAkdXJsUm91dGVyUHJvdmlkZXIsICRhdXRoUHJvdmlkZXIpIHtcbiAgICAkc3RhdGVQcm92aWRlclxuICAgICAgLnN0YXRlKCdob21lJywge1xuICAgICAgICB1cmw6ICcvJyxcbiAgICAgICAgdGVtcGxhdGVVcmw6ICdwYXJ0aWFscy9ob21lLmh0bWwnLFxuICAgICAgICByZXNvbHZlOiB7XG4gICAgICAgICAgYXV0aGVudGljYXRlZDogZnVuY3Rpb24oJHEsICRsb2NhdGlvbiwgJGF1dGgpIHtcbiAgICAgICAgICAgIHZhciBkZWZlcnJlZCA9ICRxLmRlZmVyKCk7XG5cbiAgICAgICAgICAgIGlmICgkYXV0aC5pc0F1dGhlbnRpY2F0ZWQoKSkge1xuICAgICAgICAgICAgICAkbG9jYXRpb24ucGF0aCgnL2Rhc2hib2FyZCcpO1xuICAgICAgICAgICAgfSBcbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICBkZWZlcnJlZC5yZXNvbHZlKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIHJldHVybiBkZWZlcnJlZC5wcm9taXNlO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfSlcbiAgICAgIC5zdGF0ZSgnbG9naW4nLCB7XG4gICAgICAgIHVybDogJy9sb2dpbicsXG4gICAgICAgIHRlbXBsYXRlVXJsOiAncGFydGlhbHMvbG9naW4uaHRtbCcsXG4gICAgICAgIGNvbnRyb2xsZXI6ICdMb2dpbkN0cmwnXG4gICAgICB9KVxuICAgICAgLnN0YXRlKCdzaWdudXAnLCB7XG4gICAgICAgIHVybDogJy9zaWdudXAnLFxuICAgICAgICB0ZW1wbGF0ZVVybDogJ3BhcnRpYWxzL3NpZ251cC5odG1sJyxcbiAgICAgICAgY29udHJvbGxlcjogJ1NpZ251cEN0cmwnXG4gICAgICB9KVxuICAgICAgLnN0YXRlKCdsb2dvdXQnLCB7XG4gICAgICAgIHVybDogJy9sb2dvdXQnLFxuICAgICAgICB0ZW1wbGF0ZTogbnVsbCxcbiAgICAgICAgY29udHJvbGxlcjogJ0xvZ291dEN0cmwnXG4gICAgICB9KVxuICAgICAgLnN0YXRlKCdkYXNoYm9hcmQnLCB7XG4gICAgICAgIHVybDogJy9kYXNoYm9hcmQnLFxuICAgICAgICB0ZW1wbGF0ZVVybDogJ3BhcnRpYWxzL2Rhc2hib2FyZC5odG1sJyxcbiAgICAgICAgY29udHJvbGxlcjogJ0Rhc2hib2FyZEN0cmwnLFxuICAgICAgICByZXNvbHZlOiB7XG4gICAgICAgICAgYXV0aGVudGljYXRlZDogZnVuY3Rpb24oJHEsICRsb2NhdGlvbiwgJGF1dGgpIHtcbiAgICAgICAgICAgIHZhciBkZWZlcnJlZCA9ICRxLmRlZmVyKCk7XG5cbiAgICAgICAgICAgIGlmICghJGF1dGguaXNBdXRoZW50aWNhdGVkKCkpIHtcbiAgICAgICAgICAgICAgJGxvY2F0aW9uLnBhdGgoJy9sb2dpbicpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgZGVmZXJyZWQucmVzb2x2ZSgpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICByZXR1cm4gZGVmZXJyZWQucHJvbWlzZTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH0pXG4gICAgICAuc3RhdGUoJ3Byb2ZpbGUnLCB7XG4gICAgICAgIHVybDogJy9wcm9maWxlJyxcbiAgICAgICAgdGVtcGxhdGVVcmw6ICdwYXJ0aWFscy9wcm9maWxlLmh0bWwnLFxuICAgICAgICBjb250cm9sbGVyOiAnUHJvZmlsZUN0cmwnLFxuICAgICAgICByZXNvbHZlOiB7XG4gICAgICAgICAgYXV0aGVudGljYXRlZDogZnVuY3Rpb24oJHEsICRsb2NhdGlvbiwgJGF1dGgpIHtcbiAgICAgICAgICAgIHZhciBkZWZlcnJlZCA9ICRxLmRlZmVyKCk7XG5cbiAgICAgICAgICAgIGlmICghJGF1dGguaXNBdXRoZW50aWNhdGVkKCkpIHtcbiAgICAgICAgICAgICAgJGxvY2F0aW9uLnBhdGgoJy9sb2dpbicpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgZGVmZXJyZWQucmVzb2x2ZSgpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICByZXR1cm4gZGVmZXJyZWQucHJvbWlzZTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH0pO1xuXG4gICAgJHVybFJvdXRlclByb3ZpZGVyLm90aGVyd2lzZSgnLycpO1xuXG4gICAgJGF1dGhQcm92aWRlci5mYWNlYm9vayh7XG4gICAgICBjbGllbnRJZDogJzE2Njk2NjAzMDMyNjk4NjInXG4gICAgfSk7XG5cbiAgICAkYXV0aFByb3ZpZGVyLmdvb2dsZSh7XG4gICAgICBjbGllbnRJZDogJzYzMTAzNjU1NDYwOS12NWhtMmFtdjRwdmljbzNhc2ZpOTdmNTRzYzUxamk0by5hcHBzLmdvb2dsZXVzZXJjb250ZW50LmNvbSdcbiAgICB9KTtcblxuICAgICRhdXRoUHJvdmlkZXIubGlua2VkaW4oe1xuICAgICAgY2xpZW50SWQ6ICc3N2N3Nzg2eWlnbnB6aidcbiAgICB9KTtcblxuICAgICRhdXRoUHJvdmlkZXIudHdpdHRlcih7XG4gICAgICB1cmw6ICcvYXV0aC90d2l0dGVyJ1xuICAgIH0pO1xuICAgIFxuICB9KTtcbiJdfQ==
