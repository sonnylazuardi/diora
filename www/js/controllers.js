angular.module('inklusik.controllers', ['ionic.contrib.ui.tinderCards', 'ui.knob'])

.controller('LoginCtrl', function($scope, $rootScope, simpleLogin) {
    $rootScope.loginShow = true;
})

.controller('MenuCtrl', function($scope, fbutil, requireUser, simpleLogin, $rootScope, $state) {
    $scope.exit = function() {
        navigator.app.exitApp();
    }
})

.controller('PlayCtrl', function($scope, $rootScope, TDCardDelegate, Player) {
    $rootScope.loginShow = false;
    $rootScope.playShow = true;
    console.log('CARDS CTRL');
    var cardTypes = [
        { image: 'https://pbs.twimg.com/profile_images/479740132258361344/KaYdH9hE.jpeg' },
    ];

    $scope.cards = Array.prototype.slice.call(cardTypes, 0);

    $scope.cardDestroyed = function(index) {
        // $scope.cards.splice(index, 1);
    };

    $scope.addCard = function() {
        var newCard = cardTypes[Math.floor(Math.random() * cardTypes.length)];
        newCard.id = Math.random();
        $scope.cards.push(angular.extend({}, newCard));
    }
    $scope.audioPlaying = Player('http://webaudioplayground.appspot.com/sounds/guitar.ogg');
    $scope.progressBar = 0;
    console.log($scope.audioPlaying);

    var timer;
    var timerFunc = setInterval(function() {
        if (!$scope.audioPlaying.paused) {
            if (!isNaN($scope.audioPlaying.progress)) {
                $scope.progressBar = parseInt($scope.audioPlaying.progress * 100);
            }
        } else {
            clearInterval(timer);
        }
    }, 100);

    $scope.changeProgress = function(val) {
        $scope.audioPlaying.setProgress(val/100);
        timer = timerFunc;
    }

    timer = timerFunc;
})

.controller('CardCtrl', function($scope, TDCardDelegate) {
  $scope.cardSwipedLeft = function(index) {
    console.log('LEFT SWIPE');
    // $scope.addCard();
  };
  $scope.cardSwipedRight = function(index) {
    console.log('RIGHT SWIPE');
    // $scope.addCard();
  };
})

.controller('HomeCtrl', function($scope, $rootScope, simpleLogin) {
    $rootScope.loginShow = true;
});
