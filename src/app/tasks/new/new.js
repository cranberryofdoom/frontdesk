angular.module( 'tasks.new', [
	'ui.router',
	'plusOne'
  ])

.config(function config( $stateProvider ) {
  $stateProvider.state('new', {
    url: '/tasks/new',
    controller: 'TasksNewCtrl',
    views: {
      '': {
        templateUrl: 'tasks/new/new.tpl.html'
      },
      'define@new': {
        templateUrl: 'tasks/new/partials/define.tpl.html'
      }
    },
    data:{ pageTitle: 'New Tasks' }
});
})

.controller( 'TasksNewCtrl', function TasksNewController( $scope, $http ) {
  console.log("message");
});