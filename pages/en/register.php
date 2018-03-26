
<?php
//$id = isset($__pageAr[2]? $__pageAr[2] : null);
$token = $config->get('token');

if ($n == 'confirm') {
    $pageTitle = 'Confirm account';
    include 'templates/header.php';

    if ($token) {
        $config->addJS('dist', $page.'/confirm.js');

        include 'templates/'.$page.'/confirm.php';
    } else {
        echo '<div class="alerts alert-error">Unauthenticated. Wrong token?</div>';
    }
} else {
    $pageTitle = 'Register';
    include 'templates/header.php';

    //$config->addJS('jquery', 'jquery-ui-1.8.23.custom.min.js');
    echo '<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/jqueryui/1.12.1/jquery-ui.min.css" type="text/css"/>';
    $config->addJS('jquery', 'jquery-ui.min.js');
    $config->addJS('dist', $page.'/register.js');

    include 'templates/'.$page.'/register.php';
}
