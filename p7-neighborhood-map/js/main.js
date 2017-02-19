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
  self.myCenter = "37.76680465,-122.41403674111";

  $.ajax({
    url: 'https://api.foursquare.com/v2/venues/search?ll=' + self.myCenter +
    '&client_id=NONGGLXBKX5VFFIKKEK1HXQPFAFVMEBTRXBWJUPEN4K14JUE&client_secret=ZZDD1SLJ4PA2X4AJ4V23OOZ53UM4SFZX0KORGWP5TZDK4YYJ&v=20160101&limit=10',
    dataType: "json",
    success: function (result) {
      if (result.meta.code == 200) {
        
        self.places = result.response.venues;
        self.places.forEach(function (place) {
          addMarker(place);
        });
      }
    },
    error: function (e) {
      document.getElementById("error").innerHTML = "<h4>Get data from Foursquare's API  failed.</h4>";
    }
  });

  // $.getJSON('api.data.json', function (respone) {
  //   self.places = respone;

  //   self.places.forEach(function (place) {
  //     addMarker(place);
  //   });
  // });


}

function getYelpInfo(name, url, snippet_image_url, snippet_text, address) {
  var yelpUrl = "";
}
function addMarker(place) {
  var location=place.location;
  var latitude=location.lat;
  var longitude=location.lng;
  var title= place.name;

  place.marker = new google.maps.Marker({
    position: { lat: latitude, lng: longitude },
    map: map,
    title: title,
  });

  place.marker.addListener("click", function () {
    var that = this;
    showMarkerInfo(that);
  });
}

function showMarkerInfo(marker) {

  var infowindow = new google.maps.InfoWindow({
    content: marker.yelpInfo
  });
  infowindow.open(map, marker);
}