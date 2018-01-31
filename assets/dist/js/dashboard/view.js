$(document).ready(function () {
    if (!__token) {
        location.href = MAIN_URL+'/login'
    }
})