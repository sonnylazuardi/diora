angular.module('inklusik.routes', ['simpleLogin'])

  .constant('ROUTES', {
    'login': {
      url: "/login",
      controller: 'LoginCtrl',
      animation: 'slide-in-up'
    },
    'home': {
      url: "/home",
      templateUrl: "templates/home.html",
      controller: 'HomeCtrl'
    },
    'play': {
      url: "/play",
      controller: 'PlayCtrl',
      templateUrl: "templates/play.html"
    }
  })
  
  .config(function($stateProvider) {
   
    $stateProvider.stateAuthenticated = function(path, route) {
      route.resolve = route.resolve || {};
      route.resolve.user = ['requireUser', function(requireUser) {
        return requireUser();
      }];
      $stateProvider.state(path, route);
    }
  })

  .config(function($stateProvider, ROUTES, $urlRouterProvider) {
    angular.forEach(ROUTES, function(route, path) {
      if ( route.authRequired ) {
        $stateProvider.stateAuthenticated(path, route);
      } else {
        $stateProvider.state(path, route);
      }
    });
    // routes which are not in our map are redirected to /home
    $urlRouterProvider.otherwise('/play');
  })

  .run(function($rootScope, $location, simpleLogin, ROUTES, loginRedirectPath) {
    simpleLogin.watch(check, $rootScope);

    $rootScope.$on("$routeChangeError", function(e, next, prev, err) {
      if( angular.isObject(err) && err.authRequired ) {
        $location.path(loginRedirectPath);
      }
    });

    function check(user) {
      if( !user && authRequired($location.path()) ) {
        $location.path(loginRedirectPath);
      }
    }

    function authRequired(path) {
      return ROUTES.hasOwnProperty(path) && ROUTES[path].authRequired;
    }
  });