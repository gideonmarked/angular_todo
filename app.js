angular
.module('todoApp',['ngMaterial',"ngRoute"])
.factory('Services', function () {
    var todos = [
      {
        title: 'Lorem ipsum dolor sit amet',
        description: 'Consectetur adipiscing elit. Vivamus ac tortor nec nibh consequat volutpat ac in nulla.',
        deleted: false,
        completed: false
      },
      {
        title: 'Morbi dignissim nisi eu placerat hendrerit',
        description: 'Phasellus semper euismod nunc, a interdum nulla ultrices quis.',
        deleted: false,
        completed: false
      },
      {
        title: 'Etiam eu dapibus eros, sed egestas urna',
        description: 'Pellentesque justo felis, tincidunt sed tempor eu, porta sed enim.',
        deleted: false,
        completed: false
      },
      {
        title: 'Vivamus elementum congue leo',
        description: 'Feugiat efficitur magna volutpat viverra. Curabitur augue ex, commodo quis risus in, rhoncus maximus turpis.',
        deleted: false,
        completed: false
      },
    ];
    var currentToDo = null;
    return {
        setToDos: function(updated_todos) {
            todos = updated_todos;
        },
        setCurrent: function(current_todo) {
            currentToDo = current_todo;
        },
        getToDos: function () {
            return todos;
        },
        getCurrent: function () {
            return currentToDo;
        }
    };
})
.config(function($mdThemingProvider,$routeProvider) {
  $mdThemingProvider.theme('docs-dark', 'default')
      .primaryPalette('blue')
      .dark();
  $routeProvider
  .when("/", {
    templateUrl : "main.html",
    controller: "ListCtrl"
  })
  .when("/edit", {
    templateUrl : "edit.html",
    controller: "EditCtrl"
  });
})
.controller('ListCtrl', function($scope, $filter, $location, Services) {
    $scope.newTodo = '';
    $scope.ids = 0;
    $scope.todos = Services.getToDos();
    $scope.current_todo = Services.getCurrent();

    $scope.$watch('todos', function () {
      Services.setToDos($scope.todos);
      $scope.count = $scope.todos.length;
      $scope.completed_count = $filter('filter')($scope.todos, { completed: true }).length;
      $scope.deleted_count = $filter('filter')($scope.todos, { deleted: true }).length;
    }, true);

    $scope.addToDo = function () {
      $scope.todos.unshift({
          title: $scope.newTodo.trim(),
          description: '',
          deleted: false,
          completed: false
      });
    };

    $scope.toggleCompleted = function (todo) {
      todo.completed = todo.completed;
    };

    $scope.deleteItem = function (todo) {
      todo.deleted = true;
    };

    $scope.editItem = function(todo) {
      Services.setCurrent(todo);
      $location.path('/edit');
    };
})
.controller('EditCtrl', function($scope, $location, Services) {
    $scope.newTitle = '';
    $scope.newDescription = '';
    $scope.todos = Services.getToDos();
    $scope.current_todo = Services.getCurrent();
    $scope.returnIndex = function ( ) {
      $location.path('/');
    };
});