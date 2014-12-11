angular.module( 'frontdesk.signIn', [
  'ui.router',
  'plusOne'
  ])

// Route configuration
.config(function config($stateProvider) {
  $stateProvider.state( 'signIn', {
    url: '/signIn',
    controller: 'SignInCtrl',
    templateUrl: 'signIn/signIn.tpl.html',
    data:{ pageTitle: 'SignIn' }
  });
})

// Sign In controller
.controller('SignInCtrl', function SignInController($scope, $rootScope, AUTH_EVENTS, AuthService) {
  $scope.user = {
    email: '',
    password: '',
    remember: false
  };

  $scope.submitted = false;

  // Method that controls the request and response logic using the form data
  $scope.signIn = function (user) {
    if ($scope.SignInForm.$valid) {
      var userSanitized = {
        login: user.email,
        password: user.password
      };
      AuthService.signIn(userSanitized).then(function () {
        $rootScope.$broadcast(AUTH_EVENTS.loginSuccess);
        $scope.setCurrentUser(userSanitized);
      }, function (res) {
        $rootScope.$broadcast(AUTH_EVENTS.loginFailed);
      });
    } else {
      $scope.SignInForm.submitted = true;
    }
  };
})

// Factory that handles authentication
.factory('AuthService', function ($http, Token) {
  var authService = {};

  // Method that sends the HTTP request
  authService.signIn = function (credentials) {
    return $http.post('https://frontdesk-api.herokuapp.com/api/v1/auth/login', credentials).then(function (res) {

      // Create the user session
      Token.create(res.data.token, credentials.login);
      return credentials.login;
    }, function (res) {

      // Throws error if incorrect credentials
      throw res.statusText;
    });
  };

  // Method that returns the session
  authService.isAuthenticated = function () {
    return !!Token.userId;
  };

  // Method that returns authorization
  authService.isAuthorized = function (authorizedRoles) {
    if (!angular.isArray(authorizedRoles)) {
      authorizedRoles = [authorizedRoles];
    }
    return (authService.isAuthenticated() &&
      authorizedRoles.indexOf(Token.userRole) !== -1);
  };

  return authService;
})

// Service that contains all information about token, user and role
.service('Token', function () {
  this.create = function (userToken, userId) {
    this.id = userToken;
    this.userId = userId;
  };
  this.destroy = function () {
    this.id = null;
    this.userId = null;
  };
  return this;
})

// Constants
.constant('AUTH_EVENTS', {
  loginSuccess: 'auth-login-success',
  loginFailed: 'auth-login-failed',
  logoutSuccess: 'auth-logout-success',
  sessionTimeout: 'auth-session-timeout',
  notAuthenticated: 'auth-not-authenticated',
  notAuthorized: 'auth-not-authorized'
});

