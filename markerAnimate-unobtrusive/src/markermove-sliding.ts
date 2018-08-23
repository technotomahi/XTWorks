export class MarkerMoveSlidingApp {

  marker: SlidingMarker;
  map: google.maps.Map;

  constructor() {

    this.initialize();
    this.run();

  }

  initialize() {

    var myLatlng = new google.maps.LatLng(28.50897939391077, 77.06885091525453);
    var mapOptions: google.maps.MapOptions = {
      zoom: 15,
      center: myLatlng,
      mapTypeId: google.maps.MapTypeId.ROADMAP,
    }
    this.map = new google.maps.Map(document.getElementById('map_canvas'), mapOptions);

    this.marker = new SlidingMarker({
      position: myLatlng,
      map: this.map,
      title: 'I\m sliding marker'
    });

    var $log = $("#log");

    $log.html(
      "<b>left click</b> to call setPosition<br/>" +
      "<b>right click</b> to call setPositionNotAnimated<br/>");

    google.maps.event.addListener(this.marker, 'position_changed', function () {
      $log.html($log.html() + "marker.position_changed<br/>");
    });

  }

  run() {

var locations = [{
  "lat": 28.50897939391077,
  "lng": 77.06885091525453
}, {
  "lat": 28.509997600285676,
  "lng": 77.06760637027162
}, {
  "lat": 28.50914909565577,
  "lng": 77.06846467715638
}, {
  "lat": 28.50771155500088,
  "lng": 77.07130193710327
}, {
  "lat": 28.50732007357447,
  "lng": 77.07046024066346
}, {
  "lat": 28.50724464930266,
  "lng": 77.07191936236757
}, {
  "lat": 28.51003531144416,
  "lng": 77.07387201053041
}, {
  "lat": 28.511355193496648,
  "lng": 77.07451574069398
}, {
  "lat": 28.51246765268526,
  "lng": 77.07522384387391
}, {
  "lat": 28.51530187714749,
  "lng": 77.07785581789085
}, {
  "lat": 28.516093768816912,
  "lng": 77.07882141313621
}, {
  "lat": 28.517168469428377,
  "lng": 77.07989429674217
}, {
  "lat": 28.518350607894096,
  "lng": 77.08102845145004
}, {
  "lat": 28.52089587922196,
  "lng": 77.08195113135116
}, {
  "lat": 28.523158291042254,
  "lng": 77.08306693030136
}, {
  "lat": 28.52480003384884,
  "lng": 77.08429001761215
}, {
  "lat": 28.5256295597664,
  "lng": 77.08469771338241
}, {
  "lat": 28.526949246636498,
  "lng": 77.08553456259506
}, {
  "lat": 28.528306621608778,
  "lng": 77.0864787001683
}, {
  "lat": 28.531009115070255,
  "lng": 77.08808802557724
}, {
  "lat": 28.532045960366094,
  "lng": 77.08901070547836
}, {
  "lat": 28.533101646913682,
  "lng": 77.08967589331405
}, {
  "lat": 28.536419450069776,
  "lng": 77.09160708380477
}, {
  "lat": 28.53790865728934,
  "lng": 77.09248684836166
}, {
  "lat": 28.537437391458422,
  "lng": 77.0949973959996
}, {
  "lat": 28.53709807875492,
  "lng": 77.0979156394078
}, {
  "lat": 28.536626809298422,
  "lng": 77.10044764471786
}, {
  "lat": 28.535552307055863,
  "lng": 77.10546873999374
}];

var index = 0;
setInterval(function(){
  index++
  var latLng =  new google.maps.LatLng(locations[index].lat, locations[index].lng);
  var duration = parseInt($('#durationOption').val());

      if (duration < 0) {
        duration = 1;
        $('#durationOption').val(duration);
      }

      marker.setDuration(duration);
      marker.setEasing($('#easingOption').val());
  marker.setPosition(latLng);

}, 2000);

    const marker = this.marker;
    const map = this.map;



    var clickHandler = function (event, clickType) {
      var duration = parseInt($('#durationOption').val());

      if (duration < 0) {
        duration = 1;
        $('#durationOption').val(duration);
      }

      marker.setDuration(duration);
      marker.setEasing($('#easingOption').val());

      if (clickType === "left") {
        marker.setPosition(event.latLng);
      } else {
        marker.setPositionNotAnimated(event.latLng);
      }
    };

    var leftClickHandler = function (event) { clickHandler(event, "left") };
    var rightClickHandler = function (event) { clickHandler(event, "right") };

    google.maps.event.addListener(map, 'click', leftClickHandler);
    google.maps.event.addListener(map, 'rightclick', rightClickHandler);

    var printEvent = function (instance, eventName) {
      google.maps.event.addListener(instance, eventName, function () {
        console.log("Event: " + eventName);
      });
    };

    printEvent(marker, "click");
    printEvent(marker, "map_changed");
    printEvent(marker, "position_changed");
    printEvent(marker, "animationposition_changed");

    if (window.location.hash == "#iframe") {
      $('#backLink').hide();
      $('#controls').css('height', '55px');
    }

  }


}
