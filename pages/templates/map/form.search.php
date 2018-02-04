<form id="place_search_form" method="post" enctype="multipart/form-data"></form>

<form id="map-search-form">
    <div id="map-input" class="hidden">
        <input type="text" id="isShowUtil" name="isShowUtil" value="0"/>
        <input type="text" id="searchtype" name="searchtype"/>
        <input type="text" id="product" name="product"/>
        <input type="text" id="zoom" name="zoom" value=""/>
        <input type="text" id="center" name="center" value=""/>
        <input type="text" id="points" name="points"/>
        <input type="text" id="details" name="details"/>
    </div>
    <div class="search-result-map">
        <div id="lblResultMessage"></div>
    </div>

    <div class="form-group p_type" attr-type="node">
        <div class="col-lg-4 no-padding">
            <label><input type="radio" name="type_action" class="minimal" value="2"> Mua</label>
        </div>
        <div class="col-lg-4 no-padding">
            <label><input type="radio" name="type_action" class="minimal" value="1"> Thuê</label>
        </div>
        <div class="col-lg-4 no-padding">
            <label><input type="radio" checked name="type_action" class="minimal" value="0"> Tất cả</label>
        </div>
        <div class="clearfix"></div>
    </div>

    <div class="form-group" attr-type="node">
        <!--<select id="type" name="type" class="form-control">
            <option value="CN">Chọn loại bất động sản</option>
            <option value="apartment">Chung cư</option>
            <optgroup label="Nhà bán">
                <option value="house">Nhà riêng</option>
                <option value="housestreet">Nhà mặt phố</option>
                <option value="villa">Biệt thự, liền kề</option>
            </optgroup>
            <optgroup label="Đất bán">
                <option value="projectland">Đất nền dự án</option>
                <option value="land">Bán đất</option>
            </optgroup>
            <option value="resort">Trang trại, khu nghỉ dưỡng</option>
            <option value="office">Văn phòng</option>
            <option value="other">Khác</option>
        </select>-->
        <div class="form-group form-type" attr-type="node">
            <select id="type2" name="type2" class="form-control type_bds hide" attr-typeaction="2">
                <option value="CN">Chọn loại bất động sản</option>
                <option value="typereal1">Chung cư</option>
                <optgroup label="Nhà bán">
                    <option value="typereal2">Nhà riêng</option>
                    <option value="typereal3">Nhà mặt phố</option>
                    <option value="typereal4">Biệt thự, liền kề</option>
                </optgroup>
                <optgroup label="Đất bán">
                    <option value="typereal5">Đất nền dự án</option>
                    <option value="typereal6">Bán đất</option>
                </optgroup>
                <option value="typereal7">Trang trại, khu nghỉ dưỡng</option>
                <option value="typereal8">Nhà kho, nhà xưởng</option>
                <option value="typereal10">Khác</option>
            </select>

            <select id="type1" name="type1" class="form-control type_bds hide" attr-typeaction="1">
                <option value="CN">Chọn loại bất động sản</option>
                <option value="typereal11">Chung cư</option>
                <optgroup label="Nhà thuê">
                    <option value="typereal12">Nhà riêng</option>
                    <option value="typereal13">Nhà mặt phố</option>
                    <option value="typereal14">Phòng trọ, nhà trọ</option>
                </optgroup>
                <option value="typereal16">Cửa hàng, ki ốt</option>
                <option value="typereal15">Văn phòng</option>
                <option value="typereal17">Trang trại, khu nghỉ dưỡng</option>
                <option value="typereal18">Khác</option>
            </select>

            <input type="hidden" name="type" id="type"/>
        </div>
    </div>

    <div class="form-group p_name hide" attr-type="project">
        <input type="text" name="tenduan" id="tenduan" class="form-control" placeholder="Input project name"/>
        <div class="ville-dropdown hide"></div>
        <input type="hidden" name="duanid" id="duanid" class="typereal11 typereal1 form-control"/>
    </div>

    <div class="form-group">
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
    <div class="form-group">
            <select id="district" name="district" class="form-control">
                <option value="CN">--Chọn Quận/Huyện--</option>
            </select>
    </div>

    <div class="form-group" attr-type="node">
            <select id="area" name="area" class="form-control">
                <option value="CN">Chọn diện tích</option>
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

    <div class="form-group form-price" attr-type="project">
        <input id="pricefrom_giatri" type="number" min="0" class="form-control" placeholder="Giá từ"/>
        <select id="pricefrom_donvi" class="form-control">
            <option value="m">triệu đồng</option>
            <option value="b">tỷ đồng</option>
            <option value="mp">triệu đồng/m2</option>
        </select>
        <input name="pricefrom" id="pricefrom" type="hidden"/>
    </div>

    <div class="form-group" attr-type="node">
            <select name="price" id="price" class="form-control">
                <option value="-1">Chọn giá tiền</option>
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

    <div class="form-group txt-with-line center toggle-search-advanced" attr-type="node">
        <span class="txt generate-new-button">Tìm kiếm nâng cao <span class="fa fa-caret-down"></span></span>
    </div>

    <div class="map-search-advanced hide">
        <div class="form-group" attr-type="node">
            <select id="ward" name="ward" class="form-control">
                <option value="CN">--Chọn Phường/Xã--</option>
            </select>
        </div>
        <div class="form-group" attr-type="node">
            <select id="street" name="street" class="form-control" placeholder="Đường">
                <option value="CN">--Chọn Đường/Phố--</option>
            </select>
        </div>

        <div class="form-group" attr-type="node">
            <input id="room" name="room" type="number" min="0" class="form-control" placeholder="Số phòng ngủ"/>
        </div>

        <div class="form-group" attr-type="node">
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
    </div>

    <div class="add-form-submit form-one-button center">
        <a href="#" class="cancel-filter hide"><i class="fa fa-times"></i> Bỏ lọc</a>
        <button type="submit" class="btn btn-success btn-filter"><i class="fa fa-filter"></i> Lọc</button>
    </div>
</form>
