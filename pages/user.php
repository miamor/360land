<?php
if ($n) {
    $pageTitle = 'Place title';
    include 'templates/header.php';

    //$config->addJS('plugins', 'DataTables/datatables.min.js');
    //$config->addJS('dist', 'ratings.min.js');
    $config->addJS('dist', $page.'/view.js');

    include 'templates/'.$page.'/view.php';
}
else {
    //$pageTitle = 'Map';
    //-include 'templates/header.php';
	include 'error.php';
}
