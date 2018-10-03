'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _getPrototypeOf = require('babel-runtime/core-js/object/get-prototype-of');

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _field = require('./field');

var _field2 = _interopRequireDefault(_field);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function uptrim(el) {
	var parent = el.parentNode;
	parent.removeChild(el);
	if (parent.childNodes.length == 0) uptrim(parent);
}

var Hyperlink = function (_Field) {
	(0, _inherits3.default)(Hyperlink, _Field);

	function Hyperlink() {
		(0, _classCallCheck3.default)(this, Hyperlink);
		return (0, _possibleConstructorReturn3.default)(this, (Hyperlink.__proto__ || (0, _getPrototypeOf2.default)(Hyperlink)).apply(this, arguments));
	}

	(0, _createClass3.default)(Hyperlink, [{
		key: 'convert',
		value: function convert(elEnd) {
			var a = this.doc.createElement('a');
			a.href = this.wordModel.getLink();
			elEnd.id = this.doc.uid();

			var current = this.elStart,
			    parent = current.parentNode;
			while (!parent.querySelector('#' + elEnd.id)) {
				current = parent;
				parent = current.parentNode;
			}
			parent.insertBefore(a, current);
			while (a.nextSibling) {
				a.appendChild(a.nextSibling);
			}uptrim(this.elStart);
			uptrim(elEnd);
		}
	}]);
	return Hyperlink;
}(_field2.default);

exports.default = Hyperlink;
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9kb2N4L2h0bWwvZmllbGQvaHlwZXJsaW5rLmpzIl0sIm5hbWVzIjpbInVwdHJpbSIsImVsIiwicGFyZW50IiwicGFyZW50Tm9kZSIsInJlbW92ZUNoaWxkIiwiY2hpbGROb2RlcyIsImxlbmd0aCIsIkh5cGVybGluayIsImVsRW5kIiwiYSIsImRvYyIsImNyZWF0ZUVsZW1lbnQiLCJocmVmIiwid29yZE1vZGVsIiwiZ2V0TGluayIsImlkIiwidWlkIiwiY3VycmVudCIsImVsU3RhcnQiLCJxdWVyeVNlbGVjdG9yIiwiaW5zZXJ0QmVmb3JlIiwibmV4dFNpYmxpbmciLCJhcHBlbmRDaGlsZCIsIkZpZWxkIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBOzs7Ozs7QUFFQSxTQUFTQSxNQUFULENBQWdCQyxFQUFoQixFQUFtQjtBQUNsQixLQUFJQyxTQUFPRCxHQUFHRSxVQUFkO0FBQ0FELFFBQU9FLFdBQVAsQ0FBbUJILEVBQW5CO0FBQ0EsS0FBR0MsT0FBT0csVUFBUCxDQUFrQkMsTUFBbEIsSUFBMEIsQ0FBN0IsRUFDQ04sT0FBT0UsTUFBUDtBQUNEOztJQUNvQkssUzs7Ozs7Ozs7OzswQkFDWkMsSyxFQUFNO0FBQ2IsT0FBSUMsSUFBRSxLQUFLQyxHQUFMLENBQVNDLGFBQVQsQ0FBdUIsR0FBdkIsQ0FBTjtBQUNBRixLQUFFRyxJQUFGLEdBQU8sS0FBS0MsU0FBTCxDQUFlQyxPQUFmLEVBQVA7QUFDQU4sU0FBTU8sRUFBTixHQUFTLEtBQUtMLEdBQUwsQ0FBU00sR0FBVCxFQUFUOztBQUVBLE9BQUlDLFVBQVEsS0FBS0MsT0FBakI7QUFBQSxPQUEwQmhCLFNBQU9lLFFBQVFkLFVBQXpDO0FBQ0EsVUFBTSxDQUFDRCxPQUFPaUIsYUFBUCxDQUFxQixNQUFJWCxNQUFNTyxFQUEvQixDQUFQLEVBQTBDO0FBQ3pDRSxjQUFRZixNQUFSO0FBQ0FBLGFBQU9lLFFBQVFkLFVBQWY7QUFDQTtBQUNERCxVQUFPa0IsWUFBUCxDQUFvQlgsQ0FBcEIsRUFBdUJRLE9BQXZCO0FBQ0EsVUFBTVIsRUFBRVksV0FBUjtBQUNDWixNQUFFYSxXQUFGLENBQWNiLEVBQUVZLFdBQWhCO0FBREQsSUFHQXJCLE9BQU8sS0FBS2tCLE9BQVo7QUFDQWxCLFVBQU9RLEtBQVA7QUFDQTs7O0VBakJxQ2UsZTs7a0JBQWxCaEIsUyIsImZpbGUiOiJoeXBlcmxpbmsuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgRmllbGQgZnJvbSAnLi9maWVsZCdcclxuXHJcbmZ1bmN0aW9uIHVwdHJpbShlbCl7XHJcblx0dmFyIHBhcmVudD1lbC5wYXJlbnROb2RlXHJcblx0cGFyZW50LnJlbW92ZUNoaWxkKGVsKVxyXG5cdGlmKHBhcmVudC5jaGlsZE5vZGVzLmxlbmd0aD09MClcclxuXHRcdHVwdHJpbShwYXJlbnQpXHJcbn1cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgSHlwZXJsaW5rIGV4dGVuZHMgRmllbGR7XHJcblx0Y29udmVydChlbEVuZCl7XHJcblx0XHR2YXIgYT10aGlzLmRvYy5jcmVhdGVFbGVtZW50KCdhJylcclxuXHRcdGEuaHJlZj10aGlzLndvcmRNb2RlbC5nZXRMaW5rKClcclxuXHRcdGVsRW5kLmlkPXRoaXMuZG9jLnVpZCgpXHJcblx0XHRcclxuXHRcdHZhciBjdXJyZW50PXRoaXMuZWxTdGFydCwgcGFyZW50PWN1cnJlbnQucGFyZW50Tm9kZVxyXG5cdFx0d2hpbGUoIXBhcmVudC5xdWVyeVNlbGVjdG9yKCcjJytlbEVuZC5pZCkpe1xyXG5cdFx0XHRjdXJyZW50PXBhcmVudFxyXG5cdFx0XHRwYXJlbnQ9Y3VycmVudC5wYXJlbnROb2RlXHJcblx0XHR9XHJcblx0XHRwYXJlbnQuaW5zZXJ0QmVmb3JlKGEsIGN1cnJlbnQpXHJcblx0XHR3aGlsZShhLm5leHRTaWJsaW5nKVxyXG5cdFx0XHRhLmFwcGVuZENoaWxkKGEubmV4dFNpYmxpbmcpXHJcblx0XHRcclxuXHRcdHVwdHJpbSh0aGlzLmVsU3RhcnQpXHJcblx0XHR1cHRyaW0oZWxFbmQpXHJcblx0fVxyXG59Il19