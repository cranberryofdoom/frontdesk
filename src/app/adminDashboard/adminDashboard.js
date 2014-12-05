
angular.module( 'frontdesk.adminDashboard', [
  'ui.router',
  'plusOne'
])
.config(function config( $stateProvider ) {
  $stateProvider.state( 'dashboard', {
    url: '/dashboard',
    views: {
      "main": {
        controller: 'AdminDashboardCtrl',
        templateUrl: 'adminDashboard/adminDashboard.tpl.html',
        controllerAs: 'adminDashboardCtrl'
      }
    },
    data:{ pageTitle: 'Admin Dashboard' }
  });
})
.controller( 'AdminDashboardCtrl', function AdminDashboardController( $scope ) {
});

