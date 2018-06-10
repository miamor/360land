function onSubmitRequest () {
    $form = $('#theform');
    $.ajax({
        url: API_URL+'/manager_user/buycoins/',
        type: 'post',
        data: $form.serialize(),
        datatype: 'json',
        beforeSend: function(xhr) {
            xhr.setRequestHeader('Authorization', __token);
        },
        success: function (response) {
            console.log(response);
            data = response.data;
            if (response.status == 'error') {
                mtip('', 'error', '', response.message);
            } else {
                mtip('', 'success', '', 'Yêu cầu nạp tiền được gửi thành công');
                $form.hide();
                //$('.payment-details').show();
                $('.daguiyeucau').show();
                $('.ma_donhang').text(data)
            }
            /*if (data == 'OK') mtip('', 'success', '', 'Yêu cầu nạp tiền được gửi thành công');
            else mtip('', 'error', '', 'Có lỗi trong quá trình gửi yêu cầu. Vui lòng liên hệ với quản trị viên để được hỗ trợ sớm nhất!');*/
        },
        error: function (a, b, c) {
            console.log(a);
            mtip('', 'error', '', 'Lỗi hệ thống! Vui lòng liên hệ với quản trị viên để được hỗ trợ sớm nhất!');
        }
    });
}

function ShowInfo (objBank) {
    $("#bankList .bank").removeClass("active");
    $(objBank).addClass("active");
    $("#bankList .bankinfo,#bankList .bankDesc").hide();
    $(".bankDesc", $(objBank).parent()).html($(".bankinfo", $(objBank)).show().html()).show();
    document.cookie = "OrderBankId=" + $(objBank).attr("data-id");
    $("#divBankSelected").html("Bạn đã chọn thanh toán qua:<br /><b>" + $(".bankname", $(objBank)).text() + "</b>");

    $("input:radio").attr("checked", false);
    $('input:radio').parent().parent().css({ 'background': '#FFF' });
    $(objBank).find('input:radio').prop('checked', true);
    //$('input:radio:checked').parent().parent().css({ 'background': '#00a680' });
}

function chooseATM () {
    if (!$('[name="choose_bank"]').val()) {
        mtip('', 'error', '', 'Vui lòng chọn một ngân hàng')
    }
}


$(document).ready(function () {
    $('head').append('<script src="https://www.google.com/recaptcha/api.js"></script>');

    /*$('#theform').submit(function () {
        onSubmitRequest();
        return false
    })*/
    $('.payment-method-one').click(function () {
        if (!$(this).is('.active')) {
            $('.payment-method-one').removeClass('active').find('.payment-info-more').slideUp()
            $(this).addClass('active').find('.payment-info-more').slideDown()
        }
    })
})