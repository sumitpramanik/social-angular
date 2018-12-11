// Code goes here
var app = angular.module("socialApp", []);
app.controller("myCtrl", function($scope, peopleService) {

  $scope.maxRating = 5;
  $scope.getPersonInfo = function(person) {
    $scope.person = person;
    $scope.username = person.name
    $scope.show = true;
  }

  $scope.setSearchValue = function(data) {
    $scope.searchValue = data
  }
  peopleService.getPeople().then(function(res) {
    $scope.people = res.data.People;
  }).then(function(err){
    console.log(err)
  })
})
app.directive("navbar", [function() {
  return {
    scope: {
      callback: "&",
      username:"="
    },
    templateUrl: "navBar.html",
    controller: ['$scope', function($scope) {
      $scope.searching = function(data) {
        //console.log(data)
        $scope.callback({
          data: data
        });
      }
    }]
  };
}]);
app.directive("mySideBar", function() {
  return {
    restrict: 'E',
    scope: {
      data: "=",
      search: "=",
      handleClick: "&"
    },
    templateUrl: "sideBar.html",
    link: function(scope) {
      scope.onListClick = function(data) {
        console.log(data)
        scope.handleClick({
          data: data
        })
      }

    }
  }
})
app.directive("myDisplayPic", function() {
  return {
    scope: {
      url: "="
    },
    templateUrl: "displayPic.html"
  }
})
app.directive("heartRating", function() {
  return {
    scope: {
      max: "=",
      rating: "="
    },
    templateUrl: "rating.html",
    link: function(scope, element, attrs) {
      scope.$watch('rating', function(newVal) {
        scope.hearts = [];
        for (var i = 1; i <= scope.max; i++) {
          scope.hearts.push(i)
        }
      })
    }

  }
})
app.directive("customTable", function() {
  return {
    scope: {
      person: "="
    },
    templateUrl: "table.html"

  }
})
app.service("peopleService", peopleService)

function peopleService($http) {
  this.getPeople = function() {
    return $http.get('./people.json')
  }
}