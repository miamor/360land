<style>.container{width:100%;padding:0;margin:0}</style>

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
                        <span class="utility-close">X</span>
                    </div>
                </div>

                <div id="map-input" class="hidden">
                    <input type="text" id="searchtype" name="searchtype" value="1"/>
                    <input type="text" id="product" name="product"/>
                    <input type="text" id="zoom" name="zoom" value="10"/>
                    <input type="text" id="center" name="center" value="21.0277644:105.83415979999995"/>
                    <input type="text" id="searchtype" name="searchtype" value="1"/>
                    <input type="text" id="points" name="points"/>
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
                    <div class="control-label col-md-4 no-padding-left">
                        Loại BĐS
                    </div>
                    <div class="col-md-8 no-padding">
                        <select id="type" name="type" class="form-control">
                            <option value="0" selected>Chọn loại bất động sản</option>
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
                    <div class="control-label col-md-4 no-padding-left">
                        Thành phố
                    </div>
                    <div class="col-md-8 no-padding">
                        <select id="city" name="city" class="form-control">
                            <option value="hanoi">Hà Nội</option>
                            <option value="hochiminh">Hồ Chí Minh</option>
                        </select>
                    </div>
                    <div class="clearfix"></div>
                </div>
                <div class="form-group">
                    <div class="control-label col-md-4 no-padding-left">
                        Quận/Huyện
                    </div>
                    <div class="col-md-8 no-padding">
                        <select id="district" name="district" class="form-control">
                            <option value="hanoi">Hà Nội</option>
                            <option value="hochiminh">Hồ Chí Minh</option>
                        </select>
                    </div>
                    <div class="clearfix"></div>
                </div>

                <div class="form-group">
                    <div class="control-label col-md-4 no-padding-left">
                        Diện tích
                    </div>
                    <div class="col-md-8 no-padding">
                        <select id="area" name="area" class="form-control">
                            <option value="0" selected>Chưa xác định</option>
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
                    <div class="control-label col-md-4 no-padding-left">
                        Giá tiền
                    </div>
                    <div class="col-md-8 no-padding">
                        <select name="price" id="price" class="form-control">
                            <option value="0" selected>Thoả thuận</option>
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

                <div class="divide"></div>

                <div class="form-group">
                    <div class="control-label col-md-4 no-padding-left">
                        Xã/phường
                    </div>
                    <div class="col-md-8 no-padding">
                        <select id="ward" name="ward" class="form-control">
                            <option value="hanoi">Hà Nội</option>
                            <option value="hochiminh">Hồ Chí Minh</option>
                        </select>
                    </div>
                    <div class="clearfix"></div>
                </div>
                <div class="form-group">
                    <div class="control-label col-md-4 no-padding-left">
                        Đường
                    </div>
                    <div class="col-md-8 no-padding">
                        <select id="street" name="street" class="form-control" placeholder="Đường">
                            <option value="hanoi">Hà Nội</option>
                            <option value="hochiminh">Hồ Chí Minh</option>
                        </select>
                    </div>
                    <div class="clearfix"></div>
                </div>

                <div class="form-group">
                    <div class="control-label col-md-4 no-padding-left">
                        Số phòng ngủ
                    </div>
                    <div class="col-md-8 no-padding">
                        <input id="room" name="room" type="number" min="0" class="form-control" placeholder="Số phòng ngủ"/>
                    </div>
                    <div class="clearfix"></div>
                </div>

                <div class="form-group">
                    <div class="control-label col-md-4 no-padding-left">
                        Hướng
                    </div>
                    <div class="col-md-8 no-padding">
                        <select id="direction" name="direction" class="form-control">
                            <option value="0" selected>Chọn hướng</option>
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
            <a href="#" attr-id="1" class="map-result-one">
                <img class="map-result-one-thumb" src="http://codiator.com/real-estate-made-simple/timthumb.php?w=80&src=http://www.codiator.com/real-estate-made-simple/uploads/triworks_arch1__1328159428.jpg"/>
                <h3 class="map-result-one-title">
                    Place Title
                </h3>
                <div class="map-result-one-des">
                    Description here~~~
                </div>
                <div class="map-result-one-price">
                    Price: $<span>800</span>
                </div>
                <div class="clearfix"></div>
            </a>
            <a href="#" attr-id="2" class="map-result-one">
                <img class="map-result-one-thumb" src="http://codiator.com/real-estate-made-simple/timthumb.php?w=80&src=http://www.codiator.com/real-estate-made-simple/uploads/triworks_arch1__1328159428.jpg"/>
                <h3 class="map-result-one-title">
                    Place Title
                </h3>
                <div class="map-result-one-des">
                    Description here~~~
                </div>
                <div class="map-result-one-price">
                    Price: $<span>800</span>
                </div>
                <div class="clearfix"></div>
            </a>
        </div> <!-- /.tab-pane -->
    </div> <!-- /.tab-content -->
</div>

<div id="map"></div>


<div class="map-item-info-board hide">
    <span class="map-item-info-status label label-danger left" style="margin-right:10px;">Available For Sale</span>
    <h4 class="map-item-info-title">
        Place title
    </h4>
    <div class="map-item-info-more">
        <span class="map-item-info-type"></span>,
        Phone: <span class="map-item-info-contact_phone"></span>,
        Address: <span class="map-item-info-address"></span>
    </div>

    <img class="map-item-info-thumb right" src=""/>
    <div class="map-item-info-details left">
        <div class="map-item-info-des">
        </div>
    </div>
    <div class="clearfix"></div>
    <div class="map-item-info-buttons">
        <div class="map-item-info-price left">
            Price: <span></span>
        </div>
        <div class="map-item-info-btns right">
            <span class="map-item-view-utilities">Tiện ích xung quanh</span>
            <a href="#" target="_blank" class="btn btn-success btn-sm map-item-gotoview">Xem chi tiết</a>
        </div>
        <div class="clearfix"></div>
    </div>
</div>
