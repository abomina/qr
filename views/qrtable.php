<?php
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
?>
<div class="container">
<form id="someForm" action="qrgenerator.php" target="newStuff" method="POST">
    <h2>QR codes</h2>
    <p>Select the items and generate the QR code</p>            
    <table class="table table-hover">
        <thead>
            <tr>
                <th data-field="state" data-radio="true"></th>
                <th data-field="id" data-align="right">Order Client Num</th>
                <th data-field="name" data-align="center">Delivery</th>
                <th data-field="price" data-align="left">Partner</th>
                <th data-field="price" data-align="left">Address</th>
                <th data-field="price" data-align="left">Barcode</th>
                <th data-field="price" data-align="left">Pallet Count</th>
                <th data-field="price" data-align="left">Pallet Total</th>
            </tr>
        </thead>
        <tbody>
           
            <?php
                for($i=0;$i<count($datos);$i++){
            ?>
            <tr>
              <td><input type="checkbox" name="chkqr[]" id="chkqr" value="<?php echo $datos[$i]['orderclientnum'];?>"></td> 
              <td><?php echo $datos[$i]["orderclientnum"];?></td>
              <td><?php echo $datos[$i]["delivery"];?></td>
              <td><?php echo $datos[$i]["partner"];?></td> 
              <td><?php echo $datos[$i]["address"];?></td> 
              <td><?php echo $datos[$i]["barcode"];?></td> 
              <td><?php echo $datos[$i]["palletcount"];?></td> 
              <td><?php echo $datos[$i]["pallettotal"];?></td> 
            </tr>
            <?php
                }
            ?>
        </tbody>
    </table>
    <div class="row">
        <div class="col-md-12z">
          <button type="submit" class="btn btn-primary btn-block">
            Generate QR code
          </button>
          <br><br>
        </div>
      </div>
</form>
</div>
