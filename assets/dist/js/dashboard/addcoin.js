function onSubmitRequest () {
    $form = $('#theform');
    $.ajax({
        url: API_URL+'/manager_user/buycoins/',
        type: 'post',
        data: $(this).serialize(),
        datatype: 'json',
        beforeSend: function(xhr) {
            xhr.setRequestHeader('Authorization', __token);
        },
        success: function (response) {
            console.log(response);
            data = response.data;
            if (response.status == 'error') {
                mtip('', 'error', '', response.data);
            } else {
                mtip('', 'success', '', 'Yêu cầu nạp tiền được gửi thành công');
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

$(document).ready(function () {
    $('head').append('<script src="https://www.google.com/recaptcha/api.js"></script>');

    $('#theform').submit(function () {
        onSubmitRequest
        return false
    })
})