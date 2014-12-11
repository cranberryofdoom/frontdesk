angular.module( 'frontdesk.users', [
  'ui.router',
  'plusOne'
])

// Route configuration
.config(function config( $stateProvider ) {
  $stateProvider.state( 'users', {
    url: '/users',
    views: {
      "main": {
        controller: 'UsersCtrl',
        templateUrl: 'users/users.tpl.html'
      }
    },
    data:{ pageTitle: 'Users' }
  });
})

// Users controller
.controller( 'UsersCtrl', function UsersController( $scope, $http ) {
  $http.get('https://frontdesk-api.herokuapp.com/api/users').
  success(function(data, status, headers, config) {
    $scope.users = data.users;
  }).
  error(function(data, status, headers, config) {
  });
});

