angular.module( 'frontdesk', [
  'templates-app',
  'templates-common',
  'frontdesk.home',
  'frontdesk.signIn',
  'frontdesk.tasks',
  'ui.router'
  ])

// Directs to default route
.config( function myAppConfig ( $stateProvider, $urlRouterProvider ) {
  $urlRouterProvider.otherwise( '/home' );
})

.config(['$httpProvider', function($httpProvider) {
  $httpProvider.defaults.useXDomain = true;
  delete $httpProvider.defaults.headers.common["X-Requested-With"];
  $httpProvider.defaults.headers.common["Accept"] = "application/json";
  $httpProvider.defaults.headers.common["Content-Type"] = "application/json";
}])

// Runs method to execute any code after services have been instantiated
.run( function run () {
})

// A good place for logic not specific to the template or route, such as menu logic or page title wiring
.controller( 'AppCtrl', function AppCtrl ( $scope, $location, USER_ROLES, AUTH_EVENTS, AUTH_MESSAGES, ALERT_TYPES ) {

  // Change the page title to the respective page
  $scope.$on('$stateChangeSuccess', function(event, toState, toParams, fromState, fromParams){
    if ( angular.isDefined( toState.data.pageTitle ) ) {
      $scope.pageTitle = toState.data.pageTitle + ' | Frontdesk' ;
    }
  });

  // Initialize current user settings
  $scope.currentUser = null;
  $scope.userRoles = USER_ROLES;

  // Initalize current alert settings
  $scope.alertType = null;
  $scope.alertMessage = null;

  // Method that sets the current user
  $scope.setCurrentUser = function (user) {
    $scope.currentUser = user;
  };

  // Respond to failed login
  $scope.$on(AUTH_EVENTS.loginFailed, function(event){
    $scope.alertType = ALERT_TYPES.danger;
    $scope.alertMessage = AUTH_MESSAGES.loginFailed;
  });

  // Respond to successful login
  $scope.$on(AUTH_EVENTS.loginSuccess, function(event){
    $scope.alertType = ALERT_TYPES.success;
    $scope.alertMessage = AUTH_MESSAGES.loginSuccess;
  });
})

// Constants
.constant('USER_ROLES', {
  all: '*',
  admin: 'admin',
  volunteer: 'volunteer'
})
.constant('AUTH_EVENTS', {
  loginSuccess: 'auth-login-success',
  loginFailed: 'auth-login-failed',
  logoutSuccess: 'auth-logout-success',
  sessionTimeout: 'auth-session-timeout',
  notAuthenticated: 'auth-not-authenticated',
  notAuthorized: 'auth-not-authorized'
})
.constant('ALERT_TYPES', {
  danger: 'alert-danger',
  info: 'alert-info',
  success: 'alert-success',
  warning: 'alert-warning'
})
.constant('AUTH_MESSAGES', {
  loginSuccess: 'Sign in successful.',
  loginFailed: 'Sign in failed.',
  logoutSuccess: 'Sign out successful',
  sessionTimeout: 'auth-session-timeout',
  notAuthenticated: 'auth-not-authenticated',
  notAuthorized: 'auth-not-authorized'
})
;

