var __token = location.href.split('token=')[1].split('&')[0];

function resetPassword () {
    $.ajax({
        url: API_URL + '/user/reset-password/'+__token+'/',
        type: 'get',
        //data: $(this).serialize(),
        /*beforeSend: function(xhr) {
            xhr.setRequestHeader('Authorization', __token);
        },*/
        success: function (response) {
            console.log(response);

            if (("token" in response) == false) {
                mtip('', 'error', '', "Failed to authenticate");
            } else {
                localStorage.setItem('token', __token);
                localStorage.setItem("login_time" , Math.floor(Date.now() / 1000));
                getUserInfo();        
                setNewPasswordForm();
            }
        },
        error: function (a, b, c) {
            console.log(a)
            //mtip('', 'error', '', 'Có lỗi xảy ra khi đăng nhập. Chắc chắn rằng tên đăng nhập và mật khẩu bạn nhập vào là chính xác. Và liên hệ với quản trị viên để được hỗ trợ sớm nhất!');
            if (a.status == 401) {
                mtip('', 'error', '', 'Failed to authenticate');
            }
            else {
                mtip('', 'error', '', 'Lỗi hệ thống! Vui lòng liên hệ với quản trị viên để được hỗ trợ sớm nhất!');
            }
        }
    })
}

function setNewPasswordForm () {
    $('#resetpassword').submit(function () {
        if ($('[name="password"]').val() == $('[name="password_confirm"]').val()) {
            $.ajax({
                url: API_URL + '/user/set-password/',
                type: 'put',
                data: $(this).serialize(),
                beforeSend: function(xhr) {
                    xhr.setRequestHeader('Authorization', __token);
                },
                success: function (response) {
                    console.log(response);
                    mtip('', 'success', '', 'Mật khẩu đã được cập nhật thành công.');
                    location.href = MAIN_URL+'/dashboard';
                },
                error: function (a, b, c) {
                    console.log(a)
                    //mtip('', 'error', '', 'Có lỗi xảy ra khi đăng nhập. Chắc chắn rằng tên đăng nhập và mật khẩu bạn nhập vào là chính xác. Và liên hệ với quản trị viên để được hỗ trợ sớm nhất!');
                    mtip('', 'error', '', 'Lỗi hệ thống! Vui lòng liên hệ với quản trị viên để được hỗ trợ sớm nhất!');
                }
            })
        }
        return false
    })
}

$(document).ready(function () {
    resetPassword();
})
