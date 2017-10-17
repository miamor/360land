<style>body{position:fixed}.container{width:100%;padding:0;margin:0}</style>

<div class="nav-tabs-custom map-side no-padding">
    <div class="map-side-toggle"></div>
    <ul class="nav nav-tabs">
        <li class="active"><a href="#map_search" data-toggle="tab">Search</a></li>
        <li><a href="#map_results" data-toggle="tab">Results</a></li>
    </ul>
    <div class="tab-content">
        <div class="tab-pane active" id="map_search">
            <form id="map-search-form">
                <div class="btn-map-update-result hidden">
                    <span>Click để cập nhật kết quả mới nhất</span>
                </div>
                <div class="controls-area" id="controlArea">
                    <span class="begindraw">
                        <img src="https://file4.batdongsan.com.vn/images/Product/Maps/icon-pen.png" width="16" title="Khoanh vùng" />
                        Vẽ để tìm
                    </span>
                    <span class="delshape">
                        <img src="https://file4.batdongsan.com.vn/images/Product/Maps/icon-delete.png" title="Xóa vùng đã khoanh" />
                        Xóa
                    </span>
                    <span class="fullscreen hidden">
                        <img src="https://file4.batdongsan.com.vn/images/Product/Maps/full-screen.png" title="Mở rộng toàn màn hình" />
                        Toàn màn hình
                    </span>
                    <span class="exitfullscreen hidden">
                        <img src="https://file4.batdongsan.com.vn/images/Product/Maps/exit-full-screen.png" title="Thoát chế độ rộng toàn màn hình" />
                        Mặc định
                    </span>
                </div>

                <div class="controls-utility" id="controlUtility">
                    <div class="utility-head">Các loại tiện ích</div>
                    <div class="utility-body">
                        <select id="cbbRadius">
                          <option value="500">Chọn bán kính</option>
                          <option value="200">200 m</option>
                          <option value="500">500 m</option>
                          <option value="1000">1 km</option>
                          <option value="2000">2 km</option>
                          <option value="5000">5 km</option>
                          <option value="10000">10 km</option>
                		</select>
                        <label class="utility-type" for="chk4">
                            <input type="checkbox" checked="checked" id="chk4" value="4" />
                            Trường học
                        </label>
                        <label class="utility-type" for="chk6">
                            <input type="checkbox"  id="chk6" value="6" />
                            Bến xe, trạm xe
                        </label>
                        <label class="utility-type" for="chk7">
                            <input type="checkbox"  id="chk7" value="7" />
                            Công trình công cộng
                        </label>
                        <label class="utility-type" for="chk5">
                            <input type="checkbox"  id="chk5" value="5" />
                            Cơ sở y tế
                        </label>
                        <label class="utility-type" for="chk0">
                            <input type="checkbox"  id="chk0" value="0" />
                            Nhà hàng
                        </label>
                        <label class="utility-type" for="chk3">
                            <input type="checkbox"  id="chk3" value="3" />
                            Cơ quan hành chính
                        </label>
                        <label class="utility-type" for="chk8">
                            <input type="checkbox"  id="chk8" value="8" />
                            Khách sạn
                        </label>
                        <label class="utility-type" for="chk2">
                            <input type="checkbox" checked="checked" id="chk2" value="2" />
                            TT thể thao, giải trí
                        </label>
                        <label class="utility-type" for="chk1">
                            <input type="checkbox" checked="checked" id="chk1" value="1" />
                            Địa điểm mua sắm
                        </label>
                        <label class="utility-type" for="chk11">
                            <input type="checkbox"  id="chk11" value="11" />
                            Làm đẹp, Spa
                        </label>
                        <label class="utility-type" for="chk12">
                            <input type="checkbox"  id="chk12" value="12" />
                            ATM, Ngân hàng
                        </label>
                        <label class="utility-type" for="chk13">
                            <input type="checkbox"  id="chk13" value="13" />
                            Các công ty dịch vụ
                        </label>
                        <label class="utility-type" for="chk9">
                            <input type="checkbox"  id="chk9" value="9" />
                            Tiện ích khác
                        </label>
                        <span class="utility-close"><i class="fa fa-times-circle"></i></span>
                    </div>
                </div>

                <div id="map-input" class="hidden">
                    <input type="text" id="isShowUtil" name="isShowUtil" value="0"/>
                    <input type="text" id="searchtype" name="searchtype" value="1"/>
                    <input type="text" id="product" name="product"/>
                    <input type="text" id="zoom" name="zoom" value=""/>
                    <input type="text" id="center" name="center" value=""/>
                    <input type="text" id="searchtype" name="searchtype" value="1"/>
                    <input type="text" id="points" name="points"/>
                    <input type="text" id="details" name="details"/>
                </div>
                <div class="search-result-map">
                    <div id="lblResultMessage"></div>
                </div>

                <div class="form-group p_type">
                    <label><input type="checkbox" name="type_action" class="minimal" value="1" checked> Mua</label>
                    <label><input type="checkbox" name="type_action" class="minimal" value="2" checked> Thuê</label>
                    <label><input type="checkbox" name="type_action" class="minimal" value="3" checked> Dự án</label>
                </div>

                <div class="form-group">
                    <div class="control-label col-md-4 no-padding">
                        Loại BĐS
                    </div>
                    <div class="col-md-8 no-padding-right">
                        <select id="type" name="type" class="form-control">
                            <option value="CN">Chọn loại bất động sản</option>
                            <option value="chungcu">Chung cư</option>
                            <optgroup label="Nhà bán">
                                <option value="nharieng">Nhà riêng</option>
                                <option value="bietthu">Biệt thự, liền kề</option>
                                <option value="matpho">Nhà mặt phố</option>
                            </optgroup>
                            <optgroup label="Đất bán">
                                <option value="datnen">Đất nền dự án</option>
                                <option value="bandat">Bán đất</option>
                            </optgroup>
                            <option value="resort">Trang trại, khu nghỉ dưỡng</option>
                        </select>
                    </div>
                    <div class="clearfix"></div>
                </div>

                <div class="form-group">
                    <div class="control-label col-md-4 no-padding">
                        Thành phố
                    </div>
                    <div class="col-md-8 no-padding-right">
                        <select id="city" name="city" class="form-control">
                            <option value="CN">--Chọn Tỉnh/Thành phố--</option>
                            <option value="SG">Hồ Chí Minh</option>
                            <option value="HN">Hà Nội</option>
                            <option value="DDN">Đà Nẵng</option>
                            <option value="BD">Bình Dương</option>
                            <option value="DNA">Đồng Nai</option>
                            <option value="KH">Khánh Hòa</option>
                            <option value="HP">Hải Phòng</option>
                            <option value="LA">Long An</option>
                            <option value="QNA">Quảng Nam</option>
                            <option value="VT">Bà Rịa Vũng Tàu</option>
                            <option value="DDL">Đắk Lắk</option>
                            <option value="CT">Cần Thơ</option>
                            <option value="BTH">Bình Thuận  </option>
                            <option value="LDD">Lâm Đồng</option>
                            <option value="TTH">Thừa Thiên Huế</option>
                            <option value="KG">Kiên Giang</option>
                            <option value="BN">Bắc Ninh</option>
                            <option value="QNI">Quảng Ninh</option>
                            <option value="TH">Thanh Hóa</option>
                            <option value="NA">Nghệ An</option>
                            <option value="HD">Hải Dương</option>
                            <option value="GL">Gia Lai</option>
                            <option value="BP">Bình Phước</option>
                            <option value="HY">Hưng Yên</option>
                            <option value="BDD">Bình Định</option>
                            <option value="TG">Tiền Giang</option>
                            <option value="TB">Thái Bình</option>
                            <option value="BG">Bắc Giang</option>
                            <option value="HB">Hòa Bình</option>
                            <option value="AG">An Giang</option>
                            <option value="VP">Vĩnh Phúc</option>
                            <option value="TNI">Tây Ninh</option>
                            <option value="TN">Thái Nguyên</option>
                            <option value="LCA">Lào Cai</option>
                            <option value="NDD">Nam Định</option>
                            <option value="QNG">Quảng Ngãi</option>
                            <option value="BTR">Bến Tre</option>
                            <option value="DNO">Đắk Nông</option>
                            <option value="CM">Cà Mau</option>
                            <option value="VL">Vĩnh Long</option>
                            <option value="NB">Ninh Bình</option>
                            <option value="PT">Phú Thọ</option>
                            <option value="NT">Ninh Thuận</option>
                            <option value="PY">Phú Yên</option>
                            <option value="HNA">Hà Nam</option>
                            <option value="HT">Hà Tĩnh</option>
                            <option value="DDT">Đồng Tháp</option>
                            <option value="ST">Sóc Trăng</option>
                            <option value="KT">Kon Tum</option>
                            <option value="QB">Quảng Bình</option>
                            <option value="QT">Quảng Trị</option>
                            <option value="TV">Trà Vinh</option>
                            <option value="HGI">Hậu Giang</option>
                            <option value="SL">Sơn La</option>
                            <option value="BL">Bạc Liêu</option>
                            <option value="YB">Yên Bái</option>
                            <option value="TQ">Tuyên Quang</option>
                            <option value="DDB">Điện Biên</option>
                            <option value="LCH">Lai Châu</option>
                            <option value="LS">Lạng Sơn</option>
                            <option value="HG">Hà Giang</option>
                            <option value="BK">Bắc Kạn</option>
                            <option value="CB">Cao Bằng</option>
                        </select>
                    </div>
                    <div class="clearfix"></div>
                </div>
                <div class="form-group">
                    <div class="control-label col-md-4 no-padding">
                        Quận/Huyện
                    </div>
                    <div class="col-md-8 no-padding-right">
                        <select id="district" name="district" class="form-control">
                            <option value="CN">--Chọn Quận/Huyện--</option>
                        </select>
                    </div>
                    <div class="clearfix"></div>
                </div>

                <div class="form-group">
                    <div class="control-label col-md-4 no-padding">
                        Diện tích
                    </div>
                    <div class="col-md-8 no-padding-right">
                        <select id="area" name="area" class="form-control">
                            <option value="CN">Chưa xác định</option>
                            <option value="1"><= 30 m2</option>
                            <option value="2">30 - 50 m2</option>
                            <option value="3">50 - 80 m2</option>
                            <option value="4">80 - 100 m2</option>
                            <option value="5">100 - 150 m2</option>
                            <option value="6">150 - 200 m2</option>
                            <option value="7">200 - 250 m2</option>
                            <option value="8">250 - 300 m2</option>
                            <option value="9">300 - 500 m2</option>
                            <option value="10">>= 500 m2</option>
                        </select>
                    </div>
                    <div class="clearfix"></div>
                </div>

                <div class="form-group">
                    <!--<input id="price" type="text" name="price" value="1000;100000" data-type="double" data-step="1000" data-postfix=" &euro;" data-from="30000" data-to="90000" data-hasgrid="true"> -->
                    <div class="control-label col-md-4 no-padding">
                        Giá tiền
                    </div>
                    <div class="col-md-8 no-padding-right">
                        <select name="price" id="price" class="form-control">
                            <option value="CN">Thoả thuận</option>
                            <option value="1">< 500 triệu</option>
                            <option value="2">500 - 800 triệu</option>
                            <option value="3">800 triệu - 1 tỷ</option>
                            <option value="4">1 - 2 tỷ</option>
                            <option value="5">2 - 3 tỷ</option>
                            <option value="6">3 - 5 tỷ</option>
                            <option value="7">5 - 7 tỷ</option>
                            <option value="8">7 - 10 tỷ</option>
                            <option value="9">10 - 20 tỷ</option>
                            <option value="10">20 - 30 tỷ</option>
                            <option value="11">> 30 tỷ</option>
                        </select>
                    </div>
                    <div class="clearfix"></div>
                </div>

                <div class="txt-with-line center">
                	<span class="txt generate-new-button">Tìm kiếm nâng cao <span class="fa fa-caret-down"></span></span>
            	</div>

                <div class="form-group">
                    <div class="control-label col-md-4 no-padding">
                        Xã/phường
                    </div>
                    <div class="col-md-8 no-padding-right">
                        <select id="ward" name="ward" class="form-control">
                            <option value="CN">--Chọn Phường/Xã--</option>
                        </select>
                    </div>
                    <div class="clearfix"></div>
                </div>
                <div class="form-group">
                    <div class="control-label col-md-4 no-padding">
                        Đường
                    </div>
                    <div class="col-md-8 no-padding-right">
                        <select id="street" name="street" class="form-control" placeholder="Đường">
                            <option value="CN">--Chọn Đường/Phố--</option>
                        </select>
                    </div>
                    <div class="clearfix"></div>
                </div>

                <div class="form-group">
                    <div class="control-label col-md-4 no-padding">
                        Số phòng ngủ
                    </div>
                    <div class="col-md-8 no-padding-right">
                        <input id="room" name="room" type="number" min="0" class="form-control" placeholder="Số phòng ngủ"/>
                    </div>
                    <div class="clearfix"></div>
                </div>

                <div class="form-group">
                    <div class="control-label col-md-4 no-padding">
                        Hướng
                    </div>
                    <div class="col-md-8 no-padding-right">
                        <select id="direction" name="direction" class="form-control">
                            <option value="CN">Chọn hướng</option>
                            <option value="e">Đông</option>
                            <option value="en">Đông Bắc</option>
                            <option value="es">Đông Nam</option>
                            <option value="w">Tây</option>
                            <option value="wn">Tây Bắc</option>
                            <option value="ws">Tây Nam</option>
                        </select>
                    </div>
                    <div class="clearfix"></div>
                </div>

                <div class="add-form-submit form-one-button">
                    <input type="submit" value="Lọc"/>
                </div>
            </form>
        </div> <!-- /.tab-pane -->

        <div class="tab-pane" id="map_results">
        </div> <!-- /.tab-pane -->
    </div> <!-- /.tab-content -->
</div>

<div id="map"></div>

<div class="map-item-info-board hide"><div id="iw-container">
    <div class="map-item-info-thumb-div">
        <img class="map-item-info-thumb" src=""/>
        <div class="map-item-info-price center">
            Giá: <span></span>
        </div>
        <!--
        <div class="btn-group map-item-info-buttons">
            <a class="btn btn-danger btn-sm map-item-view-utilities" title="Tiện ich"><i class="fa fa-share-alt"></i></a>
            <a class="btn btn-danger btn-sm map-item-gotoview" title="Chi tiết"><i class="fa fa-feed"></i></a>
        </div>
        -->
        <div class="btn-group-vertical map-item-info-buttons center">
            <a class="btn btn-default btn-sm map-item-view-utilities"><i class="fa fa-share-alt"></i> Tiện ich</a>
            <a class="btn btn-default btn-sm map-item-gotoview"><i class="fa fa-feed"></i> Chi tiết</a>
        </div>
    </div>
    <div class="iw-content map-item-info-details">
        <h4 class="map-item-info-title iw-title">Place title</h4>
        <div class="iw-subTitle"><i class="fa fa-map-marker"></i> <span class="map-item-info-address"></span></div>
        <div class="map-item-info-more">
            <span class="map-item-info-status label label-danger left" style="margin-right:10px;">Available For Sale</span>
            <span class="map-item-info-type"></span>,
            Phone: <span class="map-item-info-contact_phone"></span>
        </div>

        <div class=" no-padding-left">
            <div class="map-item-info-des"></div>
            <div class="iw-bottom-gradient"></div>
        </div>
        <div class="clearfix"></div>
        <div class="map-item-info-buttons hidden">
            <div class="map-item-info-btns right">
                <span class="map-item-view-utilities">Tiện ích xung quanh</span>
                <a href="#" target="_blank" class="btn btn-danger btn-sm map-item-gotoview">Xem chi tiết</a>
            </div>
            <div class="clearfix"></div>
        </div>
    </div>
</div></div>


<div class="popup popup-dark hide"><div class="popup-inner"><div>
	<div class="popup-content hide">
		<a class="popup-btn" role="close"></a>
		<div class="the-board"></div>
	</div>
</div></div></div>
