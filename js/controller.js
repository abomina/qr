'use strict';

const modules = [
  'ngRoute',
  'webcam',
  'bcQrReader',
  'ngStorage'
];
var app = angular.module("myApp", modules);

app.config(function($routeProvider, $locationProvider) {

    $routeProvider

    .when('/', {

        templateUrl : 'views/login.html',
        controller: "loginController"

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

    .when('/main', {

        templateUrl : 'views/main.html',

        controller: "homeController"

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
app.factory("auth", function($sessionStorage,$location,$http)
{
    return{
        loginRegister : function(username, password)
        {
            $sessionStorage.username = username,
            $sessionStorage.password = password;
            $location.path("/main");
        },
        login : function(username, password)
        {
            //creamos la cookie con el nombre que nos han pasado
            var request = $http({
                method: "post",
                url: "userlogin.php",
                data: {
                    user: username,
                    pass: password
                },
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
            });
            /* Check whether the HTTP Request is Successfull or not. */
            request.success(function (data) {
                if(data!=""){
                    $sessionStorage.username = username,
                    $sessionStorage.password = password;
                    $location.path("/main");
                }else{
                    alert("nombre de usuario o contraseña incorrectos");
                }
            });
            //mandamos a la home
            
        },
        logout : function()
        {
            //al hacer logout eliminamos la cookie con $sessionStorage.remove
            delete $sessionStorage.username;
            delete $sessionStorage.password;
            //mandamos al login
            $location.path("/");
        },
        checkStatus : function()
        {
            //creamos un array con las rutas que queremos controlar
            var rutasPrivadas = ["/form","/qr","/report","/main"];
            if(this.in_array($location.path(),rutasPrivadas) && typeof($sessionStorage.username) == "undefined")
            {
                $location.path("/");
            }
            //en el caso de que intente acceder al login y ya haya iniciado sesión lo mandamos a la home
            if(this.in_array("/",rutasPrivadas) && typeof($sessionStorage.username) != "undefined")
            {
                $location.path("/main");
            }
        },
        in_array : function(needle, haystack)
        {
            var key = '';
            for(key in haystack)
            {
                if(haystack[key] == needle)
                {
                    return true;
                }
            }
            return false;
        }
    }
});
//creamos el controlador pasando $scope y $http, así los tendremos disponibles
app.controller('loginController', function($scope,$http,auth) 
{
    //la función login que llamamos en la vista llama a la función
    //login de la factoria auth pasando lo que contiene el campo
    //de texto del formulario
    $scope.login = function()
    {
        auth.login($scope.username, $scope.password);
    }
    $scope.register = function()
    {
        var request = $http({
            method: "post",
            url: "userregister.php",
            data: {
                user: $scope.usernamer,
                pass: $scope.passwordr,
                email: $scope.emailr

            },
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
        });
        /* Check whether the HTTP Request is Successfull or not. */
        request.success(function (data) {
            if(data!="true"){
                auth.loginRegister($scope.usernamer, $scope.passwordr);
            }else{
                alert("error");
            }
        });
        
    }
 
});
 
 
//creamos el controlador pasando $scope y auth
app.controller('homeController', function($scope, $sessionStorage, auth) 
{
    //devolvemos a la vista el nombre del usuario
    $scope.username = $sessionStorage.username;
    $scope.password = $sessionStorage.password;
    //la función logout que llamamos en la vista llama a la función
    //logout de la factoria auth
    $scope.logout = function()
    {
        auth.logout();
    }
 
});
 
 
//mientras corre la aplicación, comprobamos si el usuario tiene acceso a la ruta a la que está accediendo
app.run(function($rootScope, auth)
{
    //al cambiar de rutas
    $rootScope.$on('$routeChangeStart', function()
    {
        //llamamos a checkStatus, el cual lo hemos definido en la factoria auth
        //la cuál hemos inyectado en la acción run de la aplicación
        auth.checkStatus();
    })
})