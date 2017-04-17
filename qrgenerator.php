<?php
require("TCPDF/tcpdf.php");
// conexion bd
//require('connection.php');
//$sql1 = "SELECT * FROM package";
//$resultado =$connection->query($sql1);

/* estructura de datos */
$datos=array();
$datos[0]=array(
    "orderclientnum" => "1",
    "delivery" => "1",
    "partner"   => "BDG",
    "address"  => "cra 10",
    "barcode" => "11",
    "palletcount" => "1",
    "pallettotal" => "1",
);
$datos[1]=array(
    "orderclientnum" => "2",
    "delivery" => "2",
    "partner"   => "BDG",
    "address"  => "cra 10",
    "barcode" => "12",
    "palletcount" => "1",
    "pallettotal" => "1",
);
/* fin estructura */
$pdf = new TCPDF("P", "mm", 'A4', true, 'UTF-8', false);
$pdf->SetPrintHeader(false);
$pdf->SetPrintFooter(false);
$pdf->SetAutoPageBreak(TRUE, 0);
$pdf->AddPage();
$pdf->SetLeftMargin(40);

	// new style
$style = array(
    'border' => 2,
    'vpadding' => 'auto',
    'hpadding' => 'auto',
    'fgcolor' => array(0,0,0),
    'bgcolor' => false, //array(255,255,255)
    'module_width' => 1, // width of a single module in points
    'module_height' => 1 // height of a single module in points
);
$posyCOD=30;
$posyPartner=25;
//while($qr = $resultado->fetch_assoc()){
for($i=0;$i<count($_POST["chkqr"]);$i++){
	$hashed_password = crypt($datos[$i]["orderclientnum"],$datos[$i]["delivery"].$datos[$i]["address"]);

	// QRCODE,H : QR-CODE Best error correction
	$pdf->write2DBarcode($hashed_password, 'QRCODE,H', 20, $posyCOD, 50, 50, $style, 'N');
	$pdf->Text(20, $posyPartner, $datos[$i]["partner"]);
    $posyCOD=$posyCOD+60;
    $posyPartner=$posyPartner+60;
// ---------------------------------------------------------
}
//Close and output PDF document
$pdf->Output('example_050.pdf', 'I');
?>