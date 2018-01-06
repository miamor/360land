var newNode = (window.location.href.indexOf('type=search') > -1 ? false : true);

$(document).ready(function () {
    var FormGen = $('.place-add').FormGen('add', (newNode ? '': 'search') );
    FormGen.initialize();
})
