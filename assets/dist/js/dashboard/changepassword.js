$(document).ready(function () {
    $('head').append('<script src="https://www.google.com/recaptcha/api.js"></script>');

    $('#theform').submit(function () {
        if ($('[name="password"]').val() != $('[name="password_confirm"]').val() ) {
            $.ajax({
                url: API_URL+'/manager_user/edit/',
                type: 'put',
                data: $(this).serialize(),
                datatype: 'json',
                beforeSend: function(xhr) {
                    xhr.setRequestHeader('Authorization', __token);
                },
                success: function (response) {
                    console.log(response);
                    data = response.data;
                    __userInfo = data;
                    localStorage.setItem('user_info', data);
                    mtip('', 'success', '', 'Thông tin cá nhân được cập nhật thành công');
                },
                error: function (a, b, c) {
                    console.log(a);
                    mtip('', 'error', '', 'Lỗi hệ thống! Vui lòng liên hệ với quản trị viên để được hỗ trợ sớm nhất!');
                }
            });
        } else {
            mtip('', 'error', '', 'Mật khẩu không trùng khớp');
        }
        return false
    })
})