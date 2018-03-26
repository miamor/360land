<?php
if (!$n) $n = 'info';

if ($n == 'node' && $mode) {
    if ($mode == 'edit') {
        if ($type == 'node') $pageTitle = 'Edit post';
        else $pageTitle = 'Edit post';
    }
    else if ($mode == 'new') {
        if ($type == 'node') $pageTitle = 'New post';
        else $pageTitle = 'Search';
    }
    //else $pageTitle = 'Search';
} else {
    $pageTitle = 'User dashboard - '.$n;
}

$id = $__pageAr[2];

include 'templates/header.php';


$includeFile = $n.'.php';


if (!$temp) $config->addJS('dist', $page.'/view.js');

if ($n == 'info') {
    //$config->addJS('dist', $page.'/resample.js');
    //$config->addJS('dist', $page.'/avatar.js');
    /*$config->addJS(-1, 'https://cdnjs.cloudflare.com/ajax/libs/cropperjs/0.8.1/cropper.min.js');
    $config->addJS('dist', $page.'/inputAvt.js');
    echo '<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/cropper/2.3.4/cropper.min.css"/>';*/
    $config->addJS(-1,'https://cdnjs.cloudflare.com/ajax/libs/cropit/0.5.1/jquery.cropit.min.js');
}
if ($n == 'history' || $n == 'hoadon') {
    $config->addJS('plugins', 'DataTables/datatables.min.js');
}
if ($n == 'noti' && $id) {
    $config->addJS('dist', $page.'/'.$n.'.one.js');
    $includeFile = $n.'.one.php';
}
else if ($n == 'node') {
    if ($mode) {
        if ($mode == 'refresh') $config->addJS('dist', $page.'/refresh.js');
        else {
            if ($mode == 'new' || $type == 'node') {
                for ($i = 1; $i <= 4; $i++) $config->addJS('dist', 'map/cityListOther'.$i.'.js');
                $config->addJS('dist', $page.'/form.js');
            }

            if ($type == 'node') {
                //echo '<link rel="stylesheet" href="//cdnjs.cloudflare.com/ajax/libs/dropzone/5.2.0/min/dropzone.min.css" type="text/css">';
                //$config->addJS(-1, '//cdnjs.cloudflare.com/ajax/libs/file-uploader/5.15.5/all.fine-uploader/all.fine-uploader.core.min.js');
                //$config->addJS(-1, '//cdnjs.cloudflare.com/ajax/libs/dropzone/5.2.0/min/dropzone.min.js');
                $config->addJS('dist', 'jquery.filedrop.js');
                $config->addJS(-1, 'https://maps.googleapis.com/maps/api/js?v=3&key='.GG_API_KEY.'&libraries=places');
            }
        
            if ($mode == 'edit') {
                if ($type == 'node') $config->addJS('dist', $page.'/edit.js');
            }
            else $config->addJS('dist', $page.'/add.js');
        }

        if ($type && $mode) $includeFile = "$n.$type.$mode.php";
        else if ($mode) $includeFile = "$n.$mode.php";
        else $includeFile = $n.'.php';
    } else {
        $config->addJS('dist', $page.'/node.list.js');
    }
    
    if ($id) { // hethan || waiting ...
        $includeFile = $n.'.'.$id.'.php';
    }
} 
else {
    $config->addJS('dist', $page.'/'.$n.'.js');
}

//include 'templates/'.$page.'/view.php';

if (!$temp) {
?>

<div class="dashboard-left left-menu">
    <h4 class="page-title">User dashboard</h4>
    <div class="menu-one-box view-public-profile">
	<div class="menu-one-box-body">
	    <a class="menu-one-item public-profile-link" href="#">User profile</a>
	</div>
    </div>
    <div class="menu-one-box">
        <h4 class="menu-one-box-header">Basic Information</h4>
        <div class="menu-one-box-body">
            <a class="menu-one-item hidden" href="<?php echo $config->nLink ?>?mode=stat">Stat</a>
            <a class="menu-one-item" href="<?php echo $config->dbLink ?>/info">Update information</a>
            <a class="menu-one-item" href="<?php echo $config->dbLink.'/changepassword' ?>">Reset password</a>
            <a class="menu-one-item" href="<?php echo $config->dbLink.'/addcoin' ?>">Add coin</a>
            <a class="menu-one-item" href="<?php echo $config->dbLink.'/hoadon' ?>">Bills</a>
            <a class="menu-one-item" href="<?php echo $config->dbLink.'/history' ?>">Exchange history</a>
        </div>
    </div>

    <div class="menu-one-box">
        <h4 class="menu-one-box-header">Nodes</h4>
        <div class="menu-one-box-body">
            <a class="menu-one-item" href="<?php echo $config->dbLink ?>/node">Còn hạn</a>
            <a class="menu-one-item" href="<?php echo $config->dbLink ?>/node/hethan">Outdated</a>
            <a class="menu-one-item" href="<?php echo $config->dbLink ?>/node/waiting">Unapproved</a>
            <a class="menu-one-item" href="<?php echo $config->dbLink ?>/node/search">Search</a>
            <a class="menu-one-item" href="<?php echo $config->dbLink ?>/node?mode=new&type=node">Đăng tin bán/cho thuê</a>
            <a class="menu-one-item" href="<?php echo $config->dbLink ?>/node?mode=new&type=search">Đăng tin tìm mua/thuê</a>
        </div>
    </div>

    <div class="menu-one-box">
        <h4 class="menu-one-box-header">Others</h4>
        <div class="menu-one-box-body">
            <a class="menu-one-item" href="<?php echo $config->dbLink ?>/subscribe">Saved</a>
            <a class="menu-one-item" href="<?php echo $config->dbLink ?>/noti">Notifications</a>
        </div>
    </div>
</div>

<div class="dashboard-main">
    <?php include 'templates/'.$page.'/'.$includeFile ?>
</div>

<div class="clearfix"></div>

<?php
} else include 'templates/'.$page.'/'.$includeFile;
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
