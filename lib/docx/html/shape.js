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

var AZ = /[A-Z]/g,
    r = function r(a) {
	return '-' + a.toLowerCase();
},
    clozed = /Z$/gi;

function asStyle(x) {
	var a = [];
	for (var i in x) {
		!$.isFunction(x[i]) && a.push(i.replace(AZ, r) + ':' + x[i]);
	}return a.join(';');
}

var Shape = function (_Converter) {
	(0, _inherits3.default)(Shape, _Converter);

	function Shape() {
		(0, _classCallCheck3.default)(this, Shape);
		return (0, _possibleConstructorReturn3.default)(this, (Shape.__proto__ || (0, _getPrototypeOf2.default)(Shape)).apply(this, arguments));
	}

	(0, _createClass3.default)(Shape, [{
		key: 'convertStyle',
		value: function convertStyle(el) {
			el.style.position = 'absolute';
			el.style.overflow = 'hidden';

			var pathStyle = { stroke: 'black', strokeWidth: 2, fillOpacity: 0 },
			    bgStyle = this.makeBackgroundStyle();
			(0, _get3.default)(Shape.prototype.__proto__ || (0, _getPrototypeOf2.default)(Shape.prototype), 'convertStyle', this).apply(this, arguments);
			var style = this.wordModel.getDirectStyle(),
			    propConverter = new this.constructor.Properties(el.style, this, pathStyle, bgStyle);
			style && style.parse([propConverter]);
			if (this.path) {
				if (el.style.background) pathStyle.fillOpacity = 0;
				var bgImage = el.style.background,
				    grad = pathStyle.grad;
				delete pathStyle.grad;

				var svg = '<svg xmlns="http://www.w3.org/2000/svg">' + (grad ? '<defs>' + grad + '</defs>' : '') + this.path + ' style="' + asStyle(pathStyle) + '" /></svg>';
				var svgImage = 'url(' + this.doc.asImageURL(svg) + ')';
				bgStyle.backgroundImage = svgImage;
				bgStyle.backgroundSize = '100% 100%';
			}
		}
	}, {
		key: 'makeBackgroundStyle',
		value: function makeBackgroundStyle() {
			//make background el to hold svg background
			var id = 'shape' + this.doc.uid();
			this.content.setAttribute('id', id);
			var style = this.doc.createStyle('#' + id + '::before');
			style.content = '""';
			style.zIndex = -1;
			style.position = 'absolute';
			style.width = '100%';
			style.height = '100%';
			style.left = 0;
			style.top = 0;
			return style;
		}
	}, {
		key: 'tag',
		get: function get() {
			return 'div';
		}
	}]);
	return Shape;
}(_converter2.default);

exports.default = Shape;


Shape.Properties = function (_Style$Properties) {
	(0, _inherits3.default)(Properties, _Style$Properties);

	function Properties(style, parent, pathStyle, bgStyle) {
		(0, _classCallCheck3.default)(this, Properties);

		var _this2 = (0, _possibleConstructorReturn3.default)(this, (Properties.__proto__ || (0, _getPrototypeOf2.default)(Properties)).apply(this, arguments));

		_this2.pathStyle = pathStyle;
		_this2.bgStyle = bgStyle;
		return _this2;
	}

	(0, _createClass3.default)(Properties, [{
		key: 'xfrm',
		value: function xfrm(x) {
			this.style.width = x.width + 'px';
			this.style.height = x.height + 'px';
			x.x && (this.style.left = x.x + 'px');
			x.y && (this.style.top = x.y + 'px');

			x.rotation && this.styless('transform', 'rotate(' + x.rotation + 'deg)');

			this.world = x;
		}
	}, {
		key: 'ln',
		value: function ln(x) {
			x.color && (this.pathStyle.stroke = x.color);
			x.width != undefined && (this.pathStyle.strokeWidth = x.width + 'px');

			switch (x.cap) {
				case 'rnd':
					this.pathStyle.strokeLinecap = 'round';
					break;
				default:

			}

			if (x.dash) {
				switch (this.lineStyle(x.dash)) {
					case 'dotted':
						this.pathStyle.strokeDasharray = "5,5";
						break;
						break;
					case 'dashed':
						this.pathStyle.strokeDasharray = "10,10";
						break;
				}
			}
		}
	}, {
		key: 'solidFill',
		value: function solidFill(x) {
			this.pathStyle.fill = x;
			this.pathStyle.fillOpacity = 1;
		}
	}, {
		key: 'gradFill',
		value: function gradFill(x) {
			if (this.style.backgroundImage) return;

			var grad = [];
			switch (x.path) {
				case 'linear':
					grad.push('<linearGradient id="grad"');
					switch (x.angel) {
						case 0:
							grad.push('x1="0%" y1="0%" x2="100%" y2="0%">');
							break;
						case 90:
							grad.push('x1="0%" y1="0%" x2="0%" y2="100%">');
							break;
						case 180:
							grad.push('x1="100%" y1="0%" x2="0%" y2="0%">');
							break;
						case 270:
							grad.push('x1="0%" y1="100%" x2="0%" y2="0%">');
							break;
					}
					grad.push('</linearGradient>');
					break;
				case 'circle':
					grad.push('<radialGradient  id="grad"');
					grad.push('cx="50%" cy="50%" r="50%" fx="50%" fy="50%">');
					grad.push('</radialGradient>');
					break;
			}
			var end = grad.pop();
			for (var i = 0, len = x.stops.length, a; i < len; i++) {
				grad.push('<stop offset="' + (a = x.stops[i]).position + '%" style="stop-opacity:1;stop-color:' + a.color + '"/>');
			}grad.push(end);

			this.pathStyle.grad = grad.join(' ');
			this.pathStyle.fill = 'url(#grad)';
			this.pathStyle.fillOpacity = 1;
		}
	}, {
		key: 'blipFill',
		value: function blipFill(x) {
			this.style.background = 'url(' + this.doc.asImageURL(x) + ')';
			this.style.backgroundSize = '100% 100%';
			this.noFill();
		}
	}, {
		key: 'noFill',
		value: function noFill(x) {
			this.pathStyle.fillOpacity = 0;
		}
	}, {
		key: 'lnRef',
		value: function lnRef(x) {
			this.ln(x);
		}
	}, {
		key: 'fillRef',
		value: function fillRef(x) {
			if (this.style.backgroundImage) return;

			if (typeof x.path != 'undefined') return this.gradFill(x);

			if (typeof x == 'string') this.pathStyle.fill = x;else if (typeof x.color != 'undefined') this.pathStyle.fill = x.color;else return;
			this.pathStyle.fillOpacity = 1;
		}
	}, {
		key: 'fontRef',
		value: function fontRef(x) {
			x.color && (this.style.color = x.color);
			x.family && (this.style.fontFamily = x.family);
		}
	}, {
		key: 'path',
		value: function path(x, t) {
			switch (x.shape) {
				case 'line':
					this.parent.path = '<line x1="0" y1="0" x2="' + this.world.width + 'pt" y2="' + this.world.height + 'pt"';
					break;
				case 'rect':
					this.parent.path = '<rect width="' + this.world.width + 'pt" height="' + this.world.height + 'pt"';
					break;
				case 'roundRect':
					this.parent.path = '<rect rx="' + (t = Math.min(this.world.width, this.world.height) / 12) + 'pt" ry="' + t + 'pt" width="' + this.world.width + 'pt" height="' + this.world.height + 'pt"';
					break;
				case 'ellipse':
					this.parent.path = '<ellipse cx="' + this.world.width / 2 + 'pt" cy="' + this.world.height / 2 + 'pt" rx="' + this.world.width / 2 + 'pt" ry="' + this.world.height / 2 + 'pt"';
					break;
				case 'path':
					this.parent.path = '<path d="' + x.path + '"';
					if (!clozed.test(x.path)) this.noFill();
					break;
			}
		}
	}, {
		key: 'spAutoFit',
		value: function spAutoFit() {
			this.style.height = 'auto';
		}
	}, {
		key: 'lIns',
		value: function lIns(x) {
			this.style.paddingLeft = x + 'px';
		}
	}, {
		key: 'tIns',
		value: function tIns(x) {
			this.style.paddingTop = x + 'px';
		}
	}, {
		key: 'rIns',
		value: function rIns(x) {
			this.style.paddingRight = x + 'px';
		}
	}, {
		key: 'bIns',
		value: function bIns(x) {
			this.style.paddingBottom = x + 'px';
		}
	}, {
		key: 'anchor',
		value: function anchor(x) {
			this.style.display = 'table-cell';
			this.style.verticalAlign = x;
		}
	}, {
		key: 'vert',
		value: function vert(x) {
			this.style.height = this.world.width + 'px';
			this.style.width = this.world.height + 'px';
			var delta = (this.world.width - this.world.height) / 2;

			this.bgStyle.height = this.world.height + 'px';
			this.bgStyle.width = this.world.width + 'px';
			this.styless('transform', 'translate(-' + delta + 'pt,' + delta + 'pt) rotate(-' + x + 'deg) ', this.bgStyle);

			this.styless('transform', 'translate(' + delta + 'pt,-' + delta + 'pt) rotate(' + (x + this.world.rotation || 0) + 'deg)');
		}
	}]);
	return Properties;
}(_converter4.default.Properties);
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9kb2N4L2h0bWwvc2hhcGUuanMiXSwibmFtZXMiOlsiQVoiLCJyIiwiYSIsInRvTG93ZXJDYXNlIiwiY2xvemVkIiwiYXNTdHlsZSIsIngiLCJpIiwiJCIsImlzRnVuY3Rpb24iLCJwdXNoIiwicmVwbGFjZSIsImpvaW4iLCJTaGFwZSIsImVsIiwic3R5bGUiLCJwb3NpdGlvbiIsIm92ZXJmbG93IiwicGF0aFN0eWxlIiwic3Ryb2tlIiwic3Ryb2tlV2lkdGgiLCJmaWxsT3BhY2l0eSIsImJnU3R5bGUiLCJtYWtlQmFja2dyb3VuZFN0eWxlIiwiYXJndW1lbnRzIiwid29yZE1vZGVsIiwiZ2V0RGlyZWN0U3R5bGUiLCJwcm9wQ29udmVydGVyIiwiY29uc3RydWN0b3IiLCJQcm9wZXJ0aWVzIiwicGFyc2UiLCJwYXRoIiwiYmFja2dyb3VuZCIsImJnSW1hZ2UiLCJncmFkIiwic3ZnIiwic3ZnSW1hZ2UiLCJkb2MiLCJhc0ltYWdlVVJMIiwiYmFja2dyb3VuZEltYWdlIiwiYmFja2dyb3VuZFNpemUiLCJpZCIsInVpZCIsImNvbnRlbnQiLCJzZXRBdHRyaWJ1dGUiLCJjcmVhdGVTdHlsZSIsInpJbmRleCIsIndpZHRoIiwiaGVpZ2h0IiwibGVmdCIsInRvcCIsIkNvbnZlcnRlciIsInBhcmVudCIsInkiLCJyb3RhdGlvbiIsInN0eWxlc3MiLCJ3b3JsZCIsImNvbG9yIiwidW5kZWZpbmVkIiwiY2FwIiwic3Ryb2tlTGluZWNhcCIsImRhc2giLCJsaW5lU3R5bGUiLCJzdHJva2VEYXNoYXJyYXkiLCJmaWxsIiwiYW5nZWwiLCJlbmQiLCJwb3AiLCJsZW4iLCJzdG9wcyIsImxlbmd0aCIsIm5vRmlsbCIsImxuIiwiZ3JhZEZpbGwiLCJmYW1pbHkiLCJmb250RmFtaWx5IiwidCIsInNoYXBlIiwiTWF0aCIsIm1pbiIsInRlc3QiLCJwYWRkaW5nTGVmdCIsInBhZGRpbmdUb3AiLCJwYWRkaW5nUmlnaHQiLCJwYWRkaW5nQm90dG9tIiwiZGlz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bUIsTUFBbkIsR0FBMEJBLEtBQTFCLEdBQWdDLGFBQWhDLElBQStDakYsSUFBRSxLQUFLa0QsS0FBTCxDQUFXRixRQUFiLElBQXVCLENBQXRFLElBQXlFLE1BQWxHO0FBQ0E7QUFwS0Y7QUFBQTtBQUFBLEVBQTBDa0Msb0JBQU0zRCxVQUFoRCIsImZpbGUiOiJzaGFwZS5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBDb252ZXJ0ZXIgZnJvbSAnLi9jb252ZXJ0ZXInXHJcbmltcG9ydCBTdHlsZSBmcm9tICcuL3N0eWxlL2NvbnZlcnRlcidcclxuXHJcbnZhciBBWj0vW0EtWl0vZywgXHJcblx0cj1mdW5jdGlvbihhKXtyZXR1cm4gJy0nK2EudG9Mb3dlckNhc2UoKX0sXHJcblx0Y2xvemVkPS9aJC9naTtcclxuXHRcclxuZnVuY3Rpb24gYXNTdHlsZSh4KXtcclxuXHR2YXIgYT1bXVxyXG5cdGZvcih2YXIgaSBpbiB4KVxyXG5cdFx0ISQuaXNGdW5jdGlvbih4W2ldKSAmJiBhLnB1c2goaS5yZXBsYWNlKEFaLHIpKyc6Jyt4W2ldKVxyXG5cdHJldHVybiBhLmpvaW4oJzsnKVxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBTaGFwZSBleHRlbmRzIENvbnZlcnRlcntcclxuXHRnZXQgdGFnKCl7cmV0dXJuICdkaXYnfVxyXG5cdFxyXG5cdGNvbnZlcnRTdHlsZShlbCl7XHJcblx0XHRlbC5zdHlsZS5wb3NpdGlvbj0nYWJzb2x1dGUnXHJcblx0XHRlbC5zdHlsZS5vdmVyZmxvdz0naGlkZGVuJ1xyXG5cclxuXHRcdHZhciBwYXRoU3R5bGU9e3N0cm9rZTonYmxhY2snLCBzdHJva2VXaWR0aDoyLCBmaWxsT3BhY2l0eTowfSxcclxuXHRcdFx0YmdTdHlsZT10aGlzLm1ha2VCYWNrZ3JvdW5kU3R5bGUoKTtcclxuXHRcdHN1cGVyLmNvbnZlcnRTdHlsZSguLi5hcmd1bWVudHMpXHJcblx0XHR2YXIgc3R5bGU9dGhpcy53b3JkTW9kZWwuZ2V0RGlyZWN0U3R5bGUoKSxcclxuXHRcdFx0cHJvcENvbnZlcnRlcj1uZXcgdGhpcy5jb25zdHJ1Y3Rvci5Qcm9wZXJ0aWVzKGVsLnN0eWxlLHRoaXMsIHBhdGhTdHlsZSwgYmdTdHlsZSk7XHJcblx0XHRzdHlsZSAmJiBzdHlsZS5wYXJzZShbcHJvcENvbnZlcnRlcl0pXHJcblx0XHRpZih0aGlzLnBhdGgpe1xyXG5cdFx0XHRpZihlbC5zdHlsZS5iYWNrZ3JvdW5kKVxyXG5cdFx0XHRcdHBhdGhTdHlsZS5maWxsT3BhY2l0eT0wXHJcblx0XHRcdHZhciBiZ0ltYWdlPWVsLnN0eWxlLmJhY2tncm91bmQsXHJcblx0XHRcdFx0Z3JhZD1wYXRoU3R5bGUuZ3JhZDtcclxuXHRcdFx0ZGVsZXRlIHBhdGhTdHlsZS5ncmFkO1x0XHRcdFx0XHJcblx0XHRcdFxyXG5cdFx0XHR2YXIgc3ZnPSc8c3ZnIHhtbG5zPVwiaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmdcIj4nXHJcblx0XHRcdFx0XHQrKGdyYWQgPyAnPGRlZnM+JytncmFkKyc8L2RlZnM+JyA6ICcnKVxyXG5cdFx0XHRcdFx0K3RoaXMucGF0aCsnIHN0eWxlPVwiJythc1N0eWxlKHBhdGhTdHlsZSkrJ1wiIC8+PC9zdmc+JztcclxuXHRcdFx0dmFyIHN2Z0ltYWdlPSd1cmwoJyt0aGlzLmRvYy5hc0ltYWdlVVJMKHN2ZykrJyknO1xyXG5cdFx0XHRiZ1N0eWxlLmJhY2tncm91bmRJbWFnZT1zdmdJbWFnZVxyXG5cdFx0XHRiZ1N0eWxlLmJhY2tncm91bmRTaXplPScxMDAlIDEwMCUnXHJcblx0XHR9XHJcblx0fVxyXG5cdG1ha2VCYWNrZ3JvdW5kU3R5bGUoKXtcclxuXHRcdC8vbWFrZSBiYWNrZ3JvdW5kIGVsIHRvIGhvbGQgc3ZnIGJhY2tncm91bmRcclxuXHRcdHZhciBpZD0nc2hhcGUnK3RoaXMuZG9jLnVpZCgpXHJcblx0XHR0aGlzLmNvbnRlbnQuc2V0QXR0cmlidXRlKCdpZCcsaWQpXHJcblx0XHR2YXIgc3R5bGU9dGhpcy5kb2MuY3JlYXRlU3R5bGUoJyMnK2lkKyc6OmJlZm9yZScpXHJcblx0XHRzdHlsZS5jb250ZW50PSdcIlwiJ1xyXG5cdFx0c3R5bGUuekluZGV4PS0xXHJcblx0XHRzdHlsZS5wb3NpdGlvbj0nYWJzb2x1dGUnXHJcblx0XHRzdHlsZS53aWR0aD0nMTAwJSdcclxuXHRcdHN0eWxlLmhlaWdodD0nMTAwJSdcclxuXHRcdHN0eWxlLmxlZnQ9MFxyXG5cdFx0c3R5bGUudG9wPTBcclxuXHRcdHJldHVybiBzdHlsZVxyXG5cdH1cclxufVxyXG5cclxuU2hhcGUuUHJvcGVydGllcz1jbGFzcyBQcm9wZXJ0aWVzIGV4dGVuZHMgU3R5bGUuUHJvcGVydGllc3tcclxuXHRjb25zdHJ1Y3RvcihzdHlsZSxwYXJlbnQsIHBhdGhTdHlsZSwgYmdTdHlsZSl7XHJcblx0XHRzdXBlciguLi5hcmd1bWVudHMpXHJcblx0XHR0aGlzLnBhdGhTdHlsZT1wYXRoU3R5bGVcclxuXHRcdHRoaXMuYmdTdHlsZT1iZ1N0eWxlXHJcblx0fVxyXG5cclxuXHR4ZnJtKHgpe1xyXG5cdFx0dGhpcy5zdHlsZS53aWR0aD14LndpZHRoKydweCdcclxuXHRcdHRoaXMuc3R5bGUuaGVpZ2h0PXguaGVpZ2h0KydweCdcclxuXHRcdHgueCAmJiAodGhpcy5zdHlsZS5sZWZ0PXgueCsncHgnKVxyXG5cdFx0eC55ICYmICh0aGlzLnN0eWxlLnRvcD14LnkrJ3B4JylcclxuXHRcdFxyXG5cdFx0eC5yb3RhdGlvbiAmJiB0aGlzLnN0eWxlc3MoJ3RyYW5zZm9ybScsJ3JvdGF0ZSgnK3gucm90YXRpb24rJ2RlZyknKVxyXG5cdFx0XHJcblx0XHR0aGlzLndvcmxkPXhcclxuXHR9XHJcblx0bG4oeCl7XHJcblx0XHR4LmNvbG9yICYmICh0aGlzLnBhdGhTdHlsZS5zdHJva2U9eC5jb2xvcik7XHJcblx0XHR4LndpZHRoIT11bmRlZmluZWQgJiYgKHRoaXMucGF0aFN0eWxlLnN0cm9rZVdpZHRoPXgud2lkdGgrJ3B4Jyk7XHJcblx0XHRcclxuXHRcdHN3aXRjaCh4LmNhcCl7XHJcblx0XHRjYXNlICdybmQnOlxyXG5cdFx0XHR0aGlzLnBhdGhTdHlsZS5zdHJva2VMaW5lY2FwPSdyb3VuZCdcclxuXHRcdFx0YnJlYWtcclxuXHRcdGRlZmF1bHQ6XHJcblx0XHRcdFxyXG5cdFx0fVxyXG5cdFx0XHJcblx0XHRpZih4LmRhc2gpe1xyXG5cdFx0XHRzd2l0Y2godGhpcy5saW5lU3R5bGUoeC5kYXNoKSl7XHJcblx0XHRcdGNhc2UgJ2RvdHRlZCc6XHJcblx0XHRcdFx0dGhpcy5wYXRoU3R5bGUuc3Ryb2tlRGFzaGFycmF5PVwiNSw1XCJcclxuXHRcdFx0XHRicmVha1xyXG5cdFx0XHRicmVha1xyXG5cdFx0XHRjYXNlICdkYXNoZWQnOlxyXG5cdFx0XHRcdHRoaXMucGF0aFN0eWxlLnN0cm9rZURhc2hhcnJheT1cIjEwLDEwXCJcclxuXHRcdFx0YnJlYWtcclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cdH1cclxuXHRzb2xpZEZpbGwoeCl7XHJcblx0XHR0aGlzLnBhdGhTdHlsZS5maWxsPXhcclxuXHRcdHRoaXMucGF0aFN0eWxlLmZpbGxPcGFjaXR5PTFcclxuXHR9XHJcblx0Z3JhZEZpbGwoeCl7XHJcblx0XHRpZih0aGlzLnN0eWxlLmJhY2tncm91bmRJbWFnZSlcclxuXHRcdFx0cmV0dXJuXHJcblx0XHRcdFxyXG5cdFx0dmFyIGdyYWQ9W11cclxuXHRcdHN3aXRjaCh4LnBhdGgpe1xyXG5cdFx0Y2FzZSAnbGluZWFyJzpcclxuXHRcdFx0Z3JhZC5wdXNoKCc8bGluZWFyR3JhZGllbnQgaWQ9XCJncmFkXCInKVxyXG5cdFx0XHRzd2l0Y2goeC5hbmdlbCl7XHJcblx0XHRcdGNhc2UgMDpcclxuXHRcdFx0XHRncmFkLnB1c2goJ3gxPVwiMCVcIiB5MT1cIjAlXCIgeDI9XCIxMDAlXCIgeTI9XCIwJVwiPicpXHJcblx0XHRcdFx0YnJlYWtcclxuXHRcdFx0Y2FzZSA5MDpcclxuXHRcdFx0XHRncmFkLnB1c2goJ3gxPVwiMCVcIiB5MT1cIjAlXCIgeDI9XCIwJVwiIHkyPVwiMTAwJVwiPicpXHJcblx0XHRcdFx0YnJlYWtcclxuXHRcdFx0Y2FzZSAxODA6XHJcblx0XHRcdFx0Z3JhZC5wdXNoKCd4MT1cIjEwMCVcIiB5MT1cIjAlXCIgeDI9XCIwJVwiIHkyPVwiMCVcIj4nKVxyXG5cdFx0XHRcdGJyZWFrXHJcblx0XHRcdGNhc2UgMjcwOlxyXG5cdFx0XHRcdGdyYWQucHVzaCgneDE9XCIwJVwiIHkxPVwiMTAwJVwiIHgyPVwiMCVcIiB5Mj1cIjAlXCI+JylcclxuXHRcdFx0XHRicmVha1xyXG5cdFx0XHR9XHJcblx0XHRcdGdyYWQucHVzaCgnPC9saW5lYXJHcmFkaWVudD4nKVxyXG5cdFx0XHRicmVha1xyXG5cdFx0Y2FzZSAnY2lyY2xlJzpcclxuXHRcdFx0Z3JhZC5wdXNoKCc8cmFkaWFsR3JhZGllbnQgIGlkPVwiZ3JhZFwiJylcclxuXHRcdFx0Z3JhZC5wdXNoKCdjeD1cIjUwJVwiIGN5PVwiNTAlXCIgcj1cIjUwJVwiIGZ4PVwiNTAlXCIgZnk9XCI1MCVcIj4nKVxyXG5cdFx0XHRncmFkLnB1c2goJzwvcmFkaWFsR3JhZGllbnQ+JylcclxuXHRcdFx0YnJlYWtcclxuXHRcdH1cclxuXHRcdHZhciBlbmQ9Z3JhZC5wb3AoKVxyXG5cdFx0Zm9yKHZhciBpPTAsbGVuPXguc3RvcHMubGVuZ3RoLGE7aTxsZW47aSsrKVxyXG5cdFx0XHRncmFkLnB1c2goJzxzdG9wIG9mZnNldD1cIicrKGE9eC5zdG9wc1tpXSkucG9zaXRpb24rJyVcIiBzdHlsZT1cInN0b3Atb3BhY2l0eToxO3N0b3AtY29sb3I6JythLmNvbG9yKydcIi8+JylcclxuXHRcdGdyYWQucHVzaChlbmQpXHJcblx0XHRcclxuXHRcdHRoaXMucGF0aFN0eWxlLmdyYWQ9Z3JhZC5qb2luKCcgJylcclxuXHRcdHRoaXMucGF0aFN0eWxlLmZpbGw9J3VybCgjZ3JhZCknXHJcblx0XHR0aGlzLnBhdGhTdHlsZS5maWxsT3BhY2l0eT0xXHJcblx0fVxyXG5cdGJsaXBGaWxsKHgpe1xyXG5cdFx0dGhpcy5zdHlsZS5iYWNrZ3JvdW5kPSd1cmwoJyt0aGlzLmRvYy5hc0ltYWdlVVJMKHgpKycpJ1xyXG5cdFx0dGhpcy5zdHlsZS5iYWNrZ3JvdW5kU2l6ZT0nMTAwJSAxMDAlJ1xyXG5cdFx0dGhpcy5ub0ZpbGwoKVxyXG5cdH1cclxuXHRub0ZpbGwoeCl7XHJcblx0XHR0aGlzLnBhdGhTdHlsZS5maWxsT3BhY2l0eT0wXHJcblx0fVxyXG5cdGxuUmVmKHgpe1xyXG5cdFx0dGhpcy5sbih4KVxyXG5cdH1cclxuXHRmaWxsUmVmKHgpe1xyXG5cdFx0aWYodGhpcy5zdHlsZS5iYWNrZ3JvdW5kSW1hZ2UpXHJcblx0XHRcdHJldHVyblxyXG5cdFx0XHJcblx0XHRpZih0eXBlb2YoeC5wYXRoKSE9J3VuZGVmaW5lZCcpXHJcblx0XHRcdHJldHVybiB0aGlzLmdyYWRGaWxsKHgpO1xyXG5cdFx0XHRcclxuXHRcdGlmKHR5cGVvZih4KT09J3N0cmluZycpXHJcblx0XHRcdHRoaXMucGF0aFN0eWxlLmZpbGw9eFxyXG5cdFx0ZWxzZSBpZih0eXBlb2YoeC5jb2xvcikhPSd1bmRlZmluZWQnKVxyXG5cdFx0XHR0aGlzLnBhdGhTdHlsZS5maWxsPXguY29sb3JcclxuXHRcdGVsc2VcclxuXHRcdFx0cmV0dXJuO1xyXG5cdFx0dGhpcy5wYXRoU3R5bGUuZmlsbE9wYWNpdHk9MVxyXG5cdH1cclxuXHRmb250UmVmKHgpe1xyXG5cdFx0eC5jb2xvciAmJiAodGhpcy5zdHlsZS5jb2xvcj14LmNvbG9yKTtcclxuXHRcdHguZmFtaWx5ICYmICh0aGlzLnN0eWxlLmZvbnRGYW1pbHk9eC5mYW1pbHkpO1xyXG5cdH1cclxuXHRwYXRoKHgsIHQpe1xyXG5cdFx0c3dpdGNoKHguc2hhcGUpe1xyXG5cdFx0Y2FzZSAnbGluZSc6XHJcblx0XHRcdHRoaXMucGFyZW50LnBhdGg9JzxsaW5lIHgxPVwiMFwiIHkxPVwiMFwiIHgyPVwiJyt0aGlzLndvcmxkLndpZHRoKydwdFwiIHkyPVwiJyt0aGlzLndvcmxkLmhlaWdodCsncHRcIidcclxuXHRcdFx0YnJlYWtcclxuXHRcdGNhc2UgJ3JlY3QnOlxyXG5cdFx0XHR0aGlzLnBhcmVudC5wYXRoPSc8cmVjdCB3aWR0aD1cIicrdGhpcy53b3JsZC53aWR0aCsncHRcIiBoZWlnaHQ9XCInK3RoaXMud29ybGQuaGVpZ2h0KydwdFwiJ1xyXG5cdFx0XHRicmVhaztcdFxyXG5cdFx0Y2FzZSAncm91bmRSZWN0JzpcclxuXHRcdFx0dGhpcy5wYXJlbnQucGF0aD0nPHJlY3Qgcng9XCInKyh0PU1hdGgubWluKHRoaXMud29ybGQud2lkdGgsIHRoaXMud29ybGQuaGVpZ2h0KS8xMikrJ3B0XCIgcnk9XCInK3QrJ3B0XCIgd2lkdGg9XCInK3RoaXMud29ybGQud2lkdGgrJ3B0XCIgaGVpZ2h0PVwiJyt0aGlzLndvcmxkLmhlaWdodCsncHRcIidcclxuXHRcdFx0YnJlYWs7XHJcblx0XHRjYXNlICdlbGxpcHNlJzpcclxuXHRcdFx0dGhpcy5wYXJlbnQucGF0aD0nPGVsbGlwc2UgY3g9XCInK3RoaXMud29ybGQud2lkdGgvMisncHRcIiBjeT1cIicrdGhpcy53b3JsZC5oZWlnaHQvMisncHRcIiByeD1cIicrdGhpcy53b3JsZC53aWR0aC8yKydwdFwiIHJ5PVwiJyt0aGlzLndvcmxkLmhlaWdodC8yKydwdFwiJ1xyXG5cdFx0XHRicmVha1xyXG5cdFx0Y2FzZSAncGF0aCc6XHJcblx0XHRcdHRoaXMucGFyZW50LnBhdGg9JzxwYXRoIGQ9XCInK3gucGF0aCsnXCInXHJcblx0XHRcdGlmKCFjbG96ZWQudGVzdCh4LnBhdGgpKVxyXG5cdFx0XHRcdHRoaXMubm9GaWxsKClcclxuXHRcdFx0YnJlYWtcclxuXHRcdH1cclxuXHR9XHJcblx0c3BBdXRvRml0KCl7XHJcblx0XHR0aGlzLnN0eWxlLmhlaWdodD0nYXV0bydcclxuXHR9XHJcblx0bElucyh4KXtcclxuXHRcdHRoaXMuc3R5bGUucGFkZGluZ0xlZnQ9eCsncHgnXHJcblx0fVxyXG5cdHRJbnMoeCl7XHJcblx0XHR0aGlzLnN0eWxlLnBhZGRpbmdUb3A9eCsncHgnXHJcblx0fVxyXG5cdHJJbnMoeCl7XHJcblx0XHR0aGlzLnN0eWxlLnBhZGRpbmdSaWdodD14KydweCdcclxuXHR9XHJcblx0Yklucyh4KXtcclxuXHRcdHRoaXMuc3R5bGUucGFkZGluZ0JvdHRvbT14KydweCdcclxuXHR9XHJcblx0YW5jaG9yKHgpe1xyXG5cdFx0dGhpcy5zdHlsZS5kaXNwbGF5PSd0YWJsZS1jZWxsJ1xyXG5cdFx0dGhpcy5zdHlsZS52ZXJ0aWNhbEFsaWduPXhcclxuXHR9XHJcblx0dmVydCh4KXtcclxuXHRcdHRoaXMuc3R5bGUuaGVpZ2h0PXRoaXMud29ybGQud2lkdGgrJ3B4J1xyXG5cdFx0dGhpcy5zdHlsZS53aWR0aD10aGlzLndvcmxkLmhlaWdodCsncHgnXHJcblx0XHR2YXIgZGVsdGE9KHRoaXMud29ybGQud2lkdGgtdGhpcy53b3JsZC5oZWlnaHQpLzJcclxuXHRcdFx0XHRcdFx0XHJcblx0XHR0aGlzLmJnU3R5bGUuaGVpZ2h0PXRoaXMud29ybGQuaGVpZ2h0KydweCdcclxuXHRcdHRoaXMuYmdTdHlsZS53aWR0aD10aGlzLndvcmxkLndpZHRoKydweCdcclxuXHRcdHRoaXMuc3R5bGVzcygndHJhbnNmb3JtJywndHJhbnNsYXRlKC0nK2RlbHRhKydwdCwnK2RlbHRhKydwdCkgcm90YXRlKC0nK3grJ2RlZykgJywgdGhpcy5iZ1N0eWxlKVxyXG5cclxuXHRcdHRoaXMuc3R5bGVzcygndHJhbnNmb3JtJywndHJhbnNsYXRlKCcrZGVsdGErJ3B0LC0nK2RlbHRhKydwdCkgcm90YXRlKCcrKHgrdGhpcy53b3JsZC5yb3RhdGlvbnx8MCkrJ2RlZyknKVxyXG5cdH1cclxufSJdfQ==