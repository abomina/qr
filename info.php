<?php
require('connection.php');
$postdata = file_get_contents("php://input");
$request = json_decode($postdata);
@$fechaini = $request->datef;
@$fechafin = $request->datet;

$sql = "SELECT qr,dateqr FROM data WHERE dateqr BETWEEN '".$fechaini."' and '".$fechafin."'";
$stmt = sqlsrv_query( $conn, $sql);
while( $obj = sqlsrv_fetch_object( $stmt)) {
	$qr=$obj->qr;
    $date=date_format($obj->dateqr,"y-m-d");
    $ss[] = array('qr'=> $qr, 'date'=> $date);
}
$json_string = json_encode($ss,JSON_UNESCAPED_UNICODE);
echo $json_string;
?>