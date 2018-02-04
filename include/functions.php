<?php
session_start();
error_reporting(E_ERROR | E_PARSE);

$__pattern = '/';

define('MAIN_URL', '//www.mappy.com.vn');
//define('MAIN_URL', '//localhost'.$__pattern);

define('MAIN_PATH', './');
define('ASSETS', MAIN_URL.'/assets');
define('CSS', ASSETS.'/dist/css');
define('JS', ASSETS.'/dist/js');
define('IMG', ASSETS.'/img');
define('PLUGINS', ASSETS.'/plugins');

//define('GG_API_KEY', 'AIzaSyACkc-PYhlnPUWJaV2GlcCiEcuJujZsMdc');
define('GG_API_KEY', 'AIzaSyD7iBIhRsXT0SzEJTxSxyOkqJvTYvBS2h4');
define('GG_CX_ID', '014962602028620469778:yf4br-mf6mk');

define('FB_APP_ID', '148978169071502');
define('FB_APP_SECRET', '37b92fcf110012e6210fe432f8fd1439');

$__page = str_replace($__pattern.'/', '', $_SERVER['REQUEST_URI']);

header("Access-Control-Allow-Origin: *");
header('Access-Control-Allow-Credentials: true');
header('Access-Control-Allow-Headers: Content-Type');
//header('Access-Control-Max-Age: 86400');// cache for 1 day

if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
	if (isset($_SERVER['HTTP_ACCESS_CONTROL_REQUEST_METHOD']))
		header("Access-Control-Allow-Methods: GET, POST, OPTIONS");

	if (isset($_SERVER['HTTP_ACCESS_CONTROL_REQUEST_HEADERS']))
		header("Access-Control-Allow-Headers:{$_SERVER['HTTP_ACCESS_CONTROL_REQUEST_HEADERS']}");

	exit(0);
}

if ($_SERVER['REQUEST_METHOD'] == 'POST' && empty($_POST)) {
    $_POST = json_decode(file_get_contents('php://input'), true);
}


class Config {
    public function __construct () {
        $this->dbLink = MAIN_URL.'/dashboard';
    }

    function addJS ($type, $link) {
        if ($type == -1) {
            $this->JS .= $link.'|';
        }
        else {
            if ($type == 'dist') {
                $type = 'dist/js';
            }
            $this->JS .= ASSETS.'/'.$type.'/'.$link.'|';
        }
    }
    function echoJS () {
        $exJS = explode('|', $this->JS);
        foreach ($exJS as $exjs) {
            if ($exjs) echo '<script src="'.$exjs.'"></script>
    ';
        }
    }

    function get ($char) {
        $request = $this->request;
        if ($request && check($request, $char) > 0) {
            $ca = explode($char.'=', $request);
            if (isset($ca[1])) {
                $c = $ca[1];
                $c = explode('&', $c)[0];
                $request = str_replace("{$char}={$c}&", "", $request);
                return $c;
            }
        }
        return null;
    }
}

function check ($haystack, $needle) {
    return substr_count($haystack, $needle); // Find $word in $string
}

function checkURL ($word) {
    return check($_SERVER['REQUEST_URI'], $word);
}
