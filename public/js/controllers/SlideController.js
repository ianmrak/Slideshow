angular.module('Slideshow.presentation', [])

.controller('SlideController', function($scope, $stateParams, $state, Slides) {
  $scope.id = parseInt($stateParams.id);
  $scope.index = 0;
  Slides.getSlides($scope.id, function(data, length) {
    $scope.slide = data;
    $scope.slide.count = length;
    $scope.slide.image = $scope.slide.img[$scope.index];
  });
});
