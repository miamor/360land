<link rel="stylesheet" type="text/css" href="<?php echo PLUGINS ?>/mchat/zzchat.css" />

	<div id="chatbox-forumvi">

		<div id="chatbox-main">

		<div id="chatbox-header">
			<div id="chatbox-me">
				<h2>...</h2>
				<div id="chatbox-action-logout"></div>
				<div class="chatbox-action-checkbox autologin">
					<input type="checkbox" id="chatbox-input-autologin" name="autologin" checked />
					<label for="chatbox-input-autologin">Tự đăng nhập</label>
				</div>
				<div id="chatbox-hidetab" class="show"></div>
			</div>
			<div id="chatbox-title">
				<h2></h2>
				<div class="chatbox-action-checkbox refresh">
					<input type="checkbox" id="chatbox-input-autorefesh" name="autorefesh" checked />
					<label for="chatbox-input-autorefesh">Tự cập nhật</label>
				</div>
			</div>
		</div>


			<div id="chatbox-wrap">
				<div class="chatbox-content" data-id="publish">
				</div>
			</div>
			<div id="chatbox-messenger-form">
				<form id="chatbox-form" data-key="">
					<input type="hidden" name="sbold" id="chatbox-input-bold" value="0" />
					<input type="hidden" name="sitalic" id="chatbox-input-italic" value="0" />
					<input type="hidden" name="sunderline" id="chatbox-input-underline" value="0" />
					<input type="hidden" name="sstrike" id="chatbox-input-strike" value="0" />
					<input type="hidden" name="scolor" id="chatbox-input-color" value="333333" />
					<input type="hidden" name="node_id" value="333333" />
					<input type="hidden" name="to_id" value="333333" />
					<div id="chatbox-messenger">
						<textarea type="text" name="message" id="chatbox-messenger-input" placeholder="Type your message..."></textarea>
					</div>
					<div id="chatbox-option">
						<div id="chatbox-option-bold">B</div>
						<div id="chatbox-option-italic">I</div>
						<div id="chatbox-option-underline">U</div>
						<div id="chatbox-option-strike">S</div>
						<div id="chatbox-option-color" style="background: #333333;"></div>
						<div id="chatbox-option-smiley"></div>
						<div id="chatbox-option-buzz">BUZZ</div>
						<div id="chatbox-option-submit">
							<input type="submit" value="Gửi tin" id="chatbox-submit" />
						</div>
					</div>
				</form>
			</div>
		</div>

		<div id="chatbox-tabs">
			<div class="chatbox-scroll">
				<div id="chatbox-list">
				</div>
				<div id="chatbox-members"></div>
			</div>
			<div id="chatbox-copyright"></div>
		</div>

	</div>

	<audio id="chatbox-buzz-audio">
		<source src="<?php echo PLUGINS ?>/mchat/sound/buzz.ogg" type="audio/ogg" />
		<source src="<?php echo PLUGINS ?>/mchat/sound/buzz.mp3" type="audio/mpeg" />
	</audio>
	<audio id="chatbox-new-audio">
		<source src="<?php echo PLUGINS ?>/mchat/sound/new.mp3" type="audio/mpeg" />
	</audio>
