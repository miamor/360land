<div id="post-list" class="feed-items">
<?php
if ($user->feedReviewsList) {
	foreach ($user->feedReviewsList as $ok => $oF) {
		$diid = $oF['iid'];
		echo '<div data-type="'.$oF['type'].'" data-iid="'.$diid.'" class="feed-load no-margin"><span class="feed-href hidden">'.$oF['href'].'</span></div>';
	}
}
 ?>
</div>
