<?php
if ($n) {
    if ($mode == 'streetview') {
        $config->addJS('dist', $page.'/map.streetview.js');
        $config->addJS(-1, 'https://maps.googleapis.com/maps/api/js?v=3&key='.GG_API_KEY.'&libraries=places&callback=initialize');

        include 'templates/'.$page.'/map.streetview.php';
    } else {
        $pageTitle = 'Place title';
        include 'templates/header.php';

        //$config->addJS('plugins', 'DataTables/datatables.min.js');
        //$config->addJS('dist', 'ratings.min.js');
        $config->addJS('dist', $page.'/view.js');
        $config->addJS(-1, 'https://maps.googleapis.com/maps/api/js?v=3&key='.GG_API_KEY.'&libraries=places&callback=initMap');

        include 'templates/'.$page.'/view.php';
    }
}
else {
    $pageTitle = 'Map';
    include 'templates/header.php';
    echo '<link href="'.PLUGINS.'/panorama_viewer/panorama_viewer.min.css" rel="stylesheet" type="text/css">';
    //echo '<link href="'.PLUGINS.'/fancybox/jquery.fancybox.min.css" rel="stylesheet" type="text/css">';
    echo '<link rel="stylesheet" href="//cdnjs.cloudflare.com/ajax/libs/fancybox/3.2.5/jquery.fancybox.min.css" type="text/css">';
    $config->addJS(-1, '//cdnjs.cloudflare.com/ajax/libs/fancybox/3.2.5/jquery.fancybox.min.js');
    //$config->addJS('plugins', 'fancybox/jquery.fancybox.min.js');
    //echo '<link rel="stylesheet" href="'.PLUGINS.'/paver/css/paver.min.css" />';

    //echo '<link rel="stylesheet" href="'.PLUGINS.'/ionslider/ion.rangeSlider.css"><link rel="stylesheet" href="'.PLUGINS.'/ionslider/ion.rangeSlider.skinNice.css">';
    //$config->addJS('plugins', 'ionslider/ion.rangeSlider.min.js');

    $config->addJS(-1, 'https://maps.googleapis.com/maps/api/js?v=3&key='.GG_API_KEY.'&libraries=drawing,geometry,places');

    //$config->addJS(-1, 'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/markerclusterer.js');
    //$config->addJS('plugins', 'OverlappingMarkerSpiderfier/oms.min.js');
    //$config->addJS(-1, 'https://maps.googleapis.com/maps/api/js?key='.GG_API_KEY.'&libraries=drawing,geometry,places');

    $config->addJS('plugins', 'markerWithLabel/markerWithLabel.min.js');

    //$config->addJS('dist', 'ratings.min.js');
    //for ($i = 1; $i <= 4; $i++) $config->addJS('dist', $page.'/cityListOther'.$i.'.js');
    $config->addJS('dist', $page.'/cityListOther.js');

    $config->addJS('plugins', 'panorama_viewer/jquery.panorama_viewer.min.js');
    /*$config->addJS(-1, "https://cdnjs.cloudflare.com/ajax/libs/jquery-throttle-debounce/1.1/jquery.ba-throttle-debounce.min.js");
    $config->addJS(-1, "https://cdnjs.cloudflare.com/ajax/libs/prism/0.0.1/prism.min.js");
    $config->addJS('plugins', 'paver/js/jquery.paver.min.js');
    */

    //$config->addJS('dist', $page.'/markers.js');
    $config->addJS('dist', $page.'/map.js');

//    $config->addJS(-1, 'https://maps.googleapis.com/maps/api/js?key='.GG_API_KEY.'&libraries=places&callback=initMap');

    include 'templates/'.$page.'/map.php';
}
