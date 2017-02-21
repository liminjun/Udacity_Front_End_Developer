

var PlacesViewModel = function () {
  var self = this;
  var map;
  var infowindow;

  self.places = ko.observableArray([]);//all places

  self.markers = ko.observableArray([]);//map markers

  self.filterPlaces = ko.observableArray([]);//filter places


  self.searchText = ko.observable('')

  self.getPlaces = function () {
    //locatin center
    var locationCenter = "37.76680465,-122.41403674111";
    $.ajax({
      url: 'https://api.foursquare.com/v2/venues/search?ll=' + locationCenter +
      '&client_id=NONGGLXBKX5VFFIKKEK1HXQPFAFVMEBTRXBWJUPEN4K14JUE&client_secret=ZZDD1SLJ4PA2X4AJ4V23OOZ53UM4SFZX0KORGWP5TZDK4YYJ&v=20160101&limit=10',
      dataType: "json",
      success: function (result) {
        if (result.meta.code == 200) {
          var resultData = result.response.venues;
          addMarker(resultData);
          self.filterPlaces(result.response.venues);
          self.places(resultData);
        }
      },
      error: function (e) {
        document.getElementById("error").innerHTML = "<h4>Get data from Foursquare's API  failed.</h4>";
      }
    });
  }








  self.placeClick = function (item) {
    var currentMarkerId = item.id;

    self.markers().forEach(function (item) {
      if (currentMarkerId == item.id) {
        showMarkerInfo(item.id, item.marker);
      }
    });
  }
  //search place.
  self.Search = function () {
    var searchWord = self.searchText().toLowerCase();

    if (!searchWord) {
      return;
    } else {

      //empty the filterPlaces.
      self.filterPlaces([]);


      self.markers().forEach(function (place) {
        var searchIndex = place.name.toLowerCase().indexOf(searchWord);
        if (searchIndex >= 0) {

          place.marker.setVisible(true);
          //showMarkerInfo(place.id, place.marker);
          self.filterPlaces.push({ name: place.name });
        } else {
          // hide marker
          place.marker.setVisible(false);
        }
      });

    }
  }
  self.Reset = function () {
    self.filterPlaces(self.places());
    //show all markers
    self.markers().forEach(function (place) {
      place.marker.setVisible(true);
    });
  }

  function initMap() {

    var myLatLng = { lat: 37.76680465, lng: -122.41403674111 };

    map = new google.maps.Map(document.getElementById('map-container'), {
      zoom: 16,
      center: myLatLng,
      streetViewControlOptions: {
        position: google.maps.ControlPosition.LEFT_BOTTOM
      },
      mapTypeControl: false,
      panControl: false
    });

    clearTimeout(self.googleMapLoadTimeout);

    infowindow = new google.maps.InfoWindow({ maxWidth: 300 });
    self.getPlaces();
  };

  function showMarkerInfo(venueId, marker) {
    $.ajax({
      url: 'https://api.foursquare.com/v2/venues/' + venueId +
      '?client_id=NONGGLXBKX5VFFIKKEK1HXQPFAFVMEBTRXBWJUPEN4K14JUE&client_secret=ZZDD1SLJ4PA2X4AJ4V23OOZ53UM4SFZX0KORGWP5TZDK4YYJ&v=20160101&limit=10',
      dataType: "json",
      success: function (result) {
        if (result.meta.code == 200) {
          var venueData = result.response.venue;
          var venueFirstImage = "http://placehold.it/200x200";

          if (venueData.photos.groups.length > 0 && venueData.photos.groups[0].items.length) {
            venueFirstImage = venueData.photos.groups[0].items[0].prefix + "200x200" + venueData.photos.groups[0].items[0].suffix;
          }


          var venueDescription = venueData.description ? venueData.description : "";



          var contentString = "<div style='width:220px;'><h3>" + venueData.name + "</h3><div><img src=" + venueFirstImage + "></div><div><p>" + venueDescription + "</p></div><div><a target='_blank' href=" + venueData.canonicalUrl + ">Link</a></div></div>";


          infowindow.setContent(contentString);
          map.setZoom(16);
          map.setCenter(marker.position);
          infowindow.open(map, marker);
          map.panBy(0, -150);

        }
      },
      error: function (e) {
        document.getElementById("error").innerHTML = "<h4>Get data from Foursquare's API  failed.</h4>";
      }
    });
  }

  function addMarker(places) {
    places.forEach(function (place) {
      var venueId = place.id;
      var location = place.location;
      var latitude = location.lat;
      var longitude = location.lng;
      var title = place.name;

      var marker = new google.maps.Marker({
        position: new google.maps.LatLng(latitude, longitude),
        title: title,
        map: map
      });

      self.markers.push({ id: venueId, name: title, marker: marker });

      marker.addListener("click", function () {
        var that = this;
        showMarkerInfo(venueId, that);
      });

    });


  }

  initMap();

}

ko.applyBindings(new PlacesViewModel());