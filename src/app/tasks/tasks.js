angular.module( 'frontdesk.tasks', [
  'ui.router',
  'plusOne',
  'tasks.new'
  ])

// Route configuration
.config(function config( $stateProvider ) {
  $stateProvider.state( 'tasks', {
    url: '/tasks',
    controller: 'TasksCtrl',
    templateUrl: 'tasks/tasks.tpl.html',
    data:{ pageTitle: 'Tasks' }
  });
})

// Tasks controller
.controller( 'TasksCtrl', function TasksController( $scope, $http ) {
  $http.get('https://frontdesk-api.herokuapp.com/api/tasks').
  success(function(data, status, headers, config) {
    $scope.tasks = data.tasks;
  }).
  error(function(data, status, headers, config) {
  });
});

