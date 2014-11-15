angular.module('inklusik.controllers', ['ionic.contrib.ui.tinderCards', 'ui.knob'])

.controller('LoginCtrl', function($scope, $rootScope, simpleLogin) {
    $rootScope.loginShow = true;
})

.controller('MenuCtrl', function($scope, fbutil, requireUser, simpleLogin, $rootScope, $state) {
    $scope.exit = function() {
        navigator.app.exitApp();
    }
})

.controller('PlayCtrl', function($scope, $rootScope, TDCardDelegate, Player, $stateParams, Song, Lyric) {
    $rootScope.loginShow = false;
    $rootScope.playShow = true;

    var song_id = $stateParams.song_id;
    $scope.song;
    $scope.audioPlaying;
    console.log(song_id);
    $scope.lyric = '';
    Song.getById(song_id).then(function(data) {
        $scope.song = data;
        $scope.audioPlaying = Player($scope.song.filename);
        timer = timerFunc;
        $scope.isPlaying = true;
        Lyric.get(data.ArtistName, data.SongName).then(function(data2) {
            $scope.lyric = data2;
        });
    });
    
    var cardTypes = [
        { title: 0 },
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
    
    $scope.progressBar = 0;
    $scope.isPlaying = false;
    $scope.control = function() {
        $scope.isPlaying = !$scope.isPlaying;
        if ($scope.isPlaying) {
            $scope.audioPlaying.play();
        } else {
            $scope.audioPlaying.pause();
        }
        timer = timerFunc;
    }
    console.log($scope.audioPlaying);

    var timer;
    var timerFunc = setInterval(function() {
        if ($scope.audioPlaying) {
            if (!$scope.audioPlaying.paused) {
                if (!isNaN($scope.audioPlaying.progress)) {
                    $scope.progressBar = parseInt($scope.audioPlaying.progress * 100);
                }
            } else {
                clearInterval(timer);
            }
        }
    }, 100);

    $scope.changeProgress = function(val) {
        $scope.audioPlaying.setProgress(val/100);
        timer = timerFunc;
    }
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
})

.controller('PlayCtrl', function($scope, $rootScope, simpleLogin) {
  $rootScope.hide = true;
})

.controller('TimelineCtrl', function($scope, $rootScope, simpleLogin) {
  $rootScope.hide = true;
})

.controller('FriendsCtrl', function($scope, $rootScope, simpleLogin) {
  $rootScope.hide = true;
})

.controller('SearchCtrl', function($scope, $rootScope, simpleLogin) {
  $rootScope.hide = true;
})

.controller('PlaylistCtrl', function($scope, $rootScope, simpleLogin) {
  $rootScope.hide = true;
})

.controller('TrendingCtrl', function($scope, $rootScope, simpleLogin) {
  $rootScope.hide = true;
})

.controller('FavoriteCtrl', function($scope, $rootScope, simpleLogin) {
  $rootScope.hide = true;
});
