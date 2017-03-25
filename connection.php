<?php
/*
 conexion
*/
$serverName = "173.163.175.227"; //serverName\instanceName
$connectionInfo = array( "Database"=>"spreasheet", "UID"=>"sa", "PWD"=>"Insolsap1");
$conn = sqlsrv_connect( $serverName, $connectionInfo);

if( $conn ) {
     echo "Conexión establecida.<br />";
}else{
     echo "Conexión no se pudo establecer.<br />";
     die( print_r( sqlsrv_errors(), true));
}
?>