<?php
    $pageTitle = 'Login';
    include 'templates/header.php';

    $config->addJS('dist', $page.'/login.js');

    include 'templates/'.$page.'/login.php';
