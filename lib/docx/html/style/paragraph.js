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

var _inline = require('./inline');

var _inline2 = _interopRequireDefault(_inline);

var _numbering = require('./numbering');

var _numbering2 = _interopRequireDefault(_numbering);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Paragraph = function (_Style) {
	(0, _inherits3.default)(Paragraph, _Style);

	function Paragraph() {
		(0, _classCallCheck3.default)(this, Paragraph);
		return (0, _possibleConstructorReturn3.default)(this, (Paragraph.__proto__ || (0, _getPrototypeOf2.default)(Paragraph)).apply(this, arguments));
	}

	(0, _createClass3.default)(Paragraph, [{
		key: '_getPropertiesConverter',
		value: function _getPropertiesConverter(category) {
			if (this[category]) return this[category];
			switch (category) {
				case 'inline':
					this.inlineStyle = this.doc.createStyle('.' + _converter2.default.asCssID(this.wordModel.id) + ' span');
					return this[category] = new _inline2.default.Properties(this.inlineStyle);
				case 'paragraph':
					this.paragraphStyle = this.doc.createStyle('.' + _converter2.default.asCssID(this.wordModel.id));
					return this[category] = new this.constructor.Properties(this.paragraphStyle);
				case 'frame':
					this._getPropertiesConverter('paragraph');
					return this[category] = new this.constructor.FrameProperties(this.paragraphStyle);
				case 'numbering':
					this._getPropertiesConverter('paragraph');
					return this[category] = new _numbering2.default.Properties(this.paragraphStyle);
			}
		}
	}]);
	return Paragraph;
}(_converter2.default);

exports.default = Paragraph;


Paragraph.Properties = function (_Style$Properties) {
	(0, _inherits3.default)(Properties, _Style$Properties);

	function Properties() {
		(0, _classCallCheck3.default)(this, Properties);
		return (0, _possibleConstructorReturn3.default)(this, (Properties.__proto__ || (0, _getPrototypeOf2.default)(Properties)).apply(this, arguments));
	}

	(0, _createClass3.default)(Properties, [{
		key: 'jc',
		value: function jc(x) {
			this.style.textAlign = x;
		}
	}, {
		key: 'ind',
		value: function ind(x) {
			x.left && (this.style.marginLeft = x.left + 'px');
			x.right && (this.style.marginRight = x.right + 'px');
			x.firstLine && (this.style.textIndent = x.firstLine + 'px');
			x.hanging && (this.style.textIndent = '-' + x.hanging + 'px');
		}
	}, {
		key: 'spacing',
		value: function spacing(x) {
			x.bottom && (this.style.marginBottom = x.bottom + 'px');
			x.top && (this.style.marginTop = x.top + 'px');

			x.lineHeight && (this.style.lineHeight = x.lineHeight);
		}
	}]);
	return Properties;
}(_converter2.default.Properties);

Paragraph.FrameProperties = function (_Style$Properties2) {
	(0, _inherits3.default)(FrameProperties, _Style$Properties2);

	function FrameProperties() {
		(0, _classCallCheck3.default)(this, FrameProperties);
		return (0, _possibleConstructorReturn3.default)(this, (FrameProperties.__proto__ || (0, _getPrototypeOf2.default)(FrameProperties)).apply(this, arguments));
	}

	return FrameProperties;
}(_converter2.default.Properties);
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9kb2N4L2h0bWwvc3R5bGUvcGFyYWdyYXBoLmpzIl0sIm5hbWVzIjpbIlBhcmFncmFwaCIsImNhdGVnb3J5IiwiaW5saW5lU3R5bGUiLCJkb2MiLCJjcmVhdGVTdHlsZSIsIlN0eWxlIiwiYXNDc3NJRCIsIndvcmRNb2RlbCIsImlkIiwiSW5saW5lIiwiUHJvcGVydGllcyIsInBhcmFncmFwaFN0eWxlIiwiY29uc3RydWN0b3IiLCJfZ2V0UHJvcGVydGllc0NvbnZlcnRlciIsIkZyYW1lUHJvcGVydGllcyIsIk51bWJlcmluZyIsIngiLCJzdHlsZSIsInRleHRBbGlnbiIsImxlZnQiLCJtYXJnaW5MZWZ0IiwicmlnaHQiLCJtYXJnaW5SaWdodCIsImZpcnN0TGluZSIsInRleHRJbmRlbnQiLCJoYW5naW5nIiwiYm90dG9tIiwibWFyZ2luQm90dG9tIiwidG9wIiwibWFyZ2luVG9wIiwibGluZUhlaWdodCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTs7OztBQUNBOzs7O0FBQ0E7Ozs7OztJQUVxQkEsUzs7Ozs7Ozs7OzswQ0FDSUMsUSxFQUFTO0FBQ2hDLE9BQUcsS0FBS0EsUUFBTCxDQUFILEVBQ0MsT0FBTyxLQUFLQSxRQUFMLENBQVA7QUFDRCxXQUFPQSxRQUFQO0FBQ0EsU0FBSyxRQUFMO0FBQ0MsVUFBS0MsV0FBTCxHQUFpQixLQUFLQyxHQUFMLENBQVNDLFdBQVQsQ0FBcUIsTUFBSUMsb0JBQU1DLE9BQU4sQ0FBYyxLQUFLQyxTQUFMLENBQWVDLEVBQTdCLENBQUosR0FBcUMsT0FBMUQsQ0FBakI7QUFDQSxZQUFPLEtBQUtQLFFBQUwsSUFBZSxJQUFJUSxpQkFBT0MsVUFBWCxDQUFzQixLQUFLUixXQUEzQixDQUF0QjtBQUNELFNBQUssV0FBTDtBQUNDLFVBQUtTLGNBQUwsR0FBb0IsS0FBS1IsR0FBTCxDQUFTQyxXQUFULENBQXFCLE1BQUlDLG9CQUFNQyxPQUFOLENBQWMsS0FBS0MsU0FBTCxDQUFlQyxFQUE3QixDQUF6QixDQUFwQjtBQUNBLFlBQU8sS0FBS1AsUUFBTCxJQUFlLElBQUksS0FBS1csV0FBTCxDQUFpQkYsVUFBckIsQ0FBZ0MsS0FBS0MsY0FBckMsQ0FBdEI7QUFDRCxTQUFLLE9BQUw7QUFDQyxVQUFLRSx1QkFBTCxDQUE2QixXQUE3QjtBQUNBLFlBQU8sS0FBS1osUUFBTCxJQUFlLElBQUksS0FBS1csV0FBTCxDQUFpQkUsZUFBckIsQ0FBcUMsS0FBS0gsY0FBMUMsQ0FBdEI7QUFDRCxTQUFLLFdBQUw7QUFDQyxVQUFLRSx1QkFBTCxDQUE2QixXQUE3QjtBQUNBLFlBQU8sS0FBS1osUUFBTCxJQUFlLElBQUljLG9CQUFVTCxVQUFkLENBQXlCLEtBQUtDLGNBQTlCLENBQXRCO0FBWkQ7QUFjQTs7O0VBbEJxQ04sbUI7O2tCQUFsQkwsUzs7O0FBcUJyQkEsVUFBVVUsVUFBVjtBQUFBOztBQUFBO0FBQUE7QUFBQTtBQUFBOztBQUFBO0FBQUE7QUFBQSxxQkFDSU0sQ0FESixFQUNNO0FBQ0osUUFBS0MsS0FBTCxDQUFXQyxTQUFYLEdBQXFCRixDQUFyQjtBQUNBO0FBSEY7QUFBQTtBQUFBLHNCQUlLQSxDQUpMLEVBSU87QUFDTEEsS0FBRUcsSUFBRixLQUFXLEtBQUtGLEtBQUwsQ0FBV0csVUFBWCxHQUFzQkosRUFBRUcsSUFBRixHQUFPLElBQXhDO0FBQ0FILEtBQUVLLEtBQUYsS0FBWSxLQUFLSixLQUFMLENBQVdLLFdBQVgsR0FBdUJOLEVBQUVLLEtBQUYsR0FBUSxJQUEzQztBQUNBTCxLQUFFTyxTQUFGLEtBQWdCLEtBQUtOLEtBQUwsQ0FBV08sVUFBWCxHQUFzQlIsRUFBRU8sU0FBRixHQUFZLElBQWxEO0FBQ0FQLEtBQUVTLE9BQUYsS0FBYyxLQUFLUixLQUFMLENBQVdPLFVBQVgsR0FBc0IsTUFBSVIsRUFBRVMsT0FBTixHQUFjLElBQWxEO0FBQ0E7QUFURjtBQUFBO0FBQUEsMEJBVVNULENBVlQsRUFVVztBQUNUQSxLQUFFVSxNQUFGLEtBQWEsS0FBS1QsS0FBTCxDQUFXVSxZQUFYLEdBQXdCWCxFQUFFVSxNQUFGLEdBQVMsSUFBOUM7QUFDQVYsS0FBRVksR0FBRixLQUFVLEtBQUtYLEtBQUwsQ0FBV1ksU0FBWCxHQUFxQmIsRUFBRVksR0FBRixHQUFNLElBQXJDOztBQUVBWixLQUFFYyxVQUFGLEtBQWlCLEtBQUtiLEtBQUwsQ0FBV2EsVUFBWCxHQUFzQmQsRUFBRWMsVUFBekM7QUFDQTtBQWZGO0FBQUE7QUFBQSxFQUE4Q3pCLG9CQUFNSyxVQUFwRDs7QUFrQkFWLFVBQVVjLGVBQVY7QUFBQTs7QUFBQTtBQUFBO0FBQUE7QUFBQTs7QUFBQTtBQUFBLEVBQXdEVCxvQkFBTUssVUFBOUQiLCJmaWxlIjoicGFyYWdyYXBoLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFN0eWxlIGZyb20gJy4vY29udmVydGVyJ1xyXG5pbXBvcnQgSW5saW5lIGZyb20gJy4vaW5saW5lJ1xyXG5pbXBvcnQgTnVtYmVyaW5nIGZyb20gJy4vbnVtYmVyaW5nJ1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgUGFyYWdyYXBoIGV4dGVuZHMgU3R5bGV7XHJcblx0X2dldFByb3BlcnRpZXNDb252ZXJ0ZXIoY2F0ZWdvcnkpe1xyXG5cdFx0aWYodGhpc1tjYXRlZ29yeV0pXHJcblx0XHRcdHJldHVybiB0aGlzW2NhdGVnb3J5XVxyXG5cdFx0c3dpdGNoKGNhdGVnb3J5KXtcclxuXHRcdGNhc2UgJ2lubGluZSc6XHJcblx0XHRcdHRoaXMuaW5saW5lU3R5bGU9dGhpcy5kb2MuY3JlYXRlU3R5bGUoJy4nK1N0eWxlLmFzQ3NzSUQodGhpcy53b3JkTW9kZWwuaWQpKycgc3BhbicpXHJcblx0XHRcdHJldHVybiB0aGlzW2NhdGVnb3J5XT1uZXcgSW5saW5lLlByb3BlcnRpZXModGhpcy5pbmxpbmVTdHlsZSlcclxuXHRcdGNhc2UgJ3BhcmFncmFwaCc6XHJcblx0XHRcdHRoaXMucGFyYWdyYXBoU3R5bGU9dGhpcy5kb2MuY3JlYXRlU3R5bGUoJy4nK1N0eWxlLmFzQ3NzSUQodGhpcy53b3JkTW9kZWwuaWQpKVxyXG5cdFx0XHRyZXR1cm4gdGhpc1tjYXRlZ29yeV09bmV3IHRoaXMuY29uc3RydWN0b3IuUHJvcGVydGllcyh0aGlzLnBhcmFncmFwaFN0eWxlKVxyXG5cdFx0Y2FzZSAnZnJhbWUnOlxyXG5cdFx0XHR0aGlzLl9nZXRQcm9wZXJ0aWVzQ29udmVydGVyKCdwYXJhZ3JhcGgnKVxyXG5cdFx0XHRyZXR1cm4gdGhpc1tjYXRlZ29yeV09bmV3IHRoaXMuY29uc3RydWN0b3IuRnJhbWVQcm9wZXJ0aWVzKHRoaXMucGFyYWdyYXBoU3R5bGUpXHJcblx0XHRjYXNlICdudW1iZXJpbmcnOlxyXG5cdFx0XHR0aGlzLl9nZXRQcm9wZXJ0aWVzQ29udmVydGVyKCdwYXJhZ3JhcGgnKVxyXG5cdFx0XHRyZXR1cm4gdGhpc1tjYXRlZ29yeV09bmV3IE51bWJlcmluZy5Qcm9wZXJ0aWVzKHRoaXMucGFyYWdyYXBoU3R5bGUpXHJcblx0XHR9XHJcblx0fVxyXG59XHJcblxyXG5QYXJhZ3JhcGguUHJvcGVydGllcz1jbGFzcyBQcm9wZXJ0aWVzIGV4dGVuZHMgU3R5bGUuUHJvcGVydGllc3tcclxuXHRqYyh4KXtcclxuXHRcdHRoaXMuc3R5bGUudGV4dEFsaWduPXhcclxuXHR9XHJcblx0aW5kKHgpe1xyXG5cdFx0eC5sZWZ0ICYmICh0aGlzLnN0eWxlLm1hcmdpbkxlZnQ9eC5sZWZ0KydweCcpXHJcblx0XHR4LnJpZ2h0ICYmICh0aGlzLnN0eWxlLm1hcmdpblJpZ2h0PXgucmlnaHQrJ3B4JylcclxuXHRcdHguZmlyc3RMaW5lICYmICh0aGlzLnN0eWxlLnRleHRJbmRlbnQ9eC5maXJzdExpbmUrJ3B4JylcclxuXHRcdHguaGFuZ2luZyAmJiAodGhpcy5zdHlsZS50ZXh0SW5kZW50PSctJyt4LmhhbmdpbmcrJ3B4JylcclxuXHR9XHJcblx0c3BhY2luZyh4KXtcclxuXHRcdHguYm90dG9tICYmICh0aGlzLnN0eWxlLm1hcmdpbkJvdHRvbT14LmJvdHRvbSsncHgnKVxyXG5cdFx0eC50b3AgJiYgKHRoaXMuc3R5bGUubWFyZ2luVG9wPXgudG9wKydweCcpXHJcblx0XHRcclxuXHRcdHgubGluZUhlaWdodCAmJiAodGhpcy5zdHlsZS5saW5lSGVpZ2h0PXgubGluZUhlaWdodClcclxuXHR9XHJcbn1cclxuXHJcblBhcmFncmFwaC5GcmFtZVByb3BlcnRpZXM9Y2xhc3MgRnJhbWVQcm9wZXJ0aWVzIGV4dGVuZHMgU3R5bGUuUHJvcGVydGllc3tcclxuXHRcdFxyXG59Il19