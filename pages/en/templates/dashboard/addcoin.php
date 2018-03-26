<h2 class="page-title show">Nạp tiền</h2>

<form id="theform" class="change-info">
    <div class="form-group">
        <div class="col-lg-3 control-label">Số tiền muốn nạp</div>
        <div class="col-lg-9">
            <input type="number" min="10" value="10" name="coin" class="form-control"/>
        </div>
        <div class="clearfix"></div>
    </div>

    <!--<div class="form-group" style="margin-top:15px">
        <div class="col-lg-3 control-label"></div>
        <div class="col-lg-9">
            <div class="g-recaptcha" data-sitekey="6LelrzsUAAAAAFljbuBoEJE3HvWIs52ldwS4XiRJ"></div>
        </div>
        <div class="clearfix"></div>
    </div>-->

    <div class="add-form-submit center">
        <!--<input value="Gửi yêu cầu xuất hóa đơn" class="btn btn-primary" type="submit">-->
        <button class="btn btn-primary g-recaptcha" data-sitekey="6LfC-ksUAAAAAJNP8YQiXZ3r67Hz7vtNE4YpzLzo" data-callback="onSubmitRequest" style="border-radius:3px!important">Gửi yêu cầu xuất hóa đơn</button>
    </div>

</form>


<div class="daguiyeucau hide">
    <h4>Hệ thống đã nhận được yêu cầu nạp tiền của quý khách</h4>
    <ul>
        <li>Mã đơn hàng: <span class="ma_donhang bold"></span></li>
        <li>Tình trạng: <b>Chờ thanh toán</b></li>
    </ul>
</div>

<div class="payment-details">
    <h4>Hướng dẫn thanh toán</h4>
    <p>Quý khách vui lòng chọn 1 trong các hình thức thanh toán dưới đây</p>
    <div class="payment-method-one disabled">
        <div class="payment-info">
            <img src="<?php echo IMG ?>/VisaMasterJCB.png" class="left"/>
            <h4>THANH TOÁN ONLINE BẲNG THẺ VISA, MASTER</h4>
            <div class="clearfix"></div>
        </div>
        <div class="payment-info-more">
            <div><img src="<?php echo IMG ?>/123PayVisa.jpg"/></div>
            <button disabled class="btn btn-primary">Chưa hỗ trợ hình thức thanh toán này</button>
            <div class="clearfix"></div>
        </div>
    </div>

    <div class="payment-method-one disabled">
        <div class="payment-info">
            <img src="<?php echo IMG ?>/123pay_Logo.png" class="left"/>
            <h4>THANH TOÁN ONLINE BẲNG THẺ ATM NỘI ĐỊA HOẶC TÀI KHOẢN NGÂN HÀNG</h4>
            <div class="clearfix"></div>
        </div>
        <div class="payment-info-more">
            <div><img src="<?php echo IMG ?>/123Pay_BN02.jpg"/></div>
            <button disabled class="btn btn-primary">Chưa hỗ trợ hình thức thanh toán này</button>
            <div class="clearfix"></div>
        </div>
    </div>

    <div class="payment-method-one">
        <div class="payment-info">
            <img src="<?php echo IMG ?>/bank.png" class="left"/>
            <h4>THANH TOÁN QUA CHUYỂN KHOẢN</h4>
            <p>Quý khách có thể thanh toán cho chúng tôi bằng cách chuyển khoản trực tiếp tại ngân hàng, chuyển qua thẻ ATM, hoặc qua Internet banking.</p>
            <div class="clearfix"></div>
        </div>
        <div class="payment-info-more">
            <div class="alerts alert-info"><div clas="bold">Lưu ý khi chuyển khoản:</div>Nội dung chuyển khoản ghi rõ: <b>MDH <span class="ma_donhang">XXX</span></b> </div>
            <p class="compname" style="text-transform: none !important;">Bạn sử dụng tài khoản ngân hàng nào để chuyển khoản? Chọn một ngân hàng dưới đây:</p>
            <div id="bankList">
                <?php include 'bankInfo.php' ?>
            </div>
            <div class="clearfix"></div>
            <!--<button class="btn btn-primary" onclick="chooseATM">Đã hỗ trợ</button> -->
            <div class="clearfix"></div>
        </div>
    </div>

</div>

<div class="clearfix"></div>
