function initMap() {
    
  var myLatLng = {lat: 37.771792, lng: -122.425243};

  var map = new google.maps.Map(document.getElementById('map-container'), {
    zoom: 12,
    center: myLatLng
  });

  var marker = new google.maps.Marker({
    position: myLatLng,
    map: map,
    title: 'Hello World!'
  });
}