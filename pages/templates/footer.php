<?php if (!$temp) { ?>
    </div>

    <div class="popup popup-dark hide"><div class="popup-inner">
	<div class="popup-content hide">
		<a class="popup-btn" role="close"></a>
		<div class="the-board"></div>
	</div>
</div></div>
<?php }

$config->echoJS();

if (!$temp) { ?>

    </body>
</html>

<?php } ?>
