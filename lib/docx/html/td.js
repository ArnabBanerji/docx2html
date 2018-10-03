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

var _table = require('./style/table');

var _table2 = _interopRequireDefault(_table);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Td = function (_Converter) {
	(0, _inherits3.default)(Td, _Converter);

	function Td() {
		(0, _classCallCheck3.default)(this, Td);
		return (0, _possibleConstructorReturn3.default)(this, (Td.__proto__ || (0, _getPrototypeOf2.default)(Td)).apply(this, arguments));
	}

	(0, _createClass3.default)(Td, [{
		key: 'convertStyle',
		value: function convertStyle(el) {
			(0, _get3.default)(Td.prototype.__proto__ || (0, _getPrototypeOf2.default)(Td.prototype), 'convertStyle', this).apply(this, arguments);
			var style = this.wordModel.getDirectStyle();
			style && style.parse([new this.constructor.Properties(el.style, this)]);
		}
	}, {
		key: 'tag',
		get: function get() {
			return 'td';
		}
	}]);
	return Td;
}(_converter2.default);

exports.default = Td;

var Properties = function (_Style$CellProperties) {
	(0, _inherits3.default)(Properties, _Style$CellProperties);

	function Properties() {
		(0, _classCallCheck3.default)(this, Properties);
		return (0, _possibleConstructorReturn3.default)(this, (Properties.__proto__ || (0, _getPrototypeOf2.default)(Properties)).apply(this, arguments));
	}

	(0, _createClass3.default)(Properties, [{
		key: 'tcBorders',
		value: function tcBorders(x) {
			x.left && (this.style.borderLeft = this._border(x.left));
			x.right && (this.style.borderRight = this._border(x.right));
			x.top && (this.style.borderTop = this._border(x.top));
			x.bottom && (this.style.borderBottom = this._border(x.bottom));
		}
	}, {
		key: 'cnfStyle',
		value: function cnfStyle(x) {
			var names = [],
			    PrioritiziedStyles = _table2.default.prototype.PrioritiziedStyles,
			    level = -1,
			    t;
			for (var i = 0; i < 12; i++) {
				if (x.charAt(i) == '1') {
					names.push(t = _table2.default.TableStyles[i]);
					if ((t = PrioritiziedStyles.indexOf(t)) > level) level = t;
				}
			}
			names.length && Td.addClass(this.parent.content, names.join(' '));
			for (var i = 0; i < level; i++) {
				this.parent.content.setAttribute('x' + i, 1);
			}
		}
	}]);
	return Properties;
}(_table2.default.CellProperties);

Td.Properties = Properties;
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9kb2N4L2h0bWwvdGQuanMiXSwibmFtZXMiOlsiVGQiLCJlbCIsImFyZ3VtZW50cyIsInN0eWxlIiwid29yZE1vZGVsIiwiZ2V0RGlyZWN0U3R5bGUiLCJwYXJzZSIsImNvbnN0cnVjdG9yIiwiUHJvcGVydGllcyIsIkNvbnZlcnRlciIsIngiLCJsZWZ0IiwiYm9yZGVyTGVmdCIsIl9ib3JkZXIiLCJyaWdodCIsImJvcmRlclJpZ2h0IiwidG9wIiwiYm9yZGVyVG9wIiwiYm90dG9tIiwiYm9yZGVyQm90dG9tIiwibmFtZXMiLCJQcmlvcml0aXppZWRTdHlsZXMiLCJTdHlsZSIsInByb3RvdHlwZSIsImxldmVsIiwidCIsImkiLCJjaGFyQXQiLCJwdXNoIiwiVGFibGVTdHlsZXMiLCJpbmRleE9mIiwibGVuZ3RoIiwiYWRkQ2xhc3MiLCJwYXJlbnQiLCJjb250ZW50Iiwiam9pbiIsInNldEF0dHJpYnV0ZSIsIkNlbGxQcm9wZXJ0aWVzIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTs7OztBQUNBOzs7Ozs7SUFFcUJBLEU7Ozs7Ozs7Ozs7K0JBR1BDLEUsRUFBRztBQUNmLCtIQUFzQkMsU0FBdEI7QUFDQSxPQUFJQyxRQUFNLEtBQUtDLFNBQUwsQ0FBZUMsY0FBZixFQUFWO0FBQ0FGLFlBQVNBLE1BQU1HLEtBQU4sQ0FBWSxDQUFDLElBQUksS0FBS0MsV0FBTCxDQUFpQkMsVUFBckIsQ0FBZ0NQLEdBQUdFLEtBQW5DLEVBQXlDLElBQXpDLENBQUQsQ0FBWixDQUFUO0FBQ0E7OztzQkFOUTtBQUFDLFVBQU8sSUFBUDtBQUFZOzs7RUFEU00sbUI7O2tCQUFYVCxFOztJQVdmUSxVOzs7Ozs7Ozs7OzRCQUNLRSxDLEVBQUU7QUFDWEEsS0FBRUMsSUFBRixLQUFXLEtBQUtSLEtBQUwsQ0FBV1MsVUFBWCxHQUFzQixLQUFLQyxPQUFMLENBQWFILEVBQUVDLElBQWYsQ0FBakM7QUFDQUQsS0FBRUksS0FBRixLQUFZLEtBQUtYLEtBQUwsQ0FBV1ksV0FBWCxHQUF1QixLQUFLRixPQUFMLENBQWFILEVBQUVJLEtBQWYsQ0FBbkM7QUFDQUosS0FBRU0sR0FBRixLQUFVLEtBQUtiLEtBQUwsQ0FBV2MsU0FBWCxHQUFxQixLQUFLSixPQUFMLENBQWFILEVBQUVNLEdBQWYsQ0FBL0I7QUFDQU4sS0FBRVEsTUFBRixLQUFhLEtBQUtmLEtBQUwsQ0FBV2dCLFlBQVgsR0FBd0IsS0FBS04sT0FBTCxDQUFhSCxFQUFFUSxNQUFmLENBQXJDO0FBQ0E7OzsyQkFDUVIsQyxFQUFFO0FBQ1YsT0FBSVUsUUFBTSxFQUFWO0FBQUEsT0FBY0MscUJBQW1CQyxnQkFBTUMsU0FBTixDQUFnQkYsa0JBQWpEO0FBQUEsT0FBcUVHLFFBQU0sQ0FBQyxDQUE1RTtBQUFBLE9BQStFQyxDQUEvRTtBQUNBLFFBQUksSUFBSUMsSUFBRSxDQUFWLEVBQVlBLElBQUUsRUFBZCxFQUFpQkEsR0FBakIsRUFBcUI7QUFDcEIsUUFBR2hCLEVBQUVpQixNQUFGLENBQVNELENBQVQsS0FBYSxHQUFoQixFQUFvQjtBQUNuQk4sV0FBTVEsSUFBTixDQUFXSCxJQUFFSCxnQkFBTU8sV0FBTixDQUFrQkgsQ0FBbEIsQ0FBYjtBQUNBLFNBQUcsQ0FBQ0QsSUFBRUosbUJBQW1CUyxPQUFuQixDQUEyQkwsQ0FBM0IsQ0FBSCxJQUFrQ0QsS0FBckMsRUFDQ0EsUUFBTUMsQ0FBTjtBQUNEO0FBQ0Q7QUFDREwsU0FBTVcsTUFBTixJQUFnQi9CLEdBQUdnQyxRQUFILENBQVksS0FBS0MsTUFBTCxDQUFZQyxPQUF4QixFQUFnQ2QsTUFBTWUsSUFBTixDQUFXLEdBQVgsQ0FBaEMsQ0FBaEI7QUFDQSxRQUFJLElBQUlULElBQUUsQ0FBVixFQUFZQSxJQUFFRixLQUFkLEVBQW9CRSxHQUFwQjtBQUNDLFNBQUtPLE1BQUwsQ0FBWUMsT0FBWixDQUFvQkUsWUFBcEIsQ0FBaUMsTUFBSVYsQ0FBckMsRUFBdUMsQ0FBdkM7QUFERDtBQUVBOzs7RUFuQnVCSixnQkFBTWUsYzs7QUFzQi9CckMsR0FBR1EsVUFBSCxHQUFjQSxVQUFkIiwiZmlsZSI6InRkLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IENvbnZlcnRlciBmcm9tICcuL2NvbnZlcnRlcidcclxuaW1wb3J0IFN0eWxlIGZyb20gJy4vc3R5bGUvdGFibGUnXHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBUZCBleHRlbmRzIENvbnZlcnRlcntcclxuXHRnZXQgdGFnKCl7cmV0dXJuICd0ZCd9XHJcblx0XHJcblx0Y29udmVydFN0eWxlKGVsKXtcclxuXHRcdHN1cGVyLmNvbnZlcnRTdHlsZSguLi5hcmd1bWVudHMpXHJcblx0XHR2YXIgc3R5bGU9dGhpcy53b3JkTW9kZWwuZ2V0RGlyZWN0U3R5bGUoKVxyXG5cdFx0c3R5bGUgJiYgc3R5bGUucGFyc2UoW25ldyB0aGlzLmNvbnN0cnVjdG9yLlByb3BlcnRpZXMoZWwuc3R5bGUsdGhpcyldKVxyXG5cdH1cclxuXHJcbn1cclxuXHJcbmNsYXNzIFByb3BlcnRpZXMgZXh0ZW5kcyBTdHlsZS5DZWxsUHJvcGVydGllc3tcclxuXHR0Y0JvcmRlcnMoeCl7XHJcblx0XHR4LmxlZnQgJiYgKHRoaXMuc3R5bGUuYm9yZGVyTGVmdD10aGlzLl9ib3JkZXIoeC5sZWZ0KSlcclxuXHRcdHgucmlnaHQgJiYgKHRoaXMuc3R5bGUuYm9yZGVyUmlnaHQ9dGhpcy5fYm9yZGVyKHgucmlnaHQpKVxyXG5cdFx0eC50b3AgJiYgKHRoaXMuc3R5bGUuYm9yZGVyVG9wPXRoaXMuX2JvcmRlcih4LnRvcCkpXHJcblx0XHR4LmJvdHRvbSAmJiAodGhpcy5zdHlsZS5ib3JkZXJCb3R0b209dGhpcy5fYm9yZGVyKHguYm90dG9tKSlcclxuXHR9XHJcblx0Y25mU3R5bGUoeCl7XHJcblx0XHR2YXIgbmFtZXM9W10sIFByaW9yaXRpemllZFN0eWxlcz1TdHlsZS5wcm90b3R5cGUuUHJpb3JpdGl6aWVkU3R5bGVzLCBsZXZlbD0tMSwgdFxyXG5cdFx0Zm9yKHZhciBpPTA7aTwxMjtpKyspe1xyXG5cdFx0XHRpZih4LmNoYXJBdChpKT09JzEnKXtcclxuXHRcdFx0XHRuYW1lcy5wdXNoKHQ9U3R5bGUuVGFibGVTdHlsZXNbaV0pXHJcblx0XHRcdFx0aWYoKHQ9UHJpb3JpdGl6aWVkU3R5bGVzLmluZGV4T2YodCkpPmxldmVsKVxyXG5cdFx0XHRcdFx0bGV2ZWw9dFxyXG5cdFx0XHR9XHJcblx0XHR9XHJcblx0XHRuYW1lcy5sZW5ndGggJiYgVGQuYWRkQ2xhc3ModGhpcy5wYXJlbnQuY29udGVudCxuYW1lcy5qb2luKCcgJykpO1xyXG5cdFx0Zm9yKHZhciBpPTA7aTxsZXZlbDtpKyspXHJcblx0XHRcdHRoaXMucGFyZW50LmNvbnRlbnQuc2V0QXR0cmlidXRlKCd4JytpLDEpXHJcblx0fVxyXG59XHJcblxyXG5UZC5Qcm9wZXJ0aWVzPVByb3BlcnRpZXNcclxuXHJcblxyXG5cclxuIl19