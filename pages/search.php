<?php
    $pageTitle = 'Cần mua/thuê';
    include 'templates/header.php';

if ($n) {
    $config->addJS('dist', $page.'/view.js');

    include 'templates/'.$page.'/view.php';
} else {
    $config->addJS('dist', $page.'/list.js');

    include 'templates/'.$page.'/list.php';
}