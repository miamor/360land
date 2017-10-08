<?php
header('content-type: application/json');

$data = array(
    'title' => 'Place title',
    'address' => 'Đường Võ Nguyên Giáp, TP Đà Nẵng, Việt Nam',
    'price' => '35tr/m2',
    'investor' => 'Investor name',
    'owner' => 'Owner name',
    'status' => 1, // 1: available for sale | -1: sold
    'thumb' => 'http://codiator.com/real-estate-made-simple/timthumb.php?w=80&src=http://www.codiator.com/real-estate-made-simple/uploads/triworks_arch10_1328159469.jpg',
    'type' => 'Chung cư',
    'contact_phone' => '0987654321',
    'description' => 'SAPHIA - Giá chỉ từ 34 triệu/m2 – MẶT TIỀN ĐƯỜNG VÕ NGUYÊN GIÁP - ĐỐI DIỆN SÒNG BÀI CROWNE PLAZA – TRUNG TÂM HỘI NGHỊ APEC - KẸP GIỮA 2 BÃI TẮM

+ Condotel, khách sạn nghỉ dưỡng: 18 lô 22m x 60m 1320m2 xây cao tối đa 28 tầng.'
);


echo json_encode($data, JSON_UNESCAPED_UNICODE);

 ?>
