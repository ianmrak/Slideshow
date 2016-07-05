angular.module('Slideshow.slides', [])

.factory('Slides', function($http) {

  var getSlides = function(id, cb) {
    return $http({
      method: 'GET',
      url: '/slides/' + id
    })
    .then(function(resp) {
      cb(resp.data[id-1], resp.data.length);
    });
  };

  var slideTransition = function(newDirection) {
    var oldDirection = newDirection === 'left' ? 'right' : 'left';
    document.body.classList.remove(oldDirection);
    document.body.classList.add(newDirection);
  }
  return {
    getSlides: getSlides,
    transition: slideTransition,
  };
});
