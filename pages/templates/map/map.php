<style>body{position:fixed}.container{width:100%;padding:0;margin:0}</style>


<div id="mapSide">
    <div class="controls-area" id="controlArea">
        <div class="begindraw" title="Vẽ để tìm">
            <i class="fa fa-pencil"></i>
        </div>
        <div class="delshape" title="Xóa">
            <i class="fa fa-times"></i>
        </div>
        <div class="fullscreen hidden">
            <img src="https://file4.batdongsan.com.vn/images/Product/Maps/full-screen.png" title="Mở rộng toàn màn hình" />
            Toàn màn hình
        </div>
        <div class="exitfullscreen hidden">
            <img src="https://file4.batdongsan.com.vn/images/Product/Maps/exit-full-screen.png" title="Thoát chế độ rộng toàn màn hình" />
            Mặc định
        </div>
    </div>

    <div class="map-side nav-tabs-custom no-padding open" id="map-side-search">
        <ul class="nav nav-tabs">
            <li class="li-list"><a href="#map_results" data-toggle="tab">List</a></li>
            <li class="li-input"><input type="text" id="place_search" placeholder="Search place"/></li>
            <li class="li-filter active"><a href="#map_search" data-toggle="tab">Filter</a></li>
            <div class="map-tabs-toggle"><i class="fa fa-angle-double-down"></i></div>
        </ul>
        <div class="tab-content map-search-tabs">
            <div class="tab-pane active" id="map_search">
                <ul class="nav nav-tabs map_search_select">
                    <li class="active" attr-type="node"><a href="#map_search_node" data-toggle="tab">Bất động sản</a></li>
                    <li attr-type="project"><a href="#map_search_project" data-toggle="tab">Dự án</a></li>
                </ul>

                <?php include 'form.search.php' ?>
            </div>
            <div class="tab-pane hide" id="map_results">
                <div class="empty_results">Không có kết quả.</div>
            </div>
        </div>
    </div>
</div>

<div id="map"></div>


<div class="btn-map-update-result hidden">
    <span>Click để cập nhật kết quả mới nhất</span>
</div>

<div class="controls-utility" id="controlUtility">
    <div class="utility-head">
        <select id="cbbRadius" class="form-control">
          <option value="200">200 m</option>
          <option value="500">500 m</option>
          <option value="1000">1 km</option>
          <option value="2000">2 km</option>
          <option value="5000">5 km</option>
          <option value="10000">10 km</option>
        </select>
        <div id="uti_selected"></div>
        <span class="utility-close"><i class="fa fa-times"></i></span>
    </div>
    <div class="utility-body">
        <label class="utility-type" for="chk4">
            <input type="checkbox" checked="checked" id="chk4" value="4" />
            Trường học
        </label>
        <label class="utility-type" for="chk6">
            <input type="checkbox" id="chk6" value="6" />
            Bến xe, trạm xe
        </label>
        <label class="utility-type" for="chk7">
            <input type="checkbox" id="chk7" value="7" />
            Công trình công cộng
        </label>
        <label class="utility-type" for="chk5">
            <input type="checkbox" id="chk5" value="5" />
            Cơ sở y tế
        </label>
        <label class="utility-type" for="chk0">
            <input type="checkbox" id="chk0" value="0" />
            Nhà hàng
        </label>
        <label class="utility-type" for="chk3">
            <input type="checkbox" id="chk3" value="3" />
            Cơ quan hành chính
        </label>
        <label class="utility-type" for="chk8">
            <input type="checkbox" id="chk8" value="8" />
            Khách sạn
        </label>
        <label class="utility-type" for="chk2">
            <input type="checkbox" class="minimal"checked="checked" id="chk2" value="2" />
            TT thể thao, giải trí
        </label>
        <label class="utility-type" for="chk1">
            <input type="checkbox" class="minimal"checked="checked" id="chk1" value="1" />
            Địa điểm mua sắm
        </label>
        <label class="utility-type" for="chk11">
            <input type="checkbox" id="chk11" value="11" />
            Làm đẹp, Spa
        </label>
        <label class="utility-type" for="chk12">
            <input type="checkbox" id="chk12" value="12" />
            ATM, Ngân hàng
        </label>
        <label class="utility-type" for="chk13">
            <input type="checkbox" id="chk13" value="13" />
            Các công ty dịch vụ
        </label>
        <label class="utility-type" for="chk9">
            <input type="checkbox" id="chk9" value="9" />
            Tiện ích khác
        </label>
    </div>
</div>


<div class="map-item-info-board hide" id="mapInfoBoard">
    <div class="map-item-info-board-close fa fa-times"></div>
<div id="iw-container">
    <div class="map-item-info-thumb-div">
        <img class="map-item-info-thumb" src=""/>
        <div class="map-item-info-price center">
            <i class="fa fa-dollar"></i> <span></span>
        </div>

        <div class="btn-group map-item-info-buttons center">
            <a class="btn btn-default btn-sm map-item-view-utilities center" title="Tiện ich"><i class="fa fa-share-alt"></i></a>
            <a class="btn btn-default btn-sm map-item-gotoview center" title="Chi tiết"><i class="fa fa-feed"></i></a>
        </div>

    </div>
    <div class="iw-content map-item-info-details">
        <h4 class="map-item-info-title iw-title">Place title</h4>
        <div class="iw-subTitle"><i class="fa fa-map-marker"></i> <span class="map-item-info-address"></span></div>
        <div class="map-item-info-more">
                <div title="Loại bất động sản"><i class="fa fa-building"></i> Loại: <span class="map-item-info-type"></span></div>

                <div title="Số phòng ngủ"><i class="fa fa-bed"></i> Số phòng ngủ: <span class="map-item-info-bed"></span></div>
                <div title="Hướng"><i class="fa fa-map-signs"></i> Hướng: <span class="map-item-info-huong"></span></div>

                <div title="Liên hệ"><i class="fa fa-phone"></i> Liên hệ: <span class="map-item-info-contact_phone"></span> (<span class="map-item-info-contact_name"></span>)</div>
        </div>

        <div class="hidden no-padding-left">
            <div class="map-item-info-des"></div>
            <div class="iw-bottom-gradient"></div>
        </div>
        <div class="clearfix"></div>

    </div>
</div></div>

<!--<div id="pano" style="z-index:1000;width:100%;height:100%">
</div>-->

<div id="overlapNodes"></div>

<div class="popup popup-dark "><div class="popup-inner"><div>
	<div class="popup-content " style="background:#fff">
		<a class="popup-btn" role="close"></a>
		<div class="the-board">

<div class="v-place-view">
    <h4 class="page-title v-place-title"></h4>
    <div class="col-lg-8 v-place-imgs no-padding">
        <div class="v-place-board v-place-v-thumbs">
            <div class="v-place-bg"></div>
            <div class="v-place-thumbs">
            </div>
        </div>
        <div class="v-place-board v-place-v-360">
              <div class="panorama"></div>
        </div>
        <div class="v-place-board v-place-v-direction">
              <div id="map_direction"></div>
        </div>
        <div class="v-place-board v-place-v-streetview hide">
            <div id="pano"></div>
        </div>
        <div class="v-place-board v-place-v-video hide">
        </div>
        <div class="v-place-switch-buttons">
            <div class="v-place-mode active" id="v-thumbs" title="Xem ảnh thường"><i class="fa fa-picture-o"></i></div>
            <div class="v-place-mode" id="v-360" title="Ảnh 360"><i class="fa fa-map"></i></div>
            <div class="v-place-mode" id="v-streetview" title="Ảnh đường phố"><i class="fa fa-map-signs"></i></div>
            <div class="v-place-mode" id="v-direction" title="Dẫn đường"><i class="fa fa-car"></i></div>
            <div class="v-place-mode" id="v-video" title="Xem video"><i class="fa fa-play-circle"></i></div>
        </div>
    </div>
    <div class="col-lg-4 popup-section section-light v-place-info">
        <!--<img class="v-place-avt left" src="'+place.avatar+'"/>
        <h4 class="v-place-title"></h4>
        <div class="v-place-type"></div>
        <div class="clearfix"></div>
        -->
        <div class="v-box"><div class="v-box-content">
            <div class="v-place-price"><i class="fa fa-dollar"></i> <span class="v-place-pricenum"></span></div>
            <div class="v-place-address"><i class="fa fa-map-marker"></i> <span></span></div>
        </div></div>
        <div class="v-box v-place-more"><h4>Thông tin</h4><ul class="v-box-content open">
            <li class="v-place-more-one v-place-area">Diện tích: <span></span></li>
            <li class="v-place-more-one v-place-direction">Hướng: <span></span></li>
            <li class="v-place-more-one v-place-room">Số phòng ngủ: <span></span></li>
            <li class="v-place-more-one v-place-type">Loại: <span></span></li>
        </ul></div>
        <div class="v-box"><h4>Chi tiết </h4><div class="v-box-content open"><div class="v-place-details"></div><a href="#" class="v-place-details-more">Xem thêm</a></div></div>
        <!--//<div class="place-contact-info"><h3>'+place.tenlienhe+'</h3><a href="tel:'+place.dienthoai+'" class="place-contact-info-phone btn btn-danger">'+place.dienthoai+'</a></div>
        //<div class="v-box v-box-content"><a href="#" class="streetview-btn"><i class="fa fa-car"></i> Street view</a></div>
        //<div class="v-box v-box-content"><a href="#" class="streetview-btn"><i class="fa fa-car"></i> Dẫn đường</a></div>-->
        <div class="v-box"><h4>Liên hệ</h4>
            <ul class="v-place-more v-box-content open">
                <li><i class="fa fa-user"></i> Tên liên hệ: <span class="v-place-ten bold"></span></li>
                <li><i class="fa fa-phone"></i> Số điện thoại: <span class="v-place-phone bold"></span></li>
                <li><i class="fa fa-envelope-square"></i> Email: <span class="v-place-email bold"></span></li>
            </ul>
        </div>
    </div>
    <div class="clearfix"></div>
    <div class="v-box v-place-related popup-section section-light">
        <h4>Dự án tương tự</h4>
        <div class="v-place-related-list v-box-content open"></div>
    </div>

    <div class="v-place-more-btns">
        <div class="contact-call"><i class="fa fa-phone"></i></div>
        <div class="contact-mail"><i class="fa fa-envelope"></i></div>
        <div class="contact-chat"><i class="fa fa-comments-o"></i></div>
        <div class="contact-save"><i class="fa fa-bookmark"></i></div>
        <div class="contact-more"><i class="fa fa-ellipsis-h"></i></div>
    </div>

</div>

        </div>
    </div>
</div></div></div>
