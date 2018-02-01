<?php //echo date("Y-m-d H:i:s");
//$config->addJS('plugins', 'bootstrapValidator/bootstrapValidator.min.js');
//$config->addJS('plugins', 'sceditor/minified/jquery.sceditor.bbcode.min.js');
if (!$temp) {
$config->addJS(-1, '//cdnjs.cloudflare.com/ajax/libs/tether/1.4.0/js/tether.min.js');
$config->addJS('bootstrap', 'js/bootstrap.min.js');
//$config->addJS('plugins', 'iCheck/icheck.js');
$config->addJS('dist', 'main.js'); ?>
<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="utf-8">
	<meta http-equiv="X-UA-Compatible" content="IE=edge">
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<link rel="shortcut icon" type="image/x-icon" href="<?php echo IMG ?>/b.jpg"/>

	<title><?php echo $pageTitle ?></title>

	<link rel="stylesheet" href="<?php echo MAIN_URL ?>/assets/bootstrap/css/bootstrap.min.css" type="text/css" media="screen">
    <link rel="stylesheet" href="<?php echo CSS ?>/font.min.css" type="text/css" media="screen">

<!--<link href="//fonts.googleapis.com/css?family=Open+Sans|Open+Sans+Condensed:300|Roboto|Roboto+Condensed|Source+Sans+Pro" rel="stylesheet">-->
<link href="//fonts.googleapis.com/css?family=Source+Sans+Pro" rel="stylesheet">

    <link rel="stylesheet" href="<?php echo CSS ?>/custom.css" type="text/css" media="screen">

	<script src="<?php echo MAIN_URL ?>/assets/jquery/jquery-2.2.3.min.js"></script>

	<link rel="stylesheet" href="//code.jquery.com/ui/1.12.1/themes/base/jquery-ui.css">
	<script src="//code.jquery.com/ui/1.12.1/jquery-ui.js"></script>
	<script>var MAIN_URL = '<?php echo MAIN_URL ?>';</script>

</head>
<body>
    <nav id="top_navbar" class="navbar navbar-toggleable-md navbar-static-top bg-inverse">
		<div class="nav-icon"><i class="fa fa-reorder"></i></div>
		<ul class="nav navbar-nav">
			<li class="nav-item active">
				<a class="nav-link" href="#"><i class="fa fa-home"></i> Trang chủ <span class="sr-only">(current)</span></a>
			</li>
			<li class="nav-item">
				<a class="nav-link" href="#"><i class="fa fa-search"></i> Tìm kiếm</a>
			</li>
			<li class="nav-item">
				<a class="nav-link" href="#"><i class="fa fa-bookmark"></i> Đã lưu</a>
			</li>
			<li class="nav-item add-node-link dropdown">
				<a class="nav-link dropdown-toggle" href="#" data-toggle="dropdown">
					<i class="fa fa-plus"></i> Đăng tin
				</a>
				<ul class="dropdown-menu with-triangle pull-right">
					<li class="nodesell"><a href="<?php echo MAIN_URL ?>/map?mode=add&type=node"><i class="fa fa-plus"></i> Cần bán/cho thuê</a></li>
					<li class="nodesearch"><a href="<?php echo MAIN_URL ?>/map?mode=add&type=search"><i class="fa fa-plus"></i> Cần mua/thuê</a></li>
				</ul>
			</li>
			<li class="nav-item nav-user-mobile">
			</li>
		</ul>

		<div class="nav-user">
			<a class="hide" id="me_login_link" href="<?php echo MAIN_URL ?>/login">Đăng nhập</a>
			<a class="hide" id="me_reg_link" href="<?php echo MAIN_URL ?>/register">Đăng ký</a>
			<div class="dropdown hide" id="me_dropdown_info">
				<a class="dropdown-toggle" data-toggle="dropdown">
					<img src="<?php echo MAIN_URL ?>/data/avt.png" class="nav-user-avt img-circle myAvt"/>
					<strong class="s-title myName"></strong>
					<span class="hidden myID"></span>
				</a>
				<ul class="dropdown-menu with-triangle pull-right">
					<li class="user-header">
						<img src="<?php echo MAIN_URL ?>/data/avt.png" id="meinfo_avt" class="img-circle" alt="User Image">
						<p><span id="meinfo_name"></span> - <small id="meinfo_uname">@tutu</small></p>
					</li>
					<!-- Menu Body -->
					<li class="user-body u-sta sta-list">
						<div class="sta-one u-coins">
							<strong id="meinfo_coins"></strong>
							coins
						</div>
						<div class="sta-one u-hh">
							<strong id="meinfo_hh">12</strong>
							hh
						</div>
						<div class="sta-one u-kk">
							<strong id="meinfo_kk">5</strong>
							kk
						</div>
					</li>
					<!-- Menu Footer-->
					<li class="user-footer">
						<div class="pull-left">
							<a class="btn btn-success btn-flat" id="meinfo_profile_link" href="#">Profile</a>
							<a class="btn btn-info btn-flat" id="meinfo_dashboard_link" href="<?php echo MAIN_URL ?>/dashboard">Dashboard</a>
						</div>
						<div class="pull-right">
							<a class="btn btn-danger btn-flat" href="<?php echo MAIN_URL ?>/logout">Logout</a>
						</div>
					</li>
				</ul>
			</div>
		</div>

		<form class="nav-search">
		</form>
	</nav>

    <div class="container">
<?php } ?>
