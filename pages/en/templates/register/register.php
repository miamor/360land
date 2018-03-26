<?php if (!$temp) echo '<div class="col-lg-3"></div>' ?>

<div class="borderwrap form-login col-lg-6">
    <form id="register">
        <h4 class="page-title show">Đăng ký</h4>
        <div class="form-group">
            <div class="col-lg-3 control-label">Tên đăng nhập *</div>
            <div class="col-lg-9">
                <input class="form-control" type="text" name="username"/>
            </div>
            <div class="clearfix"></div>
        </div>
        <div class="form-group">
            <div class="col-lg-3 control-label">Mật khẩu *</div>
            <div class="col-lg-9">
                <input class="form-control" type="password" name="password"/>
            </div>
            <div class="clearfix"></div>
        </div>

        <div class="form-group">
            <div class="col-lg-3 control-label">Tên *</div>
            <div class="col-lg-9">
                <input class="form-control" type="text" name="name"/>
            </div>
            <div class="clearfix"></div>
        </div>
        <div class="form-group">
            <div class="col-lg-3 control-label">Email *</div>
            <div class="col-lg-9">
                <input class="form-control" type="email" name="email"/>
            </div>
            <div class="clearfix"></div>
        </div>
        <div class="form-group">
            <div class="col-lg-3 control-label">Số điện thoại *</div>
            <div class="col-lg-9">
                <input class="form-control" type="text" name="phone"/>
            </div>
            <div class="clearfix"></div>
        </div>

        <div class="form-group">
            <div class="col-lg-3 control-label">Công ty</div>
            <div class="col-lg-9">
                <input class="form-control" type="text" name="company"/>
            </div>
            <div class="clearfix"></div>
        </div>
        <div class="form-group">
            <div class="col-lg-3 control-label">Giới tính</div>
            <div class="col-lg-9">
                <div class="col-lg-6 no-padding">
                    <label><input type="radio" name="sex" class="minimal" value="true" checked> Nam</label>
                </div>
                <div class="col-lg-6 no-padding">
                    <label><input type="radio" name="sex" class="minimal" value="false"> Nữ</label>
                </div>
            </div>
            <div class="clearfix"></div>
        </div>
        <div class="form-group">
            <div class="col-lg-3 control-label">Ngày sinh</div>
            <div class="col-lg-9">
                <input class="form-control" type="text" id="datepicker" name="birthday" placeholder="dd/mm/yyyy"/>
            </div>
            <div class="clearfix"></div>
        </div>

        <!--<div class="form-group" style="margin-top:15px">
            <div class="col-lg-3 control-label"></div>
            <div class="col-lg-9">
                <div class="g-recaptcha" data-sitekey="6LdF-0sUAAAAAP6tGXGoYL-mEHpkzB-0YP5y_RqM"></div>
            </div>
            <div class="clearfix"></div>
        </div>-->

        <div class="add-form-submit form-one-button center">
            <input type="reset" class="btn btn-default" value="Nhập lại"/>
            <!--<input type="submit" class="btn" value="Đăng ký"/>-->
            <button class="btn btn-primary g-recaptcha" data-sitekey="6LfC-ksUAAAAAJNP8YQiXZ3r67Hz7vtNE4YpzLzo" data-callback="onSubmitReg">Submit</button>
        </div>
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
