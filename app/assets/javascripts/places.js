// Place all the behaviors and hooks related to the matching controller here.
// All this logic will automatically be available in application.js.
function initMap(lat, lng) {
  var myCoords = new google.maps.LatLng(lat, lng);
  var mapOptions = {
    center: myCoords,
    zoom: 14
  };

  var map = new google.maps.Map(document.getElementById('map'),mapOptions);
  var infoWindow = new google.maps.InfoWindow
  var marker = new google.maps.Marker({
    position: myCoords,
    map: map
  });
}
// =================================================================================
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
// =================================================================================
function initMap2() {
  var pos
  var map = new google.maps.Map(document.getElementById('map2'), mapOptions);
  var marker

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(position) {
      pos = {
        lat: position.coords.latitude,
        lng: position.coords.longitude
      };
      map.setCenter(pos);
      marker = new google.maps.Marker ({
        position: pos,
        animation: google.maps.Animation.DROP,
        map: map,
        draggable: true
    }, function() {
      handleLocationError(true, infoWindow, map.getCenter());
    });
  }
  else {
    // Browser doesn't support Geolocation
    handleLocationError(false, infoWindow, map.getCenter());
    marker = new google.maps.Marker ({
      position: myCoords,
      animation: google.maps.Animation.DROP,
      map: map,
      draggable: true
  }


  function handleLocationError(browserHasGeolocation, infoWindow, pos) {
    infoWindow.setPosition(pos);
    infoWindow.setContent(browserHasGeolocation ?
      'Error: The Geolocation service failed.' :
      'Error: Your browser doesn\'t support geolocation.');
      infoWindow.open(map);
    }

    var mapOptions = {
      center: myCoords,
      zoom: 14
    };
    var myCoords = new google.maps.LatLng(45, -122);

    });







  //refresh marker postion and recenter map on marker
  function refreshMarker(){
    var lat = document.getElementById('place_latitude').value;
    var lng = document.getElementById('place_longitude').value;
    newPos = new google.maps.LatLng(lat, lng);
    marker.setPosition(newPos);
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
