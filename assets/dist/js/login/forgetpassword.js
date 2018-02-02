$(document).ready(function () {
    if (localStorage.getItem('token')) { // already logged in
        window.location.href = MAIN_URL;
        //window.history.back();
    } else {
        $('#forgetpassword').submit(function () {
            $.ajax({
                url: API_URL + '/user/check_mail/',
                type: 'post',
                data: $('#login').serialize(),
                success: function (response) {
                    console.log(response);
                    mtip('', 'success', '', 'Vui lòng kiểm tra email để xác nhận tài khoản.');
                },
                error: function (a, b, c) {
                    console.log(a)
                    //mtip('', 'error', '', 'Có lỗi xảy ra khi đăng nhập. Chắc chắn rằng tên đăng nhập và mật khẩu bạn nhập vào là chính xác. Và liên hệ với quản trị viên để được hỗ trợ sớm nhất!');
                    mtip('', 'error', '', 'Lỗi hệ thống! Vui lòng liên hệ với quản trị viên để được hỗ trợ sớm nhất!');
                }
            })
            return false
        })
    }
})
