
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

    //$config->addJS('jquery', 'jquery-ui-1.8.23.custom.min.js');
    echo '<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/jqueryui/1.12.1/jquery-ui.min.css" type="text/css"/>';
    $config->addJS('jquery', 'jquery-ui.min.js');
    $config->addJS('dist', $page.'/register.js');

    include 'templates/'.$page.'/register.php';
}
