$(document).ready(function () {
    $('#theform').submit(function () {
        $.ajax({
            url: API_URL+'/search/guiphanhoi/', 
            type: 'post',
            data: $(this).serialize(),
            success: function (response) {
                data = response.data;
                mtip('', 'success', '', 'Phản hồi của bạn đã được gửi và sẽ được duyệt trong thời gian sớm nhất.')
            },
            error: function (a, b, c) {
                __handle_error(a)
            }
        })
    })
})