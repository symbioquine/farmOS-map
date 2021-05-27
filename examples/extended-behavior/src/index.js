(function () {
  farmOS.map.behaviors.exampleHeatmapBehavior = {
    attach: async function(instance) {
      const { default: KML } = await import('ol/format/KML');
      const { default: VectorSource } = await import('ol/source/Vector');
      const { Heatmap: HeatmapLayer, Tile: TileLayer } = await import('ol/layer');

      const vector = new HeatmapLayer({
        source: new VectorSource({
          url: '2012_Earthquakes_Mag5.kml',
          format: new KML({
            extractStyles: false,
          }),
        }),
        blur: 15,
        radius: 5,
        weight: function (feature) {
          // 2012_Earthquakes_Mag5.kml stores the magnitude of each earthquake in a
          // standards-violating <magnitude> tag in each Placemark.  We extract it from
          // the Placemark's name instead.
          const name = feature.get('name');
          const magnitude = parseFloat(name.substr(2));
          return magnitude - 5;
        },
      });

      instance.map.addLayer(vector);

    },
  };
}());
