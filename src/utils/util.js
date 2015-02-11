define('utils/util', ['./util/Array', './util/Lang', './util/Function'], function(Array, Lang, Fn) {
  return Lang.extend({}, Array, Lang, Fn);
});