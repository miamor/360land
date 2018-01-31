<?php
if (!$n) $n = 'info';

if ($n == 'node' && $mode) {
    if ($mode == 'new') $pageTitle = 'New node';
    else $pageTitle = 'Search';
} else {
    $pageTitle = 'Dashboard - '.$n;
}

$id = $__pageAr[2];

include 'templates/header.php';


$includeFile = $n.'.php';


$config->addJS('dist', $page.'/view.js');

if ($n == 'node' && $mode) {
        for ($i = 1; $i <= 4; $i++) $config->addJS('dist', $page.'/cityListOther'.$i.'.js');

        if ($mode == 'new') {
            $config->addJS(-1, 'https://maps.googleapis.com/maps/api/js?v=3&key=AIzaSyACkc-PYhlnPUWJaV2GlcCiEcuJujZsMdc&libraries=places');
        }
        $config->addJS('dist', $page.'/form.js');
        $config->addJS('dist', $page.'/add.js');

        $includeFile = $n.'.'.$mode.'.php';
} else {
    $config->addJS('dist', $page.'/'.$n.'.js');
}

//include 'templates/'.$page.'/view.php';
?>

<div class="col-lg-3 left-menu no-padding-left">
    <div class="menu-one-box">
        <h4 class="menu-one-box-header">Thông tin cá nhân</h4>
        <div class="menu-one-box-body">
            <a class="menu-one-item hidden" href="<?php echo $config->nLink ?>?mode=stat">Stat</a>
            <a class="menu-one-item" href="<?php echo $config->dbLink ?>/info">Sửa thông tin</a>
            <a class="menu-one-item" href="<?php echo $config->dbLink.'/changepassword' ?>">Add new</a>
        </div>
    </div>

    <div class="menu-one-box">
        <h4 class="menu-one-box-header">Nodes</h4>
        <div class="menu-one-box-body">
            <a class="menu-one-item" href="<?php echo $config->dbLink ?>/node">List all</a>
            <a class="menu-one-item" href="<?php echo $config->dbLink ?>/node?mode=new">Add new</a>
        </div>
    </div>

    <div class="menu-one-box">
        <h4 class="menu-one-box-header">Dự án quan tâm</h4>
        <div class="menu-one-box-body">
            <a class="menu-one-item" href="<?php echo $config->dbLink ?>/subscribe">List all</a>
        </div>
    </div>
</div>

<div class="col-lg-9 no-padding-right">
    <?php include 'templates/'.$page.'/'.$includeFile ?>
</div>

<?php
/*else {
    $pageTitle = 'Dashboard';
    include 'templates/header.php';

    //$config->addJS('plugins', 'DataTables/datatables.min.js');
    //$config->addJS('dist', 'ratings.min.js');
    //echo '<link rel="stylesheet" href="'+PLUGINS+'/morris/morris.css">';
    $config->addJS('plugins', 'chartjs/Chart.min.js');
    $config->addJS('dist', $page.'/view.js');

    include 'templates/'.$page.'/view.php';
}
*/