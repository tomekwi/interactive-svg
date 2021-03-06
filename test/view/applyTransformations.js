/* jshint elision: true */
const test = require('prova');

const applyTransformations =
  require('../../module/core/view/applyTransformations');


test((
  'view/applyTransformations: Applies view box transformation functions.'
), (is) => {
  is.deepEqual(
    applyTransformations([
      () => [1, 2, 3, 4],
    ]).viewBoxUpdate,
    '1 2 3 4',
    'applies a single function'
  );

  is.deepEqual(
    applyTransformations([
      () => [1, 2, 3, 4],
      (array) => array.map((coord) => coord * 2),
    ]).viewBoxUpdate,
    '2 4 6 8',
    'applies two functions'
  );

  is.deepEqual(
    applyTransformations([
      () => [1, 2, 3, 4],
      (array) => array.map((coord) => coord * 2),
      (array) => array.map((coord) => coord + 10),
    ]).viewBoxUpdate,
    '12 14 16 18',
    'applies three functions'
  );

  is.end();
});


test((
  'view/applyTransformations: Errors when it gets a wrong result.'
), (is) => {
  is.ok(applyTransformations([]).error,
    'on an empty list of transformations'
  );

  is.ok(applyTransformations([
    () => ({}),
  ]).error,
    'when it gets a non-array'
  );

  is.ok(applyTransformations([
    () => [1, 2, 3],
  ]).error,
    'when it gets too short an array'
  );

  is.ok(applyTransformations([
    () => [1, 2, 3, 4, 5],
  ]).error,
    'when it gets too long an array'
  );

  is.throws(applyTransformations([
    () => [1, 2, 3, 'four'],
  ]).error,
    'throwing when it gets an array with `NaN`s'
  );

  is.end();
});
