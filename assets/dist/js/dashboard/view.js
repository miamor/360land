$(document).ready(function () {
    if (!__token) {
        location.href = MAIN_URL+'/login'
    }
    $('.public-profile-link').attr('href', MAIN_URL+'/user/'+$('.myID').attr('id'));
})
