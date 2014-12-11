angular.module( 'frontdesk.home', [
  'ui.router',
  'plusOne'
  ])

.config(function config( $stateProvider ) {
  $stateProvider.state( 'home', {
    url: '/home',
    controller: 'HomeCtrl',
    templateUrl: 'home/home.tpl.html',
    data:{ pageTitle: 'Home' }
  });
})

.controller( 'HomeCtrl', function HomeController( $scope ) {
});

