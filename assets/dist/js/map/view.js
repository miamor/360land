var placeLatLng = {lat: 41.878, lng: -87.629};

function initMap() {
    var map = new google.maps.Map(document.getElementById('place_map'), {
        zoom: 14,
        center: placeLatLng,
        mapTypeId: 'terrain'
    });

    var marker = new google.maps.Marker({
        position: placeLatLng
    });
    marker.setMap(map);

    var placeCircle = new google.maps.Circle({
        strokeColor: '#FF0000',
        strokeOpacity: 0.5,
        strokeWeight: 2,
        fillColor: '#FF0000',
        fillOpacity: 0.15,
        map: map,
        center: placeLatLng,
        radius: 1000
    });

    $('.place-service').submit(function () {
        placeCircle.setMap(null);
        return false
    })
}

var URL = 'http://45.119.82.40:8000/search/node-sell/';

/*var xhr = new XMLHttpRequest();
xhr.open("GET", URL, true);
//xhr.setRequestHeader("X-My-Custom-Header", "some value");
xhr.onload = function () {
    console.log(xhr.responseText);
};
xhr.send();
*/
$(function () {
/*    jQuery.support.cors = true;
    $.ajax({
        url: URL,
        data: { "id":"doc1", "rows":"100" },
        type: "GET",
        timeout: 30000,
        dataType: "jsonp", // "xml", "json"
        success: function(data) {
            // show text reply as-is (debug)
            console.log(data);

            // show xml field values (debug)
            //alert( $(data).find("title").text() );

            // loop JSON array (debug)
            //var str="";
            //$.each(data.items, function(i,item) {
            //  str += item.title + "\n";
            //});
            //alert(str);
        },
        error: function(jqXHR, textStatus, ex) {
            console.log(textStatus + "," + ex + "," + jqXHR.responseText);
        }
    });
*/
    $.ajax({
        url: URL,
        type: 'get',
    //    dataType: 'json',
        success: function (response) {
            console.log("Success");
            console.log(response);
        },
        error:function (jqXHR, textStatus, ex) {
            console.log(jqXHR);
            console.log(textStatus + " ~ " + ex + " ~ " + jqXHR.responseText);
        }
    });

})
