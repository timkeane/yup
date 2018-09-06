var wmsLayer = new ol.layer.Image({
  source: new ol.source.ImageWMS({
    url: 'https://' + BSE_HOST + '/geoserver/carto/wms',
    params: {
      LAYERS: 'carto:basemap,carto:label', 
      FORMAT: 'image/jpeg',
      TRANSPARENT: 'false'
    },
    serverType: 'geoserver',
    transition: 0
  })
});

var wmsTileLayer = new ol.layer.Tile({
  source: new ol.source.TileWMS({
    url: 'https://' + BSE_HOST + '/geoserver/carto/wms',
    params: {
      LAYERS: 'carto:basemap,carto:label', 
      FORMAT: 'image/jpeg',
      TRANSPARENT: 'false',
      TILED: true
    },
    serverType: 'geoserver',
    transition: 0
  }),
  visible: false
});


var map = new ol.Map({
  target: 'map',
  view: new ol.View({
    center: [-8235252, 4969073],
    zoom: 10
  }),
  layers: [wmsLayer, wmsTileLayer]
});

new nyc.ol.LocationMgr({
  map: map,
  url: 'https://geoclient.apps.pcf.nycnet/search.json?'
});

$('input').change(function() {
  var isTile = $('form').get(0).layer.value === 'tile';
  wmsLayer.setVisible(!isTile)
  wmsTileLayer.setVisible(isTile)
});
