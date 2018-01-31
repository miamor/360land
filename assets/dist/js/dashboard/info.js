$(document).ready(function () {
    $('#theform .form-group input').each(function () {
        var inputID = $(this).attr('name');
        if (inputID != 'sex') {
            $(this).val(__userInfo[inputID]);
        }
    });
    $('input[name="sex"][value="'+__userInfo.sex+'"]').attr('checked', true).closest('.radio').addClass('checked');

    $('#theform').submit(function () {
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
        return false
    })
})