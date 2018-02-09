<?php
    $pageTitle = 'Tìm kiếm sales';
    include 'templates/header.php';

    $config->addJS('dist', $page.'/search.js');

    include 'templates/'.$page.'/search.php';
