<?php 
$pageTitle = 'Manual';
include 'templates/header.php';

echo '<link rel="stylesheet" href="//cdnjs.cloudflare.com/ajax/libs/fancybox/3.2.5/jquery.fancybox.min.css" type="text/css">';

$config->addJS(-1, '//cdnjs.cloudflare.com/ajax/libs/fancybox/3.2.5/jquery.fancybox.min.js');

$config->addJS('dist', $page.'/view.js');

include 'templates/'.$page.'/index.php';
?>
