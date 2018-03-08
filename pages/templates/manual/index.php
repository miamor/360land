<h4 class="page-title"><i class="toggle-dashboard-left fa fa-reorder"></i> Hướng dẫn</h4>
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
        <?php include 'search.php' ?>
    </div>

    <div class="help-board h-add hide">
    <?php include 'addnode.php' ?>
    </div>

    <div class="help-board h-upgrade hide">
    <?php include 'refresh.php' ?>
    </div>

    <div class="help-board h-addcoin hide">
    <?php include 'addcoin.php' ?>
    </div>

    <div class="help-board h-login hide">
    <?php include 'login.php' ?>
    </div>
</div>

<div class="clearfix"></div>
