'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _keys = require('babel-runtime/core-js/object/keys');

var _keys2 = _interopRequireDefault(_keys);

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

var _converter = require('../converter');

var _converter2 = _interopRequireDefault(_converter);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Lines = 'dotted,dashed,inset,outset,solid'.split();
var browsers = ',-webkit-,-moz-'.split(','),
    cssID = _converter2.default.asCssID;

var StyleConverter = function (_Converter) {
	(0, _inherits3.default)(StyleConverter, _Converter);

	function StyleConverter() {
		(0, _classCallCheck3.default)(this, StyleConverter);

		var _this = (0, _possibleConstructorReturn3.default)(this, (StyleConverter.__proto__ || (0, _getPrototypeOf2.default)(StyleConverter)).apply(this, arguments));

		var parentStyle = _this.wordModel.getParentStyle();
		parentStyle && _this.doc.stylePath(cssID(_this.wordModel.id), cssID(parentStyle.id));
		return _this;
	}

	(0, _createClass3.default)(StyleConverter, [{
		key: 'convert',
		value: function convert(value, name, category) {
			var converter = this._getPropertiesConverter(category);
			converter && converter[name] && converter[name](value);
		}
	}, {
		key: '_getPropertiesConverter',
		value: function _getPropertiesConverter() {}
	}]);
	return StyleConverter;
}(_converter2.default);

exports.default = StyleConverter;


StyleConverter.Properties = function () {
	function Properties(style, parent) {
		(0, _classCallCheck3.default)(this, Properties);

		this.style = style;
		this.parent = parent;
		parent && (this.doc = parent.doc);
	}

	(0, _createClass3.default)(Properties, [{
		key: 'visit',
		value: function visit() {
			this.convert.apply(this, arguments);
		}
	}, {
		key: 'convert',
		value: function convert(value, name) {
			this[name] && this[name](value);
		}
	}, {
		key: '_border',
		value: function _border(border) {
			if (border.val == 'none' || border.val == 'nil') return '0';else return (border.sz < 1 && border.sz > 0 ? 1 : border.sz) + 'pt ' + (Lines.indexOf(border.val.toLowerCase()) != -1 ? border.val : 'solid') + ' ' + (border.color || '');
		}
	}, {
		key: 'equalObj',
		value: function equalObj(a, b) {
			var keys = (0, _keys2.default)(a);
			if (!b || keys.length != (0, _keys2.default)(b).length) return false;
			if (keys.length != 0) {
				for (var i = 0, len = keys.length; i < len; i++) {
					if (a[keys[i]] != b[keys[i]]) return false;
				}
			}

			for (var i = 2, len = arguments.length; i < len; i++) {
				if (!this.equalObj(a, arguments[i])) return false;
			}return true;
		}
	}, {
		key: 'upperFirst',
		value: function upperFirst(type) {
			return type[0].toUpperCase() + type.slice(1);
		}
	}, {
		key: 'styless',
		value: function styless(name, value, style) {
			browsers.forEach(function (a) {
				this[a + name] = value;
			}.bind(style || this.style));
		}
	}, {
		key: 'lineStyle',
		value: function lineStyle(x) {
			if (!x) return 'solid';
			x = x.toLowerCase();
			if (x.indexOf('dot') != -1) return 'dotted';else if (x.indexOf('dash') != -1) return 'dashed';else if (x.indexOf('double') != -1 || x.indexOf('gap') != -1) return 'double';else if (x.indexOf('emboss') != -1) return 'ridge';else if (x.indexOf('grave') != -1) return 'groove';else if (x.indexOf('outset') != -1) return 'outset';else if (x.indexOf('inset') != -1) return 'inset';else return 'solid';
		}
	}]);
	return Properties;
}();
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9kb2N4L2h0bWwvc3R5bGUvY29udmVydGVyLmpzIl0sIm5hbWVzIjpbIkxpbmVzIiwic3BsaXQiLCJicm93c2VycyIsImNzc0lEIiwiQ29udmVydGVyIiwiYXNDc3NJRCIsIlN0eWxlQ29udmVydGVyIiwiYXJndW1lbnRzIiwicGFyZW50U3R5bGUiLCJ3b3JkTW9kZWwiLCJnZXRQYXJlbnRTdHlsZSIsImRvYyIsInN0eWxlUGF0aCIsImlkIiwidmFsdWUiLCJuYW1lIiwiY2F0ZWdvcnkiLCJjb252ZXJ0ZXIiLCJfZ2V0UHJvcGVydGllc0NvbnZlcnRlciIsIlByb3BlcnRpZXMiLCJzdHlsZSIsInBhcmVudCIsImNvbnZlcnQiLCJib3JkZXIiLCJ2YWwiLCJzeiIsImluZGV4T2YiLCJ0b0xvd2VyQ2FzZSIsImNvbG9yIiwiYSIsImIiLCJrZXlzIiwibGVuZ3RoIiwiaSIsImxlbiIsImVxdWFsT2JqIiwidHlwZSIsInRvVXBwZXJDYXNlIiwic2xpY2UiLCJmb3JFYWNoIiwiYmluZCIsIngiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBOzs7Ozs7QUFFQSxJQUFJQSxRQUFNLG1DQUFtQ0MsS0FBbkMsRUFBVjtBQUNBLElBQUlDLFdBQVMsa0JBQWtCRCxLQUFsQixDQUF3QixHQUF4QixDQUFiO0FBQUEsSUFBMkNFLFFBQU1DLG9CQUFVQyxPQUEzRDs7SUFFcUJDLGM7OztBQUNwQiwyQkFBYTtBQUFBOztBQUFBLHFKQUNIQyxTQURHOztBQUVaLE1BQUlDLGNBQVksTUFBS0MsU0FBTCxDQUFlQyxjQUFmLEVBQWhCO0FBQ0FGLGlCQUFlLE1BQUtHLEdBQUwsQ0FBU0MsU0FBVCxDQUFtQlQsTUFBTSxNQUFLTSxTQUFMLENBQWVJLEVBQXJCLENBQW5CLEVBQTZDVixNQUFNSyxZQUFZSyxFQUFsQixDQUE3QyxDQUFmO0FBSFk7QUFJWjs7OzswQkFDT0MsSyxFQUFNQyxJLEVBQUtDLFEsRUFBUztBQUMz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O0FBQ0RBLE9BQUVBLEVBQUVkLFdBQUYsRUFBRjtBQUNBLE9BQUdjLEVBQUVmLE9BQUYsQ0FBVSxLQUFWLEtBQWtCLENBQUMsQ0FBdEIsRUFDQyxPQUFPLFFBQVAsQ0FERCxLQUVLLElBQUdlLEVBQUVmLE9BQUYsQ0FBVSxNQUFWLEtBQW1CLENBQUMsQ0FBdkIsRUFDSixPQUFPLFFBQVAsQ0FESSxLQUVBLElBQUdlLEVBQUVmLE9BQUYsQ0FBVSxRQUFWLEtBQXFCLENBQUMsQ0FBdEIsSUFBMkJlLEVBQUVmLE9BQUYsQ0FBVSxLQUFWLEtBQWtCLENBQUMsQ0FBakQsRUFDSixPQUFPLFFBQVAsQ0FESSxLQUVBLElBQUdlLEVBQUVmLE9BQUYsQ0FBVSxRQUFWLEtBQXFCLENBQUMsQ0FBekIsRUFDSixPQUFPLE9BQVAsQ0FESSxLQUVBLElBQUdlLEVBQUVmLE9BQUYsQ0FBVSxPQUFWLEtBQW9CLENBQUMsQ0FBeEIsRUFDSixPQUFPLFFBQVAsQ0FESSxLQUVBLElBQUdlLEVBQUVmLE9BQUYsQ0FBVSxRQUFWLEtBQXFCLENBQUMsQ0FBekIsRUFDSixPQUFPLFFBQVAsQ0FESSxLQUVBLElBQUdlLEVBQUVmLE9BQUYsQ0FBVSxPQUFWLEtBQW9CLENBQUMsQ0FBeEIsRUFDSixPQUFPLE9BQVAsQ0FESSxLQUdKLE9BQU8sT0FBUDtBQUNEO0FBaEVGO0FBQUE7QUFBQSIsImZpbGUiOiJjb252ZXJ0ZXIuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgQ29udmVydGVyIGZyb20gJy4uL2NvbnZlcnRlcidcclxuXHJcbnZhciBMaW5lcz0nZG90dGVkLGRhc2hlZCxpbnNldCxvdXRzZXQsc29saWQnLnNwbGl0KClcclxudmFyIGJyb3dzZXJzPScsLXdlYmtpdC0sLW1vei0nLnNwbGl0KCcsJyksIGNzc0lEPUNvbnZlcnRlci5hc0Nzc0lEO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgU3R5bGVDb252ZXJ0ZXIgZXh0ZW5kcyBDb252ZXJ0ZXJ7XHJcblx0Y29uc3RydWN0b3IoKXtcclxuXHRcdHN1cGVyKC4uLmFyZ3VtZW50cylcclxuXHRcdHZhciBwYXJlbnRTdHlsZT10aGlzLndvcmRNb2RlbC5nZXRQYXJlbnRTdHlsZSgpO1xyXG5cdFx0cGFyZW50U3R5bGUgJiYgdGhpcy5kb2Muc3R5bGVQYXRoKGNzc0lEKHRoaXMud29yZE1vZGVsLmlkKSwgY3NzSUQocGFyZW50U3R5bGUuaWQpKVxyXG5cdH1cclxuXHRjb252ZXJ0KHZhbHVlLG5hbWUsY2F0ZWdvcnkpe1xyXG5cdFx0dmFyIGNvbnZlcnRlcj10aGlzLl9nZXRQcm9wZXJ0aWVzQ29udmVydGVyKGNhdGVnb3J5KTtcclxuXHRcdGNvbnZlcnRlciAmJiBjb252ZXJ0ZXJbbmFtZV0gJiYgY29udmVydGVyW25hbWVdKHZhbHVlKVxyXG5cdH1cclxuXHRfZ2V0UHJvcGVydGllc0NvbnZlcnRlcigpe1xyXG5cdFx0XHJcblx0fVxyXG59XHJcblxyXG5TdHlsZUNvbnZlcnRlci5Qcm9wZXJ0aWVzPWNsYXNzIFByb3BlcnRpZXN7XHJcblx0Y29uc3RydWN0b3Ioc3R5bGUscGFyZW50KXtcclxuXHRcdHRoaXMuc3R5bGU9c3R5bGVcclxuXHRcdHRoaXMucGFyZW50PXBhcmVudFxyXG5cdFx0cGFyZW50ICYmICh0aGlzLmRvYz1wYXJlbnQuZG9jKVxyXG5cdH1cclxuXHR2aXNpdCgpe1xyXG5cdFx0dGhpcy5jb252ZXJ0KC4uLmFyZ3VtZW50cylcclxuXHR9XHJcblx0XHJcblx0Y29udmVydCh2YWx1ZSwgbmFtZSl7XHJcblx0XHR0aGlzW25hbWVdICYmIHRoaXNbbmFtZV0odmFsdWUpXHJcblx0fVxyXG5cdFxyXG5cdF9ib3JkZXIoYm9yZGVyKXtcclxuXHRcdGlmKGJvcmRlci52YWw9PSdub25lJyB8fCBib3JkZXIudmFsPT0nbmlsJylcclxuXHRcdFx0cmV0dXJuICcwJ1xyXG5cdFx0ZWxzZVxyXG5cdFx0XHRyZXR1cm4gKGJvcmRlci5zejwxICYmIGJvcmRlci5zej4wID8gMSA6IGJvcmRlci5zeikrJ3B0ICcrKExpbmVzLmluZGV4T2YoYm9yZGVyLnZhbC50b0xvd2VyQ2FzZSgpKSE9LTEgPyBib3JkZXIudmFsIDogJ3NvbGlkJykrJyAnKyhib3JkZXIuY29sb3J8fCcnKVxyXG5cdH1cclxuXHRlcXVhbE9iaihhLGIpe1xyXG5cdFx0dmFyIGtleXM9T2JqZWN0LmtleXMoYSlcclxuXHRcdGlmKCFiIHx8IGtleXMubGVuZ3RoIT1PYmplY3Qua2V5cyhiKS5sZW5ndGgpXHJcblx0XHRcdHJldHVybiBmYWxzZVxyXG5cdFx0aWYoa2V5cy5sZW5ndGghPTApe1x0XHRcdFx0XHRcclxuXHRcdFx0Zm9yKHZhciBpPTAsbGVuPWtleXMubGVuZ3RoO2k8bGVuO2krKyl7XHJcblx0XHRcdFx0aWYoYVtrZXlzW2ldXSE9YltrZXlzW2ldXSlcclxuXHRcdFx0XHRcdHJldHVybiBmYWxzZVxyXG5cdFx0XHR9XHJcblx0XHR9XHJcblx0XHRcclxuXHRcdGZvcih2YXIgaT0yLGxlbj1hcmd1bWVudHMubGVuZ3RoO2k8bGVuO2krKylcclxuXHRcdFx0aWYoIXRoaXMuZXF1YWxPYmooYSxhcmd1bWVudHNbaV0pKVxyXG5cdFx0XHRcdHJldHVybiBmYWxzZVxyXG5cdFx0cmV0dXJuIHRydWVcclxuXHR9XHJcblx0dXBwZXJGaXJzdCh0eXBlKXtcclxuXHRcdHJldHVybiB0eXBlWzBdLnRvVXBwZXJDYXNlKCkgKyB0eXBlLnNsaWNlKDEpXHJcblx0fVxyXG5cdHN0eWxlc3MobmFtZSx2YWx1ZSwgc3R5bGUpe1xyXG5cdFx0YnJvd3NlcnMuZm9yRWFjaChmdW5jdGlvbihhKXtcclxuXHRcdFx0dGhpc1thK25hbWVdPXZhbHVlXHJcblx0XHR9LmJpbmQoc3R5bGV8fHRoaXMuc3R5bGUpKVxyXG5cdH1cclxuXHRsaW5lU3R5bGUoeCl7XHJcblx0XHRpZigheClcclxuXHRcdFx0cmV0dXJuICdzb2xpZCdcclxuXHRcdHg9eC50b0xvd2VyQ2FzZSgpXHJcblx0XHRpZih4LmluZGV4T2YoJ2RvdCcpIT0tMSlcclxuXHRcdFx0cmV0dXJuICdkb3R0ZWQnXHJcblx0XHRlbHNlIGlmKHguaW5kZXhPZignZGFzaCcpIT0tMSlcclxuXHRcdFx0cmV0dXJuICdkYXNoZWQnXHJcblx0XHRlbHNlIGlmKHguaW5kZXhPZignZG91YmxlJykhPS0xIHx8IHguaW5kZXhPZignZ2FwJykhPS0xKVxyXG5cdFx0XHRyZXR1cm4gJ2RvdWJsZSdcclxuXHRcdGVsc2UgaWYoeC5pbmRleE9mKCdlbWJvc3MnKSE9LTEpXHJcblx0XHRcdHJldHVybiAncmlkZ2UnXHJcblx0XHRlbHNlIGlmKHguaW5kZXhPZignZ3JhdmUnKSE9LTEpXHJcblx0XHRcdHJldHVybiAnZ3Jvb3ZlJ1xyXG5cdFx0ZWxzZSBpZih4LmluZGV4T2YoJ291dHNldCcpIT0tMSlcclxuXHRcdFx0cmV0dXJuICdvdXRzZXQnXHJcblx0XHRlbHNlIGlmKHguaW5kZXhPZignaW5zZXQnKSE9LTEpXHJcblx0XHRcdHJldHVybiAnaW5zZXQnXHJcblx0XHRlbHNlXHJcblx0XHRcdHJldHVybiAnc29saWQnXHJcblx0fVxyXG59XHJcblxyXG4iXX0=