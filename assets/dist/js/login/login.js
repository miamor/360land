function loginForm () {
    
}

function checkLogin () {
    if (localStorage.getItem('token')) {
        window.location.href = MAIN_URL;
    } else {
        loginForm()
    }
}

$(document).ready(function () {
    checkLogin();
})
