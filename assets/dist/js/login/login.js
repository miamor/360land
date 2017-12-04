function loginForm () {
    $('#login').submit(function () {
        $.ajax({
            url: API_URL+'/login/user/',
            type: 'post',
            data: $(this).serialize(),
            success: function (response) {
                if (("token" in response) == false) {
                    console.log(response);
                } else {
                    __token = response.token;
                    localStorage.setItem("token" , __token);
                    localStorage.setItem("login_time" , Date.now());
                    console.log(__token);
                    window.location.href = MAIN_URL;
                }
            },
            error: function (a, b, c) {
                console.log(a)
            }
        });
        return false
    })
}

$(document).ready(function () {
    if (localStorage.getItem('token')) { // already logged in
        window.location.href = MAIN_URL;
    } else {
        loginForm()
    }
})
