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

new ol.layer.Tile({
  extent: [-8453323, 4774561, -7983695, 5165920],
  source: new ol.source.XYZ({
    url: 'https://maps{1-4}.nyc.gov/tms/1.0.0/carto/basemap/{z}/{x}/{-y}.jpg'
  })
});

var tmsBaseLayer = new ol.layer.Tile({
  source: new ol.source.XYZ({
    extent: [-8453323, 4774561, -7983695, 5165920],
    url: 'https://' + BSE_HOST + '/geoserver/gwc/service/tms/1.0.0/carto%3Abasemap@EPSG%3A900913@jpeg/{z}/{x}/{-y}.jpg'
  }),
  visible: false
});

var tmsLabelLayer = new ol.layer.Tile({
  extent: [-8268000, 4870900, -8005000, 5055500],
  source: new ol.source.XYZ({
    url: 'https://' + BSE_HOST + '/geoserver/gwc/service/tms/1.0.0/carto%3Alabel@EPSG%3A900913@png8/{z}/{x}/{-y}.png8'
  }),
  visible: false
});

var map = new ol.Map({
  target: 'map',
  view: new ol.View({
    center: [-8235252, 4969073],
    zoom: 10
  }),
  layers: [wmsLayer, wmsTileLayer, tmsBaseLayer, tmsLabelLayer]
});

new nyc.ol.LocationMgr({
  map: map,
  url: GEOCLIENT_URL
});

$('input').change(function() {
  var type = $('form').get(0).layer.value;
  wmsLayer.setVisible(type === 'wms')
  wmsTileLayer.setVisible(type === 'tile')
  tmsBaseLayer.setVisible(type === 'tms')
  tmsLabelLayer.setVisible(type === 'tms')
});
