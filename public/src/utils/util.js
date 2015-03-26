define('utils/util', ['./util/array', './util/lang', './util/function'], function(_Array, _Lang, _Fn) {
  return _Lang.extend({}, _Array, _Lang, _Fn);
});