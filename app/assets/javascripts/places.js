// Place all the behaviors and hooks related to the matching controller here.
// All this logic will automatically be available in application.js.
function initMap(lat, lng) {

  var myCoords = new google.maps.LatLng(lat, lng);

  var mapOptions = {
    center: myCoords,
    zoom: 14
  };

  var map = new google.maps.Map(document.getElementById('map'),mapOptions);

  var marker = new google.maps.Marker({
    position: myCoords,
    map: map
  });
}

function initMapAll() {

  var allLat = document.getElementsByClassName('place_latitude');
  var allLng = document.getElementsByClassName('place_longitude');
  var locations = []
  var markers = []

  for(var i = 0; i < allLat.length; i++){
    var coordinate = {
      lat: parseFloat(allLat[i].getAttribute("value")),
      lng: parseFloat(allLng[i].getAttribute("value"))
    }
    locations.push(coordinate)
  };

  var mapAll = new google.maps.Map(document.getElementById('map-all'), {
    zoom: 12,
    center: {lat: 45.520788, lng: -122.677645}
  })

  for(var i = 0; i < locations.length; i++){
    var marker = new google.maps.Marker({
      position: locations[i],
      map: mapAll
    });
    markers.push(marker)
  };
}

function initMap2() {
  var lat = document.getElementById('place_latitude').value;
  var lng = document.getElementById('place_longitude').value;
  // if not defined create default position

  if (!lat || !lng){
    lat=45.520788;
    lng=-122.677645;
    document.getElementById('place_latitude').value = lat;
    document.getElementById('place_longitude').value = lng;
  }

  var myCoords = new google.maps.LatLng(lat, lng);
  var mapOptions = {
    center: myCoords,
    zoom: 14
  };

  var map = new google.maps.Map(document.getElementById('map2'), mapOptions);
  var marker = new google.maps.Marker({
    position: myCoords,
    animation: google.maps.Animation.DROP,
    map: map,
    draggable: true
  });

  //refresh marker postion and recenter map on marker
  function refreshMarker(){
    var lat = document.getElementById('place_latitude').value;
    var lng = document.getElementById('place_longitude').value;
    var myCoords = new google.maps.LatLng(lat, lng);
    marker.setPosition(myCoords);
    map.setCenter(marker.getPosition());
  }

  // when input values change call refreshMarker
  document.getElementById('place_latitude').onchange = refreshMarker;
  document.getElementById('place_longitude').onchange = refreshMarker;

  // when marker is dragged update input values
  marker.addListener('drag', function() {
    latlng = marker.getPosition();
    newlat=(Math.round(latlng.lat()*1000000))/1000000;
    newlng=(Math.round(latlng.lng()*1000000))/1000000;
    document.getElementById('place_latitude').value = newlat;
    document.getElementById('place_longitude').value = newlng;
  });

  // When drag ends, center (pan) the map on the marker position
  marker.addListener('dragend', function() {
    map.panTo(marker.getPosition());
  });
}
