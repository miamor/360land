<?php
if ($mode) {
    $pageTitle = 'Place mode '.$mode;
    include 'templates/header.php';

    if ($type) $mode = $mode.'_'.$type;

    for ($i = 1; $i <= 4; $i++) $config->addJS('dist', $page.'/cityListOther'.$i.'.js');

    if ($type == 'node') {
        $config->addJS(-1, 'https://maps.googleapis.com/maps/api/js?v=3&key=AIzaSyACkc-PYhlnPUWJaV2GlcCiEcuJujZsMdc&libraries=places');
        //$config->addJS('dist', $page.'/add_initmap.js');
    }
    $config->addJS('dist', $page.'/add.js');

    include 'templates/'.$page.'/'.$mode.'.php';
}
else if ($n) {
    $pageTitle = 'Place title';
    include 'templates/header.php';

    //$config->addJS('plugins', 'DataTables/datatables.min.js');
    //$config->addJS('dist', 'ratings.min.js');
    $config->addJS('dist', $page.'/view.js');
    $config->addJS(-1, 'https://maps.googleapis.com/maps/api/js?v=3&key=AIzaSyACkc-PYhlnPUWJaV2GlcCiEcuJujZsMdc&libraries=places&callback=initMap');

    include 'templates/'.$page.'/view.php';
}
else {
    $pageTitle = 'Map';
    include 'templates/header.php';
    echo '<link href="'.PLUGINS.'/panorama_viewer/panorama_viewer.css" rel="stylesheet" type="text/css">';
    //echo '<link rel="stylesheet" href="'.PLUGINS.'/paver/css/paver.min.css" />';

    //echo '<link rel="stylesheet" href="'.PLUGINS.'/ionslider/ion.rangeSlider.css"><link rel="stylesheet" href="'.PLUGINS.'/ionslider/ion.rangeSlider.skinNice.css">';
    //$config->addJS('plugins', 'ionslider/ion.rangeSlider.min.js');

    $config->addJS(-1, 'https://maps.googleapis.com/maps/api/js?v=3&key=AIzaSyByWSwMWPPl1SNLeQkKGd25V-YXSVZvt78&libraries=drawing,geometry,places');

    //$config->addJS(-1, 'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/markerclusterer.js');
    //$config->addJS('plugins', 'OverlappingMarkerSpiderfier/oms.min.js');
    //$config->addJS(-1, 'https://maps.googleapis.com/maps/api/js?key=AIzaSyACkc-PYhlnPUWJaV2GlcCiEcuJujZsMdc&libraries=drawing,geometry,places');

    $config->addJS('plugins', 'markerWithLabel/markerWithLabel.min.js');

    //$config->addJS('dist', 'ratings.min.js');
    for ($i = 1; $i <= 4; $i++) $config->addJS('dist', $page.'/cityListOther'.$i.'.js');

    $config->addJS('plugins', 'panorama_viewer/jquery.panorama_viewer.js');
    /*$config->addJS(-1, "https://cdnjs.cloudflare.com/ajax/libs/jquery-throttle-debounce/1.1/jquery.ba-throttle-debounce.min.js");
    $config->addJS(-1, "https://cdnjs.cloudflare.com/ajax/libs/prism/0.0.1/prism.min.js");
    $config->addJS('plugins', 'paver/js/jquery.paver.min.js');
    */

    $config->addJS('dist', $page.'/markers.js');
    $config->addJS('dist', $page.'/map.js');

//    $config->addJS(-1, 'https://maps.googleapis.com/maps/api/js?key=AIzaSyACkc-PYhlnPUWJaV2GlcCiEcuJujZsMdc&libraries=places&callback=initMap');

    include 'templates/'.$page.'/map.php';
}
