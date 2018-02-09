<div class="col-lg-3 u-sidebar no-padding">
	<div class="u-title">
		<h2><?php echo $name ?></h2>
	</div>
	<div class="u-sidebar-head centered">
		<a href="<?php echo $link ?>" data-online="<?php echo $online ?>">
		<div class="u-coins">
			<img src="<?php echo IMG ?>/silk/coins.png"/> <strong><?php echo $coins ?></strong>
		</div>
			<img class="u-avatar" src="<?php echo $avatar ?>"/>
		</a>
		<div class="u-sta sta-list">
			<div class="sta-one u-reviews">
				<strong><?php echo $reviews ?></strong>
				reviews
			</div>
			<div class="sta-one u-followersNum">
				<strong><?php echo $topics ?></strong>
				topics
			</div>
			<div class="sta-one u-posts">
				<strong><?php echo $posts ?></strong>
				posts
			</div>
		</div>
	</div>
	<div class="txt-with-line">
		<span class="txt generate-new-button">More</span>
	</div>
	<ul class="u-more">
		<li <?php if (!$m || $m == 'home') echo 'class="active"' ?> id="home"><a href="<?php echo $link ?>"><i class="fa fa-home"></i> Home</a></li>
		<li <?php if ($m == 'status') echo 'class="active"' ?> id="submissions"><a href="<?php echo $link.'/status' ?>"><i class="fa fa-comments-o"></i> Status</a></li>
		<li <?php if ($m == 'reviews') echo 'class="active"' ?> id="teams"><a href="<?php echo $link.'/reviews' ?>"><i class="fa fa-star"></i> Reviews</a></li>
		<li id="fb"><a href="https://www.facebook.com/<?php echo $oauth_uid ?>"><i class="fa fa-star"></i> Facebook</a></li>
		<?php if ($config->u === $user->id) { ?>
			<li <?php if ($m == 'settings') echo 'class="active"' ?> id="settings"><a href="<?php echo $link.'/settings' ?>"><i class="fa fa-cogs"></i> Settings</a></li>
		<?php } ?>
	</ul>

	<div class="u-followers">
		<div class="txt-with-line">
			<span class="txt generate-new-button">Followers (<strong><?php echo $followersNum ?></strong>)</span>
		</div>
		<?php foreach ($followers as $fO) {
			$fIn = $user->sReadOne($fO);
			echo '<a class="user-fo" href="'.$fIn['link'].'" title="'.$fIn['name'].'" data-online="'.$fIn['online'].'"><img class="user-fo-img" src="'.$fIn['avatar'].'"/></a>';
		} ?>
	</div>

	<div class="u-followers">
		<div class="txt-with-line">
			<span class="txt generate-new-button">Followings (<strong><?php echo $followingsNum ?></strong>)</span>
		</div>
		<?php foreach ($followings as $fiO) {
			$fiIn = $user->sReadOne($fiO);
			echo '<a class="user-fo" href="'.$fiIn['link'].'" title="'.$fiIn['name'].'" data-online="'.$fiIn['online'].'"><img class="user-fo-img" src="'.$fiIn['avatar'].'"/></a>';
		} ?>
	</div>
</div>
