<?php
	require('connection.php');
	$postdata = file_get_contents("php://input");
    $request = json_decode($postdata);
    @$purl = $request->purl;
    echo gettype($purl);
    //echo $purl;
    $sql1 = "INSERT INTO data (qr)
         VALUES (?)";
	$params1 = array( $purl);
	if(sqlsrv_query( $conn, $sql1, $params1 )){
		echo "<br> ------------ <br> Se hizo <br>---------------<br>";
	}else{
		echo "<br> ------------ <br> NO se hizo <br>---------------<br>";
	}
    $sql = "SELECT qr FROM data";
    $stmt = sqlsrv_query( $conn, $sql);
    while( $obj = sqlsrv_fetch_object( $stmt)) {
    	echo $obj->qr."<br>";
	}
?>