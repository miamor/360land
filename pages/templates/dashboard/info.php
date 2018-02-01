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
        <div class="col-lg-3 control-label">Điện thoại liên hệ</div>
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

    <div class="add-form-submit center">
        <input value="Làm lại" class="btn btn-default" type="reset">
        <input value="Gửi" class="btn btn-primary" type="submit">
    </div>

</form>

<div class="col-lg-4 no-padding">
<form id="changeAvt" method="post" enctype="multipart/form-data">
    <input type="file" name="avatar-input" id="file-input">

    <!-- leftbox -->
	<div class="box-2">
		<div class="result"></div>
	</div>
	<!--rightbox-->
	<div class="box-2 img-result hide">
		<!-- result of crop -->
		<img class="cropped" src="" alt="">
	</div>
	<!-- input file -->
	<div class="box hidden">
        <button class="btn save hide">Save</button>
        <a href="" class="btn download hide">Download</a>
		<div class="options hide">
			<label> Width</label>
			<input type="hidden" class="img-w" value="300" />
		</div>
	</div>

    <div class="add-form-submit center">
        <input type="submit" value="Submit"/>
    </div>
</form>
</div>

<div class="clearfix"></div>
