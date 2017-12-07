<div class="col-lg-1"></div>

<div class="col-lg-7 no-padding">
    <form id="login" onsubmit="return submitLoginForm()">
        <h4 class="with-border page-title show">Đăng nhập</h4>
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
            </div>
            <div class="clearfix"></div>
        </div>

        <div class="add-form-submit form-one-button center">
            <div class="col-sm-6" style="text-align:right">
                <a class="forgetpassword" href="?mode=forgetpassword">Quên mật khẩu</a>
            </div>
            <div class="col-sm-6" style="text-align:left">
                <input type="submit" class="btn" value="Đăng nhập"/>
            </div>
        </div>
    </form>
</div>

<div class="col-lg-3 social-login">
    <!--<div class="fb-login-button" data-max-rows="1" data-size="large" data-button-type="continue_with" data-show-faces="false" data-auto-logout-link="false" data-use-continue-as="false"></div>-->
    <fb:login-button scope="public_profile,email" onlogin="checkLoginState();" class="fb-login-button" data-max-rows="1" data-size="large" data-button-type="continue_with" data-show-faces="true" data-auto-logout-link="false" data-use-continue-as="false"></fb:login-button>
    <div id="status"></div>
</div>

<div class="col-lg-1"></div>
<div class="clearfix"></div>

<script>var FB_APP_ID = '<?php echo FB_APP_ID ?>'</script>
