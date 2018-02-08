$(document).ready(function () {
    $('head').append('<script src="https://www.google.com/recaptcha/api.js"></script>');

    $('#theform').submit(function () {
        if ($('[name="password"]').val() == $('[name="password_confirm"]').val() ) {
            $.ajax({
                url: API_URL+'/manager_user/changepassword/',
                type: 'put',
                data: $(this).serialize(),
                datatype: 'json',
                beforeSend: function(xhr) {
                    xhr.setRequestHeader('Authorization', __token);
                },
                success: function (response) {
                    console.log(response);
                    data = response.data;
                    if (data == 'error') {
                        mtip('', 'error', '', 'Có lỗi khi thay đổi mật khẩu. Vui lòng liên hệ với quản trị viên để được hỗ trợ sớm nhất!');
                    } else {
                        __userInfo = data;
                        localStorage.setItem('user_info', JSON.stringify(data));
                        mtip('', 'success', '', 'Mật khẩu được cập nhật thành công');
                    }
                },
                error: function (a, b, c) {
                    __handle_error(a)
                }
            });
        } else {
            mtip('', 'error', '', 'Mật khẩu không trùng khớp');
        }
        return false
    })
})