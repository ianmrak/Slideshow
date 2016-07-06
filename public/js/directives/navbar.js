angular.module('Slideshow.navbar', [])

.directive('topBar', function() {
  return {
    retrict: 'E',
    templateUrl: 'views/navbar.html'
  };
});
