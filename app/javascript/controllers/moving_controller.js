import { Controller } from "stimulus"

export default class extends Controller {
  static targets = [ "map" ]

  initialize() {//←①

       this.map = new Y.Map(this.mapTarget.id);//←②
       this.map.drawMap(new Y.LatLng(35.66572, 139.73100), 17, Y.LayerSetId.NORMAL);//←③

　　　　//↓④
       var center = new Y.CenterMarkControl
       var control = new Y.LayerSetControl();
       this.map.addControl(center);
       this.map.addControl(control);

  }


//↓追記
  tokyo() {
    this.map.panTo(new Y.LatLng(35.680865,139.767036), true);
  }

  sinbasi() {
    this.map.panTo(new Y.LatLng(35.666397,139.758153), true);
  }

  sinagawa() {
    this.map.panTo(new Y.LatLng(35.629867,139.74015), true);
  }
//↑追記

}
