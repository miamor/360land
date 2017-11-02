<form id="map-search-form-project">
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

    <div class="form-group">
        <select id="name" name="name" class="form-control">
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

    <div class="form-group">
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

    <div class="add-form-submit form-one-button">
        <input type="submit" value="Lọc"/>
    </div>
</form>
