import { Controller } from "stimulus"

var markers = [];

export default class extends Controller {
  static targets = [ "map","pin"]

  initialize() {

       this.map = new Y.Map(this.mapTarget.id,{configure : {
         scrollWheelZoom : true//
       }});

       this.map.drawMap(new Y.LatLng(0, 0), 17, Y.LayerSetId.NORMAL);

       // var center = new Y.CenterMarkControl
       var control = new Y.LayerSetControl();
       // this.map.addControl(center);
       this.map.addControl(control);

       var sliderzoom = new Y.SliderZoomControlVertical();
       this.map.addControl(sliderzoom);

       var map_box = this.map;

       this.pinTargets.forEach(function(pin){
         var current_location = new Y.LatLng(pin.dataset.lat,pin.dataset.lon);
         var marker = new Y.Marker(current_location);
         map_box.addFeature(marker);
       });

  }

  move(el){

    var current_location = new Y.LatLng(el.target.dataset.lat,el.target.dataset.lon);

    this.map.panTo(current_location, true);
  }
}
