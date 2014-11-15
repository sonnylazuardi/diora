angular.module('inklusik.services', ['ngAudio', 'ngCordova'])

.service('Player', function(ngAudio, ngAudioObject, $cordovaMedia) {
    function Player (url) {
      return ngAudio.play(url);
    }
    return Player;
})

.factory('Song', function($http, serverUrl, $q) {
  var self = this;
  self.getById = function(song_id) {
    var def = $q.defer();
    console.log(serverUrl+'music/'+song_id+'/details');
    $http.get(serverUrl+'music/'+song_id+'/details').success(function(data) {
      console.log(data);  
      var song = data.data;
      song.CoverArtFilename = 'http://images.gs-cdn.net/static/albums/' + song.CoverArtFilename;
      $http.get(serverUrl+'music/'+song_id+'/stream').success(function(data2) {
        song.filename = data2.data.url;
        def.resolve(song);
      });
    });
    return def.promise;
  }
  self.like = function() {
    $http.get(serverUrl+'music/');
  }
  self.dislike = function() {
    $http.get(''); 
  }
  return self;
})

.factory('Lyric', function($http, serverUrl, $q) {
  var self = this;
  self.get = function(artist, title) {
    var def = $q.defer();
    $http.get(serverUrl+'music/lyric/'+artist+'/'+title).success(function(data) {
      var text = $(data).find('pre').html();
      def.resolve(text);
    });
    return def.promise;
  }
  return self;
});