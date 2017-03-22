'use strict';

const modules = [
  'ngRoute',
  'webcam',
  'bcQrReader'
];
var app = angular.module("myApp", modules);

app.config(function($routeProvider, $locationProvider) {

    $routeProvider

    .when('/', {

        templateUrl : 'views/main.html',


    })

    .when('/form', {

        templateUrl : 'views/form.html',

    })

    .when('/qr', {

        templateUrl : 'views/qr.html',

        controller: "DemoCtrl"

    })
    //$locationProvider.html5Mode(true);

});
app.controller("DemoCtrl",function($scope,$http){
    $scope.start = function() {
        $scope.cameraRequested = true;
    }
    $scope.processURLfromQR = function (url) {
        $scope.url = url;
        $scope.cameraRequested = false;
        var request = $http({
            method: "post",
            url: "product.php",
            data: {
                purl: $scope.url
            },
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
        });
        /* Check whether the HTTP Request is Successfull or not. */
        request.success(function (data) {
            console.log(data);
        });
        //}
        //else {
        //    $scope.message = "You have Filled Wrong Details! Error: " + error;
        //}
    }
});