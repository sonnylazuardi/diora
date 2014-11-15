angular.module('inklusik.controllers', [])

.controller('LoginCtrl', function($scope, $rootScope, simpleLogin) {
  $rootScope.hide = false;
})

.controller('MenuCtrl', function($scope, fbutil, requireUser, simpleLogin, $rootScope, $state) {

  $scope.exit = function() {
    navigator.app.exitApp();
  }
})

.controller('HomeCtrl', function($scope, $rootScope, simpleLogin) {
  $rootScope.hide = true;
})

.controller('PlayCtrl', function($scope, $rootScope, simpleLogin) {
  $rootScope.hide = true;
});
