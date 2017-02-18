var map;
var infoWindow;

function initMap() {

  var myLatLng = { lat: 37.76680465, lng: -122.41403674111 };

  map = new google.maps.Map(document.getElementById('map-container'), {
    zoom: 14,
    center: myLatLng
  });

  ko.applyBindings(new PlacesViewModel());

}

var PlacesViewModel = function () {
  var self = this;

  self.places = [];
  $.getJSON('api.data.json', function (respone) {
    self.places = respone;

    self.places.forEach(function (place) {
      addMarker(place);
    });
  });


}

function getYelpInfo(name,url,snippet_image_url,snippet_text,address){
  var yelpUrl="";
}
function addMarker(place) {
  var coordinate = place.location.coordinate;

  place.marker = new google.maps.Marker({
    position: { lat: coordinate.latitude, lng: coordinate.longitude },
    map: map,
    title: place.name,
    yelpInfo:getYelpInfo(place.name,place.url,place.snippet_text,place.snippet_image_url,place.location.address)
  });

  place.marker.addListener("click",function(){
    var that=this;
    showMarkerInfo(that);
  });
}

function showMarkerInfo(marker) {

  var infowindow = new google.maps.InfoWindow({
    content: marker.yelpInfo
  });
  infowindow.open(map, marker);
}