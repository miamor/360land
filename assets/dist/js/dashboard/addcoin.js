$(document).ready(function () {
    $('#theform').submit(function () {
        $.ajax({
            url: API_URL+'/manager_user/buycoins/',
            type: 'put',
            data: $(this).serialize(),
            datatype: 'json',
            beforeSend: function(xhr) {
                xhr.setRequestHeader('Authorization', __token);
            },
            success: function (response) {
                console.log(response);
                data = response.data;
                if (data == 'OK') mtip('', 'success', '', 'Thông tin cá nhân được cập nhật thành công');
                else mtip('', 'error', '', 'Có lỗi trong quá trình gửi yêu cầu. Vui lòng liên hệ với quản trị viên để được hỗ trợ sớm nhất!');
            },
            error: function (a, b, c) {
                console.log(a);
                mtip('', 'error', '', 'Lỗi hệ thống! Vui lòng liên hệ với quản trị viên để được hỗ trợ sớm nhất!');
            }
        });
        return false
    })
})