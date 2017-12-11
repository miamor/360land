var placeLatLng = {lat: 18.02, lng: 105.86};
var infowindowContent = document.getElementById('infowindow-content');

var map = new google.maps.Map(document.getElementById('map_select'), {
    zoom: 5,
    mapTypeControl: false,
    center: placeLatLng
});
var geocoder = new google.maps.Geocoder();
var infowindow = new google.maps.InfoWindow();
var marker = new google.maps.Marker();


function initMap() {
    infowindow.setContent(infowindowContent);

    marker.setMap(map);
    marker.setVisible(false);

    var input = document.getElementById('details_address');
    var options = {
        //types: ['(cities)'],
        componentRestrictions: {country: 'vn'}
    };
    var autocomplete = new google.maps.places.Autocomplete(input, options);
    autocomplete.bindTo('bounds', map);

    google.maps.event.addDomListener(input, 'keydown', function(event) {
        if (event.keyCode === 13) {
            event.preventDefault();
        }
    });

    autocomplete.addListener('place_changed', function() {
        infowindow.close();
        marker.setVisible(false);
        var place = autocomplete.getPlace();

        changeAdrCallback(place);
    });
}

google.maps.event.addDomListener(window, 'load', initMap);


function geocodeaddress (address) {
    //var address = this.input.place_search.value;
    geocoder.geocode({'address': address}, function(results, status) {
        if (status === 'OK') {
            return results[0]
        } else {
            return false;
        }
    });
}

function changeAdrCallback (place) {
    if (!place.geometry) {
      // User entered the name of a Place that was not suggested and
      // pressed the Enter key, or the Place Details request failed.
      window.alert("No details available for input: '" + place.name + "'");
      return;
    }

    // If the place has a geometry, then present it on a map.
    if (place.geometry.viewport) {
      map.fitBounds(place.geometry.viewport);
    } else {
      map.setCenter(place.geometry.location);
      map.setZoom(17);  // Why 17? Because it looks good.
    }
    marker.setPosition(place.geometry.location);
    marker.setVisible(true);

    $('#latitude').val(place.geometry.location.lat());
    $('#longitude').val(place.geometry.location.lng());

    var address = '';
    if (place.address_components) {
      address = [
        (place.address_components[0] && place.address_components[0].short_name || ''),
        (place.address_components[1] && place.address_components[1].short_name || ''),
        (place.address_components[2] && place.address_components[2].short_name || '')
      ].join(' ');
    }

    infowindowContent.children['place-icon'].src = place.icon;
    infowindowContent.children['place-name'].textContent = place.name;
    infowindowContent.children['place-address'].textContent = address;
    infowindow.open(map, marker);
}
