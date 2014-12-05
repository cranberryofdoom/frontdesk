angular.module( 'frontdesk', [
  'templates-app',
  'templates-common',
  'frontdesk.home',
  'frontdesk.about',
  'frontdesk.signIn',
  'frontdesk.adminDashboard',
  'ui.router'
])

.config( function myAppConfig ( $stateProvider, $urlRouterProvider ) {
  $urlRouterProvider.otherwise( '/home' );
})

.run( function run () {
})

.controller( 'AppCtrl', function AppCtrl ( $scope, $location, USER_ROLES ) {

  // Change the page title to the respective page
  $scope.$on('$stateChangeSuccess', function(event, toState, toParams, fromState, fromParams){
    if ( angular.isDefined( toState.data.pageTitle ) ) {
      $scope.pageTitle = toState.data.pageTitle + ' | Frontdesk' ;
    }
  });

  // Initialize current user settings
  $scope.currentUser = null;
  $scope.userRoles = USER_ROLES;

  $scope.setCurrentUser = function (user) {
    $scope.currentUser = user;
    console.log($scope.currentUser);
  };
})

.constant('USER_ROLES', {
  all: '*',
  admin: 'admin',
  volunteer: 'volunteer'
});

