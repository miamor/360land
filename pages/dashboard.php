<?php
if ($n) {
    $pageTitle = 'Dashboard - '.$n;

    $id = $__pageAr[2];

    if ($id) {
        include 'templates/header.php';

        //$config->addJS('plugins', 'DataTables/datatables.min.js');
        //$config->addJS(-1, 'http://localhost/LTEE/plugins/jQuery/jQuery-2.1.4.min.js');
        //echo '<link rel="stylesheet" href="'+PLUGINS+'/morris/morris.css">';
        //$config->addJS(-1, 'https://cdnjs.cloudflare.com/ajax/libs/raphael/2.1.0/raphael-min.js');
        $config->addJS('plugins', 'chartjs/Chart.min.js');
        $config->addJS('dist', $page.'/'.$n.'.js');

        if ($n == 'node') {
            $config->addJS(-1, 'https://maps.googleapis.com/maps/api/js?v=3&key=AIzaSyACkc-PYhlnPUWJaV2GlcCiEcuJujZsMdc&libraries=places');
            $config->addJS('dist', 'map/add.js');
        }

        include 'templates/'.$page.'/'.$n.'.php';
    }
}
else {
    $pageTitle = 'Dashboard';
    include 'templates/header.php';

    //$config->addJS('plugins', 'DataTables/datatables.min.js');
    //$config->addJS('dist', 'ratings.min.js');
    //echo '<link rel="stylesheet" href="'+PLUGINS+'/morris/morris.css">';
    $config->addJS('plugins', 'chartjs/Chart.min.js');
    $config->addJS('dist', $page.'/view.js');

    include 'templates/'.$page.'/view.php';
}
