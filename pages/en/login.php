<?php
$token = $config->get('token');

if ($mode == 'forgetpassword') {
    $pageTitle = 'Forgot password';
    include 'templates/header.php';

    $config->addJS('dist', $page.'/'.$mode.'.js');

    include 'templates/'.$page.'/'.$mode.'.php';

} 
else if ($mode == 'resetpassword' && $token) {
    $pageTitle = 'Reset password';
    include 'templates/header.php';

    $config->addJS('dist', $page.'/'.$mode.'.js');

    include 'templates/'.$page.'/'.$mode.'.php';

} 
else {
    $pageTitle = 'Login';
    include 'templates/header.php';

    $config->addJS('dist', $page.'/login.js');

    include 'templates/'.$page.'/login.php';
}
