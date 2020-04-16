import { Controller } from "stimulus"

var markers = [];

export default class extends Controller {
  static targets = [ "map", "address","latitude","longitude"  ]

  initialize() {

       this.map = new Y.Map(this.mapTarget.id);
       this.map.drawMap(new Y.LatLng(35.66572, 139.73100), 17, Y.LayerSetId.NORMAL);

       var center = new Y.CenterMarkControl
       var control = new Y.LayerSetControl();
       this.map.addControl(center);
       this.map.addControl(control);

  }

  get_lat_lng() {

  //ターゲットを変数に移す
  var address = this.addressTarget.value;
  var latitude = this.latitudeTarget;
  var longitude = this.longitudeTarget;

  var map_box = this.map;

  var request = { query : address };
  var geocoder = new Y.GeoCoder();
  geocoder.execute( request , function( ydf ) {//←ジオコーディング処理

    //成功すれば↓の式が正となり、「ydf」に座標情報が獲得される
    if ( ydf.features.length > 0 ) {
    /////↓↓ので、ここ（非同期処理中）でB,C,Dの処理を行う↓↓////////////////////
    //Dの処理
      if(markers.length > 0){
        for (var i = 0; i < markers.length; i++) {

          map_box.removeFeature(markers[i]);
        }
        markers = []; //参照を開放
      }

      //Bの処理
      var current_location = new Y.LatLng(ydf.features[0]["latlng"]["Lat"],ydf.features[0]["latlng"]["Lon"])
      var marker = new Y.Marker(current_location);
      map_box.addFeature(marker);

      // // 作成したマーカーを保存(削除できるように)
      markers.push(marker);

      // ピンの場所に移動
      map_box.panTo(current_location, true);

      //Cの処理
      latitude.value =ydf.features[0]["latlng"]["Lat"];
      longitude.value =ydf.features[0]["latlng"]["Lon"];
    /////↑↑ので、ここ（非同期処理中）でB,C,Dの処理を行う↑↑////////////////////

    }else{
      //【住所から座標を獲得できなかった場合の処理……今回は抜けるだけでいいや】
      return;
    }

  } );

  }
}
