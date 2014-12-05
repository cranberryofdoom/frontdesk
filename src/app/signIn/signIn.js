angular.module( 'frontdesk.signIn', [
  'ui.router',
  'plusOne'
  ])

// Route configuration
.config(function config( $stateProvider ) {
  $stateProvider.state( 'signIn', {
    url: '/signIn',
    views: {
      "main": {
        controller: 'SignInCtrl',
        templateUrl: 'signIn/signIn.tpl.html'
      }
    },
    data:{ pageTitle: 'SignIn' }
  });
})

// Sign In Controller
.controller('SignInCtrl', function SignInController( $scope, $rootScope, AUTH_EVENTS, AuthService ) {
  $scope.user = {
    email: '',
    password: '',
    remember: false
  };

  // Method that controls the request and response logic using the form data
  $scope.signIn = function(user){
    $scope.setCurrentUser(user);
    // AuthService.signIn(user).then(function(){
    //   $rootScope.$broadcast(AUTH_EVENTS.loginSuccess);
    //   $scope.setCurrentUser(user);
    // }, function(){
    //   $rootScope.$broadcast(AUTH_EVENTS.loginFailed);
    // });
  };

  
})

// Constants
.constant('AUTH_EVENTS', {
 loginSuccess: 'auth-login-success',
 loginFailed: 'auth-login-failed',
 logoutSuccess: 'auth-logout-success',
 sessionTimeout: 'auth-session-timeout',
 notAuthenticated: 'auth-not-authenticated',
 notAuthorized: 'auth-not-authorized'
})


// Factory that handles authentication
.factory('AuthService', function ($http, Session) {
  var authService = {};

  // Method that sends the HTTP request
  authService.signIn = function (credentials) {
    return $http.post('/login', credentials).then(function (res) {
      
      // Create the user session
      Session.create(res.data.id, res.data.user.id,
       res.data.user.role);
      return res.data.user;
    });
  };

  // Method that returns the session
  authService.isAuthenticated = function () {
    return !!Session.userId;
  };

  // Method that returns authorization
  authService.isAuthorized = function (authorizedRoles) {
    if (!angular.isArray(authorizedRoles)) {
      authorizedRoles = [authorizedRoles];
    }
    return (authService.isAuthenticated() &&
      authorizedRoles.indexOf(Session.userRole) !== -1);
  };

  return authService;
})

// Service that contains all information about session, user and role
.service('Session', function () {
  this.create = function (sessionId, userId, userRole) {
    this.id = sessionId;
    this.userId = userId;
    this.userRole = userRole;
  };
  this.destroy = function () {
    this.id = null;
    this.userId = null;
    this.userRole = null;
  };
  return this;
});

