angular.module('Slideshow.transition', [])

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
      }
    }
  }
});
