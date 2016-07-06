angular.module('Slideshow.footer', [])

.directive('bottomBar', function() {
  return {
    retrict: 'E',
    templateUrl: 'views/footer.html'
  };
});
;angular.module('Slideshow.navbar', [])

.directive('topBar', function() {
  return {
    retrict: 'E',
    templateUrl: 'views/navbar.html'
  };
});
;angular.module('Slideshow.transition', [])

.directive('slide', function(Slides, $state) {
  return {
    link: function($scope, e, attr) {
      document.onkeyup = function(e) {
        if (e.keyCode == '39' || e.keyCode == '37') {
          if (e.keyCode == '39') {
            if ($scope.id < $scope.slide.count) {
              $scope.id++;
              Slides.transition('right');
            }
          }
          else if (e.keyCode == '37') {
            if ($scope.id > 1) {
              $scope.id--;
              Slides.transition('left');
            }
          }
          $state.go('slides', {id:$scope.id});
        }
        else {
          if (e.keyCode == '40') {
            if ($scope.index > 0) {
              $scope.index--;
            }
          }
          else if (e.keyCode == '38') {
            if ($scope.index < $scope.slide.img.length-1) {
              $scope.index++;
            }
          }
          $scope.$apply(function() {
            $scope.slide.image = $scope.slide.img[$scope.index];
          });
        }
      };
    }
  };
});
;angular.module('Slideshow.presentation', [])

.controller('SlideController', function($scope, $stateParams, $state, Slides) {
  $scope.id = parseInt($stateParams.id);
  $scope.index = 0;
  Slides.getSlides($scope.id, function(data, length) {
    $scope.slide = data;
    $scope.slide.count = length;
    $scope.slide.image = $scope.slide.img[$scope.index];
  });
});
;angular.module('Slideshow.slides', [])

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
  };
  return {
    getSlides: getSlides,
    transition: slideTransition
  };
});
;angular.module('Slideshow',
[
'Slideshow.slides',
'Slideshow.footer',
'Slideshow.navbar',
'Slideshow.presentation',
'Slideshow.transition',
'ui.router',
'ngAnimate'
])

.config(function($stateProvider, $urlRouterProvider) {
  $urlRouterProvider.otherwise('/slides/1');
  $stateProvider
  .state('slides', {
    url: '/slides/:id',
    templateUrl: 'views/slide.html',
    controller: 'SlideController'
  });
});
