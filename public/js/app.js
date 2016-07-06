angular.module('Slideshow',
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
