<h2 class="page-title show">Thay đổi thông tin</h2>


<form id="theform" class="change-info col-lg-8 no-padding">
    <div class="form-group">
        <div class="col-lg-3 control-label">Địa chỉ</div>
        <div class="col-lg-9">
            <input type="text" name="address" class="form-control"/>
        </div>
        <div class="clearfix"></div>
    </div>

    <div class="form-group">
        <div class="col-lg-3 control-label">Ngày sinh</div>
        <div class="col-lg-9">
            <input type="date" name="birthday" class="form-control"/>
        </div>
        <div class="clearfix"></div>
    </div>

    <div class="form-group">
        <div class="col-lg-3 control-label">Công ty</div>
        <div class="col-lg-9">
            <input type="text" name="company" class="form-control"/>
        </div>
        <div class="clearfix"></div>
    </div>

    <div class="form-group">
        <div class="col-lg-3 control-label">Điện thoại</div>
        <div class="col-lg-9">
            <input type="text" name="phone" class="form-control"/>
        </div>
        <div class="clearfix"></div>
    </div>

    <div class="form-group">
        <div class="col-lg-3 control-labels">Giới tính </div>
        <div class="col-lg-3">
            <label><input name="sex" type="radio" value="true"> Nam</label>
		</div>
		<div class="col-lg-4">
            <label><input name="sex" type="radio" value="false"> Nữ</label>
        </div>
        <div class="clearfix"></div>
    </div>

    <div class="form-group">
	<div class="col-lg-3 control-label">Giới thiệu bản thân</div>
	<div class="col-lg-9">
	    <textarea class="form-control" name="details"></textarea>
	</div>
    	<div class="clearfix"></div>
    </div>


    <div class="social">
        <div class="txt-with-line center">
            <span class="txt generate-new-button">Tài khoản xã hội <span class="fa fa-caret-down"></span></span>
        </div>

        <div class="form-group">
            <div class="col-lg-3 control-label"><i class="fa fa-facebook-square"></i> Facebook</div>
            <div class="col-lg-9">
                <input type="text" name="facebook" class="form-control"/>
            </div>
            <div class="clearfix"></div>
        </div>
        <div class="form-group">
            <div class="col-lg-3 control-label"><i class="fa fa-youtube-square"></i> Youtube</div>
            <div class="col-lg-9">
                <input type="text" name="youtube" class="form-control"/>
            </div>
            <div class="clearfix"></div>
        </div>
    </div>

    <div class="add-form-submit center">
        <input value="Làm lại" class="btn btn-default" type="reset">
        <input value="Gửi" class="btn btn-primary" type="submit">
    </div>

</form>

<div class="col-lg-4 no-padding">
    <div class="fix-avt">
    </div>
<form id="changeAvt" method="post" enctype="multipart/form-data">
    <div id="image-cropper" class="edit-avt">
        <div class="cropit-preview"></div>
        <input type="file" accept="image/*" class="cropit-image-input" id="avatar_file"/>

        <div class="controls-wrapper">
            <div class="rotation-btns">
                <span class="fa fa-rotate-left rotate-ccw-btn"></span>
                <span class="fa fa-rotate-right rotate-cw-btn"></span>
            </div>
            <div class="slider-wrapper">
                <span class="fa fa-image small-image"></span>
                <input class="cropit-image-zoom-input custom" min="0" max="1" step="0.01" type="range">
                <span class="fa fa-image large-image"></span>
            </div>
        </div>
    </div>
    <div class="add-form-submit center">
        <div class="select-image-btn btn btn-warning">Select new image</div>
        <input type="submit" value="Submit"/>
    </div>
</form>
</div>

<div class="clearfix"></div>
