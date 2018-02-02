<?php
$token = $config->get('token');

if ($mode == 'forgetpassword') {
    $pageTitle = 'Quên mật khẩu';
    include 'templates/header.php';

    $config->addJS('dist', $page.'/'.$mode.'.js');

    include 'templates/'.$page.'/'.$mode.'.php';

} 
else if ($mode == 'resetpassword' && $token) {
    $pageTitle = 'Đặt lại mật khẩu';
    include 'templates/header.php';

    $config->addJS('dist', $page.'/'.$mode.'.js');

    include 'templates/'.$page.'/'.$mode.'.php';

} 
else {
    $pageTitle = 'Đăng nhập';
    include 'templates/header.php';

    $config->addJS('dist', $page.'/login.js');

    include 'templates/'.$page.'/login.php';
}
