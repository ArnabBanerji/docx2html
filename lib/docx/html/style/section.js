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

var _converter = require('./converter');

var _converter2 = _interopRequireDefault(_converter);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Section = function (_Style$Properties) {
	(0, _inherits3.default)(Section, _Style$Properties);

	function Section() {
		(0, _classCallCheck3.default)(this, Section);
		return (0, _possibleConstructorReturn3.default)(this, (Section.__proto__ || (0, _getPrototypeOf2.default)(Section)).apply(this, arguments));
	}

	(0, _createClass3.default)(Section, [{
		key: 'size',
		value: function size(x) {
			this.style.width = x.width + 'px';
			this.style.minHeight = x.height + 'px';
		}
	}, {
		key: 'margin',
		value: function margin(x) {
			this.style.paddingLeft = x.left + 'px';
			this.style.paddingRight = x.right + 'px';
			this.style.paddingTop = x.top + 'px';
			this.style.paddingBottom = x.bottom + 'px';

			x.gutter && (this.style['padding' + (x.gutterAtRight ? 'Right' : 'Left')] = x[x.gutterAtRight ? 'right' : 'left'] + x.gutter + 'px');
		}
	}, {
		key: 'cols',
		value: function cols(x) {
			this.styless('column-count', x.num);
			x.space && this.styless('column-gap', x.space + 'px');
			x.sep && this.styless('column-rule', '1px solid black');
		}
	}]);
	return Section;
}(_converter2.default.Properties);

exports.default = Section;
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9kb2N4L2h0bWwvc3R5bGUvc2VjdGlvbi5qcyJdLCJuYW1lcyI6WyJTZWN0aW9uIiwieCIsInN0eWxlIiwid2lkdGgiLCJtaW5IZWlnaHQiLCJoZWlnaHQiLCJwYWRkaW5nTGVmdCIsImxlZnQiLCJwYWRkaW5nUmlnaHQiLCJyaWdodCIsInBhZGRpbmdUb3AiLCJ0b3AiLCJwYWRkaW5nQm90dG9tIiwiYm90dG9tIiwiZ3V0dGVyIiwiZ3V0dGVyQXRSaWdodCIsInN0eWxlc3MiLCJudW0iLCJzcGFjZSIsInNlcCIsIlN0eWxlIiwiUHJvcGVydGllcyJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTs7Ozs7O0lBRXFCQSxPOzs7Ozs7Ozs7O3VCQUNmQyxDLEVBQUU7QUFDTixRQUFLQyxLQUFMLENBQVdDLEtBQVgsR0FBaUJGLEVBQUVFLEtBQUYsR0FBUSxJQUF6QjtBQUNBLFFBQUtELEtBQUwsQ0FBV0UsU0FBWCxHQUFxQkgsRUFBRUksTUFBRixHQUFTLElBQTlCO0FBQ0E7Ozt5QkFDTUosQyxFQUFFO0FBQ1IsUUFBS0MsS0FBTCxDQUFXSSxXQUFYLEdBQXVCTCxFQUFFTSxJQUFGLEdBQU8sSUFBOUI7QUFDQSxRQUFLTCxLQUFMLENBQVdNLFlBQVgsR0FBd0JQLEVBQUVRLEtBQUYsR0FBUSxJQUFoQztBQUNBLFFBQUtQLEtBQUwsQ0FBV1EsVUFBWCxHQUFzQlQsRUFBRVUsR0FBRixHQUFNLElBQTVCO0FBQ0EsUUFBS1QsS0FBTCxDQUFXVSxhQUFYLEdBQXlCWCxFQUFFWSxNQUFGLEdBQVMsSUFBbEM7O0FBRUFaLEtBQUVhLE1BQUYsS0FBYSxLQUFLWixLQUFMLENBQVcsYUFBV0QsRUFBRWMsYUFBRixHQUFrQixPQUFsQixHQUE0QixNQUF2QyxDQUFYLElBQTJEZCxFQUFHQSxFQUFFYyxhQUFGLEdBQWtCLE9BQWxCLEdBQTRCLE1BQS9CLElBQXdDZCxFQUFFYSxNQUExQyxHQUFpRCxJQUF6SDtBQUNBOzs7dUJBQ0liLEMsRUFBRTtBQUNOLFFBQUtlLE9BQUwsQ0FBYSxjQUFiLEVBQTRCZixFQUFFZ0IsR0FBOUI7QUFDQWhCLEtBQUVpQixLQUFGLElBQVcsS0FBS0YsT0FBTCxDQUFhLFlBQWIsRUFBMEJmLEVBQUVpQixLQUFGLEdBQVEsSUFBbEMsQ0FBWDtBQUNBakIsS0FBRWtCLEdBQUYsSUFBUyxLQUFLSCxPQUFMLENBQWEsYUFBYixFQUEyQixpQkFBM0IsQ0FBVDtBQUNBOzs7RUFqQm1DSSxvQkFBTUMsVTs7a0JBQXRCckIsTyIsImZpbGUiOiJzZWN0aW9uLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFN0eWxlIGZyb20gJy4vY29udmVydGVyJ1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgU2VjdGlvbiBleHRlbmRzIFN0eWxlLlByb3BlcnRpZXN7XHJcblx0c2l6ZSh4KXtcclxuXHRcdHRoaXMuc3R5bGUud2lkdGg9eC53aWR0aCsncHgnXHJcblx0XHR0aGlzLnN0eWxlLm1pbkhlaWdodD14LmhlaWdodCsncHgnXHJcblx0fVxyXG5cdG1hcmdpbih4KXtcclxuXHRcdHRoaXMuc3R5bGUucGFkZGluZ0xlZnQ9eC5sZWZ0KydweCdcclxuXHRcdHRoaXMuc3R5bGUucGFkZGluZ1JpZ2h0PXgucmlnaHQrJ3B4J1xyXG5cdFx0dGhpcy5zdHlsZS5wYWRkaW5nVG9wPXgudG9wKydweCdcclxuXHRcdHRoaXMuc3R5bGUucGFkZGluZ0JvdHRvbT14LmJvdHRvbSsncHgnXHJcblx0XHRcclxuXHRcdHguZ3V0dGVyICYmICh0aGlzLnN0eWxlWydwYWRkaW5nJysoeC5ndXR0ZXJBdFJpZ2h0ID8gJ1JpZ2h0JyA6ICdMZWZ0JyldPXhbKHguZ3V0dGVyQXRSaWdodCA/ICdyaWdodCcgOiAnbGVmdCcpXSt4Lmd1dHRlcisncHgnKVxyXG5cdH1cclxuXHRjb2xzKHgpe1xyXG5cdFx0dGhpcy5zdHlsZXNzKCdjb2x1bW4tY291bnQnLHgubnVtKVxyXG5cdFx0eC5zcGFjZSAmJiB0aGlzLnN0eWxlc3MoJ2NvbHVtbi1nYXAnLHguc3BhY2UrJ3B4Jyk7XHJcblx0XHR4LnNlcCAmJiB0aGlzLnN0eWxlc3MoJ2NvbHVtbi1ydWxlJywnMXB4IHNvbGlkIGJsYWNrJyk7XHJcblx0fVxyXG59Il19