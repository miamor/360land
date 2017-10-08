var locations = [
  {lat: -31.563910, lng: 147.154312},
  {lat: -33.718234, lng: 150.363181},
  {lat: -33.727111, lng: 150.371124},
  {lat: -33.848588, lng: 151.209834},
  {lat: -33.851702, lng: 151.216968},
  {lat: -34.671264, lng: 150.863657},
  {lat: -35.304724, lng: 148.662905},
  {lat: -36.817685, lng: 175.699196},
  {lat: -36.828611, lng: 175.790222},
  {lat: -37.750000, lng: 145.116667},
  {lat: -37.759859, lng: 145.128708},
  {lat: -37.765015, lng: 145.133858},
  {lat: -37.770104, lng: 145.143299},
  {lat: -37.773700, lng: 145.145187},
  {lat: -37.774785, lng: 145.137978},
  {lat: -37.819616, lng: 144.968119},
  {lat: -38.330766, lng: 144.695692},
  {lat: -39.927193, lng: 175.053218},
  {lat: -41.330162, lng: 174.865694},
  {lat: -42.734358, lng: 147.439506},
  {lat: -42.734358, lng: 147.501315},
  {lat: -42.735258, lng: 147.438000},
  {lat: -43.999792, lng: 170.463352}
]
var item_marker = null;
var item_infowindow = null;
var map = null;
var polyline = null;
var mapPoly = null;
var listLatlgn = [];
var beginDrawButton = $('');

function showInfo (item_marker, item_id) {
    $.get(MAIN_URL+'/api/map_item_info.php', function (data) {
        console.log(data);
        $('.map-item-info-title').html(data.title);
        $('.map-item-info-price span').html(data.price);
        $('.map-item-info-type').html(data.type);
        $('.map-item-info-contact_phone').html(data.contact_phone);
        $('.map-item-info-address').html(data.address);
        $('.map-item-info-des').html(data.description);
        $('.map-item-info-thumb').attr('src', data.thumb);

        if (item_infowindow) item_infowindow.close();

        item_infowindow = new google.maps.InfoWindow({
            content: $('.map-item-info-board').html()
        });
        item_infowindow.open(map, item_marker);
    })
}


function draw () {
    polyline = new google.maps.Polygon({
        path: listLatlgn,
        strokeColor: '#585858',
        strokeWeight: 3,
        editable: true,
        fillColor: "#ccc",
        fillOpacity: 0.5
    });
    polyline.setMap(map);
}

/*
function _mouseMoveEvent (j) {
    mapPoly.getPath().push(j.latLng);
    var i = new Date().valueOf();
    if (i - c >= f) {
        c = i;
        listLatlgn.push(j.latLng)
    }
}*/
function _beginDrawEvent (a) {
    return function () {
        listLatlgn = new Array();

        function _mouseMoveEvent(j) {
            mapPoly.getPath().push(j.latLng);
            var i = new Date().valueOf();
            if (i - c >= f) {
                c = i;
                listLatlgn.push(j.latLng)
            }
        }
        google.maps.event.addListener(map, "mousemove", function(j) {
            _mouseMoveEvent(j)
        })
    }
};


function initMap() {
    $('nav.navbar').removeClass('navbar-static-top').addClass('navbar-fixed-top');
    $("#place_price").ionRangeSlider();

    /*
    var map = new google.maps.Map(document.getElementById('map'), {
        zoom: 4,
        center: {lat: -28.024, lng: 140.887}
    });
    */

    var k = {
        center: new google.maps.LatLng(-28.024, 140.887),
        zoom: 4,
        overviewMapControl: true,
        overviewMapControlOptions: {
            opened: false
        },
        panControl: false,
        rotateControl: false,
        scaleControl: false,
        zoomControl: true,
        streetViewControl: false,
        mapTypeControl: true,
        mapTypeId: google.maps.MapTypeId.ROADMAP,
        mapTypeControlOptions: {
            style: google.maps.MapTypeControlStyle.DROPDOWN_MENU,
            position: google.maps.ControlPosition.TOP_RIGHT
        },
        draggable: true
    };
    map = new google.maps.Map(document.getElementById('map'), k);


    beginDrawButton.bind('click', this, function(b) {
        google.maps.event.addListener(map, "mousedown", _beginDrawEvent());
        google.maps.event.addListener(map, "mousemove", function (j) {
            _mouseMoveEvent(j)
        });
        $('body').bind('touchend', this, _endDrawEvent());
    });

    // Create an array of alphabetical characters used to label the markers.
    var labels = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

    // Add some markers to the map.
    // Note: The code uses the JavaScript Array.prototype.map() method to
    // create an array of markers based on a given "locations" array.
    // The map() method here has nothing to do with the Google Maps API.
    var markers = locations.map(function(location, i) {
        return new google.maps.Marker({
            position: location,
            label: labels[i % labels.length]
        });
    });
    $.each(markers, function (i, oneMarker) {
        oneMarker.addListener('click', function() {
            showInfo(oneMarker, i);
        });
    })

    // Add a marker clusterer to manage the markers.
    var markerCluster = new MarkerClusterer(map, markers, {
        imagePath: 'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m'
    });


    $('.map-result-one').click(function () {
        // clear item_marker
        if (item_marker) item_marker.setMap(null);

        var item_id = $(this).attr('attr-id');
        var item_location = locations[item_id];

        map.setCenter(item_location);
        map.setZoom(13);

        google.maps.event.trigger(markers[item_id], 'click');

        return false
    })
}
