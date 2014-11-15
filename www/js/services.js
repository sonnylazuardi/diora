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
})

.factory('Trend', function($http, serverUrl, $q){
  var self = this;
  self.getToday = function(){
    var def = $q.defer();
    $http.get(serverUrl+'music/popular/today?limit=8').success(function(data){
      var song = data.data;
      for (var i=0;i<song.length;i++){
        if (song[i].CoverArtFilename != null && song[i].CoverArtFilename != "")
          song[i].CoverArtFilename = 'http://images.gs-cdn.net/static/albums/' + song[i].CoverArtFilename;
        else 
          song[i].CoverArtFilename = 'img/album.jpg';
      }
      def.resolve(song);
    });
    return def.promise;
  }
  self.getThisMonth = function(){
    var def = $q.defer();
    $http.get(serverUrl+'music/popular/month?limit=8').success(function(data){
      var song = data.data;
      for (var i=0;i<song.length;i++){
        if (song[i].CoverArtFilename != null && song[i].CoverArtFilename != "")
          song[i].CoverArtFilename = 'http://images.gs-cdn.net/static/albums/' + song[i].CoverArtFilename;
        else 
          song[i].CoverArtFilename = 'img/album.jpg';
      }
      def.resolve(song);
    });
    return def.promise;
  }
  return self;
})

.factory('Search', function($http, serverUrl, $q){
  var self = this;
  self.search = function(query){
    var def = $q.defer();
    console.log(serverUrl+'music/search/song?query='+query);
    $http.get(serverUrl+'music/search/song?query='+query).success(function(data){
      console.log(data);
      var song = data.data;
      for (var i=0;i<song.length;i++){
        if (song[i].CoverArtFilename != null && song[i].CoverArtFilename != "")
          song[i].CoverArtFilename = 'http://images.gs-cdn.net/static/albums/' + song[i].CoverArtFilename;
        else 
          song[i].CoverArtFilename = 'img/album.jpg';
      }
      def.resolve(song);
    });
    return def.promise;
  }
  return self;
});