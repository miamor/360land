var itemID_URL = (location.href.indexOf('id=') > -1 ? location.href.split('id=')[1].split('&')[0] : null);

$(document).ready(function () {
    var ok = true;
    $('#theform').submit(function () {
        var itemID = $(this).attr('attr-id');
        if (!itemID) {
            if (itemID_URL) {
                $(this).attr('attr-id', itemID_URL);
                itemID = itemID_URL;
            } else {
                ok = false;
            }
        }

        if (!$('#timefrom').val() || !$('#timeto').val()) {
            ok = false;
            console.log('Missing parameters (timefrom || timeto)');
            mtip('', 'error', '', 'Các trường đánh dấu * là bắt buộc (price_giatri)');
        } else {
            var today = new Date();
            today.setHours(0,0,0,0);
            var timefrom = new Date($('#timefrom').val()).getTime();
            var timeto = new Date($('#timeto').val()).getTime();
            if (timefrom < today) {
                ok = false;
                console.log('timefrom < today');
                mtip('', 'error', '', 'Thời gian không thể bắt đầu từ trước ngày hôm nay');
            } else if (timefrom > timeto) {
                ok = false;
                console.log('timefrom > timeto');
                mtip('', 'error', '', 'Thời gian không hợp lệ (thời gian kết thúc < thời gian bắt đầu)');
            }
        }

        if ( ($('#rank').val() == 1 && __userInfo.coin < 20) || __userInfo.coin < 10) {
            ok = false;
            console.log('Not enough money');
            mtip('', 'error', '', 'Tài khoản của bạn không đủ để đăng tin bài thuộc gói này');
        }

        if (ok) {
            var postData = objectifyForm($(this).serializeArray());
            //postData.timefrom = (new Date(postData.timefrom)).toISOString();
            //postData.timeto = (new Date(postData.timeto)).toISOString();
            postData.timefrom += ' 00:00:00';
            postData.timeto += ' 00:00:00';
            postData.vip = parseInt(postData.rank);
    
            console.log(postData);

            $.ajax({
                url: API_URL+'/manager_user/postnodes/'+itemID+'/',
                type: 'post',
                data: postData,
                datatype: 'json',
                beforeSend: function(xhr) {
                    xhr.setRequestHeader('Authorization', __token);
                },
                success: function (response) {
                    console.log(response);
                    if (response.data == 'Khong du coin') {
                        mtip('', 'error', '', 'Bạn không đủ coin để gia hạn gói này! Vui lòng <a href="'+MAIN_URL+'/dashboard/addcoin">nạp thêm coin</a> để tiếp tục.');
                    } else if (response.data == 'OK') {
                        mtip('', 'success', '', 'Tin bài đã được gia hạn!');
                        location.reload();
                    }
                },
                error: function (a, b, c) {
                    console.log(a);
                    mtip('', 'error', '', 'Lỗi hệ thống! Vui lòng liên hệ với quản trị viên để được hỗ trợ sớm nhất!');
                }
            })
        }

        return false
    })
})
