const plugin = require('../tools/plugin');

const assign = require('object-assign');

const proto = {
  priority: 100,
  transformFunction: null,
};

module.exports = plugin((params) => {
  const model = params.model;
  const view = params.view;

  model.attributeChanges.when('scale', (vNode) => {
    const emptyUpdate = Object.create(proto);
    const emit = view.viewBoxTransformations.emit;
    const scale = vNode.properties.scale;

    // Clean up if the attribute has been removed.
    if (scale === null || scale === undefined) {
      emit('add', emptyUpdate);
      return;
    }

    // Validate the attribute.
    const cleanScale = Number(scale);
    if (!Number.isFinite(cleanScale)) {
      emit('error', new Error(
        'drawingBoard.scale: The <drawing-board> attribute `scale` should ' +
        'be a `{Number}`.'
      ));
      emit('add', emptyUpdate);
    }

    // Inject the viewBox transformation.
    else emit('add', assign(emptyUpdate, {
      transformFunction: (coords) => {
        const [x, y, width, height] = coords;
        const targetX = x + width / 2;
        const targetY = y + height / 2;
        return [
          targetX - width / 2 / cleanScale,
          targetY - height / 2 / cleanScale,
          width / cleanScale,
          height / cleanScale,
        ];
      },
    }));
  });
});
