var map;
var infoWindow;

function initMap() {

  var myLatLng = { lat: 37.76680465, lng: -122.41403674111 };

  map = new google.maps.Map(document.getElementById('map-container'), {
    zoom: 16,
    center: myLatLng
  });

  ko.applyBindings(new PlacesViewModel());

}

var PlacesViewModel = function () {
  var self = this;

  self.searchText = ko.observable('');

  self.places = ko.observableArray([]);
  self.myCenter = "37.76680465,-122.41403674111";

  google.maps.event.addListener(map, 'click', function () {
    infowindow.close();
  });

  $.ajax({
    url: 'https://api.foursquare.com/v2/venues/search?ll=' + self.myCenter +
    '&client_id=NONGGLXBKX5VFFIKKEK1HXQPFAFVMEBTRXBWJUPEN4K14JUE&client_secret=ZZDD1SLJ4PA2X4AJ4V23OOZ53UM4SFZX0KORGWP5TZDK4YYJ&v=20160101&limit=10',
    dataType: "json",
    success: function (result) {
      if (result.meta.code == 200) {

        
        var resultData=result.response.venues;
        resultData.forEach(function (place) {
          addMarker(place);
        });
        self.places(result.response.venues);

   
      }
    },
    error: function (e) {
      document.getElementById("error").innerHTML = "<h4>Get data from Foursquare's API  failed.</h4>";
    }
  });

 

  self.placeClick = function (item) {
    var currentMarker = item.marker;
    google.maps.event.trigger(currentMarker, "click");
  }

}

function addMarker(place) {
  var location = place.location;
  var latitude = location.lat;
  var longitude = location.lng;
  var title = place.name;
  var venueId = place.id;

  place.marker = new google.maps.Marker({
    position: { lat: latitude, lng: longitude },
    map: map,
    title: title,
  });

  place.marker.addListener("click", function () {
    var that = this;
    showMarkerInfo(venueId, that);
  });
}

function showMarkerInfo(venueId, marker) {
  $.ajax({
    url: 'https://api.foursquare.com/v2/venues/' + venueId +
    '?client_id=NONGGLXBKX5VFFIKKEK1HXQPFAFVMEBTRXBWJUPEN4K14JUE&client_secret=ZZDD1SLJ4PA2X4AJ4V23OOZ53UM4SFZX0KORGWP5TZDK4YYJ&v=20160101&limit=10',
    dataType: "json",
    success: function (result) {
      if (result.meta.code == 200) {
        var venueData = result.response.venue;
        var venueFirstImage = venueData.photos.groups[0].items[0].prefix + "200x200" + venueData.photos.groups[0].items[0].suffix;

        var venueDescription = venueData.description ? venueData.description : "";
        infowindow = new google.maps.InfoWindow({
          content: "<div style='width:220px;'><h3>" + venueData.name + "</h3><div><img src=" + venueFirstImage + "></div><div><p>" + venueDescription + "</p></div><div><a target='_blank' href=" + venueData.canonicalUrl + ">Link</a></div></div>"
        });
        infowindow.open(map, marker);
      }
    },
    error: function (e) {
      document.getElementById("error").innerHTML = "<h4>Get data from Foursquare's API  failed.</h4>";
    }
  });


}