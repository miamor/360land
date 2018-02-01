$(document).ready(function () {
    if (localStorage.getItem('token')) { // already logged in
        window.location.href = MAIN_URL;
        //window.history.back();
    } else {
        $('#resetpassword').submit(function () {
            return false
        })
    }
})
