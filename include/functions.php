<?php
session_start();
error_reporting(E_ERROR | E_PARSE);

$__pattern = '/360land';

define('MAIN_PATH', './');
define('HOST_URL', '//localhost'.$__pattern);
define('MAIN_URL', 'http:'.HOST_URL);
define('ASSETS', MAIN_URL.'/assets');
define('CSS', ASSETS.'/dist/css');
define('JS', ASSETS.'/dist/js');
define('IMG', ASSETS.'/img');
define('PLUGINS', ASSETS.'/plugins');

define('GG_API_KEY', 'AIzaSyACkc-PYhlnPUWJaV2GlcCiEcuJujZsMdc');
define('GG_CX_ID', '014962602028620469778:yf4br-mf6mk');

$__page = str_replace($__pattern.'/', '', $_SERVER['REQUEST_URI']);

class Config {
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
