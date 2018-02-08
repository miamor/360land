$(document).ready(function () {
    $('#theform .form-group input').each(function () {
        var inputID = $(this).attr('name');
        if (inputID != 'sex') {
            $(this).val(__userInfo[inputID]);
        }
    });
    $('input[name="sex"][value="' + __userInfo.sex + '"]').attr('checked', true).closest('.radio').addClass('checked');

    $('.fix-avt').html('<img src="' + __userInfo.avatar + '"/>');

    $('#image-cropper').cropit({
        imageState: {
            src: __userInfo.avatar
        }
    });
    $('#image-cropper').hide();

    $('.cropit-image-input').change(function (e) {
        $('.edit-avt').show();
        $('.fix-avt').hide();
        //__userInfo.avatar = "http://scottcheng.github.io/cropit/images/1-960.jpg";
    })

    $('.select-image-btn').click(function () {
        $('.cropit-image-input').click();
    });
    $('.rotate-cw-btn').click(function () {
        $('#image-cropper').cropit('rotateCW');
    });
    $('.rotate-ccw-btn').click(function () {
        $('#image-cropper').cropit('rotateCCW');
    });

    $('#changeAvt').submit(function () {
        var formData = new FormData();
        formData.append('avatar', $('#avatar_file')[0].files[0]);
        $.ajax({
            url: API_URL + '/manager_user/editavatar/',
            type: 'POST',
            data: formData,
            processData: false,  // tell jQuery not to process the data
            contentType: false,  // tell jQuery not to set contentType
            success: function (response) {
                data = response.data;
                console.log(data);
                if (data == 'OK') {
                    mtip('', 'success', '', 'Đổi avatar thành công!');
                    $('.edit-avt').show();
                    $('.fix-avt').hide();            
                } else {
                    mtip('', 'error', '', 'Lỗi hệ thống! Vui lòng liên hệ với quản trị viên để được hỗ trợ sớm nhất!');
                }
            },
            error: function (a, b, c) {
                __handle_error(a)
            }
        });
        return false
    })

    $('#theform').submit(function () {
        $.ajax({
            url: API_URL + '/manager_user/edit/',
            type: 'put',
            data: $(this).serialize(),
            datatype: 'json',
            beforeSend: function (xhr) {
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
                __handle_error(a)
            }
        });
        return false
    })
})