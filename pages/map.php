<?php
if ($n) {
    $pageTitle = 'Place title';
    include 'templates/header.php';

    $config->addJS('dist', $page.'/view.js');
    $config->addJS(-1, 'https://maps.googleapis.com/maps/api/js?key=AIzaSyACkc-PYhlnPUWJaV2GlcCiEcuJujZsMdc&libraries=places&callback=initMap');

    include 'templates/'.$page.'/view.php';
} else {
    $pageTitle = 'Map';
    include 'templates/header.php';

    //echo '<link rel="stylesheet" href="'.PLUGINS.'/ionslider/ion.rangeSlider.css"><link rel="stylesheet" href="'.PLUGINS.'/ionslider/ion.rangeSlider.skinNice.css">';
    //$config->addJS('plugins', 'ionslider/ion.rangeSlider.min.js');
    $config->addJS(-1, 'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/markerclusterer.js');
    //$config->addJS(-1, 'https://maps.googleapis.com/maps/api/js?key=AIzaSyACkc-PYhlnPUWJaV2GlcCiEcuJujZsMdc&libraries=drawing,geometry,places');
    $config->addJS(-1, '//maps.googleapis.com/maps/api/js?v=3&key=AIzaSyByWSwMWPPl1SNLeQkKGd25V-YXSVZvt78&libraries=drawing,geometry,places');
    $config->addJS('dist', $page.'/bds.js');
    $config->addJS('dist', $page.'/map.js');

//    $config->addJS(-1, 'https://maps.googleapis.com/maps/api/js?key=AIzaSyACkc-PYhlnPUWJaV2GlcCiEcuJujZsMdc&libraries=places&callback=initMap');

    include 'templates/'.$page.'/map.php';
}
