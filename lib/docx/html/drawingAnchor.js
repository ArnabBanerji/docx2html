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

var _drawing = require('./drawing');

var _drawing2 = _interopRequireDefault(_drawing);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var unit = /[a-zA-Z]+$/g;
function asNum(a) {
	return parseFloat(a.replace(unit, ''));
}

var Anchor = function (_Drawing) {
	(0, _inherits3.default)(Anchor, _Drawing);

	function Anchor() {
		(0, _classCallCheck3.default)(this, Anchor);
		return (0, _possibleConstructorReturn3.default)(this, (Anchor.__proto__ || (0, _getPrototypeOf2.default)(Anchor)).apply(this, arguments));
	}

	(0, _createClass3.default)(Anchor, [{
		key: 'convertStyle',
		value: function convertStyle(el) {
			el.style.display = 'inline-block';
			el.style.position = 'relative';

			(0, _get3.default)(Anchor.prototype.__proto__ || (0, _getPrototypeOf2.default)(Anchor.prototype), 'convertStyle', this).apply(this, arguments);
		}
	}, {
		key: 'tag',
		get: function get() {
			return 'div';
		}
	}]);
	return Anchor;
}(_drawing2.default);

exports.default = Anchor;


var PositionH = {
	page: function page(x) {
		var style = this.style,
		    t;
		switch (x.align) {
			case 'left':
				if ((t = this.world.width - asNum(this.doc.section.style.paddingLeft)) >= 0) style.left = 0;else style.left = -t + 'px';
				break;
			case 'center':
				style.left = (asNum(this.doc.section.style.width) - this.world.width) / 2 + 'px';
				break;
			case 'right':
				if ((t = this.world.width - asNum(this.doc.section.style.paddingRight)) >= 0) style.right = 0;else style.right = -t + 'px';
				break;
			case 'inside':
				style.left = 0;
				break;
			case 'outside':
				style.right = 0;
				break;
			default:
				style.left = x.posOffset + 'px';
				break;
		}
	},
	margin: function margin(x) {
		var sect = this.doc.section.style;
		switch (x.align) {
			case 'inside':
			case 'left':
				this.style.left = sect.paddingLeft;
				break;
			case 'center':
				this.style.left = (asNum(sect.width) - asNum(sect.paddingRight) + asNum(sect.paddingLeft) - this.world.width) / 2 + 'px';
				break;
			case 'outside':
			case 'right':
				this.style.right = sect.paddingRight;
				break;
			default:
				this.style.left = x.posOffset + asNum(sect.paddingLeft) + 'px';
				break;
		}
	},
	column: function column(x) {
		Anchor.addClass(this.parent.content, 'warning warning-positionH-column');
		PositionH.margin.call(this, x);
	},
	character: function character(x) {
		Anchor.addClass(this.parent.content, 'unsupported unsupported-positionH-character');
	},
	leftMargin: function leftMargin(x) {
		Anchor.addClass(this.parent.content, 'unsupported unsupported-positionH-leftMargin');
	},
	rightMargin: function rightMargin(x) {
		Anchor.addClass(this.parent.content, 'unsupported unsupported-positionH-rightMargin');
	},
	insideMargin: function insideMargin(x) {
		Anchor.addClass(this.parent.content, 'unsupported unsupported-positionH-insideMargin');
	},
	outsideMargin: function outsideMargin(x) {
		Anchor.addClass(this.parent.content, 'unsupported unsupported-positionH-outsideMargin');
	}
};
var PositionV = {
	page: function page(x) {
		var style = this.style,
		    sect = this.doc.section.style;
		switch (x.align) {
			case 'top':
				style.top = 0;
				break;
			case 'bottom':
				style.bottom = 0;
				break;
			case 'center':
			case 'outside':
			case 'inside':
				Anchor.addClass(this.parent.content, 'unsupported unsupported-positionV-page-' + x.align);
				break;
			default:
				style.top = x.posOffset + 'px';
				break;
		}
	},
	margin: function margin(x) {
		var style = this.style,
		    sect = this.doc.section.style;
		switch (x.align) {
			case 'top':
				style.top = sect.paddingTop;
				break;
			case 'bottom':
				style.bottom = sect.paddingBottom;
				break;
			case 'center':
			case 'outside':
			case 'inside':
				Anchor.addClass(this.parent.content, 'unsupported unsupported-positionV-margin-' + x.align);
				break;
			default:
				style.top = asNum(sect.paddingTop) + x.posOffset + 'px';
				break;
		}
	},
	line: function line(x) {
		Anchor.addClass(this.parent.content, 'unsupported unsupported-positionV-line');
	},
	topMargin: function topMargin(x) {
		Anchor.addClass(this.parent.content, 'unsupported unsupported-positionV-topMargin');
	},
	bottomMargin: function bottomMargin(x) {
		Anchor.addClass(this.parent.content, 'unsupported unsupported-positionV-bottomMargin');
	},
	insideMargin: function insideMargin(x) {
		Anchor.addClass(this.parent.content, 'unsupported unsupported-positionV-insideMargin');
	},
	outsideMargin: function outsideMargin(x) {
		Anchor.addClass(this.parent.content, 'unsupported unsupported-positionV-outsideMargin');
	},
	paragraph: function paragraph(x) {
		//only offset
		Anchor.addClass(this.parent.content, 'unsupported unsupported-positionV-paragraph');
	}
};

//only support absolute page offset

var Properties = function (_Drawing$Properties) {
	(0, _inherits3.default)(Properties, _Drawing$Properties);

	function Properties() {
		(0, _classCallCheck3.default)(this, Properties);
		return (0, _possibleConstructorReturn3.default)(this, (Properties.__proto__ || (0, _getPrototypeOf2.default)(Properties)).apply(this, arguments));
	}

	(0, _createClass3.default)(Properties, [{
		key: 'getParagraphPaddingLeft',
		value: function getParagraphPaddingLeft() {
			return '0pt';
		}
	}, {
		key: 'positionH',
		value: function positionH(x) {
			PositionH[x.relativeFrom].call(this, x);
		}
	}, {
		key: 'positionV',
		value: function positionV(x) {
			PositionV[x.relativeFrom].call(this, x);
		}
	}, {
		key: 'wrap',
		value: function wrap(x) {
			switch (x) {
				case 'tight':
				case 'through':
				case 'square':
				case 'topAndBottom':
					Anchor.addClass(this.parent.content, 'unsupported unsupported-wrap-' + x);
					break;
				default:
					this.style.position = 'absolute';
			}
		}
	}, {
		key: 'behindDoc',
		value: function behindDoc(x) {
			this.style.zIndex = -1;
		}
	}]);
	return Properties;
}(_drawing2.default.Properties);

Anchor.Properties = Properties;
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9kb2N4L2h0bWwvZHJhd2luZ0FuY2hvci5qcyJdLCJuYW1lcyI6WyJ1bml0IiwiYXNOdW0iLCJhIiwicGFyc2VGbG9hdCIsInJlcGxhY2UiLCJBbmNob3IiLCJlbCIsInN0eWxlIiwiZGlzcGxheSIsInBvc2l0aW9uIiwiYXJndW1lbnRzIiwiRHJhd2luZyIsIlBvc2l0aW9uSCIsInBhZ2UiLCJ4IiwidCIsImFsaWduIiwid29ybGQiLCJ3aWR0aCIsImRvYyIsInNlY3Rpb24iLCJwYWRkaW5nTGVmdCIsImxlZnQiLCJwYWRkaW5nUmlnaHQiLCJyaWdodCIsInBvc09mZnNldCIsIm1hcmdpbiIsInNlY3QiLCJjb2x1bW4iLCJhZGRDbGFzcyIsInBhcmVudCIsImNvbnRlbnQiLCJjYWxsIiwiY2hhcmFjdGVyIiwibGVmdE1hcmdpbiIsInJpZ2h0TWFyZ2luIiwiaW5zaWRlTWFyZ2luIiwib3V0c2lkZU1hcmdpbiIsIlBvc2l0aW9uViIsInRvcCIsImJvdHRvbSIsInBhZGRpbmdUb3AiLCJwYWRkaW5nQm90dG9tIiwibGluZSIsInRvcE1hcmdpbiIsImJvdHRvbU1hcmdpbiIsInBhcmFncmFwaCIsIlByb3BlcnRpZXMiLCJyZWxhdGl2ZUZyb20iLCJ6SW5kZXgiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBOzs7Ozs7QUFFQSxJQUFJQSxPQUFLLGFBQVQ7QUFDQSxTQUFTQyxLQUFULENBQWVDLENBQWYsRUFBaUI7QUFDaEIsUUFBT0MsV0FBV0QsRUFBRUUsT0FBRixDQUFVSixJQUFWLEVBQWUsRUFBZixDQUFYLENBQVA7QUFDQTs7SUFFb0JLLE07Ozs7Ozs7Ozs7K0JBR1BDLEUsRUFBRztBQUNmQSxNQUFHQyxLQUFILENBQVNDLE9BQVQsR0FBaUIsY0FBakI7QUFDQUYsTUFBR0MsS0FBSCxDQUFTRSxRQUFULEdBQWtCLFVBQWxCOztBQUVBLHVJQUFzQkMsU0FBdEI7QUFDQTs7O3NCQVBRO0FBQUMs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LE9BQTVCLEVBQW9DLGlEQUFwQztBQUNBLEVBckRZO0FBc0RiZSxVQXREYSxxQkFzREhoQyxDQXRERyxFQXNERDtBQUFDO0FBQ1pULFNBQU93QixRQUFQLENBQWdCLEtBQUtDLE1BQUwsQ0FBWUMsT0FBNUIsRUFBb0MsNkNBQXBDO0FBQ0E7QUF4RFksQ0FBZDs7QUEyREE7O0lBQ01nQixVOzs7Ozs7Ozs7OzRDQUNvQjtBQUN4QixVQUFPLEtBQVA7QUFDQTs7OzRCQUNTakMsQyxFQUFFO0FBQ1hGLGFBQVVFLEVBQUVrQyxZQUFaLEVBQTBCaEIsSUFBMUIsQ0FBK0IsSUFBL0IsRUFBb0NsQixDQUFwQztBQUNBOzs7NEJBQ1NBLEMsRUFBRTtBQUNYd0IsYUFBVXhCLEVBQUVrQyxZQUFaLEVBQTBCaEIsSUFBMUIsQ0FBK0IsSUFBL0IsRUFBb0NsQixDQUFwQztBQUNBOzs7dUJBQ0lBLEMsRUFBRTtBQUNOLFdBQU9BLENBQVA7QUFDQSxTQUFLLE9BQUw7QUFDQSxTQUFLLFNBQUw7QUFDQSxTQUFLLFFBQUw7QUFDQSxTQUFLLGNBQUw7QUFDQ1QsWUFBT3dCLFFBQVAsQ0FBZ0IsS0FBS0MsTUFBTCxDQUFZQyxPQUE1QixFQUFvQyxrQ0FBZ0NqQixDQUFwRTtBQUNBO0FBQ0Q7QUFDQyxVQUFLUCxLQUFMLENBQVdFLFFBQVgsR0FBb0IsVUFBcEI7QUFSRDtBQVVBOzs7NEJBQ1NLLEMsRUFBRTtBQUNYLFFBQUtQLEtBQUwsQ0FBVzBDLE1BQVgsR0FBa0IsQ0FBQyxDQUFuQjtBQUNBOzs7RUF4QnVCdEMsa0JBQVFvQyxVOztBQTJCakMxQyxPQUFPMEMsVUFBUCxHQUFrQkEsVUFBbEIiLCJmaWxlIjoiZHJhd2luZ0FuY2hvci5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBEcmF3aW5nIGZyb20gJy4vZHJhd2luZydcclxuXHJcbnZhciB1bml0PS9bYS16QS1aXSskL2dcclxuZnVuY3Rpb24gYXNOdW0oYSl7XHJcblx0cmV0dXJuIHBhcnNlRmxvYXQoYS5yZXBsYWNlKHVuaXQsJycpKVxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBBbmNob3IgZXh0ZW5kcyBEcmF3aW5ne1xyXG5cdGdldCB0YWcoKXtyZXR1cm4gJ2Rpdid9XHJcblx0XHJcblx0Y29udmVydFN0eWxlKGVsKXtcclxuXHRcdGVsLnN0eWxlLmRpc3BsYXk9J2lubGluZS1ibG9jaydcclxuXHRcdGVsLnN0eWxlLnBvc2l0aW9uPSdyZWxhdGl2ZSdcclxuXHRcdFxyXG5cdFx0c3VwZXIuY29udmVydFN0eWxlKC4uLmFyZ3VtZW50cylcclxuXHR9XHJcblxyXG59XHJcblxyXG52YXIgUG9zaXRpb25IPXtcclxuXHRwYWdlKHgpe1xyXG5cdFx0dmFyIHN0eWxlPXRoaXMuc3R5bGUsIHQ7XHJcblx0XHRzd2l0Y2goeC5hbGlnbil7XHJcblx0XHRjYXNlICdsZWZ0JzpcclxuXHRcdFx0aWYoKHQ9dGhpcy53b3JsZC53aWR0aC1hc051bSh0aGlzLmRvYy5zZWN0aW9uLnN0eWxlLnBhZGRpbmdMZWZ0KSk+PTApXHJcblx0XHRcdFx0c3R5bGUubGVmdD0wXHJcblx0XHRcdGVsc2VcclxuXHRcdFx0XHRzdHlsZS5sZWZ0PS10KydweCdcclxuXHRcdFx0YnJlYWtcclxuXHRcdGNhc2UgJ2NlbnRlcic6XHJcblx0XHRcdHN0eWxlLmxlZnQ9KGFzTnVtKHRoaXMuZG9jLnNlY3Rpb24uc3R5bGUud2lkdGgpLXRoaXMud29ybGQud2lkdGgpLzIrJ3B4J1xyXG5cdFx0XHRicmVha1xyXG5cdFx0Y2FzZSAncmlnaHQnOiBcclxuXHRcdFx0aWYoKHQ9dGhpcy53b3JsZC53aWR0aC1hc051bSh0aGlzLmRvYy5zZWN0aW9uLnN0eWxlLnBhZGRpbmdSaWdodCkpPj0wKVxyXG5cdFx0XHRcdHN0eWxlLnJpZ2h0PTBcclxuXHRcdFx0ZWxzZVxyXG5cdFx0XHRcdHN0eWxlLnJpZ2h0PS10KydweCdcclxuXHRcdFx0YnJlYWtcclxuXHRcdGNhc2UgJ2luc2lkZSc6IFxyXG5cdFx0XHRzdHlsZS5sZWZ0PTBcclxuXHRcdFx0YnJlYWtcclxuXHRcdGNhc2UgJ291dHNpZGUnOiBcclxuXHRcdFx0c3R5bGUucmlnaHQ9MFxyXG5cdFx0XHRicmVha1xyXG5cdFx0ZGVmYXVsdDpcclxuXHRcdFx0c3R5bGUubGVmdD14LnBvc09mZnNldCsncHgnXHJcblx0XHRcdGJyZWFrXHJcblx0XHR9XHJcblx0fSxcclxuXHRtYXJnaW4oeCl7XHJcblx0XHR2YXIgc2VjdD10aGlzLmRvYy5zZWN0aW9uLnN0eWxlXHJcblx0XHRzd2l0Y2goeC5hbGlnbil7XHJcblx0XHRjYXNlICdpbnNpZGUnOiBcclxuXHRcdGNhc2UgJ2xlZnQnOlxyXG5cdFx0XHR0aGlzLnN0eWxlLmxlZnQ9c2VjdC5wYWRkaW5nTGVmdFxyXG5cdFx0XHRicmVha1xyXG5cdFx0Y2FzZSAnY2VudGVyJzpcclxuXHRcdFx0dGhpcy5zdHlsZS5sZWZ0PShhc051bShzZWN0LndpZHRoKS1hc051bShzZWN0LnBhZGRpbmdSaWdodCkrYXNOdW0oc2VjdC5wYWRkaW5nTGVmdCktdGhpcy53b3JsZC53aWR0aCkvMisncHgnXHJcblx0XHRcdGJyZWFrXHJcblx0XHRjYXNlICdvdXRzaWRlJzogXHJcblx0XHRjYXNlICdyaWdodCc6IFxyXG5cdFx0XHR0aGlzLnN0eWxlLnJpZ2h0PXNlY3QucGFkZGluZ1JpZ2h0XHJcblx0XHRcdGJyZWFrXHJcblx0XHRkZWZhdWx0OlxyXG5cdFx0XHR0aGlzLnN0eWxlLmxlZnQ9KHgucG9zT2Zmc2V0K2FzTnVtKHNlY3QucGFkZGluZ0xlZnQpKSsncHgnXHJcblx0XHRcdGJyZWFrXHJcblx0XHR9XHJcblx0fSxcclxuXHRjb2x1bW4oeCl7XHJcblx0XHRBbmNob3IuYWRkQ2xhc3ModGhpcy5wYXJlbnQuY29udGVudCwnd2FybmluZyB3YXJuaW5nLXBvc2l0aW9uSC1jb2x1bW4nKVxyXG5cdFx0UG9zaXRpb25ILm1hcmdpbi5jYWxsKHRoaXMseClcclxuXHR9LFxyXG5cdGNoYXJhY3Rlcih4KXtcclxuXHRcdEFuY2hvci5hZGRDbGFzcyh0aGlzLnBhcmVudC5jb250ZW50LCd1bnN1cHBvcnRlZCB1bnN1cHBvcnRlZC1wb3NpdGlvbkgtY2hhcmFjdGVyJylcclxuXHR9LFxyXG5cdGxlZnRNYXJnaW4oeCl7XHJcblx0XHRBbmNob3IuYWRkQ2xhc3ModGhpcy5wYXJlbnQuY29udGVudCwndW5zdXBwb3J0ZWQgdW5zdXBwb3J0ZWQtcG9zaXRpb25ILWxlZnRNYXJnaW4nKVxyXG5cdH0sXHJcblx0cmlnaHRNYXJnaW4oeCl7XHJcblx0XHRBbmNob3IuYWRkQ2xhc3ModGhpcy5wYXJlbnQuY29udGVudCwndW5zdXBwb3J0ZWQgdW5zdXBwb3J0ZWQtcG9zaXRpb25ILXJpZ2h0TWFyZ2luJylcclxuXHR9LFxyXG5cdGluc2lkZU1hcmdpbih4KXtcclxuXHRcdEFuY2hvci5hZGRDbGFzcyh0aGlzLnBhcmVudC5jb250ZW50LCd1bnN1cHBvcnRlZCB1bnN1cHBvcnRlZC1wb3NpdGlvbkgtaW5zaWRlTWFyZ2luJylcclxuXHR9LFxyXG5cdG91dHNpZGVNYXJnaW4oeCl7XHJcblx0XHRBbmNob3IuYWRkQ2xhc3ModGhpcy5wYXJlbnQuY29udGVudCwndW5zdXBwb3J0ZWQgdW5zdXBwb3J0ZWQtcG9zaXRpb25ILW91dHNpZGVNYXJnaW4nKVxyXG5cdH1cclxufVxyXG52YXIgUG9zaXRpb25WPXtcclxuXHRwYWdlKHgpe1xyXG5cdFx0dmFyIHN0eWxlPXRoaXMuc3R5bGUsIHNlY3Q9dGhpcy5kb2Muc2VjdGlvbi5zdHlsZTtcclxuXHRcdHN3aXRjaCh4LmFsaWduKXtcclxuXHRcdGNhc2UgJ3RvcCc6XHJcblx0XHRcdHN0eWxlLnRvcD0wXHJcblx0XHRcdGJyZWFrXHJcblx0XHRjYXNlICdib3R0b20nOlxyXG5cdFx0XHRzdHlsZS5ib3R0b209MFxyXG5cdFx0XHRicmVha1xyXG5cdFx0Y2FzZSAnY2VudGVyJzpcclxuXHRcdGNhc2UgJ291dHNpZGUnOlxyXG5cdFx0Y2FzZSAnaW5zaWRlJzpcclxuXHRcdFx0QW5jaG9yLmFkZENsYXNzKHRoaXMucGFyZW50LmNvbnRlbnQsJ3Vuc3VwcG9ydGVkIHVuc3VwcG9ydGVkLXBvc2l0aW9uVi1wYWdlLScreC5hbGlnbilcclxuXHRcdGJyZWFrXHJcblx0XHRkZWZhdWx0OlxyXG5cdFx0XHRzdHlsZS50b3A9eC5wb3NPZmZzZXQrJ3B4J1xyXG5cdFx0YnJlYWtcclxuXHRcdH1cclxuXHR9LFxyXG5cdG1hcmdpbih4KXtcclxuXHRcdHZhciBzdHlsZT10aGlzLnN0eWxlLHNlY3Q9dGhpcy5kb2Muc2VjdGlvbi5zdHlsZVxyXG5cdFx0c3dpdGNoKHguYWxpZ24pe1xyXG5cdFx0Y2FzZSAndG9wJzpcclxuXHRcdFx0c3R5bGUudG9wPXNlY3QucGFkZGluZ1RvcFxyXG5cdFx0YnJlYWtcclxuXHRcdGNhc2UgJ2JvdHRvbSc6XHJcblx0XHRcdHN0eWxlLmJvdHRvbT1zZWN0LnBhZGRpbmdCb3R0b21cclxuXHRcdGJyZWFrXHJcblx0XHRjYXNlICdjZW50ZXInOlxyXG5cdFx0Y2FzZSAnb3V0c2lkZSc6XHJcblx0XHRjYXNlICdpbnNpZGUnOlxyXG5cdFx0XHRBbmNob3IuYWRkQ2xhc3ModGhpcy5wYXJlbnQuY29udGVudCwndW5zdXBwb3J0ZWQgdW5zdXBwb3J0ZWQtcG9zaXRpb25WLW1hcmdpbi0nK3guYWxpZ24pXHJcblx0XHRicmVha1xyXG5cdFx0ZGVmYXVsdDpcclxuXHRcdFx0c3R5bGUudG9wPWFzTnVtKHNlY3QucGFkZGluZ1RvcCkreC5wb3NPZmZzZXQrJ3B4J1xyXG5cdFx0YnJlYWtcclxuXHRcdH1cclxuXHR9LFxyXG5cdGxpbmUoeCl7XHJcblx0XHRBbmNob3IuYWRkQ2xhc3ModGhpcy5wYXJlbnQuY29udGVudCwndW5zdXBwb3J0ZWQgdW5zdXBwb3J0ZWQtcG9zaXRpb25WLWxpbmUnKVxyXG5cdH0sXHJcblx0dG9wTWFyZ2luKHgpe1xyXG5cdFx0QW5jaG9yLmFkZENsYXNzKHRoaXMucGFyZW50LmNvbnRlbnQsJ3Vuc3VwcG9ydGVkIHVuc3VwcG9ydGVkLXBvc2l0aW9uVi10b3BNYXJnaW4nKVxyXG5cdH0sXHJcblx0Ym90dG9tTWFyZ2luKHgpe1xyXG5cdFx0QW5jaG9yLmFkZENsYXNzKHRoaXMucGFyZW50LmNvbnRlbnQsJ3Vuc3VwcG9ydGVkIHVuc3VwcG9ydGVkLXBvc2l0aW9uVi1ib3R0b21NYXJnaW4nKVxyXG5cdH0sXHJcblx0aW5zaWRlTWFyZ2luKHgpe1xyXG5cdFx0QW5jaG9yLmFkZENsYXNzKHRoaXMucGFyZW50LmNvbnRlbnQsJ3Vuc3VwcG9ydGVkIHVuc3VwcG9ydGVkLXBvc2l0aW9uVi1pbnNpZGVNYXJnaW4nKVxyXG5cdH0sXHJcblx0b3V0c2lkZU1hcmdpbih4KXtcclxuXHRcdEFuY2hvci5hZGRDbGFzcyh0aGlzLnBhcmVudC5jb250ZW50LCd1bnN1cHBvcnRlZCB1bnN1cHBvcnRlZC1wb3NpdGlvblYtb3V0c2lkZU1hcmdpbicpXHJcblx0fSxcclxuXHRwYXJhZ3JhcGgoeCl7Ly9vbmx5IG9mZnNldFxyXG5cdFx0QW5jaG9yLmFkZENsYXNzKHRoaXMucGFyZW50LmNvbnRlbnQsJ3Vuc3VwcG9ydGVkIHVuc3VwcG9ydGVkLXBvc2l0aW9uVi1wYXJhZ3JhcGgnKVxyXG5cdH1cclxufVxyXG5cdFxyXG4vL29ubHkgc3VwcG9ydCBhYnNvbHV0ZSBwYWdlIG9mZnNldFxyXG5jbGFzcyBQcm9wZXJ0aWVzIGV4dGVuZHMgRHJhd2luZy5Qcm9wZXJ0aWVze1xyXG5cdGdldFBhcmFncmFwaFBhZGRpbmdMZWZ0KCl7XHJcblx0XHRyZXR1cm4gJzBwdCdcclxuXHR9XHJcblx0cG9zaXRpb25IKHgpe1xyXG5cdFx0UG9zaXRpb25IW3gucmVsYXRpdmVGcm9tXS5jYWxsKHRoaXMseClcclxuXHR9XHJcblx0cG9zaXRpb25WKHgpe1xyXG5cdFx0UG9zaXRpb25WW3gucmVsYXRpdmVGcm9tXS5jYWxsKHRoaXMseClcclxuXHR9XHJcblx0d3JhcCh4KXtcclxuXHRcdHN3aXRjaCh4KXtcclxuXHRcdGNhc2UgJ3RpZ2h0JzpcclxuXHRcdGNhc2UgJ3Rocm91Z2gnOlxyXG5cdFx0Y2FzZSAnc3F1YXJlJzpcclxuXHRcdGNhc2UgJ3RvcEFuZEJvdHRvbSc6XHJcblx0XHRcdEFuY2hvci5hZGRDbGFzcyh0aGlzLnBhcmVudC5jb250ZW50LCd1bnN1cHBvcnRlZCB1bnN1cHBvcnRlZC13cmFwLScreClcclxuXHRcdFx0YnJlYWtcclxuXHRcdGRlZmF1bHQ6XHJcblx0XHRcdHRoaXMuc3R5bGUucG9zaXRpb249J2Fic29sdXRlJ1xyXG5cdFx0fVxyXG5cdH1cclxuXHRiZWhpbmREb2MoeCl7XHJcblx0XHR0aGlzLnN0eWxlLnpJbmRleD0tMVxyXG5cdH1cclxufVxyXG5cclxuQW5jaG9yLlByb3BlcnRpZXM9UHJvcGVydGllc1xyXG4iXX0=