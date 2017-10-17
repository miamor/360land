<?php //echo date("Y-m-d H:i:s");
//$config->addJS('plugins', 'bootstrapValidator/bootstrapValidator.min.js');
//$config->addJS('plugins', 'sceditor/minified/jquery.sceditor.bbcode.min.js');
$config->addJS(-1, 'https://cdnjs.cloudflare.com/ajax/libs/tether/1.4.0/js/tether.min.js');
$config->addJS('bootstrap', 'js/bootstrap.min.js');
$config->addJS('plugins', 'iCheck/icheck.js');
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
    <link rel="stylesheet" href="<?php echo PLUGINS ?>/iCheck/all.css" type="text/css" media="screen">
    <link rel="stylesheet" href="<?php echo CSS ?>/custom.css" type="text/css" media="screen">

	<script src="<?php echo MAIN_URL ?>/assets/jquery/jquery-2.2.3.min.js"></script>
	<script>var MAIN_URL = '<?php echo MAIN_URL ?>' </script>

</head>
<body>

    <nav class="navbar navbar-toggleable-md navbar-static-top bg-inverse">
		<a class="navbar-brand" href="#">Top navbar</a>
		<div class="collapse navbar-collapse" id="navbarCollapse">
	        <ul class="nav navbar-nav mr-auto">
	    		<li class="nav-item active">
					<a class="nav-link" href="#">Home <span class="sr-only">(current)</span></a>
				</li>
				<li class="nav-item">
					<a class="nav-link" href="#">Link</a>
				</li>
				<li class="nav-item">
					<a class="nav-link disabled" href="#">Disabled</a>
				</li>
			</ul>
		</div>
	</nav>

    <div class="container">
