var todoApp = angular.module('todoApp', ['firebase']);

todoApp.factory("todoFact", function ($firebaseArray) {

  var ref = new Firebase("https://radiant-inferno-6106.firebaseio.com/Todo");


  return $firebaseArray(ref);
});

todoApp.controller("todoCtrl", function ($scope, todoFact) {
  //$scope.todoList=[];
  $scope.filter = {};
  $scope.myData = todoFact;
//		$scope.todoClear = function(){
//        			var newTodo = [];
//        			angular.forEach($scope.todoList,
//        				function(todo){
//        					if(!todo.complete)
//        					newTodo.push(todo);
//        				});
//        			$scope.todoList = newTodo;
//        		};
  $scope.todoClear = function () {
    angular.forEach($scope.myData,
      function (todo) {
        if (todo.complete) {
          $scope.myData.$remove(todo);
        }
      });

  };
  $scope.todoEnterSave = function () {
    if (event.keyCode == 13) {
      $scope.todoAdd();
    }
  };
//		$scope.todoAdd = function(){
//                			if($scope.todoText)
//                			{
//                					$scope.todoList.unshift({text:$scope.todoText,complete:false});
//                					$scope.todoText='';
//                			}
//                		};
  $scope.todoAdd = function () {
    if ($scope.todoText) {
      $scope.myData.$add({text: $scope.todoText, complete: false});
      $scope.todoText = '';
    }
  };

//		$scope.todoCheckBoxAll=function(){
//        			angular.forEach($scope.todoList,function(todo){
//        			todo.complete=$scope.CheckAll;
//        			});
//        		};
  $scope.todoCheckBoxAll = function () {
    angular.forEach($scope.myData, function (todo) {
      todo.complete = $scope.CheckAll;
    });
  };
  $scope.toggleEditMode = function () {
    $(event.target).closest('li').toggleClass('editing');

  };
  $scope.todoOnEnter = function (todo) {
    if (event.keyCode == 13 && todo.text) {
      $scope.toggleEditMode();

    }
  };

  $scope.remaining = function () {
    var count = 0;
    angular.forEach($scope.myData, function (todo) {
      count += todo.complete ? 0 : 1; // todo.complete true hoặc false
    });
    return count;
  };
//		$scope.remaining = function(){
//			var count = 0;
//			angular.forEach($scope.todoList,function(todo){
//				 count += todo.complete ? 0 : 1; // todo.complete true hoặc false
//				});
//			return count;
//		};
  $scope.todoTotal = function () {
    return $scope.myData.length;
  }
//		$scope.todoTotal= function(){
//			return $scope.todoList.length;
//		}


});