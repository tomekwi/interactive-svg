module.exports = function updateElement(element, diff) {
  const patch = diff['0'].patch;
  for (const attribute in patch) if (patch.hasOwnProperty(attribute)) {
    if (patch[attribute] === null || patch[attribute] === undefined) {
      element.removeAttribute(attribute);
    }
    else element.setAttribute(attribute, patch[attribute]);
  }
};
