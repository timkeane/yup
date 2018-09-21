var wmsBase = new ol.layer.Image({
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

var wmsTax = new ol.layer.Image({
  source: new ol.source.ImageWMS({
    url: 'https://' + BSE_HOST + '/geoserver/wms',
    params: {
      LAYERS: 'taxmap:taxmap,carto:label', 
      FORMAT: 'image/jpeg',
      TRANSPARENT: 'false'
    },
    serverType: 'geoserver',
    transition: 0
  }),
  visible: false
});

var wmsTileBase = new ol.layer.Tile({
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

var wmsTileTax = new ol.layer.Tile({
  source: new ol.source.TileWMS({
    url: 'https://' + BSE_HOST + '/geoserver/wms',
    params: {
      LAYERS: 'taxmap:taxmap,carto:label', 
      FORMAT: 'image/jpeg',
      TRANSPARENT: 'false',
      TILED: true
    },
    serverType: 'geoserver',
    transition: 0
  }),
  visible: false
});

var tmsBase = new ol.layer.Tile({
  source: new ol.source.XYZ({
    extent: [-8453323, 4774561, -7983695, 5165920],
    url: 'https://' + BSE_HOST + '/geoserver/gwc/service/tms/1.0.0/carto%3Abasemap@EPSG%3A900913@jpeg/{z}/{x}/{-y}.jpg'
  }),
  visible: false
});

var tmsTax = new ol.layer.Tile({
  source: new ol.source.XYZ({
    extent: [-8453323, 4774561, -7983695, 5165920],
    url: 'https://' + BSE_HOST + '/geoserver/gwc/service/tms/1.0.0/taxmap%3Ataxmap@EPSG%3A900913@jpeg/{z}/{x}/{-y}.jpg'
  }),
  visible: false
});

var tmsLabel = new ol.layer.Tile({
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
  layers: [wmsBase, wmsTax, wmsTileBase, wmsTileTax, tmsBase, tmsTax, tmsLabel]
});

new nyc.ol.LocationMgr({
  map: map,
  url: GEOCLIENT_URL
});

$('input').change(function() {
  var view = $('form.view').get(0).view.value;
  var layer = $('form.layer').get(0).layer.value;
  wmsBase.setVisible(view === 'base' && layer === 'wms');
  wmsTax.setVisible(view === 'tax' && layer === 'wms');
  wmsTileBase.setVisible(view === 'base' && layer === 'tile');
  wmsTileTax.setVisible(view === 'tax' && layer === 'tile');
  tmsBase.setVisible(view === 'base' && layer === 'tms');
  tmsTax.setVisible(view === 'tax' && layer === 'tms');
  tmsLabel.setVisible(layer === 'tms');
});
