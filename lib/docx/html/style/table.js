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

var _paragraph = require('./paragraph');

var _paragraph2 = _interopRequireDefault(_paragraph);

var _inline = require('./inline');

var _inline2 = _interopRequireDefault(_inline);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
the priority of css rule should be aligned with word
*/

var gRow = /row|horz/i;

var Table = function (_Style) {
	(0, _inherits3.default)(Table, _Style);

	function Table() {
		(0, _classCallCheck3.default)(this, Table);

		var _this = (0, _possibleConstructorReturn3.default)(this, (Table.__proto__ || (0, _getPrototypeOf2.default)(Table)).apply(this, arguments));

		_this.target = _this.wordModel.getTarget();
		return _this;
	}

	(0, _createClass3.default)(Table, [{
		key: '_getPropertiesConverter',
		value: function _getPropertiesConverter(category) {
			if (this[category]) return this[category];

			var selector = this.getTableSelector() + '>' + (gRow.test(this.target) ? '.' + this.getPrioritizedSelector() + '>td' : 'tr>.' + this.getPrioritizedSelector());
			switch (category) {
				case 'table':
					return this[category] = new this.constructor.Properties(this.doc.createStyle(this.getTableSelector().replace(/\>\s*tbody$/i, '')), this);
				case 'inline':
					//0012
					return this[category] = new _inline2.default.Properties(this.doc.createStyle(selector + ' span'));
				case 'paragraph':
					//0012
					return this[category] = new _paragraph2.default.Properties(this.doc.createStyle(selector + ' p'));
				case 'cell':
					//0011
					return this[category] = new this.constructor.CellProperties(this.doc.createStyle(selector), this);
			}
		}
	}, {
		key: 'getTableSelector',
		value: function getTableSelector() {
			return '.' + _converter2.default.asCssID(this.wordModel.id) + '>tbody';
		}
	}, {
		key: 'getPrioritizedSelector',
		value: function getPrioritizedSelector() {
			var selector = this.target;
			for (var level = this.PrioritiziedStyles.indexOf(this.target), i = 0; i < level; i++) {
				selector = selector + '[x' + i + ']';
			}return selector;
		}
	}, {
		key: 'PrioritiziedStyles',
		get: function get() {
			return 'nwCell,neCell,swCell,seCell,firstRow,lastRow,firstCol,lastCol,band1Vert,band2Vert,band1Horz,band2Horz'.split(',').reverse();
		}
	}]);
	return Table;
}(_converter2.default);

exports.default = Table;


Table.Properties = function (_Style$Properties) {
	(0, _inherits3.default)(Properties, _Style$Properties);

	function Properties(style, parent) {
		(0, _classCallCheck3.default)(this, Properties);

		var _this2 = (0, _possibleConstructorReturn3.default)(this, (Properties.__proto__ || (0, _getPrototypeOf2.default)(Properties)).apply(this, arguments));

		_this2.parent = parent;
		_this2.doc = parent.doc;
		_this2.tableSelector = parent.getTableSelector();
		return _this2;
	}

	(0, _createClass3.default)(Properties, [{
		key: 'tblBorders',
		value: function tblBorders(x) {
			x.left && (this.doc.createStyle(this.tableSelector + '>tr>td:first-child').borderLeft = this._border(x.left)); //0012
			x.right && (this.doc.createStyle(this.tableSelector + '>tr>td:last-child').borderRight = this._border(x.right)); //0012
			x.top && (this.doc.createStyle(this.tableSelector + '>tr:first-of-type>td').borderTop = this._border(x.top)); //0012
			x.bottom && (this.doc.createStyle(this.tableSelector + '>tr:last-of-type>td').borderBottom = this._border(x.bottom)); //0012

			if (x.insideV) {
				var css = this._border(x.insideV);
				var style = this.doc.createStyle(this.tableSelector + '>tr>td:not(:first-child):not(:last-child)'); //0022
				style.borderRight = style.borderLeft = css;
				this.doc.createStyle(this.tableSelector + '>tr>td:last-child').borderLeft = css; //0012
				this.doc.createStyle(this.tableSelector + '>tr>td:first-child').borderRight = css; //0012
			}

			if (x.insideH) {
				var css = this._border(x.insideH);
				var style = this.doc.createStyle(this.tableSelector + '>tr:not(:first-of-type):not(:last-of-type)>td'); //0022
				style.borderTop = style.borderBottom = css;
				this.doc.createStyle(this.tableSelector + '>tr:last-of-type>td').borderTop = css; //0012
				this.doc.createStyle(this.tableSelector + '>tr:first-of-type>td').borderBottom = css; //0012
			}
		}
	}, {
		key: 'tblCellMar',
		value: function tblCellMar(x) {
			for (var i in x) {
				this.doc.createStyle(this.tableSelector + '>tr>td')['padding' + this.upperFirst(i)] = (x[i] < 1 && x[i] > 0 ? 1 : x[i]) + 'px';
			} //0002
		}
	}, {
		key: 'tblInd',
		value: function tblInd(x) {
			x && (this.style.marginLeft = x + 'px');
		}
	}, {
		key: 'tblW',
		value: function tblW(x) {
			x && x != 'auto' && (this.style.width = x);
		}
	}]);
	return Properties;
}(_converter2.default.Properties);

Table.RowProperties = function (_Style$Properties2) {
	(0, _inherits3.default)(RowProperties, _Style$Properties2);

	function RowProperties(style, parent) {
		(0, _classCallCheck3.default)(this, RowProperties);

		var _this3 = (0, _possibleConstructorReturn3.default)(this, (RowProperties.__proto__ || (0, _getPrototypeOf2.default)(RowProperties)).apply(this, arguments));

		_this3.parent = parent;
		_this3.doc = parent.doc;
		return _this3;
	}

	return RowProperties;
}(_converter2.default.Properties);

Table.CellProperties = function (_Style$Properties3) {
	(0, _inherits3.default)(CellProperties, _Style$Properties3);

	function CellProperties(style, parent) {
		(0, _classCallCheck3.default)(this, CellProperties);

		var _this4 = (0, _possibleConstructorReturn3.default)(this, (CellProperties.__proto__ || (0, _getPrototypeOf2.default)(CellProperties)).apply(this, arguments));

		_this4.parent = parent;
		_this4.doc = parent.doc;
		return _this4;
	}

	(0, _createClass3.default)(CellProperties, [{
		key: 'tcBorders',
		value: function tcBorders(x) {
			var tableSelector = this.parent.getTableSelector(),
			    selector = this.parent.getPrioritizedSelector();
			switch (this.parent.target) {
				case 'firstRow':
				case 'lastRow':
				case 'band1Horz':
				case 'band2Horz':
					var style;
					x.left && (this.doc.createStyle(tableSelector + '>.' + selector + '>td:first-child').borderLeft = this._border(x.left)); //0021
					x.right && (this.doc.createStyle(tableSelector + '>.' + selector + '>td:last-child').borderRight = this._border(x.right)); //0021
					x.top && (this.doc.createStyle(tableSelector + '>.' + selector + '>td').borderTop = this._border(x.top)); //0011
					x.bottom && (this.doc.createStyle(tableSelector + '>.' + selector + '>td').borderBottom = this._border(x.bottom)); ////0011
					x.insideV && ((style = this.doc.createStyle(tableSelector + '>.' + selector + '>td:not(:first-child):not(:last-child)')).borderRight = style.borderLeft = this._border(x.insideV)); //0031
					break;
				case 'firstCol':
				case 'lastCol':
				case 'band2Vert':
				case 'band1Vert':
					x.top && (this.doc.createStyle(tableSelector + '>tr:first-of-type>.' + selector).borderTop = this._border(x.top)); //0021
					x.left && (this.doc.createStyle(tableSelector + '>tr:first-of-type>.' + selector).borderLeft = this._border(x.left)); //0021
					x.right && (this.doc.createStyle(tableSelector + '>tr:first-of-type>.' + selector).borderRight = this._border(x.right)); //0021

					x.bottom && (this.doc.createStyle(tableSelector + '>tr:last-of-type>.' + selector).borderBottom = this._border(x.bottom)); //0021
					x.left && (this.doc.createStyle(tableSelector + '>tr:last-of-type>.' + selector).borderLeft = this._border(x.left)); //0021
					x.right && (this.doc.createStyle(tableSelector + '>tr:last-of-type>.' + selector).borderRight = this._border(x.right)); //0021


					x.left && (this.doc.createStyle(tableSelector + '>tr:not(:first-of-type):not(:last-of-type)>.' + selector).borderLeft = this._border(x.left)); //0031
					x.right && (this.doc.createStyle(tableSelector + '>tr:not(:first-of-type):not(:last-of-type)>.' + selector).borderRight = this._border(x.right)); //0031
					break;
				default:
					x.left && (this.doc.createStyle(tableSelector + '>tr>.' + selector).borderLeft = this._border(x.left)); //0011
					x.right && (this.doc.createStyle(tableSelector + '>tr>.' + selector).borderRight = this._border(x.right)); //0011
					x.top && (this.doc.createStyle(tableSelector + '>tr>.' + selector).borderTop = this._border(x.top)); //0011
					x.bottom && (this.doc.createStyle(tableSelector + '>tr>.' + selector).borderBottom = this._border(x.bottom)); //0011
			}
		}
	}, {
		key: 'shd',
		value: function shd(x) {
			this.style.backgroundColor = x;
		}
	}, {
		key: 'gridSpan',
		value: function gridSpan(x) {
			this.parent.content.setAttribute('colspan', x);
		}
	}]);
	return CellProperties;
}(_converter2.default.Properties);

Table.TableStyles = 'firstRow,lastRow,firstCol,lastCol,band1Vert,band2Vert,band1Horz,band2Horz,neCell,nwCell,seCell,swCell'.split(',');
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9kb2N4L2h0bWwvc3R5bGUvdGFibGUuanMiXSwibmFtZXMiOlsiZ1JvdyIsIlRhYmxlIiwiYXJndW1lbnRzIiwidGFyZ2V0Iiwid29yZE1vZGVsIiwiZ2V0VGFyZ2V0IiwiY2F0ZWdvcnkiLCJzZWxlY3RvciIsImdldFRhYmxlU2VsZWN0b3IiLCJ0ZXN0IiwiZ2V0UHJpb3JpdGl6ZWRTZWxlY3RvciIsImNvbnN0cnVjdG9yIiwiUHJvcGVydGllcyIsImRvYyIsImNyZWF0ZVN0eWxlIiwicmVwbGFjZSIsIklubGluZSIsIlBhcmFncmFwaCIsIkNlbGxQcm9wZXJ0aWVzIiwiU3R5bGUiLCJhc0Nzc0lEIiwiaWQiLCJsZXZlbCIsIlByaW9yaXRpemllZFN0eWxlcyIsImluZGV4T2YiLCJpIiwic3BsaXQiLCJyZXZlcnNlIiwic3R5bGUiLCJwYXJlbnQiLCJ0YWJsZVNlbGVjdG9yIiwieCIsImxlZnQiLCJib3JkZXJMZWZ0IiwiX2JvcmRlciIsInJpZ2h0IiwiYm9yZGVyUmlnaHQiLCJ0b3AiLCJib3JkZXJUb3AiLCJib3R0b20iLCJib3JkZXJCb3R0b20iLCJpbnNpZGVWIiwiY3NzIiwiaW5zaWRlSCIsInVwcGVyRmlyc3QiLCJtYXJnaW5MZWZ0Iiwid2lkdGgiLCJSb3dQcm9wZXJ0aWVzIiwiYmFja2dyb3VuZENvbG9yIiwiY29udGVudCIsInNldEF0dHJpYnV0ZSIsIlRhYmxlU3R5bGVzIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBOzs7O0FBQ0E7Ozs7QUFDQTs7Ozs7O0FBRUE7Ozs7QUFJQSxJQUFJQSxPQUFLLFdBQVQ7O0lBQ3FCQyxLOzs7QUFDcEIsa0JBQWE7QUFBQTs7QUFBQSxtSUFDSEMsU0FERzs7QUFFWixRQUFLQyxNQUFMLEdBQVksTUFBS0MsU0FBTCxDQUFlQyxTQUFmLEVBQVo7QUFGWTtBQUdaOzs7OzBDQUt1QkMsUSxFQUFTO0FBQ2hDLE9BQUcsS0FBS0EsUUFBTCxDQUFILEVB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R0osT0FBRU0sR0FBRixLQUFVLEtBQUt4QixHQUFMLENBQVNDLFdBQVQsQ0FBcUJnQixnQkFBYyxPQUFkLEdBQXNCdkIsUUFBM0MsRUFBcUQrQixTQUFyRCxHQUErRCxLQUFLSixPQUFMLENBQWFILEVBQUVNLEdBQWYsQ0FBekUsRUFIRCxDQUc4RjtBQUM3Rk4sT0FBRVEsTUFBRixLQUFhLEtBQUsxQixHQUFMLENBQVNDLFdBQVQsQ0FBcUJnQixnQkFBYyxPQUFkLEdBQXNCdkIsUUFBM0MsRUFBcURpQyxZQUFyRCxHQUFrRSxLQUFLTixPQUFMLENBQWFILEVBQUVRLE1BQWYsQ0FBL0UsRUFoQ0YsQ0FnQ3dHO0FBaEN4RztBQWtDQTtBQTFDRjtBQUFBO0FBQUEsc0JBMkNLUixDQTNDTCxFQTJDTztBQUNMLFFBQUtILEtBQUwsQ0FBV29CLGVBQVgsR0FBMkJqQixDQUEzQjtBQUNBO0FBN0NGO0FBQUE7QUFBQSwyQkE4Q1VBLENBOUNWLEVBOENZO0FBQ1YsUUFBS0YsTUFBTCxDQUFZb0IsT0FBWixDQUFvQkMsWUFBcEIsQ0FBaUMsU0FBakMsRUFBMkNuQixDQUEzQztBQUNBO0FBaERGO0FBQUE7QUFBQSxFQUFrRFosb0JBQU1QLFVBQXhEOztBQW1EQVgsTUFBTWtELFdBQU4sR0FBa0Isd0dBQXdHekIsS0FBeEcsQ0FBOEcsR0FBOUcsQ0FBbEIiLCJmaWxlIjoidGFibGUuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgU3R5bGUgZnJvbSAnLi9jb252ZXJ0ZXInXHJcbmltcG9ydCBQYXJhZ3JhcGggZnJvbSAnLi9wYXJhZ3JhcGgnXHJcbmltcG9ydCBJbmxpbmUgZnJvbSAnLi9pbmxpbmUnXHJcblxyXG4vKlxyXG50aGUgcHJpb3JpdHkgb2YgY3NzIHJ1bGUgc2hvdWxkIGJlIGFsaWduZWQgd2l0aCB3b3JkXHJcbiovXHJcblxyXG52YXIgZ1Jvdz0vcm93fGhvcnovaVxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBUYWJsZSBleHRlbmRzIFN0eWxle1xyXG5cdGNvbnN0cnVjdG9yKCl7XHJcblx0XHRzdXBlciguLi5hcmd1bWVudHMpXHJcblx0XHR0aGlzLnRhcmdldD10aGlzLndvcmRNb2RlbC5nZXRUYXJnZXQoKVxyXG5cdH1cclxuXHRnZXQgUHJpb3JpdGl6aWVkU3R5bGVzKCl7XHJcblx0XHRyZXR1cm4gJ253Q2VsbCxuZUNlbGwsc3dDZWxsLHNlQ2VsbCxmaXJzdFJvdyxsYXN0Um93LGZpcnN0Q29sLGxhc3RDb2wsYmFuZDFWZXJ0LGJhbmQyVmVydCxiYW5kMUhvcnosYmFuZDJIb3J6Jy5zcGxpdCgnLCcpLnJldmVyc2UoKVxyXG5cdH1cclxuXHRcclxuXHRfZ2V0UHJvcGVydGllc0NvbnZlcnRlcihjYXRlZ29yeSl7XHJcblx0XHRpZih0aGlzW2NhdGVnb3J5XSlcclxuXHRcdFx0cmV0dXJuIHRoaXNbY2F0ZWdvcnldXHJcblx0XHRcclxuXHRcdHZhciBzZWxlY3Rvcj10aGlzLmdldFRhYmxlU2VsZWN0b3IoKSsnPicrKGdSb3cudGVzdCh0aGlzLnRhcmdldCkgPyAnLicrdGhpcy5nZXRQcmlvcml0aXplZFNlbGVjdG9yKCkrJz50ZCcgOiAndHI+LicrdGhpcy5nZXRQcmlvcml0aXplZFNlbGVjdG9yKCkpXHRcclxuXHRcdHN3aXRjaChjYXRlZ29yeSl7XHJcblx0XHRjYXNlICd0YWJsZSc6XHJcblx0XHRcdHJldHVybiB0aGlzW2NhdGVnb3J5XT1uZXcgdGhpcy5jb25zdHJ1Y3Rvci5Qcm9wZXJ0aWVzKHRoaXMuZG9jLmNyZWF0ZVN0eWxlKHRoaXMuZ2V0VGFibGVTZWxlY3RvcigpLnJlcGxhY2UoL1xcPlxccyp0Ym9keSQvaSwnJykpLCB0aGlzKVxyXG5cdFx0Y2FzZSAnaW5saW5lJzovLzAwMTJcclxuXHRcdFx0cmV0dXJuIHRoaXNbY2F0ZWdvcnldPW5ldyBJbmxpbmUuUHJvcGVydGllcyh0aGlzLmRvYy5jcmVhdGVTdHlsZShzZWxlY3RvcisnIHNwYW4nKSlcclxuXHRcdGNhc2UgJ3BhcmFncmFwaCc6Ly8wMDEyXHJcblx0XHRcdHJldHVybiB0aGlzW2NhdGVnb3J5XT1uZXcgUGFyYWdyYXBoLlByb3BlcnRpZXModGhpcy5kb2MuY3JlYXRlU3R5bGUoc2VsZWN0b3IrJyBwJykpXHJcblx0XHRjYXNlICdjZWxsJzovLzAwMTFcclxuXHRcdFx0cmV0dXJuIHRoaXNbY2F0ZWdvcnldPW5ldyB0aGlzLmNvbnN0cnVjdG9yLkNlbGxQcm9wZXJ0aWVzKHRoaXMuZG9jLmNyZWF0ZVN0eWxlKHNlbGVjdG9yKSx0aGlzKVxyXG5cdFx0fVxyXG5cdH1cclxuXHRcclxuXHRnZXRUYWJsZVNlbGVjdG9yKCl7XHJcblx0XHRyZXR1cm4gJy4nK1N0eWxlLmFzQ3NzSUQodGhpcy53b3JkTW9kZWwuaWQpKyc+dGJvZHknXHJcblx0fVxyXG5cdFxyXG5cdGdldFByaW9yaXRpemVkU2VsZWN0b3IoKXtcclxuXHRcdHZhciBzZWxlY3Rvcj10aGlzLnRhcmdldFxyXG5cdFx0Zm9yKHZhciBsZXZlbD10aGlzLlByaW9yaXRpemllZFN0eWxlcy5pbmRleE9mKHRoaXMudGFyZ2V0KSxpPTA7aTxsZXZlbDtpKyspXHJcblx0XHRcdHNlbGVjdG9yPXNlbGVjdG9yKydbeCcraSsnXSc7XHJcblx0XHRyZXR1cm4gc2VsZWN0b3JcclxuXHR9XHJcbn1cclxuXHRcclxuVGFibGUuUHJvcGVydGllcz1jbGFzcyBQcm9wZXJ0aWVzIGV4dGVuZHMgU3R5bGUuUHJvcGVydGllc3tcclxuXHRjb25zdHJ1Y3RvcihzdHlsZSwgcGFyZW50KXtcclxuXHRcdHN1cGVyKC4uLmFyZ3VtZW50cylcclxuXHRcdHRoaXMucGFyZW50PXBhcmVudFxyXG5cdFx0dGhpcy5kb2M9cGFyZW50LmRvY1xyXG5cdFx0dGhpcy50YWJsZVNlbGVjdG9yPXBhcmVudC5nZXRUYWJsZVNlbGVjdG9yKClcclxuXHR9XHJcblx0dGJsQm9yZGVycyh4KXtcclxuXHRcdHgubGVmdCAmJiAodGhpcy5kb2MuY3JlYXRlU3R5bGUodGhpcy50YWJsZVNlbGVjdG9yKyc+dHI+dGQ6Zmlyc3QtY2hpbGQnKS5ib3JkZXJMZWZ0PXRoaXMuX2JvcmRlcih4LmxlZnQpKSAvLzAwMTJcclxuXHRcdHgucmlnaHQgJiYgKHRoaXMuZG9jLmNyZWF0ZVN0eWxlKHRoaXMudGFibGVTZWxlY3RvcisnPnRyPnRkOmxhc3QtY2hpbGQnKS5ib3JkZXJSaWdodD10aGlzLl9ib3JkZXIoeC5yaWdodCkpLy8wMDEyXHJcblx0XHR4LnRvcCAmJiAodGhpcy5kb2MuY3JlYXRlU3R5bGUodGhpcy50YWJsZVNlbGVjdG9yKyc+dHI6Zmlyc3Qtb2YtdHlwZT50ZCcpLmJvcmRlclRvcD10aGlzLl9ib3JkZXIoeC50b3ApKS8vMDAxMlxyXG5cdFx0eC5ib3R0b20gJiYgKHRoaXMuZG9jLmNyZWF0ZVN0eWxlKHRoaXMudGFibGVTZWxlY3RvcisnPnRyOmxhc3Qtb2YtdHlwZT50ZCcpLmJvcmRlckJvdHRvbT10aGlzLl9ib3JkZXIoeC5ib3R0b20pKS8vMDAxMlxyXG5cdFx0XHJcblx0XHRpZih4Lmluc2lkZVYpe1xyXG5cdFx0XHR2YXIgY3NzPXRoaXMuX2JvcmRlcih4Lmluc2lkZVYpXHJcblx0XHRcdHZhciBzdHlsZT10aGlzLmRvYy5jcmVhdGVTdHlsZSh0aGlzLnRhYmxlU2VsZWN0b3IrJz50cj50ZDpub3QoOmZpcnN0LWNoaWxkKTpub3QoOmxhc3QtY2hpbGQpJykvLzAwMjJcclxuXHRcdFx0c3R5bGUuYm9yZGVyUmlnaHQ9c3R5bGUuYm9yZGVyTGVmdD1jc3NcclxuXHRcdFx0dGhpcy5kb2MuY3JlYXRlU3R5bGUodGhpcy50YWJsZVNlbGVjdG9yKyc+dHI+dGQ6bGFzdC1jaGlsZCcpLmJvcmRlckxlZnQ9Y3NzLy8wMDEyXHJcblx0XHRcdHRoaXMuZG9jLmNyZWF0ZVN0eWxlKHRoaXMudGFibGVTZWxlY3RvcisnPnRyPnRkOmZpcnN0LWNoaWxkJykuYm9yZGVyUmlnaHQ9Y3NzLy8wMDEyXHJcblx0XHR9XHJcblx0XHRcclxuXHRcdGlmKHguaW5zaWRlSCl7XHJcblx0XHRcdHZhciBjc3M9dGhpcy5fYm9yZGVyKHguaW5zaWRlSClcclxuXHRcdFx0dmFyIHN0eWxlPXRoaXMuZG9jLmNyZWF0ZVN0eWxlKHRoaXMudGFibGVTZWxlY3RvcisnPnRyOm5vdCg6Zmlyc3Qtb2YtdHlwZSk6bm90KDpsYXN0LW9mLXR5cGUpPnRkJykvLzAwMjJcclxuXHRcdFx0c3R5bGUuYm9yZGVyVG9wPXN0eWxlLmJvcmRlckJvdHRvbT1jc3NcclxuXHRcdFx0dGhpcy5kb2MuY3JlYXRlU3R5bGUodGhpcy50YWJsZVNlbGVjdG9yKyc+dHI6bGFzdC1vZi10eXBlPnRkJykuYm9yZGVyVG9wPWNzcy8vMDAxMlxyXG5cdFx0XHR0aGlzLmRvYy5jcmVhdGVTdHlsZSh0aGlzLnRhYmxlU2VsZWN0b3IrJz50cjpmaXJzdC1vZi10eXBlPnRkJykuYm9yZGVyQm90dG9tPWNzcy8vMDAxMlxyXG5cdFx0fVxyXG5cdH1cclxuXHR0YmxDZWxsTWFyKHgpe1xyXG5cdFx0Zm9yKHZhciBpIGluIHgpXHJcblx0XHRcdHRoaXMuZG9jLmNyZWF0ZVN0eWxlKHRoaXMudGFibGVTZWxlY3RvcisnPnRyPnRkJylbJ3BhZGRpbmcnK3RoaXMudXBwZXJGaXJzdChpKV09KHhbaV08MSAmJiB4W2ldPjAgPyAxIDogeFtpXSkrJ3B4Jy8vMDAwMlxyXG5cdH1cclxuXHR0YmxJbmQoeCl7XHJcblx0XHR4ICYmICh0aGlzLnN0eWxlLm1hcmdpbkxlZnQ9eCsncHgnKVxyXG5cdH1cclxuXHR0YmxXKHgpe1xyXG5cdFx0eCAmJiB4IT0nYXV0bycgJiYgKHRoaXMuc3R5bGUud2lkdGg9eClcclxuXHR9XHJcbn1cclxuXHRcdFxyXG5cclxuVGFibGUuUm93UHJvcGVydGllcz1jbGFzcyBSb3dQcm9wZXJ0aWVzIGV4dGVuZHMgU3R5bGUuUHJvcGVydGllc3tcclxuXHRjb25zdHJ1Y3RvcihzdHlsZSxwYXJlbnQpe1xyXG5cdFx0c3VwZXIoLi4uYXJndW1lbnRzKVxyXG5cdFx0dGhpcy5wYXJlbnQ9cGFyZW50XHJcblx0XHR0aGlzLmRvYz1wYXJlbnQuZG9jXHJcblx0fVxyXG59XHJcblxyXG5UYWJsZS5DZWxsUHJvcGVydGllcz1jbGFzcyBDZWxsUHJvcGVydGllcyBleHRlbmRzIFN0eWxlLlByb3BlcnRpZXN7XHJcblx0Y29uc3RydWN0b3Ioc3R5bGUscGFyZW50KXtcclxuXHRcdHN1cGVyKC4uLmFyZ3VtZW50cylcclxuXHRcdHRoaXMucGFyZW50PXBhcmVudFxyXG5cdFx0dGhpcy5kb2M9cGFyZW50LmRvY1xyXG5cdH1cclxuXHR0Y0JvcmRlcnMoeCl7XHJcblx0XHR2YXIgdGFibGVTZWxlY3Rvcj10aGlzLnBhcmVudC5nZXRUYWJsZVNlbGVjdG9yKCksIHNlbGVjdG9yPXRoaXMucGFyZW50LmdldFByaW9yaXRpemVkU2VsZWN0b3IoKVxyXG5cdFx0c3dpdGNoKHRoaXMucGFyZW50LnRhcmdldCl7XHJcblx0XHRcdGNhc2UgJ2ZpcnN0Um93JzpcclxuXHRcdFx0Y2FzZSAnbGFzdFJvdyc6XHJcblx0XHRcdGNhc2UgJ2JhbmQxSG9yeic6XHJcblx0XHRcdGNhc2UgJ2JhbmQySG9yeic6XHJcblx0XHRcdFx0dmFyIHN0eWxlO1xyXG5cdFx0XHRcdHgubGVmdCAmJiAodGhpcy5kb2MuY3JlYXRlU3R5bGUodGFibGVTZWxlY3RvcisnPi4nK3NlbGVjdG9yKyc+dGQ6Zmlyc3QtY2hpbGQnKS5ib3JkZXJMZWZ0PXRoaXMuX2JvcmRlcih4LmxlZnQpKTsvLzAwMjFcclxuXHRcdFx0XHR4LnJpZ2h0ICYmICh0aGlzLmRvYy5jcmVhdGVTdHlsZSh0YWJsZVNlbGVjdG9yKyc+Licrc2VsZWN0b3IrJz50ZDpsYXN0LWNoaWxkJykuYm9yZGVyUmlnaHQ9dGhpcy5fYm9yZGVyKHgucmlnaHQpKTsvLzAwMjFcclxuXHRcdFx0XHR4LnRvcCAmJiAodGhpcy5kb2MuY3JlYXRlU3R5bGUodGFibGVTZWxlY3RvcisnPi4nK3NlbGVjdG9yKyc+dGQnKS5ib3JkZXJUb3A9dGhpcy5fYm9yZGVyKHgudG9wKSk7Ly8wMDExXHJcblx0XHRcdFx0eC5ib3R0b20gJiYgKHRoaXMuZG9jLmNyZWF0ZVN0eWxlKHRhYmxlU2VsZWN0b3IrJz4uJytzZWxlY3RvcisnPnRkJykuYm9yZGVyQm90dG9tPXRoaXMuX2JvcmRlcih4LmJvdHRvbSkpOy8vLy8wMDExXHJcblx0XHRcdFx0eC5pbnNpZGVWICYmICgoc3R5bGU9dGhpcy5kb2MuY3JlYXRlU3R5bGUodGFibGVTZWxlY3RvcisnPi4nK3NlbGVjdG9yKyc+dGQ6bm90KDpmaXJzdC1jaGlsZCk6bm90KDpsYXN0LWNoaWxkKScpKS5ib3JkZXJSaWdodD1zdHlsZS5ib3JkZXJMZWZ0PXRoaXMuX2JvcmRlcih4Lmluc2lkZVYpKTsvLzAwMzFcclxuXHRcdFx0XHRicmVha1xyXG5cdFx0XHRjYXNlICdmaXJzdENvbCc6XHJcblx0XHRcdGNhc2UgJ2xhc3RDb2wnOlxyXG5cdFx0XHRjYXNlICdiYW5kMlZlcnQnOlxyXG5cdFx0XHRjYXNlICdiYW5kMVZlcnQnOlxyXG5cdFx0XHRcdHgudG9wICYmICh0aGlzLmRvYy5jcmVhdGVTdHlsZSh0YWJsZVNlbGVjdG9yKyc+dHI6Zmlyc3Qtb2YtdHlwZT4uJytzZWxlY3RvcikuYm9yZGVyVG9wPXRoaXMuX2JvcmRlcih4LnRvcCkpOy8vMDAyMVxyXG5cdFx0XHRcdHgubGVmdCAmJiAodGhpcy5kb2MuY3JlYXRlU3R5bGUodGFibGVTZWxlY3RvcisnPnRyOmZpcnN0LW9mLXR5cGU+Licrc2VsZWN0b3IpLmJvcmRlckxlZnQ9dGhpcy5fYm9yZGVyKHgubGVmdCkpOy8vMDAyMVxyXG5cdFx0XHRcdHgucmlnaHQgJiYgKHRoaXMuZG9jLmNyZWF0ZVN0eWxlKHRhYmxlU2VsZWN0b3IrJz50cjpmaXJzdC1vZi10eXBlPi4nK3NlbGVjdG9yKS5ib3JkZXJSaWdodD10aGlzLl9ib3JkZXIoeC5yaWdodCkpOy8vMDAyMVxyXG5cdFx0XHRcdFxyXG5cdFx0XHRcdHguYm90dG9tICYmICh0aGlzLmRvYy5jcmVhdGVTdHlsZSh0YWJsZVNlbGVjdG9yKyc+dHI6bGFzdC1vZi10eXBlPi4nK3NlbGVjdG9yKS5ib3JkZXJCb3R0b209dGhpcy5fYm9yZGVyKHguYm90dG9tKSk7Ly8wMDIxXHJcblx0XHRcdFx0eC5sZWZ0ICYmICh0aGlzLmRvYy5jcmVhdGVTdHlsZSh0YWJsZVNlbGVjdG9yKyc+dHI6bGFzdC1vZi10eXBlPi4nK3NlbGVjdG9yKS5ib3JkZXJMZWZ0PXRoaXMuX2JvcmRlcih4LmxlZnQpKTsvLzAwMjFcclxuXHRcdFx0XHR4LnJpZ2h0ICYmICh0aGlzLmRvYy5jcmVhdGVTdHlsZSh0YWJsZVNlbGVjdG9yKyc+dHI6bGFzdC1vZi10eXBlPi4nK3NlbGVjdG9yKS5ib3JkZXJSaWdodD10aGlzLl9ib3JkZXIoeC5yaWdodCkpOy8vMDAyMVxyXG5cdFx0XHRcdFxyXG5cdFx0XHRcdFxyXG5cdFx0XHRcdHgubGVmdCAmJiAodGhpcy5kb2MuY3JlYXRlU3R5bGUodGFibGVTZWxlY3RvcisnPnRyOm5vdCg6Zmlyc3Qtb2YtdHlwZSk6bm90KDpsYXN0LW9mLXR5cGUpPi4nK3NlbGVjdG9yKS5ib3JkZXJMZWZ0PXRoaXMuX2JvcmRlcih4LmxlZnQpKTsvLzAwMzFcclxuXHRcdFx0XHR4LnJpZ2h0ICYmICh0aGlzLmRvYy5jcmVhdGVTdHlsZSh0YWJsZVNlbGVjdG9yKyc+dHI6bm90KDpmaXJzdC1vZi10eXBlKTpub3QoOmxhc3Qtb2YtdHlwZSk+Licrc2VsZWN0b3IpLmJvcmRlclJpZ2h0PXRoaXMuX2JvcmRlcih4LnJpZ2h0KSk7Ly8wMDMxXHJcblx0XHRcdFx0YnJlYWtcclxuXHRcdFx0ZGVmYXVsdDpcclxuXHRcdFx0XHR4LmxlZnQgJiYgKHRoaXMuZG9jLmNyZWF0ZVN0eWxlKHRhYmxlU2VsZWN0b3IrJz50cj4uJytzZWxlY3RvcikuYm9yZGVyTGVmdD10aGlzLl9ib3JkZXIoeC5sZWZ0KSkvLzAwMTFcclxuXHRcdFx0XHR4LnJpZ2h0ICYmICh0aGlzLmRvYy5jcmVhdGVTdHlsZSh0YWJsZVNlbGVjdG9yKyc+dHI+Licrc2VsZWN0b3IpLmJvcmRlclJpZ2h0PXRoaXMuX2JvcmRlcih4LnJpZ2h0KSkvLzAwMTFcclxuXHRcdFx0XHR4LnRvcCAmJiAodGhpcy5kb2MuY3JlYXRlU3R5bGUodGFibGVTZWxlY3RvcisnPnRyPi4nK3NlbGVjdG9yKS5ib3JkZXJUb3A9dGhpcy5fYm9yZGVyKHgudG9wKSkvLzAwMTFcclxuXHRcdFx0XHR4LmJvdHRvbSAmJiAodGhpcy5kb2MuY3JlYXRlU3R5bGUodGFibGVTZWxlY3RvcisnPnRyPi4nK3NlbGVjdG9yKS5ib3JkZXJCb3R0b209dGhpcy5fYm9yZGVyKHguYm90dG9tKSkvLzAwMTFcclxuXHRcdH1cclxuXHR9XHJcblx0c2hkKHgpe1xyXG5cdFx0dGhpcy5zdHlsZS5iYWNrZ3JvdW5kQ29sb3I9eFxyXG5cdH1cclxuXHRncmlkU3Bhbih4KXtcclxuXHRcdHRoaXMucGFyZW50LmNvbnRlbnQuc2V0QXR0cmlidXRlKCdjb2xzcGFuJyx4KVxyXG5cdH1cclxufVxyXG5cdFx0XHJcblRhYmxlLlRhYmxlU3R5bGVzPSdmaXJzdFJvdyxsYXN0Um93LGZpcnN0Q29sLGxhc3RDb2wsYmFuZDFWZXJ0LGJhbmQyVmVydCxiYW5kMUhvcnosYmFuZDJIb3J6LG5lQ2VsbCxud0NlbGwsc2VDZWxsLHN3Q2VsbCcuc3BsaXQoJywnKSJdfQ==