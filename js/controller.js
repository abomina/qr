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

    .when('/report', {

        templateUrl : 'views/report.html',

        controller: "report"

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
app.controller("report",function($scope,$http){
    $('#datetimepicker6').datetimepicker({
    format: 'YYYY-MM-DD'
    });
    $('#datetimepicker7').datetimepicker({
      useCurrent: false, //Important! See issue #1075
      format: 'YYYY-MM-DD'
    });
    $("#datetimepicker6").on("dp.change", function (e) {
      $('#datetimepicker7').data("DateTimePicker").minDate(e.date);
    });
    $("#datetimepicker7").on("dp.change", function (e) {
      $('#datetimepicker6').data("DateTimePicker").maxDate(e.date);
    });
    $scope.search = function() {
        $scope.date1=document.getElementById("datef").value;
        $scope.date2=document.getElementById("datet").value;
        if($scope.date1=="" || $scope.date2==""){
            alert("Must record dates");
        }else{
            var request = $http({
                method: "post",
                url: "info.php",
                data: {
                    datef: $scope.date1,
                    datet: $scope.date2
                },
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
            });
            /* Check whether the HTTP Request is Successfull or not. */
            request.success(function (data) {
                $scope.est = data;
                console.log(data);
            });
            //}
            //else {
            //    $scope.message = "You have Filled Wrong Details! Error: " + error;
            //}
        }
    }
});
app.controller("form",function($scope,$http){
    $('#datetimepicker3').datetimepicker({
    format: 'LT'
    });
    $('#datetimepicker4').datetimepicker({
      useCurrent: false, //Important! See issue #1075
      format: 'LT'
    });
});