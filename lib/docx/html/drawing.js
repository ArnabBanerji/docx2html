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

var _get2 = require('babel-runtime/helpers/get');

var _get3 = _interopRequireDefault(_get2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _converter = require('./converter');

var _converter2 = _interopRequireDefault(_converter);

var _converter3 = require('./style/converter');

var _converter4 = _interopRequireDefault(_converter3);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Drawing = function (_Converter) {
	(0, _inherits3.default)(Drawing, _Converter);

	function Drawing() {
		(0, _classCallCheck3.default)(this, Drawing);
		return (0, _possibleConstructorReturn3.default)(this, (Drawing.__proto__ || (0, _getPrototypeOf2.default)(Drawing)).apply(this, arguments));
	}

	(0, _createClass3.default)(Drawing, [{
		key: 'convertStyle',
		value: function convertStyle(el) {
			(0, _get3.default)(Drawing.prototype.__proto__ || (0, _getPrototypeOf2.default)(Drawing.prototype), 'convertStyle', this).apply(this, arguments);
			var style = this.wordModel.getDirectStyle();
			style && style.parse([new this.constructor.Properties(el.style, this)]);
		}
	}]);
	return Drawing;
}(_converter2.default);

exports.default = Drawing;

var Properties = function (_Style$Properties) {
	(0, _inherits3.default)(Properties, _Style$Properties);

	function Properties() {
		(0, _classCallCheck3.default)(this, Properties);
		return (0, _possibleConstructorReturn3.default)(this, (Properties.__proto__ || (0, _getPrototypeOf2.default)(Properties)).apply(this, arguments));
	}

	(0, _createClass3.default)(Properties, [{
		key: 'extent',
		value: function extent(x) {
			this.world = x;
			this.style.width = x.width + 'px';
			this.style.height = x.height + 'px';
		}
	}, {
		key: 'distL',
		value: function distL(x) {
			x && (this.style.marginLeft = x + 'px');
		}
	}, {
		key: 'distT',
		value: function distT(x) {
			x && (this.style.marginTop = x + 'px');
		}
	}, {
		key: 'distB',
		value: function distB(x) {
			x && (this.style.marginBottom = x + 'px');
		}
	}, {
		key: 'distR',
		value: function distR(x) {
			x && (this.style.marginRight = x + 'px');
		}
	}]);
	return Properties;
}(_converter4.default.Properties);

Drawing.Properties = Properties;
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9kb2N4L2h0bWwvZHJhd2luZy5qcyJdLCJuYW1lcyI6WyJEcmF3aW5nIiwiZWwiLCJhcmd1bWVudHMiLCJzdHlsZSIsIndvcmRNb2RlbCIsImdldERpcmVjdFN0eWxlIiwicGFyc2UiLCJjb25zdHJ1Y3RvciIsIlByb3BlcnRpZXMiLCJDb252ZXJ0ZXIiLCJ4Iiwid29ybGQiLCJ3aWR0aCIsImhlaWdodCIsIm1hcmdpbkxlZnQiLCJtYXJnaW5Ub3AiLCJtYXJnaW5Cb3R0b20iLCJtYXJnaW5SaWdodCIsIlN0eWxlIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTs7OztBQUNBOzs7Ozs7SUFFcUJBLE87Ozs7Ozs7Ozs7K0JBQ1BDLEUsRUFBRztBQUNmLHlJQUFzQkMsU0FBdEI7QUFDQSxPQUFJQyxRQUFNLEtBQUtDLFNBQUwsQ0FBZUMsY0FBZixFQUFWO0FBQ0FGLFlBQVNBLE1BQU1HLEtBQU4sQ0FBWSxDQUFDLElBQUksS0FBS0MsV0FBTCxDQUFpQkMsVUFBckIsQ0FBZ0NQLEdBQUdFLEtBQW5DLEVBQXlDLElBQXpDLENBQUQsQ0FBWixDQUFUO0FBQ0E7OztFQUxtQ00sbUI7O2tCQUFoQlQsTzs7SUFTZlEsVTs7Ozs7Ozs7Ozt5QkFDRUUsQyxFQUFFO0FBQ1IsUUFBS0MsS0FBTCxHQUFXRCxDQUFYO0FBQ0EsUUFBS1AsS0FBTCxDQUFXUyxLQUFYLEdBQWlCRixFQUFFRSxLQUFGLEdBQVEsSUFBekI7QUFDQSxRQUFLVCxLQUFMLENBQVdVLE1BQVgsR0FBa0JILEVBQUVHLE1BQUYsR0FBUyxJQUEzQjtBQUNBOzs7d0JBQ0tILEMsRUFBRTtBQUNQQSxTQUFNLEtBQUtQLEtBQUwsQ0FBV1csVUFBWCxHQUFzQkosSUFBRSxJQUE5QjtBQUNBOzs7d0JBQ0tBLEMsRUFBRTtBQUNQQSxTQUFNLEtBQUtQLEtBQUwsQ0FBV1ksU0FBWCxHQUFxQkwsSUFBRSxJQUE3QjtBQUNBOzs7d0JBQ0tBLEMsRUFBRTtBQUNQQSxTQUFNLEtBQUtQLEtBQUwsQ0FBV2EsWUFBWCxHQUF3Qk4sSUFBRSxJQUFoQztBQUNBOzs7d0JBQ0tBLEMsRUFBRTtBQUNQQSxTQUFNLEtBQUtQLEtBQUwsQ0FBV2MsV0FBWCxHQUF1QlAsSUFBRSxJQUEvQjtBQUNBOzs7RUFqQnVCUSxvQkFBTVYsVTs7QUFvQi9CUixRQUFRUSxVQUFSLEdBQW1CQSxVQUFuQiIsImZpbGUiOiJkcmF3aW5nLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IENvbnZlcnRlciBmcm9tICcuL2NvbnZlcnRlcidcclxuaW1wb3J0IFN0eWxlIGZyb20gJy4vc3R5bGUvY29udmVydGVyJ1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgRHJhd2luZyBleHRlbmRzIENvbnZlcnRlcntcclxuXHRjb252ZXJ0U3R5bGUoZWwpe1xyXG5cdFx0c3VwZXIuY29udmVydFN0eWxlKC4uLmFyZ3VtZW50cylcclxuXHRcdHZhciBzdHlsZT10aGlzLndvcmRNb2RlbC5nZXREaXJlY3RTdHlsZSgpXHJcblx0XHRzdHlsZSAmJiBzdHlsZS5wYXJzZShbbmV3IHRoaXMuY29uc3RydWN0b3IuUHJvcGVydGllcyhlbC5zdHlsZSx0aGlzKV0pXHJcblx0fVxyXG5cclxufVxyXG5cclxuY2xhc3MgUHJvcGVydGllcyBleHRlbmRzIFN0eWxlLlByb3BlcnRpZXN7XHJcblx0ZXh0ZW50KHgpe1xyXG5cdFx0dGhpcy53b3JsZD14XHJcblx0XHR0aGlzLnN0eWxlLndpZHRoPXgud2lkdGgrJ3B4J1xyXG5cdFx0dGhpcy5zdHlsZS5oZWlnaHQ9eC5oZWlnaHQrJ3B4J1xyXG5cdH1cclxuXHRkaXN0TCh4KXtcclxuXHRcdHggJiYgKHRoaXMuc3R5bGUubWFyZ2luTGVmdD14KydweCcpXHJcblx0fVxyXG5cdGRpc3RUKHgpe1xyXG5cdFx0eCAmJiAodGhpcy5zdHlsZS5tYXJnaW5Ub3A9eCsncHgnKVxyXG5cdH1cclxuXHRkaXN0Qih4KXtcclxuXHRcdHggJiYgKHRoaXMuc3R5bGUubWFyZ2luQm90dG9tPXgrJ3B4JylcclxuXHR9XHJcblx0ZGlzdFIoeCl7XHJcblx0XHR4ICYmICh0aGlzLnN0eWxlLm1hcmdpblJpZ2h0PXgrJ3B4JylcclxuXHR9XHJcbn1cclxuXHJcbkRyYXdpbmcuUHJvcGVydGllcz1Qcm9wZXJ0aWVzIl19