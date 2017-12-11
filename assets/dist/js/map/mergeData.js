var oldData = a;

// loop through old markers
var markers = $thismap.markers;

//$.each($thismap.markers, function (i, oneMarker) {
for (i = 0; i < $thismap.markers.length; i++) {
    var oneMarker = $thismap.markers[i];
    if (oneMarker && oneMarker != undefined) {
        //console.log(oneMarker);
        //key = $thismap.findMarkerKey(oneMarker.id);
        //console.log(oneMarker.id+' ~ '+key);

        var inData = false;
        // check if this oneMarker.id is in the new data
        for (m = 0; m < oldData.length; m++) {
            if (oldData[m].id == oneMarker.id) {
                // if there is
                a[i] = oldData[m];
                //console.log(oneMarker.id+'~~ keep '+i);
                inData = true;
                break;
            }
        }

        if (!inData) {
            oneMarker.setMap(null);
            //console.log(oneMarker.id+'~~ remove '+i);
            $thismap.markers.splice(i, 1);
            i--;
        }
    }
}

console.log(oldData);
//$.each(oldData, function (i, location) {
for (i = 0; i < oldData.length; i++) {
    location.typeTxt = typeRealEstate[location.type];
    if (location.isProject) location.price = location.pricefrom;
    if (location.price < 1) { // trăm triệu
        location.priceTxt = location.price*100+'tr';
    } else location.priceTxt = location.price+' tỷ';

    //console.log(location.id+' ~ '+$thismap.findMarker(location.id));

    if (!$thismap.findMarker(location.id)) {
        var oneMarker = new MarkerWithLabel({
            map: $thismap.map,
            position: new google.maps.LatLng(location.latitude, location.longitude),
            //icon: nodeMarker[location.type].default,
            icon: nodeMarker.empty,
            labelContent: '<a href="javascript:productControlerObj.ProductMap.showInfoWindow(\''+location.id+'\')" attr-marker-id="'+location.id+'"><span class="marker-type type-'+typeIcon[location.type]+'"><i class="icon-'+typeIcon[location.type]+'"></i></span><span class="marker-label-content">'+location.priceTxt+'</span></a>',
            labelAnchor: labelOrigin,
            labelClass: "marker-label"+($thismap.currentPID == location.id ? " active" : "") + location.exCls, // your desired CSS class
            labelInBackground: true,
        });
        oneMarker.id = location.id;
        //oneMarker.setMap($thismap.map);
        $thismap.markers.push(oneMarker);

        markerkey = $thismap.findMarkerKey(oneMarker.id);
        a[i] = oldData[markerkey];
    }

    //markeyKey = $thismap.findMarkerKey(location.id);
}
//});
