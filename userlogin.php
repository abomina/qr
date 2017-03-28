<?php
	require('connection.php');
	$postdata = file_get_contents("php://input");
    $request = json_decode($postdata);
    @$pass = $request->pass;
    @$user = $request->user;
    $resultado =$connection->query("SELECT * FROM user WHERE usu_user='".$user."' and usu_pass='".md5($pass)."'");
    $datos = $resultado->fetch_assoc();
    echo $datos['usu_code'];
?>