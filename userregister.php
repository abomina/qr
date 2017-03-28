<?php
	require('connection.php');
	$postdata = file_get_contents("php://input");
    $request = json_decode($postdata);
    @$pass = $request->pass;
    @$user = $request->user;
    @$email = $request->email;
    if($connection->query("INSERT INTO user(usu_user,usu_pass,usu_email)values('".$user."','".md5($pass)."','".$email."')")){
    	echo "true";	
    }else{
    	echo "false";
    }
    
?>