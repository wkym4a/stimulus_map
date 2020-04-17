import { Controller } from "stimulus"

var markers = [];

export default class extends Controller {
  static targets = [ "map"]

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

  }

  move(el){

    var current_location = new Y.LatLng(el.target.dataset.lat,el.target.dataset.lon);

    this.map.panTo(current_location, true);
  }
}
