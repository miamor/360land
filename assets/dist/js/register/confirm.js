var __token = location.href.split('token=')[1].split('&')[0];

function confirmAccount() {
    $.ajax({
        url: API_URL + '/user/confirm-email/' + __token + '/',
        type: 'get',
        //data: $(this).serialize(),
        /*beforeSend: function(xhr) {
            xhr.setRequestHeader('Authorization', __token);
        },*/
        success: function (response) {
            console.log(response);

            if (response.data == 'OK') {
                localStorage.setItem('token', __token);
                localStorage.setItem("login_time", Math.floor(Date.now() / 1000));
                getUserInfo();
                mtip('.confirm-content', 'success', '', 'Xác thực người dùng thành công. Đang chuyển hướng...');
                location.href = MAIN_URL + '/manual';
            }
        },
        error: function (a, b, c) {
            console.log(a)
            if (a.status == 401) {
                //mtip('', 'error', '', 'Failed to authenticate');
                mtip('.confirm-content', 'error', '', 'Lối xác thực');
            }
            else {
                mtip('.confirm-content', 'error', '', 'Lỗi hệ thống! Vui lòng liên hệ với quản trị viên để được hỗ trợ sớm nhất!');
            }
        }
    })
}

$(document).ready(function () {
    if (localStorage.getItem('user_info')) {
        location.href = MAIN_URL;
    } else if (!__token) {
        mtip('', 'error', '', 'Failed to authenticate');
    } else {
        confirmAccount();
    }
})
