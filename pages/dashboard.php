<?php
if (!$n) $n = 'info';

if ($n == 'node' && $mode) {
    if ($mode == 'new') $pageTitle = 'New node';
    else $pageTitle = 'Search';
} else {
    $pageTitle = 'Trang quản lý - '.$n;
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
if ($n == 'history') {
    $config->addJS('plugins', 'DataTables/datatables.min.js');
}
if ($n == 'noti' && $id) {
    $config->addJS('dist', $page.'/'.$n.'.one.js');
    $includeFile = $n.'.one.php';
}
else if ($n == 'node') {
    if ($id) {
        $config->addJS('dist', $page.'/'.$n.'.'.$id.'.js');
        $includeFile = $n.'.'.$id.'.php';
    } else if ($mode) {
        if ($mode == 'refresh') $config->addJS('dist', $page.'/refresh.js');
        else {
            for ($i = 1; $i <= 4; $i++) $config->addJS('dist', 'map/cityListOther'.$i.'.js');
            $config->addJS('dist', $page.'/form.js');

            if ($mode == 'new') {
                //echo '<link rel="stylesheet" href="//cdnjs.cloudflare.com/ajax/libs/dropzone/5.2.0/min/dropzone.min.css" type="text/css">';
                //$config->addJS(-1, '//cdnjs.cloudflare.com/ajax/libs/file-uploader/5.15.5/all.fine-uploader/all.fine-uploader.core.min.js');
                //$config->addJS(-1, '//cdnjs.cloudflare.com/ajax/libs/dropzone/5.2.0/min/dropzone.min.js');
                $config->addJS('dist', 'jquery.filedrop.js');
                $config->addJS(-1, 'https://maps.googleapis.com/maps/api/js?v=3&key='.GG_API_KEY.'&libraries=places');
            }
        
            $config->addJS('dist', $page.'/add.js');
        }

        $includeFile = $n.'.'.$mode.'.php';
    } else {
        $config->addJS('dist', $page.'/'.$n.'.js');
    }
} 
else {
    $config->addJS('dist', $page.'/'.$n.'.js');
}

//include 'templates/'.$page.'/view.php';

if (!$temp) {
?>

<div class="col-lg-3 left-menu no-padding-left">
    <div class="menu-one-box view-public-profile">
	<div class="menu-one-box-body">
	    <a class="menu-one-item public-profile-link" href="#">Xem trang cá nhân</a>
	</div>
    </div>
    <div class="menu-one-box">
        <h4 class="menu-one-box-header">Thông tin cá nhân</h4>
        <div class="menu-one-box-body">
            <a class="menu-one-item hidden" href="<?php echo $config->nLink ?>?mode=stat">Stat</a>
            <a class="menu-one-item" href="<?php echo $config->dbLink ?>/info">Sửa thông tin</a>
            <a class="menu-one-item" href="<?php echo $config->dbLink.'/changepassword' ?>">Đổi mật khẩu</a>
            <a class="menu-one-item" href="<?php echo $config->dbLink.'/addcoin' ?>">Nạp tiền</a>
            <a class="menu-one-item" href="<?php echo $config->dbLink.'/history' ?>">Lịch sử giao dịch</a>
        </div>
    </div>

    <div class="menu-one-box">
        <h4 class="menu-one-box-header">Tin đăng</h4>
        <div class="menu-one-box-body">
            <a class="menu-one-item" href="<?php echo $config->dbLink ?>/node">Còn hạn</a>
            <a class="menu-one-item" href="<?php echo $config->dbLink ?>/node/hethan">Hết hạn</a>
            <a class="menu-one-item" href="<?php echo $config->dbLink ?>/node/waiting">Chưa được duyệt</a>
            <a class="menu-one-item" href="<?php echo $config->dbLink ?>/node?mode=new">Đăng tin bán/cho thuê</a>
            <a class="menu-one-item" href="<?php echo $config->dbLink ?>/node?mode=search">Đăng tin tìm mua/thuê</a>
        </div>
    </div>

    <div class="menu-one-box">
        <h4 class="menu-one-box-header">Khác</h4>
        <div class="menu-one-box-body">
            <a class="menu-one-item" href="<?php echo $config->dbLink ?>/subscribe">Dự án quan tâm</a>
            <a class="menu-one-item" href="<?php echo $config->dbLink ?>/noti">Thông báo</a>
        </div>
    </div>
</div>

<div class="col-lg-9 no-padding-right">
    <?php include 'templates/'.$page.'/'.$includeFile ?>
</div>

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
