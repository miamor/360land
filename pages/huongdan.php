<?php 
$pageTitle = 'Hướng dẫn sử dụng trang web';
include 'templates/header.php';
$config->addJS('dist', $page.'/huongdan.js');
?>

<div class="dashboard-left left-menu">
    <div class="menu-one-box">
        <h4 class="menu-one-box-header">Chức năng chính</h4>
        <div class="menu-one-box-body">
            <div class="menu-one-item active" id="h-search">Tìm kiếm bất động sản</div>
            <div class="menu-one-item" id="h-add">Đăng tin</div>
            <div class="menu-one-item" id="h-chat">Chat &amp; gọi</div>
        </div>
    </div>

    <div class="menu-one-box">
        <h4 class="menu-one-box-header">Tài khoản</h4>
        <div class="menu-one-box-body">
            <div class="menu-one-item" id="h-log">Đăng ký &amp; đăng nhập</div>
            <div class="menu-one-item" id="h-addcoin">Nạp tiền</div>
            <div class="menu-one-item" id="h-upgrade">Nâng cấp tin</div>
        </div>
    </div>
</div>

<div class="dashboard-main">
    <div class="help-board h-search">
        <h2>Tìm kiếm bất động sản</h2>
        <div class="help-board-content">blah blah</div>
    </div>

    <div class="help-board h-add hide">
        <h2>Đăng tin</h2>
        <div class="help-board-content">blah blah</div>
    </div>
</div>

<div class="clearfix"></div>
