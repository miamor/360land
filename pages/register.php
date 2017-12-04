<?php
    $pageTitle = 'Tạo tài khoản mới';
    include 'templates/header.php';

    $config->addJS('dist', $page.'/register.js');

    include 'templates/'.$page.'/register.php';
