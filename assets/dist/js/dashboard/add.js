var newNode = window.location.href.indexOf('type=search') === -1;

$(document).ready(function () {
    if (__token) {
        var FormGen = $('#theform').FormGen('add', newNode);
        FormGen.initialize();
    } else {
        $.get(MAIN_URL+'/login?temp=true', function (templates) {
            $('.container').html(templates);
            $('.container').prepend('<div class="alerts alert-info">Bạn phải <a href="'+MAIN_URL+'/login">đăng nhập</a> để đăng tin</div>');
            flatApp();
        });
    }
})
