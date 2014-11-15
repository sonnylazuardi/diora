angular.module('inklusik.controllers', [])

.controller('PlayCtrl', function($scope, simpleLogin, Player, fbutil, $stateParams, Instruments, requireUser, Shake, Partiturs, $interval) {
  var name = $stateParams.name;
  $scope.name = name;
  $scope.instrument = Instruments.find(name);
  $scope.harmony = fbutil.syncArray(['harmony'], {limit: 10});
  $scope.last_melody = fbutil.syncArray(['harmony'], {limit: 1});
  $scope.selected = '';
  $scope.holded = false;
  $scope.user;
  var delay = 370;
  var timer;
  requireUser().then(function(user) {
    $scope.user = user;
    var profile = fbutil.syncObject(['users', user.uid]);
    profile.$bindTo($scope, 'profile');

    profile.$loaded().then(function(snap) {
      var listRef = fbutil.ref('presences');
      var userObj = {
        uid: user.uid,
        name: snap.name,
        avatar: snap.avatar,
        instrument: {name: name, image: $scope.instrument.image}
      };
      var userRef = fbutil.ref('presences', user.uid);
      userRef.set(userObj);

      var presenceRef = fbutil.ref('.info', 'connected');
      presenceRef.on('value', function(snap) {
        userRef.onDisconnect().remove();
      });

    });
  });

  var onlineusers = fbutil.syncObject('presences');
  onlineusers.$bindTo($scope, 'onlineusers');

  $scope.last_melody.$watch(function(event) {
    var melody = $scope.last_melody[0];
    if (melody && $scope.profile) {
      if ($scope.profile.uid != melody.uid) {
        Player(melody.name, melody.melody);
      }
    }
  });
  $scope.playSound = function(melody) {
    $scope.selected = melody;
    Player(name, melody);
    $scope.harmony.$add({melody: melody, name: name, uid: $scope.profile.uid});
  }
  $scope.sound = function(melody) {
    $scope.holded = true;
    $scope.playSound(melody);
    var userRef = fbutil.ref('presences', $scope.user.uid);
    userRef.update({sounded: true});
    if (!timer) {
      timer = $interval(function() {
        $scope.playSound(melody);
      }, delay);
    } 
  }
  $scope.enter = function(melody) {
    if ($scope.holded) {
      $scope.sound(melody);
    }
  }
  $scope.stop = function() {
    $scope.holded = false;
    var userRef = fbutil.ref('presences', $scope.user.uid);
    userRef.update({sounded: false});
    if (timer) {
      $interval.cancel(timer);
      timer = null;
    }
  }
  $scope.leave = function() {
    if (timer) {
      $interval.cancel(timer);
      timer = null;
    }
  }
  var shake = new Shake({
    frequency: 300,                                                //milliseconds between polls for accelerometer data.
    waitBetweenShakes: 1000,                                       //milliseconds to wait before watching for more shake events.
    threshold: 12,                                                 //how hard the shake has to be to register.
    success: function(magnitude, accelerationDelta, timestamp) {
      Player($scope.name, $scope.selected);   
      $scope.harmony.$add({melody: $scope.selected, name: $scope.name, uid: $scope.profile.uid});
    }, //callback when shake is detected. "this" will be the "shake" object.
    failure: function() {},                                        //callback when watching/getting acceleration fails. "this" will be the "shake" object.
  });
  shake.startWatch();
  $scope.$on('$destroy', function() {
    shake.stopWatch();
  });

  //
  //Partitiur
  $scope.usingPartitur = false;
  $scope.partiturs = Partiturs.partiturs;
  $scope.currentSong = {melody: [], title: 'Song', source: '-'}
  $scope.doTimer = function() {
    $scope.time++;
    if ($scope.time > 60) {
      $scope.time = 0;
    }
  };
  var timer;
  $scope.resume = function() {
    if ( angular.isDefined(timer) ) return;
    timer = $interval($scope.doTimer, 750);
  };

  $scope.pause = function() {
    if (angular.isDefined(timer)) {
      $interval.cancel(timer);
      timer = undefined;
    }
  }

  $scope.changeSong = function() {
    $scope.time = 0;
    $scope.resume();
  };

  $scope.switch = function() {
    $scope.usingPartitur = !$scope.usingPartitur;

  }
})

.controller('PlayGuestCtrl', function($scope, simpleLogin, Player, fbutil, $stateParams, Instruments, Shake, Partiturs, $interval) {
  var name = $stateParams.name;
  $scope.name = name;
  $scope.instrument = Instruments.find(name);
  $scope.selected = '';
  $scope.time = 0;
  $scope.sound = function(melody) {
    $scope.selected = melody;
    Player(name, melody);
  }
  var shake = new Shake({
    frequency: 300,                                                //milliseconds between polls for accelerometer data.
    waitBetweenShakes: 1000,                                       //milliseconds to wait before watching for more shake events.
    threshold: 12,                                                 //how hard the shake has to be to register.
    success: function(magnitude, accelerationDelta, timestamp) {
      Player($scope.name, $scope.selected);   
    }, //callback when shake is detected. "this" will be the "shake" object.
    failure: function() {},                                        //callback when watching/getting acceleration fails. "this" will be the "shake" object.
  });
  shake.startWatch();
  $scope.$on('$destroy', function() {
    shake.stopWatch();
  });

  //Partitiur
  $scope.usingPartitur = false;
  $scope.partiturs = Partiturs.partiturs;
  $scope.currentSong = {melody: [], title: 'Song', source: '-'}
  $scope.doTimer = function() {
    $scope.time++;
    if ($scope.time > 60) {
      $scope.time = 0;
    }
  };
  var timer;
  $scope.resume = function() {
    if ( angular.isDefined(timer) ) return;
    timer = $interval($scope.doTimer, 750);
  };

  $scope.pause = function() {
    if (angular.isDefined(timer)) {
      $interval.cancel(timer);
      timer = undefined;
    }
  }

  $scope.changeSong = function() {
    $scope.time = 0;
    $scope.resume();
  };

  $scope.switch = function() {
    $scope.usingPartitur = !$scope.usingPartitur;

  }

})

.controller('LoginCtrl', function($scope, createProfile, simpleLogin, $state, $rootScope) {
  $rootScope.hide = false;
  $scope.login = function() {
    $scope.err = null;
      simpleLogin.login()
      .then(function( user ) {
        console.log(user);
        createProfile(user.uid, user.displayName, user.thirdPartyUserData.picture.data.url, 0).then(function() {
          $rootScope.$broadcast('afterlogin');
          $state.go('browse');
        });
      }, function(err) {
        $scope.err = errMessage(err);
      });
  }
  $scope.guest = function() {
    $rootScope.hide = true;
    $state.go('browse');
  }
  function errMessage(err) {
    return angular.isObject(err) && err.code? err.code : err + '';
  }
})

.controller('MenuCtrl', function($scope, fbutil, requireUser, simpleLogin, $rootScope, $state) {
  $scope.load = function() {
    console.log('load');
    requireUser().then(function(user) {
      var profile = fbutil.syncObject(['users', user.uid]);
      profile.$bindTo($scope, 'profile');
    });
  }
  $scope.load();
  $scope.$on('afterlogin', $scope.load);
  $scope.logout = function() {
    if ($scope.profile) {
      console.log('exit');
      simpleLogin.logout();
    }
    console.log('keluar');
    $rootScope.hide = false;
    $state.go('login');
  }
  $scope.exit = function() {
    navigator.app.exitApp();
  }
})

.controller('BrowseCtrl', function($scope, Instruments) {
  $scope.instruments = Instruments.instruments;
  $scope.locations = [ 'sunda', 'jawa','bali','kalimantan','maluku','nusa','papua','sumatera',];
})

.controller('WikimoreCtrl', function($scope) {
  
})

.controller('DetailCtrl', function($scope, Instruments, $stateParams) {
  $scope.instrument = Instruments.find($stateParams.name);
  $scope.expanded = ['short', 'short', 'short'];
  $scope.expand = function(id) {
    if ($scope.expanded[id] == 'short') {
      $scope.expanded[id] = 'full';
    } else {
      $scope.expanded[id] = 'short';
    }
  }

})

.controller('AboutCtrl', function($scope) {
  
})

.controller('SearchCtrl', function($scope, Instruments){
  $scope.instruments = Instruments.instruments;
});
