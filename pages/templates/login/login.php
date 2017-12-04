<div class="col-lg-1"></div>

<div class="col-lg-7">
    <form id="login">
        <h4 class="with-border">Đăng nhập</h4>
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
            <a class="forgetpassword" href="?mode=forgetpassword">Quên mật khẩu</a>
            <input type="submit" class="btn" value="Đăng nhập"/>
        </div>
    </form>

    <form id="register">
        <h4 class="with-border">Đăng ký</h4>
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

        <div class="add-form-submit form-one-button center">
            <input type="reset" class="btn btn-default" value="Nhập lại"/>
            <input type="submit" class="btn" value="Đăng ký"/>
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
