<?php
include 'include/functions.php';
$config = new Config();

if (check($__page, '?') > 0) $__page = $__page.'&';
else $__page = $__page;

$__pageAr = array_values(array_filter(explode('/', explode('?', rtrim($__page))[0])));
if ($__pageAr) {
	$page = $__pageAr[0];
	$n = (array_key_exists(1, $__pageAr) && $__pageAr[1]) ? $__pageAr[1] : null;
	$requestAr = explode('?', $__page);
	$config->request = isset($requestAr[1]) ? $requestAr[1] : null;
} else if (check($__page, '?')) $config->request = explode('?', $__page)[1];

if (!isset($page) || !$page) $page = 'map';

$v = $config->get('v');
$temp = $config->get('temp');
$type = $config->get('type');
$do = $config->get('do');
$mode = $config->get('mode');


if ($do) header('Content-Type: text/plain; charset=utf-8');
else header('Content-Type: text/html; charset=utf-8');


include 'pages/'.$page.'.php';

include 'pages/templates/footer.php';

 ?>
