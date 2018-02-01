var urlAr = (location.href.replace('/', ' ').trim()).split('/');
var itemID = urlAr[urlAr.length - 1];

$(document).ready(function () {
    $.ajax({
        url: API_URL + '/manager_user/danhsachthongbao/'+itemID+'/',
        type: 'get',
        beforeSend: function(xhr) {
            xhr.setRequestHeader('Authorization', __token);
        },
        success: function(response) {
            data = response.data;
            $('.noti-id').html('#'+data.id);
            $('.noti-time').html(data.time.split('T')[0].split('-').reverse().join('-')+' '+data.time.split('T')[1].split('Z')[0]);
            $('.noti-content').html(data.details);
        }, 
        error: function (a, b, c) {
            console.log(a);
        }
    });
})