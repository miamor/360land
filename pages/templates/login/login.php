<?php if (!$temp) echo '<div class="col-lg-3"></div>' ?>

<div class="borderwrap form-reg-fb hide col-lg-6">
    <h4 class="page-title show">Đăng ký tài khoản</h4>
    <form id="reg_fb">
        <div class="form-group">
            <div class="col-lg-3 control-label">Email *</div>
            <div class="col-lg-9">
                <input class="form-control" type="email" name="email"/>
            </div>
            <div class="clearfix"></div>
        </div>
        <input type="hidden" />
        <div class="add-form-submit form-one-button center">
            <input value="Tiếp tục" class="btn btn-primary" type="submit">
        </div>
    </form>
</div>

<div class="borderwrap form-login col-lg-6">
    <form id="login" onsubmit="return submitLoginForm()">
        <h4 class="page-title show">Đăng nhập</h4>
        <div class="form-group">
            <div class="col-lg-3 control-label">Tên đăng nhập </div>
            <div class="col-lg-9">
                <input class="form-control" type="text" name="username"/>
            </div>
            <div class="clearfix"></div>
        </div>
        <div class="form-group">
            <div class="col-lg-3 control-label">Mật khẩu </div>
            <div class="col-lg-9">
                <input class="form-control" type="password" name="password"/>
                <div style="margin-top:5px"><a class="forgetpassword" href="<?php echo MAIN_URL ?>/login?mode=forgetpassword">Quên mật khẩu?</a></div>
            </div>
            <div class="clearfix"></div>
        </div>

        <div class="add-form-submit col-lg-12 form-one-button center">
            <input type="submit" class="btn btn-block" value="Đăng nhập"/>
        </div>
        <div class="clearfix"></div>
    </form>

    <div class="txt-with-line center">
        <span class="txt generate-new-button">OR</span>
    </div>

    <div class="social-login">
        <!--<div class="fb-login-button" data-max-rows="1" data-size="large" data-button-type="continue_with" data-show-faces="false" data-auto-logout-link="false" data-use-continue-as="false"></div>-->
        <fb:login-button scope="public_profile,email" onlogin="checkLoginState();" class="fb-login-button" data-max-rows="1" data-size="large" data-button-type="continue_with" data-show-faces="true" data-auto-logout-link="false" data-use-continue-as="false"></fb:login-button>
        <div id="status"></div>
    </div>
</div>

<?php if (!$temp) echo '<div class="col-lg-3"></div>' ?>
<div class="clearfix"></div>

<?php if ($temp) echo '<style>.the-board .form-login, .the-board .form-reg-fb{width:100%!important;border:0!important}
body:not(.mobile) .popup .popup-content{left:25%;right:25%}</style>' ?>

<script>var FB_APP_ID = '<?php echo FB_APP_ID ?>'</script>
