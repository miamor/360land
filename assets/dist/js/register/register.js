/*
function showRecaptcha(element) {
	Recaptcha.create("6LelrzsUAAAAAFljbuBoEJE3HvWIs52ldwS4XiRJ", element, {
		theme: "white",
		callback: Recaptcha.focus_response_field
    });
}*/

function registerForm() {
    //showRecaptcha('recaptcha_div');
    $('#register').submit(function () {
        if (!$(this).find('[name="username"]').val() || !$(this).find('[name="password"]').val() || !$(this).find('[name="name"]').val() || !$(this).find('[name="email"]').val() || !$(this).find('[name="phone"]').val()) {
            console.log('Missing parameters');
        } else {
            console.log($(this).serialize());
            $.ajax({
                url: API_URL + '/user/create/',
                type: 'post',
                data: $(this).serialize(),
                success: function (response) {
                    /*if (("token" in response) == false) {
                        console.log(response);
                    } else {
                        __token = response.token;
                        localStorage.setItem("token" , __token);
                        localStorage.setItem("login_time" , Math.floor(Date.now() / 1000));
                        console.log(__token);
                        window.location.href = MAIN_URL;
                    }*/
                    if (response.message == 'OK!!!') {
                        $('#register').html('<div class="alerts alert-success">Đăng ký thành công. Kiểm tra hòm thư để kích hoạt tài khoản!</div>');
                        //location.href = MAIN_URL+'/login';
                    }
                },
                error: function (a, b, c) {
                    console.log(a)
                }
            });
        }
        return false
    })
}

function submitRegister() {
}

// This is called with the results from from FB.getLoginStatus().
function statusChangeCallback(response) {
    console.log('statusChangeCallback');
    console.log(response);
    // The response object is returned with a status field that lets the
    // app know the current login status of the person.
    // Full docs on the response object can be found in the documentation
    // for FB.getLoginStatus().
    if (response.status === 'connected') {
        // Logged into your app and Facebook.
        testAPI();
    } else {
        // The person is not logged into your app or we are unable to tell.
        //document.getElementById('status').innerHTML = 'Please log into this app.';
    }
}

// This function is called when someone finishes with the Login
// Button.  See the onlogin handler attached to it in the sample
// code below.
function checkLoginState() {
    FB.getLoginStatus(function (response) {
        statusChangeCallback(response);
    });
}

window.fbAsyncInit = function () {
    FB.init({
        appId: FB_APP_ID,
        cookie: true,  // enable cookies to allow the server to access
        // the session
        xfbml: true,  // parse social plugins on this page
        version: 'v2.11' // use graph api version 2.8
    });

    // Now that we've initialized the JavaScript SDK, we call
    // FB.getLoginStatus().  This function gets the state of the
    // person visiting this page and can return one of three states to
    // the callback you provide.  They can be:
    //
    // 1. Logged into your app ('connected')
    // 2. Logged into Facebook, but not your app ('not_authorized')
    // 3. Not logged into Facebook and can't tell if they are logged into
    //    your app or not.
    //
    // These three cases are handled in the callback function.

    /*FB.getLoginStatus(function(response) {
      statusChangeCallback(response);
    });*/
    FB.Event.subscribe('auth.login', function (response) {
        console.log("login clicked");
        console.log(response.status);
        console.log(response);
        FB.getLoginStatus(function (response) {
            if (response.status === 'connected') return false
            statusChangeCallback(response);
        });
    })
};

// Load the SDK asynchronously
(function (d, s, id) {
    var js, fjs = d.getElementsByTagName(s)[0];
    if (d.getElementById(id)) return;
    js = d.createElement(s); js.id = id;
    js.src = "https://connect.facebook.net/en_US/sdk.js";
    fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));

// Here we run a very simple test of the Graph API after login is
// successful.  See statusChangeCallback() for when this call is made.
function testAPI() {
    console.log('Welcome!  Fetching your information.... ');
    FB.api('/me', { fields: 'name, email' }, function (response) {
        console.log('Successful login for: ' + response.name);
        console.log(response);
        checkLoginFB(response);
        //document.getElementById('status').innerHTML = 'Thanks for logging in, ' + response.name + '!';
    });
}

function checkLoginFB(userDataFB) {
    $.ajax({
        url: API_URL+'/user/login_facebook/',
        type: 'post',
        data: userDataFB,
        success: function (response) {
            console.log(response);
            if (response.status == 'unavailable') {
                console.log('Account not available in db. Register');
                $('.form-reg-fb').show();
                $('.form-login').hide();
                if (userDataFB.email != null && userDataFB.email) {
                    $('#reg_fb [name="email"]').val(userDataFB.email);
                }
                $('#reg_fb').submit(function () {
                    response.email = $(this).find('[name="email"]').val();
                    regFB(response);
                    return false
                })
                //mtip('', 'error', 'Lỗi', response.message);
            } else if (response.status == 'available') {
                loginSuccess(response.token);
            }
        },
        error: function (a, b, c) {
            __handle_error(a)
        }
    });
}

function regFB (userDataFB) {
    $.ajax({
        url: API_URL+'/user/register_facebook/',
        type: 'post',
        data: userDataFB,
        success: function (response) {
            console.log(response);
            if (response.status == 'unavailable') {
                __handle_error();
            } else if (response.status == 'available') {
                loginSuccess(response.token);
            }
        },
        error: function (a, b, c) {
            __handle_error(a)
        }
    });
}

function loginSuccess(token) {
    __token = token;
    localStorage.setItem("token", __token);
    localStorage.setItem("login_time", Math.floor(Date.now() / 1000));
    console.log(__token);
    getUserInfo();
    mtip('', 'success', '', 'Đăng nhập thành công!');
    if ($('.popup:not(".popup-map") .load_login_form').length) {
        remove_popup();
    }
    if (location.href.indexOf('login') == -1) {
        remove_popup();
        location.reload();
    } else {
        //location.href = MAIN_URL;
        history.go(-1);
    }
}


$(document).ready(function () {
    $("#datepicker").datepicker({
        dateFormat: "dd/mm/yy"
    });
    if (localStorage.getItem('token')) { // already logged in
        window.location.href = MAIN_URL;
    } else {
        $('head').append('<script src="https://www.google.com/recaptcha/api.js"></script>');
        registerForm()
    }
})
