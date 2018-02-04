
<?php
//$id = isset($__pageAr[2]? $__pageAr[2] : null);
$token = $config->get('token');

if ($n == 'confirm') {
    $pageTitle = 'Xác thực tài khoản';
    include 'templates/header.php';

    if ($token) {
        $config->addJS('dist', $page.'/confirm.js');

        include 'templates/'.$page.'/confirm.php';
    } else {
        echo '<div class="alerts alert-error">Không thể xác thực người dùng. Thiếu token?</div>';
    }
} else {
    $pageTitle = 'Tạo tài khoản mới';
    include 'templates/header.php';

    $config->addJS('dist', $page.'/register.js');

    include 'templates/'.$page.'/register.php';
}
