$(document).ready(function () {
    $('#theform').submit(function () {
        $.post(API_URL+'/search/guiphanhoi/', $(this).serialize(), function (response) {
            data = response.data;
            mtip('', 'success', '', 'Phản hồi của bạn đã được gửi và sẽ được duyệt trong thời gian sớm nhất.')
        })
    })
})