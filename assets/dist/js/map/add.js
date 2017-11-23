var placeLatLng = {lat: 18.02, lng: 105.86};

function initMap() {
    var map = new google.maps.Map(document.getElementById('map_select'), {
        zoom: 5,
        mapTypeControl: false,
        center: placeLatLng
    });
    var infowindow = new google.maps.InfoWindow();
    var infowindowContent = document.getElementById('infowindow-content');
    infowindow.setContent(infowindowContent);

    var marker = new google.maps.Marker();
    marker.setMap(map);
    marker.setVisible(false);

    var input = document.getElementById('map_adr');
    var options = {
        types: ['(cities)'],
        componentRestrictions: {country: 'vn'}
    };
    var autocomplete = new google.maps.places.Autocomplete(input, options);
    autocomplete.bindTo('bounds', map);

    autocomplete.addListener('place_changed', function() {
      infowindow.close();
      marker.setVisible(false);
      var place = autocomplete.getPlace();
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
    });
}

var options = {district: ''};
var c_city = district = null;
var cityList = [];
function changeCityCallback () {
    var f = $('form.place-add');
    for (var i = 0; i < cityList.length; i++) {
        if (cityList[i].code == c_city) {
            district = cityList[i].district;
            for (var u = 0; u < district.length; u++) {
                district[u].order = district[u].id;
                if (city == 'HN') {
                    if (district[u].id == 718)
                        district[u].order = 15;
                    else if(district[u].id > 15)
                        district[u].order = district[u].id + 1;
                }
            }
            //district = district.sort(SortByOrder);
            break;
        }
    }
    options.district = '';
    if (district != null && district) {
        for (var i = 0; i < district.length; i++) {
            options.district += "<option value='" + district[i].id + "'>" + district[i].name + "</option>";
            street = district[i].street;
        }
    }
    f.find('#district').html('<option value="-1">--Chọn Quận/Huyện--</option>'+options.district);
}

$(function () {
    if (typeof cityListOther1 != 'undefined') cityList = $.merge(cityList, cityListOther1);
    if (typeof cityListOTher2 != 'undefined') cityList = $.merge(cityList, cityListOther2);
    if (typeof cityListOTher3 != 'undefined') cityList = $.merge(cityList, cityListOther3);
    if (typeof cityListOTher4 != 'undefined') cityList = $.merge(cityList, cityListOther4);

    $('#city').change(function () {
        c_city = $(this).val();
        changeCityCallback();
    })

    $('.place-add').submit(function () {
        $.ajax({
            url: '',
            type: 'post',
            data: $(this).serialize(),
            success: function (response) {

            }
        })
        return false
    })
})
