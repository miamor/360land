<?php
header('content-type: application/json');

$n = $_GET['n'];
for ($i = 0; $i < $n; $i++) {
    $data[$i] = array(
        'title' => 'Vinhomes Imperia',
        'address' => 'Đường Võ Nguyên Giáp, TP Đà Nẵng, Việt Nam',
        'thumb' => 'http://codiator.com/real-estate-made-simple/timthumb.php?w=80&src=http://www.codiator.com/real-estate-made-simple/uploads/triworks_arch10_1328159469.jpg',
    );
}

echo json_encode($data, JSON_UNESCAPED_UNICODE);

 ?>
