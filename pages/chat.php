<?php
$pageTitle = 'Chat';
if (!$temp && $mode != 'iframe') {
    include 'templates/header.php';
    $config->addJS('plugins', 'mchat/zzchat.js');
} else {
    echo '<!DOCTYPE html>
    <html lang="en">
    <head>
        <link rel="stylesheet" href="//cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/3.3.7/css/bootstrap.min.css" type="text/css" media="screen">
        <link rel="stylesheet" type="text/css" href="'.PLUGINS.'/mchat/zzchat.iframe.css" />
        <script>var MAIN_URL = "'.MAIN_URL.'"</script>
    </head>
    <body>';
}

echo '<div class="chat-board">';
if ($temp) include 'templates/'.$page.'/iframe.php';
else include 'templates/'.$page.'/index.php';
echo '</div>';

if ($temp) echo '<script src="//cdnjs.cloudflare.com/ajax/libs/jquery/2.2.3/jquery.min.js"></script>
<script src="'.PLUGINS.'/mchat/zzchat.js"></script>
</body>
</html>';