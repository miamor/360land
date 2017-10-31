<div class="col-md-1"></div>

<form class="place-add col-md-10">
    <h4 class="with-border">Thêm địa điểm tiện ích</h4>
    <div class="form-group">
        <div class="col-md-4 no-padding control-label">Tiêu đề * </div>
        <div class="col-md-8 no-padding">
            <input type="text" class="form-control" name="title"/>
        </div>
        <div class="clearfix"></div>
    </div>
    <div class="form-group">
        <div class="col-md-4 no-padding control-label"><i class="fa fa-map-marker"></i> Địa chỉ * </div>
        <div class="col-md-8 no-padding">
            <input type="text" class="form-control" id="map_adr" name="address"/>
            <div id="infowindow-content">
                <img src="" width="16" height="16" id="place-icon">
                <span id="place-name" class="title"></span><br>
                <span id="place-address"></span>
            </div>
            <div id="map_select"></div>
        </div>
        <div class="clearfix"></div>
    </div>
    <div class="form-group">
        <div class="col-md-4 no-padding control-labels">Có phải nhà của bạn không? * </div>
        <div class="col-md-8 no-padding">
            <label><input name="is_owner" type="radio" checked value="1">Phải, đây là phòng tôi cho thuê</label>
            <label><input name="is_owner" type="radio" value="0">Không, tôi thấy một tin đăng cho thuê và tôi muốn đóng góp cho hệ thống</label>
        </div>
        <div class="clearfix"></div>
    </div>

    <div class="txt-with-line center">
    	<span class="txt generate-new-button">Thông tin thêm <span class="fa fa-caret-down"></span></span>
    </div>
    <div class="callout callout-info">
        Để thông tin được chính xác hơn, bạn vui lòng cung cấp thêm một số thông tin mà bạn biết về địa điểm cho thuê này.<br/>
        Các thông tin hữu ích đều được xem xét để cộng thêm điểm tích lũy.
    </div>

    <div class="form-group">
        <div class="col-md-4 no-padding control-labels"><i class="fa fa-bed"></i> Loại </div>
        <div class="col-md-8 no-padding">
            <label class="col-sm-3"><input name="type" type="radio" checked value="S"> S</label>
            <label class="col-sm-3"><input name="type" type="radio" value="M"> M</label>
            <label class="col-sm-3"><input name="type" type="radio" value="L"> L</label>
            <div class="clearfix"></div>
            <div class="callout callout-info" style="margin:0 0 20px!important">
                <b>Loại S</b>: Những phòng chỉ có phòng ngủ riêng, khu vệ sinh/nấu nướng chung (với chủ hoặc với những người thuê khác).<br/>
                <b>Loại M</b>: Những phòng có khu vệ sinh, nấu nướng riêng, nhưng vẫn trong cùng 1 căn, ở chung với chủ/những người thuê khác.<br/>
                <b>Loại L</b>: Những căn riêng lẻ.
            </div>
        </div>
        <div class="clearfix"></div>
    </div>

    <div class="form-group">
        <div class="col-md-4 no-padding control-label">Số phòng </div>
        <div class="col-md-8 no-padding">
            <input type="number" min="1" value="1" class="form-control" name="room"/>
        </div>
        <div class="clearfix"></div>
    </div>
    <div class="form-group">
        <div class="col-md-4 no-padding control-label"><i class="fa fa-dollar"></i> Giá cho thuê (đơn vị: nghìn đồng) </div>
        <div class="col-md-3 no-padding">
            <input type="number" min="1" value="1" class="form-control" name="price"/>
        </div>
        <div class="col-md-3 no-padding control-label">&nbsp; k/tháng</div>
        <div class="clearfix"></div>
    </div>

    <div class="form-group">
        <div class="col-md-4 no-padding control-label">Thông tin chi tiết * </div>
        <div class="col-md-8 no-padding">
            <textarea class="form-control" name="r_content"></textarea>
        </div>
        <div class="clearfix"></div>
    </div>

    <div class="add-form-submit center">
        <input value="Làm lại" class="btn btn-default" type="reset">
        <input value="Gửi" class="btn btn-primary" type="submit">
    </div>
</form>

<div class="col-md-1"></div>

<div class="clearfix"></div>
