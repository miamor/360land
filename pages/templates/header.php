<?php //echo date("Y-m-d H:i:s");
//$config->addJS('plugins', 'bootstrapValidator/bootstrapValidator.min.js');
//$config->addJS('plugins', 'sceditor/minified/jquery.sceditor.bbcode.min.js');
$config->addJS(-1, 'https://cdnjs.cloudflare.com/ajax/libs/tether/1.4.0/js/tether.min.js');
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

<link href="https://fonts.googleapis.com/css?family=Open+Sans|Open+Sans+Condensed:300|Roboto|Roboto+Condensed|Source+Sans+Pro" rel="stylesheet">

    <link rel="stylesheet" href="<?php echo CSS ?>/custom.css" type="text/css" media="screen">

	<script src="<?php echo MAIN_URL ?>/assets/jquery/jquery-2.2.3.min.js"></script>
	<script>var MAIN_URL = '<?php echo MAIN_URL ?>';</script>

</head>
<body>

    <nav class="navbar navbar-toggleable-md navbar-static-top bg-inverse">
		<div class="nav-icon"><i class="fa fa-reorder"></i></div>
		<ul class="nav navbar-nav">
			<li class="nav-item active">
				<a class="nav-link" href="#"><i class="fa fa-home"></i> Home <span class="sr-only">(current)</span></a>
			</li>
			<li class="nav-item">
				<a class="nav-link" href="#"><i class="fa fa-search"></i> Search</a>
			</li>
			<li class="nav-item">
				<a class="nav-link disabled" href="#"><i class="fa fa-heart"></i> Saved</a>
			</li>
			<li class="nav-item">
				<a class="nav-link disabled" href="#"><i class="fa fa-bookmark"></i> Bleh</a>
			</li>
		</ul>

		<div class="nav-user">
			<img class="nav-user-avt" src="https://thumbs.trulia-cdn.com/pictures/thumbs_5/zillowstatic/IS2b9tl546el6w1000000000.jpg"/>
			<h4 class="nav-user-name">Tu Nguyen</h4>
		</div>

		<form class="nav-search">
		</form>
	</nav>

    <div class="container">
