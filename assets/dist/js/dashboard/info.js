$(document).ready(function () {
    $('#theform .form-group input').each(function () {
        var inputID = $(this).attr('name');
        if (inputID != 'sex') {
            $(this).val(__userInfo[inputID]);
        }
    });
    $('input[name="sex"][value="'+__userInfo.sex+'"]').attr('checked', true).closest('.radio').addClass('checked');

    
    $('#image-cropper').cropit();

    // When user clicks select image button,
    // open select file dialog programmatically
    $('.select-image-btn').click(function() {
        $('.cropit-image-input').click();
    });
    
    // Handle rotation
    $('.rotate-cw-btn').click(function() {
        $('#image-cropper').cropit('rotateCW');
    });
    $('.rotate-ccw-btn').click(function() {
        $('#image-cropper').cropit('rotateCCW');
    });


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
                if (data == 'error') {
                    mtip('', 'error', '', 'Có lỗi khi thay đổi thông tin cá nhân. Vui lòng liên hệ với quản trị viên để được hỗ trợ sớm nhất!');
                } else {
                    __userInfo = data;
                    localStorage.setItem('user_info', JSON.stringify(data));
                    mtip('', 'success', '', 'Thông tin cá nhân được cập nhật thành công');
                }
            },
            error: function (a, b, c) {
                console.log(a);
                mtip('', 'error', '', 'Lỗi hệ thống! Vui lòng liên hệ với quản trị viên để được hỗ trợ sớm nhất!');
            }
        });
        return false
    })
})