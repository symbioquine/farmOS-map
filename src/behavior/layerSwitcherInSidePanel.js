import LayerSwitcher from 'ol-layerswitcher';

import layersHalfIcon from 'bootstrap-icons/icons/layers-half.svg';

// layer switcher in side panel behavior.
export default {
  attach(instance) {
    const existingLayerSwitcherControl = instance.map.getControls().getArray()
      .find(control => typeof control.renderPanel === 'function');

    const sidePanel = instance.map.getControls().getArray()
      .find(control => typeof control.definePane === 'function');

    if (!sidePanel) {
      return;
    }

    const layersPane = sidePanel.definePane({
      paneId: 'layers',
      name: 'Layers',
      icon: layersHalfIcon,
    });

    const layersDiv = document.createElement('div');
    layersDiv.classList = 'layer-switcher';

    layersPane.addWidgetElement(layersDiv);

    const renderLayerSwitcher = () => LayerSwitcher.renderPanel(
      instance.map,
      layersDiv,
      { reverse: true },
    );

    renderLayerSwitcher();

    // When new layers are added, refresh the layer layer switcher
    instance.map.on('farmOS-map.layer', () => {
      renderLayerSwitcher();
    });

    instance.map.removeControl(existingLayerSwitcherControl);

  },

};
