<?php
	require('connection.php');

	$postdata = file_get_contents("php://input");
    $request = json_decode($postdata);
    @$purl = $request->purl;
    /*$sql = "DELETE FROM data";
    $stmt = sqlsrv_query( $conn, $sql);*/
    //echo $purl;
    $hoy = getdate();
    $date=$hoy["year"]."-".$hoy["mon"]."-".$hoy["mday"];
    $sql1 = "INSERT INTO `data`(`dateqr`, `qr`) VALUES ('$date','$purl')";
    if(mysqli_query( $connection, $sql1)){
		echo "<br> ------------ <br> Se hizo <br>---------------<br>";
	}else{
		echo "<br> ------------ <br> No se hizo <br>---------------<br>";
	}
    $sql = "SELECT `qr`, `dateqr` FROM `data`";
    $stmt = mysqli_query( $connection, $sql);
    while( $obj = mysql_fetch_object( $stmt)) {
    	echo "QR: ".$obj->qr." Date:".date_format($obj->dateqr,"y-m-d")."<br>";
	}
	
?>