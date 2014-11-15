angular.module('inklusik.services', ['ngAudio', 'ngCordova'])

.service('Player', function(ngAudio, ngAudioObject, $cordovaMedia) {
    function Player (url) {
      return ngAudio.play(url);
    }
    return Player;
});