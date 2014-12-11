angular.module( 'frontdesk.accounts', [
  'ui.router',
  'plusOne'
])

// Route configuration
.config(function config( $stateProvider ) {
  $stateProvider.state( 'accounts', {
    url: '/accounts',
    views: {
      "main": {
        controller: 'AccountsCtrl',
        templateUrl: 'accounts/accounts.tpl.html'
      }
    },
    data:{ pageTitle: 'Accounts' }
  });
})

// Accounts controller
.controller( 'AccountsCtrl', function AccountsController( $scope, $http ) {
  $http.get('https://frontdesk-api.herokuapp.com/api/accounts').
  success(function(data, status, headers, config) {
    $scope.accounts = data.accounts;
  }).
  error(function(data, status, headers, config) {
  });
});

