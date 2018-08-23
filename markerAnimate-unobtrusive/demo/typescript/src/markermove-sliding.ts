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
  "lat": 28.50991180116446,
  "lng": 77.04260890722185
}, {
  "lat": 28.509968367943113,
  "lng": 77.04239433050066
}, {
  "lat": 28.50949697719405,
  "lng": 77.04370324849992
}, {
  "lat": 28.50911986307808,
  "lng": 77.04464738607317
}, {
  "lat": 28.508874738179703,
  "lng": 77.04554860830217
}, {
  "lat": 28.508403342543428,
  "lng": 77.04644983053117
}, {
  "lat": 28.508045080451026,
  "lng": 77.04741542577653
}, {
  "lat": 28.507743385113685,
  "lng": 77.0488316321364
}, {
  "lat": 28.507328552616034,
  "lng": 77.04992597341447
}, {
  "lat": 28.506970286873475,
  "lng": 77.0508486533156
}, {
  "lat": 28.506536595136208,
  "lng": 77.05147092580705
}, {
  "lat": 28.50612175789314,
  "lng": 77.05217902898698
}, {
  "lat": 28.505631493593725,
  "lng": 77.05305879354387
}, {
  "lat": 28.50508465764895,
  "lng": 77.05398147344499
}, {
  "lat": 28.50478295384546,
  "lng": 77.05464666128069
}, {
  "lat": 28.50431742197956,
  "lng": 77.053964138031
}, {
  "lat": 28.503858980580272,
  "lng": 77.055783917903
}, {
  "lat": 28.503198994722528,
  "lng": 77.05692117452531
}, {
  "lat": 28.50293499922352,
  "lng": 77.05767219304948
}, {
  "lat": 28.503726983739007,
  "lng": 77.0582515501967
}, {
  "lat": 28.50440582287781,
  "lng": 77.05887382268816
}, {
  "lat": 28.506197182967753,
  "lng": 77.06033294439226
}, {
  "lat": 28.507743385113685,
  "lng": 77.06144874334245
}, {
  "lat": 28.50902558433842,
  "lng": 77.06275766134172
}, {
  "lat": 28.509553544195168,
  "lng": 77.06365888357072
}, {
  "lat": 28.51000607911203,
  "lng": 77.06443135976701
}, {
  "lat": 28.510647166920876,
  "lng": 77.06578319311052
}, {
  "lat": 28.51113740791031,
  "lng": 77.06638400792986
}, {
  "lat": 28.510628311452685,
  "lng": 77.06702773809343
}, {
  "lat": 28.51015692365289,
  "lng": 77.06747834920793
}, {
  "lat": 28.509163456334438,
  "lng": 77.0706582069397
}, {
  "lat": 28.509163456334438,
  "lng": 77.0706582069397
}, {
  "lat": 28.50771155500088,
  "lng": 77.07130193710327
}, {
  "lat": 28.50729208821832,
  "lng": 77.07038991335207
}, {
  "lat": 28.506820685509787,
  "lng": 77.07126967790896
}, {
  "lat": 28.507612640856912,
  "lng": 77.07191340807253
}, {
  "lat": 28.50802747223743,
  "lng": 77.07240693453127
}, {
  "lat": 28.510290160142134,
  "lng": 77.07395188692385
}, {
  "lat": 28.510704980993232,
  "lng": 77.07429520967776
}, {
  "lat": 28.511289498514433,
  "lng": 77.07455270174319
}, {
  "lat": 28.512713978909563,
  "lng": 77.07534473092028
}, {
  "lat": 28.515033130343493,
  "lng": 77.07746904046007
}, {
  "lat": 28.515711896725406,
  "lng": 77.07841317803332
}, {
  "lat": 28.516862018677177,
  "lng": 77.07976501137682
}, {
  "lat": 28.51740879356647,
  "lng": 77.08000104577013
}, {
  "lat": 28.51829493995241,
  "lng": 77.08073060662218
}, {
  "lat": 28.522210815594185,
  "lng": 77.08276033401489
}, {
  "lat": 28.523140332111133,
  "lng": 77.08300511986681
}, {
  "lat": 28.524290373036468,
  "lng": 77.08375613839098
}, {
  "lat": 28.52640189092306,
  "lng": 77.0852367177672
}, {
  "lat": 28.527344519181014,
  "lng": 77.08592336327501
}, {
  "lat": 28.530915899159996,
  "lng": 77.08821933419176
}, {
  "lat": 28.53172652525106,
  "lng": 77.08879869133898
}, {
  "lat": 28.534780455923052,
  "lng": 77.0908371701903
}, {
  "lat": 28.536194282743317,
  "lng": 77.09165256173083
}, {
  "lat": 28.536967166718494,
  "lng": 77.09201734215685
}, {
  "lat": 28.538098206219193,
  "lng": 77.09248941094347
}, {
  "lat": 28.537751901029885,
  "lng": 77.09468537824864
}, {
  "lat": 28.537356037284606,
  "lng": 77.09584409254308
}, {
  "lat": 28.53726178379268,
  "lng": 77.09685260313267
}, {
  "lat": 28.536922470523677,
  "lng": 77.09818297880406
}, {
  "lat": 28.53647005113186,
  "lng": 77.10097247617955
}, {
  "lat": 28.535678312521778,
  "lng": 77.10532838361974
}, {
  "lat": 28.53541439832973,
  "lng": 77.10610085981602
}, {
  "lat": 28.53535784520258,
  "lng": 77.10706645506139
}, {
  "lat": 28.537362779943948,
  "lng": 77.11498893024907
}, {
  "lat": 28.543713131344724,
  "lng": 77.11898288769521
}, {
  "lat": 28.544693303512258,
  "lng": 77.12005577130117
}, {
  "lat": 28.547313334335726,
  "lng": 77.12477645916738
}, {
  "lat": 28.550392878584265,
  "lng": 77.12936639785767
}, {
  "lat": 28.55167203534935,
  "lng": 77.13046274227895
}, {
  "lat": 28.557043614816834,
  "lng": 77.1328660015563
}, {
  "lat": 28.565656417521165,
  "lng": 77.13396034283437
}, {
  "lat": 28.56914661503489,
  "lng": 77.13418866288816
}, {
  "lat": 28.569843877697796,
  "lng": 77.13453198564207
}, {
  "lat": 28.570729583066548,
  "lng": 77.13500405442869
}, {
  "lat": 28.571370301451626,
  "lng": 77.13605548036253
}, {
  "lat": 28.571992171447,
  "lng": 77.13706399095213
}, {
  "lat": 28.572708259615673,
  "lng": 77.1377077211157
}, {
  "lat": 28.574994390462862,
  "lng": 77.14239963165608
}, {
  "lat": 28.57544664433538,
  "lng": 77.14357980362263
}, {
  "lat": 28.575465488204543,
  "lng": 77.1446741449007
}, {
  "lat": 28.57518282981271,
  "lng": 77.1462405549654
}, {
  "lat": 28.574855203471856,
  "lng": 77.14829206466675
}, {
  "lat": 28.57474213955035,
  "lng": 77.15106010437012
}, {
  "lat": 28.574598666729493,
  "lng": 77.15514548889485
}, {
  "lat": 28.57572930201836,
  "lng": 77.15737708679524
}, {
  "lat": 28.575766989652035,
  "lng": 77.15954431167927
}, {
  "lat": 28.574832009760208,
  "lng": 77.16086308673835
}, {
  "lat": 28.573004127728378,
  "lng": 77.16118495182013
}, {
  "lat": 28.56215494384909,
  "lng": 77.16844610064027
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
