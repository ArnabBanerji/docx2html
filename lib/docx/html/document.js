'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _stringify = require('babel-runtime/core-js/json/stringify');

var _stringify2 = _interopRequireDefault(_stringify);

var _keys = require('babel-runtime/core-js/object/keys');

var _keys2 = _interopRequireDefault(_keys);

var _assign = require('babel-runtime/core-js/object/assign');

var _assign2 = _interopRequireDefault(_assign);

var _typeof2 = require('babel-runtime/helpers/typeof');

var _typeof3 = _interopRequireDefault(_typeof2);

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

var _jszip = require('jszip');

var _jszip2 = _interopRequireDefault(_jszip);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var createDocument, CSSStyleDeclaration;

var Document = function (_Converter) {
	(0, _inherits3.default)(Document, _Converter);

	function Document() {
		(0, _classCallCheck3.default)(this, Document);
		return (0, _possibleConstructorReturn3.default)(this, (Document.__proto__ || (0, _getPrototypeOf2.default)(Document)).apply(this, arguments));
	}

	(0, _createClass3.default)(Document, [{
		key: 'convert',
		value: function convert() {
			this.doc = this.constructor.create(this.options);
			this.content = this.doc;
			var contentStyle = this.content.style;
			contentStyle.backgroundColor = 'transparent';
			contentStyle.minHeight = '1000px';
			contentStyle.width = '100%';
			contentStyle.paddingTop = '20px';
			contentStyle.overflow = 'auto';

			var style = this.doc.createStyle('*');
			style.margin = '0';
			style.border = '0';
			style.padding = '0';
			style.boxSizing = 'border-box';

			style = this.doc.createStyle('table');
			style.width = '100%';
			style.borderCollapse = 'collapse';
			style.wordBreak = 'break-word';

			style = this.doc.createStyle('section');
			style.margin = 'auto';
			style.backgroundColor = 'white';
			style.color = 'black';
			style.position = 'relative';
			style.zIndex = 0;

			style = this.doc.createStyle('p:empty:before');
			style.content = '""';
			style.display = 'inline-block';

			style = this.doc.createStyle('ul');
			style.listStyle = "none";

			style = this.doc.createStyle('ul>li>p');
			style.position = 'relative';

			style = this.doc.createStyle('ul .marker');
			style.position = 'absolute';

			style = this.doc.createStyle('a');
			style.textDecoration = 'none';

			style = this.doc.createStyle('.unsupported');
			style.outline = "2px red solid";

			style = this.doc.createStyle('.warning');
			style.outline = "1px yellow solid";
			this.convertStyle();
		}
	}, {
		key: 'convertStyle',
		value: function convertStyle() {
			var bgStyle = this.wordModel.getBackgroundStyle();
			if (!bgStyle) return;

			var style = this.doc.createStyle('section');
			switch (typeof bgStyle === 'undefined' ? 'undefined' : (0, _typeof3.default)(bgStyle)) {
				case 'object':
					// fill
					console.warn('not support fill color on document background yet');
					break;
				default:
					style.backgroundColor = bgStyle;
					break;
			}
		}
		/**
  * opt: {
  * 	template: function(style, html, props){ return (html)},
  	extendScript: "http://a.com/a.js"
  	}
  */

	}, {
		key: 'toString',
		value: function toString(opt) {
			return this.doc.toString(opt, this.props);
		}
	}, {
		key: 'release',
		value: function release() {
			this.doc.release();
		}
	}, {
		key: 'asZip',
		value: function asZip(opt) {
			return this.doc.asZip(opt, this.props);
		}
	}, {
		key: 'download',
		value: function download(opt) {
			return this.doc.download(opt, this.props);
		}
		/**
  * opt=extend(toString.opt,{
  	saveImage: function(arrayBuffer, doc.props): promise(url) {},
  	saveHtml: function(){}
  })
  */

	}, {
		key: 'save',
		value: function save(opt) {
			return this.doc.save(opt, this.props);
		}
	}, {
		key: 'tag',
		get: function get() {
			return 'html';
		}
	}], [{
		key: 'create',
		value: function create(opt) {
			var selfConverter = this;
			return function (document) {
				var doc = function browserDoc() {
					var _uid = 0;
					var root = (0, _assign2.default)(document.createElement('div'), {
						id: "A",
						section: null,
						createElement: document.createElement.bind(document),
						createTextNode: document.createTextNode.bind(document),
						createStyleSheet: function createStyleSheet() {
							if (this.stylesheet) return this.stylesheet;
							var elStyle = this.createElement('style');
							this.body.appendChild(elStyle, null);
							return this.stylesheet = elStyle.sheet;
						},
						getStyleText: function getStyleText() {
							var styles = [];
							for (var i = 0, rules = this.stylesheet.cssRules, len = rules.length; i < len; i++) {
								styles.push(rules[i].cssText);
							}return styles.join('\r\n');
						},
						uid: function uid() {
							return this.id + _uid++;
						},
						toString: function toString(opt, props) {
							if (opt && typeof opt.template != "undefined" && $.isFunction(opt.template)) return opt.template(this.getStyleText(), this._html(), props);
							var html = ['<!doctype html>\r\n<html><head><meta charset=utf-8><meta key="generator" value="docx2html"><title>' + (props.name || '') + '</title><style>'];
							html.push(this.getStyleText());
							html.push('</style></head><body>');
							html.push(this._html());
							opt && opt.extendScript && html.push('<script src="' + opt.extendScript + '"></script>');
							html.push('</body><html>');
							return html.join('\r\n');
						},
						_html: function _html() {
							var divs = this.querySelectorAll('p>div, span>div');
							if (divs.length == 0) return this.outerHTML;

							/**
       * illegal <p> <div/> </p>
       * DOM operation directly in onload
       */
							var divcontainer = doc.createElement('div'),
							    uid = 0;
							divcontainer.id = 'divcontainer';
							divcontainer.style.display = "none";
							this.appendChild(divcontainer);
							for (var i = divs.length - 1; i > -1; i--) {
								var div = divs[i],
								    parent = div.parentNode;

								if (!div.id) div.id = '_z' + ++uid;

								if (!parent.id) parent.id = '_y' + uid;

								div.setAttribute('data-parent', parent.id);
								div.setAttribute('data-index', indexOf(div, parent.childNodes));

								divcontainer.appendChild(divs[i]);
							}

							var html = this.outerHTML + '\n\r<script>(' + this._transformer.toString() + ')();</script>';
							this._transformer();
							return html;
						},
						_transformer: function _transformer() {
							var a = document.querySelector('#divcontainer');
							for (var divs = a.childNodes, i = divs.length - 1; i > -1; i--) {
								var div = divs[i],
								    parentId = div.getAttribute('data-parent'),
								    index = parseInt(div.getAttribute('data-index')),
								    parent = document.querySelector('#' + parentId);
								parent.insertBefore(div, parent.childNodes[index]);
							}
							a.parentNode.removeChild(a);
						}
					});

					function indexOf(el, els) {
						for (var i = els.length - 1; i > 0; i--) {
							if (el == els[i]) return i;
						}return 0;
					}

					(opt && opt.container || document.body).appendChild(root);
					root.body = root;
					return root;
				}();

				return function mixin(doc) {
					var stylesheet = doc.createStyleSheet();
					var relStyles = {},
					    styles = {};

					return (0, _assign2.default)(selfConverter[$.isNode ? 'nodefy' : 'browserify'](doc, stylesheet, opt), {
						createStyle: function createStyle(selector) {
							if (styles[selector]) return styles[selector];
							var rules = stylesheet.cssRules,
							    len = rules.length;
							stylesheet.insertRule(selector.split(',').map(function (a) {
								return a.trim()[0] == '#' ? a : '#' + this.id + ' ' + a;
							}.bind(this)).join(',') + '{}', len);
							return styles[selector] = stylesheet.cssRules[len].style;
						},
						stylePath: function stylePath(a, parent) {
							if (parent) return relStyles[a] = parent;
							var paths = [a],
							    parent = a;
							while (parent = relStyles[parent]) {
								paths.unshift(parent);
							}return paths.join(' ');
						},
						release: function release() {
							delete this.section;
							this._release();
						}
					});
				}(doc);
			}($.isNode ? createDocument() : document);
		}
	}, {
		key: 'nodefy',
		value: function nodefy(doc, stylesheet, opt) {
			return (0, _assign2.default)(doc, {
				_release: function _release() {},
				asImageURL: function asImageURL(buffer) {
					if (opt && typeof opt.asImageURL != 'undefined') return opt.asImageURL(buffer);
					return "image://notsupport";
				},
				asZip: function asZip() {
					throw new Error('not support');
				},
				download: function download() {
					throw new Error('not support');
				},
				save: function save() {
					throw new Error('not support');
				}
			});
		}
	}, {
		key: 'browserify',
		value: function browserify(doc, stylesheet, opt) {
			var Proto_Blob = function (a) {
				a = URL.createObjectURL(new Blob()).split('/');
				a.pop();
				return a.join('/');
			}(),
			    Reg_Proto_Blob = new RegExp(Proto_Blob + "/([\\w\\d-]+)", "gi");

			return (0, _assign2.default)(doc, {
				asZip: function asZip(opt, props) {
					var zip = new _jszip2.default(),
					    hasImage = false;
					var f = zip.folder('images');
					(0, _keys2.default)(this.images).forEach(function (a) {
						hasImage = true;
						f.file(a.split('/').pop(), this[a]);
					}, this.images);
					zip.file('props.json', (0, _stringify2.default)(props));
					zip.file('main.html', hasImage ? this.toString(opt).replace(Proto_Blob, 'images') : this.toString());
					return zip;
				},
				download: function download(opt, props) {
					var a = document.createElement("a");
					document.body.appendChild(a);
					a.href = URL.createObjectURL(this.asZip(opt, props).generate({ type: 'blob' }));
					a.download = (props.name || "document") + '.zip';
					a.click();
					URL.revokeObjectURL(a.href);
					document.body.removeChild(a);
				},
				save: function save(opt, props) {
					var hasImage = false,
					    images = {},
					    me = this;
					return $.Deferred.when((this.images && (0, _keys2.default)(this.images) || []).map(function (a) {
						hasImage = true;
						return opt.saveImage(this[a], props).then(function (url) {
							return images[a] = url;
						});
					}, this.images)).then(function () {
						var html = me.toString(opt, props);
						if (hasImage) html = html.replace(Reg_Proto_Blob, function (a, id) {
							return images[a];
						});
						return opt.saveHtml(html, props);
					});
				},

				images: {},
				asImageURL: function asImageURL(arrayBuffer) {
					var url = URL.createObjectURL(new Blob([arrayBuffer], { type: "image/" + (typeof arrayBuffer == 'string' ? 'svg+xml' : '*') }));
					this.images[url] = arrayBuffer;
					return url;
				},
				_release: function _release() {
					(0, _keys2.default)(this.images).forEach(function (b) {
						URL.revokeObjectURL(b);
					});
					delete this.images;
				}
			});
		}
	}]);
	return Document;
}(_converter2.default);

exports.default = Document;


(function (isNode, m) {
	if (!isNode) return;

	createDocument = require(m).jsdom;
	var window = createDocument().defaultView;

	global.btoa = window.btoa;
	CSSStyleDeclaration = window.CSSStyleDeclaration;
})($.isNode, "jsdom");
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9kb2N4L2h0bWwvZG9jdW1lbnQuanMiXSwibmFtZXMiOlsiY3JlYXRlRG9jdW1lbnQiLCJDU1NTdHlsZURlY2xhcmF0aW9uIiwiRG9jdW1lbnQiLCJkb2MiLCJjb25zdHJ1Y3RvciIsImNyZWF0ZSIsIm9wdGlvbnMiLCJjb250ZW50IiwiY29udGVudFN0eWxlIiwic3R5bGUiLCJiYWNrZ3JvdW5kQ29sb3IiLCJtaW5IZWlnaHQiLCJ3aWR0aCIsInBhZGRpbmdUb3AiLCJvdmVyZmxvdyIsImNyZWF0ZVN0eWxlIiwibWFyZ2luIiwiYm9yZGVyIiwicGFkZGluZyIsImJveFNpemluZyIsImJvcmRlckNvbGxhcHNlIiwid29yZEJyZWFrIiwiY29sb3IiLCJwb3NpdGlvbiIsInpJbmRleCIsImRpc3BsYXkiLCJsaXN0U3R5bGUiLCJ0ZXh0RGVjb3JhdGlvbiIsIm91dGxpbmUiLCJjb252ZXJ0U3R5bGUiLCJiZ1N0eWxlIiwid29yZE1vZGVsIiwiZ2V0QmFja2dyb3VuZFN0eWxlIiwiY29uc29sZSIsIndhcm4iLCJvcHQiLCJ0b1N0cmluZyIsInByb3BzIiwicmVsZWFzZSIsImFzWmlwIiwiZG93bmxvYWQiLCJzYXZlIiwic2VsZkNvbnZlcnRlciIsImRvY3VtZW50IiwiYnJvd3NlckRvYyIsInVpZCIsInJvb3QiLCJjcmVhdGVFbGVtZW50IiwiaWQiLCJzZWN0aW9uIiwiYmluZCIsImNyZWF0ZVRleHROb2RlIiwiY3JlYXRlU3R5bGVTaGVldCIsInN0eWxlc2hlZXQiLCJlbFN0eWxlIiwiYm9keSIsImFwcGVuZENoaWxkIiwic2hlZXQiLCJnZXRTdHlsZVRleHQiLCJzdHlsZXMiLCJpIiwicnVsZXMiLCJjc3NSdWxlcyIsImxlbiIsImxlbmd0aCIsInB1c2giLCJjc3NUZXh0Iiwiam9pbiIsInRlbXBsYXRlIiwiJCIsImlzRnVuY3Rpb24iLCJfaHRtbCIsImh0bWwiLCJuYW1lIiwiZXh0ZW5kU2NyaXB0IiwiZGl2cyIsInF1ZXJ5U2VsZWN0b3JBbGwiLCJvdXRlckhUTUwiLCJkaXZjb250YWluZXIiLCJkaXYiLCJwYXJlbnQiLCJwYXJlbnROb2RlIiwic2V0QXR0cmlidXRlIiwiaW5kZXhPZiIsImNoaWxkTm9kZXMiLCJfdHJhbnNmb3JtZXIiLCJhIiwicXVlcnlTZWxlY3RvciIsInBhcmVudElkIiwiZ2V0QXR0cmlidXRlIiwiaW5kZXgiLCJwYXJzZUludCIsImluc2VydEJlZm9yZSIsInJlbW92ZUNoaWxkIiwiZWwiLCJlbHMiLCJjb250YWluZXIiLCJtaXhpbiIsInJlbFN0eWxlcyIsImlzTm9kZSIsInNlbGVjdG9yIiwiaW5zZXJ0UnVsZSIsInNwbGl0IiwibWFwIiwidHJpbSIsInN0eWxlUGF0aCIsInBhdGhzIiwidW5zaGlmdCIsIl9yZWxlYXNlIiwiYXNJbWFnZVVSTCIsImJ1ZmZlciIsIkVycm9yIiwiUHJvdG9fQmxvYiIsIlVSTCIsImNyZWF0ZU9iamVjdFVSTCIsIkJsb2IiLCJwb3AiLCJSZWdfUHJvdG9fQmxvYiIsIlJlZ0V4cCIsInppcCIsIkpTWmlwIiwiaGFzSW1hZ2UiLCJmIiwiZm9sZGVyIiwiaW1hZ2VzIiwiZm9yRWFjaCIsImZpbGUiLCJyZXBsYWNlIiwiaHJlZiIsImdlbmVyYXRlIiwidHlwZSIsImNsaWNrIiwicmV2b2tlT2JqZWN0VVJMIiwibWUiLCJEZWZlcnJlZCIsIndoZW4iLCJzYXZlSW1hZ2UiLCJ0aGVuIiwidXJsIiwic2F2ZUh0bWwiLCJhcnJheUJ1ZmZlciIsImIiLCJDb252ZXJ0ZXIiLCJtIiwicmVxdWlyZSIsImpzZG9tIiwid2luZG93IiwiZGVmYXVsdFZpZXciLCJnbG9iYWwiLCJidG9hIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTs7OztBQUNBOzs7Ozs7QUFFQSxJQUFJQSxjQUFKLEVBQW9CQyxtQkFBcEI7O0lBRXFCQyxROzs7Ozs7Ozs7OzRCQUdYO0FBQ1IsUUFBS0MsR0FBTCxHQUFTLEtBQUtDLFdBQUwsQ0FBaUJDLE1BQWpC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QnVGLFlBQU8sRUFuQ2lCO0FBb0N4QmYsY0FwQ3dCLHNCQW9DYitCLFdBcENhLEVBb0NEO0FBQ3RCLFNBQUlGLE1BQUl6QixJQUFJQyxlQUFKLENBQW9CLElBQUlDLElBQUosQ0FBUyxDQUFDeUIsV0FBRCxDQUFULEVBQzNCLEVBQUNWLE1BQUssWUFBVSxPQUFPVSxXQUFQLElBQXFCLFFBQXJCLEdBQWdDLFNBQWhDLEdBQTRDLEdBQXRELENBQU4sRUFEMkIsQ0FBcEIsQ0FBUjtBQUVBLFVBQUtoQixNQUFMLENBQVljLEdBQVosSUFBaUJFLFdBQWpCO0FBQ0EsWUFBT0YsR0FBUDtBQUNBLEtBekN1QjtBQTBDeEI5QixZQTFDd0Isc0JBMENkO0FBQ1QseUJBQVksS0FBS2dCLE1BQWpCLEVBQXlCQyxPQUF6QixDQUFpQyxVQUFTZ0IsQ0FBVCxFQUFXO0FBQzNDNUIsVUFBSW1CLGVBQUosQ0FBb0JTLENBQXBCO0FBQ0EsTUFGRDtBQUdBLFlBQU8sS0FBS2pCLE1BQVo7QUFDQTtBQS9DdUIsSUFBbEIsQ0FBUDtBQWlEQTs7O0VBL1NvQ2tCLG1COztrQkFBakI1SSxROzs7QUFrVHJCLENBQUMsVUFBU2lHLE1BQVQsRUFBaUI0QyxDQUFqQixFQUFtQjtBQUNuQixLQUFHLENBQUM1QyxNQUFKLEVBQVk7O0FBRVpuRyxrQkFBZWdKLFFBQVFELENBQVIsRUFBV0UsS0FBMUI7QUFDQSxLQUFJQyxTQUFPbEosaUJBQWlCbUosV0FBNUI7O0FBRUFDLFFBQU9DLElBQVAsR0FBWUgsT0FBT0csSUFBbkI7QUFDQXBKLHVCQUFvQmlKLE9BQU9qSixtQkFBM0I7QUFDQSxDQVJELEVBUUdvRSxFQUFFOEIsTUFSTCxFQVFhLE9BUmIiLCJmaWxlIjoiZG9jdW1lbnQuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgQ29udmVydGVyIGZyb20gJy4vY29udmVydGVyJ1xyXG5pbXBvcnQgSlNaaXAgZnJvbSAnanN6aXAnXHJcblxyXG52YXIgY3JlYXRlRG9jdW1lbnQsIENTU1N0eWxlRGVjbGFyYXRpb25cclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIERvY3VtZW50IGV4dGVuZHMgQ29udmVydGVye1xyXG5cdGdldCB0YWcoKXtyZXR1cm4gJ2h0bWwnfVxyXG5cclxuXHRjb252ZXJ0KCl7XHJcblx0XHR0aGlzLmRvYz10aGlzLmNvbnN0cnVjdG9yLmNyZWF0ZSh0aGlzLm9wdGlvbnMpXHJcblx0XHR0aGlzLmNvbnRlbnQ9dGhpcy5kb2NcclxuXHRcdGxldCBjb250ZW50U3R5bGU9dGhpcy5jb250ZW50LnN0eWxlXHJcblx0XHRjb250ZW50U3R5bGUuYmFja2dyb3VuZENvbG9yPSd0cmFuc3BhcmVudCdcclxuXHRcdGNvbnRlbnRTdHlsZS5taW5IZWlnaHQ9JzEwMDBweCdcclxuXHRcdGNvbnRlbnRTdHlsZS53aWR0aD0nMTAwJSdcclxuXHRcdGNvbnRlbnRTdHlsZS5wYWRkaW5nVG9wPScyMHB4J1xyXG5cdFx0Y29udGVudFN0eWxlLm92ZXJmbG93PSdhdXRvJ1xyXG5cclxuXHRcdHZhciBzdHlsZT10aGlzLmRvYy5jcmVhdGVTdHlsZSgnKicpXHJcblx0XHRzdHlsZS5tYXJnaW49JzAnXHJcblx0XHRzdHlsZS5ib3JkZXI9JzAnXHJcblx0XHRzdHlsZS5wYWRkaW5nPScwJ1xyXG5cdFx0c3R5bGUuYm94U2l6aW5nPSdib3JkZXItYm94J1xyXG5cclxuXHRcdHN0eWxlPXRoaXMuZG9jLmNyZWF0ZVN0eWxlKCd0YWJsZScpXHJcblx0XHRzdHlsZS53aWR0aD0nMTAwJSdcclxuXHRcdHN0eWxlLmJvcmRlckNvbGxhcHNlPSdjb2xsYXBzZSdcclxuXHRcdHN0eWxlLndvcmRCcmVhaz0nYnJlYWstd29yZCdcclxuXHJcblx0XHRzdHlsZT10aGlzLmRvYy5jcmVhdGVTdHlsZSgnc2VjdGlvbicpXHJcblx0XHRzdHlsZS5tYXJnaW49J2F1dG8nXHJcblx0XHRzdHlsZS5iYWNrZ3JvdW5kQ29sb3I9J3doaXRlJ1xyXG5cdFx0c3R5bGUuY29sb3I9J2JsYWNrJ1xyXG5cdFx0c3R5bGUucG9zaXRpb249J3JlbGF0aXZlJ1xyXG5cdFx0c3R5bGUuekluZGV4PTBcclxuXHJcblx0XHRzdHlsZT10aGlzLmRvYy5jcmVhdGVTdHlsZSgncDplbXB0eTpiZWZvcmUnKVxyXG5cdFx0c3R5bGUuY29udGVudD0nXCJcIidcclxuXHRcdHN0eWxlLmRpc3BsYXk9J2lubGluZS1ibG9jaydcclxuXHJcblx0XHRzdHlsZT10aGlzLmRvYy5jcmVhdGVTdHlsZSgndWwnKVxyXG5cdFx0c3R5bGUubGlzdFN0eWxlPVwibm9uZVwiXHJcblxyXG5cdFx0c3R5bGU9dGhpcy5kb2MuY3JlYXRlU3R5bGUoJ3VsPmxpPnAnKVxyXG5cdFx0c3R5bGUucG9zaXRpb249J3JlbGF0aXZlJ1xyXG5cclxuXHRcdHN0eWxlPXRoaXMuZG9jLmNyZWF0ZVN0eWxlKCd1bCAubWFya2VyJylcclxuXHRcdHN0eWxlLnBvc2l0aW9uPSdhYnNvbHV0ZSdcclxuXHJcblx0XHRzdHlsZT10aGlzLmRvYy5jcmVhdGVTdHlsZSgnYScpXHJcblx0XHRzdHlsZS50ZXh0RGVjb3JhdGlvbj0nbm9uZSdcclxuXHJcblx0XHRzdHlsZT10aGlzLmRvYy5jcmVhdGVTdHlsZSgnLnVuc3VwcG9ydGVkJylcclxuXHRcdHN0eWxlLm91dGxpbmU9XCIycHggcmVkIHNvbGlkXCJcclxuXHJcblx0XHRzdHlsZT10aGlzLmRvYy5jcmVhdGVTdHlsZSgnLndhcm5pbmcnKVxyXG5cdFx0c3R5bGUub3V0bGluZT1cIjFweCB5ZWxsb3cgc29saWRcIlxyXG5cdFx0dGhpcy5jb252ZXJ0U3R5bGUoKVxyXG5cdH1cclxuXHRcclxuXHRjb252ZXJ0U3R5bGUoKXtcclxuXHRcdHZhciBiZ1N0eWxlPXRoaXMud29yZE1vZGVsLmdldEJhY2tncm91bmRTdHlsZSgpXHJcblx0XHRpZighYmdTdHlsZSlcclxuXHRcdFx0cmV0dXJuXHJcblx0XHRcclxuXHRcdHZhciBzdHlsZT10aGlzLmRvYy5jcmVhdGVTdHlsZSgnc2VjdGlvbicpXHJcblx0XHRzd2l0Y2godHlwZW9mIGJnU3R5bGUpe1xyXG5cdFx0Y2FzZSAnb2JqZWN0JzovLyBmaWxsXHJcblx0XHRcdGNvbnNvbGUud2Fybignbm90IHN1cHBvcnQgZmlsbCBjb2xvciBvbiBkb2N1bWVudCBiYWNrZ3JvdW5kIHlldCcpXHJcblx0XHRicmVha1xyXG5cdFx0ZGVmYXVsdDpcclxuXHRcdFx0c3R5bGUuYmFja2dyb3VuZENvbG9yPWJnU3R5bGVcclxuXHRcdGJyZWFrXHJcblx0XHR9XHJcblx0fVxyXG5cdC8qKlxyXG5cdCogb3B0OiB7XHJcblx0KiBcdHRlbXBsYXRlOiBmdW5jdGlvbihzdHlsZSwgaHRtbCwgcHJvcHMpeyByZXR1cm4gKGh0bWwpfSxcclxuXHRcdGV4dGVuZFNjcmlwdDogXCJodHRwOi8vYS5jb20vYS5qc1wiXHJcblx0XHR9XHJcblx0Ki9cclxuXHR0b1N0cmluZyhvcHQpe1xyXG5cdFx0cmV0dXJuIHRoaXMuZG9jLnRvU3RyaW5nKG9wdCx0aGlzLnByb3BzKVxyXG5cdH1cclxuXHRyZWxlYXNlKCl7XHJcblx0XHR0aGlzLmRvYy5yZWxlYXNlKClcclxuXHR9XHJcblx0YXNaaXAob3B0KXtcclxuXHRcdHJldHVybiB0aGlzLmRvYy5hc1ppcChvcHQsdGhpcy5wcm9wcylcclxuXHR9XHJcblx0ZG93bmxvYWQob3B0KXtcclxuXHRcdHJldHVybiB0aGlzLmRvYy5kb3dubG9hZChvcHQsIHRoaXMucHJvcHMpXHJcblx0fVxyXG5cdC8qKlxyXG5cdCogb3B0PWV4dGVuZCh0b1N0cmluZy5vcHQse1xyXG5cdFx0c2F2ZUltYWdlOiBmdW5jdGlvbihhcnJheUJ1ZmZlciwgZG9jLnByb3BzKTogcHJvbWlzZSh1cmwpIHt9LFxyXG5cdFx0c2F2ZUh0bWw6IGZ1bmN0aW9uKCl7fVxyXG5cdH0pXHJcblx0Ki9cclxuXHRzYXZlIChvcHQpe1xyXG5cdFx0cmV0dXJuIHRoaXMuZG9jLnNhdmUob3B0LCB0aGlzLnByb3BzKVxyXG5cdH1cclxuXHJcblx0c3RhdGljIGNyZWF0ZShvcHQpe1xyXG5cdFx0dmFyIHNlbGZDb252ZXJ0ZXI9dGhpc1xyXG5cdFx0cmV0dXJuIChmdW5jdGlvbihkb2N1bWVudCl7XHJcblx0XHRcdHZhciBkb2M9KGZ1bmN0aW9uIGJyb3dzZXJEb2MoKXtcclxuXHRcdFx0XHR2YXIgdWlkPTA7XHJcblx0XHRcdFx0dmFyIHJvb3Q9T2JqZWN0LmFzc2lnbihkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKSx7XHJcblx0XHRcdFx0XHRpZCA6IFwiQVwiLFxyXG5cdFx0XHRcdFx0c2VjdGlvbjogbnVsbCxcclxuXHRcdFx0XHRcdGNyZWF0ZUVsZW1lbnQ6IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQuYmluZChkb2N1bWVudCksXHJcblx0XHRcdFx0XHRjcmVhdGVUZXh0Tm9kZTogZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUuYmluZChkb2N1bWVudCksXHJcblx0XHRcdFx0XHRjcmVhdGVTdHlsZVNoZWV0KCl7XHJcblx0XHRcdFx0XHRcdGlmKHRoaXMuc3R5bGVzaGVldClcclxuXHRcdFx0XHRcdFx0XHRyZXR1cm4gdGhpcy5zdHlsZXNoZWV0O1xyXG5cdFx0XHRcdFx0XHR2YXIgZWxTdHlsZT10aGlzLmNyZWF0ZUVsZW1lbnQoJ3N0eWxlJylcclxuXHRcdFx0XHRcdFx0dGhpcy5ib2R5LmFwcGVuZENoaWxkKGVsU3R5bGUsbnVsbCk7XHJcblx0XHRcdFx0XHRcdHJldHVybiB0aGlzLnN0eWxlc2hlZXQ9ZWxTdHlsZS5zaGVldFxyXG5cdFx0XHRcdFx0fSxcclxuXHRcdFx0XHRcdGdldFN0eWxlVGV4dCgpe1xyXG5cdFx0XHRcdFx0XHR2YXIgc3R5bGVzPVtdXHJcblx0XHRcdFx0XHRcdGZvcih2YXIgaT0wLCBydWxlcz10aGlzLnN0eWxlc2hlZXQuY3NzUnVsZXMsIGxlbj1ydWxlcy5sZW5ndGg7aTxsZW47aSsrKVxyXG5cdFx0XHRcdFx0XHRcdHN0eWxlcy5wdXNoKHJ1bGVzW2ldLmNzc1RleHQpXHJcblx0XHRcdFx0XHRcdHJldHVybiBzdHlsZXMuam9pbignXFxyXFxuJylcclxuXHRcdFx0XHRcdH0sXHJcblx0XHRcdFx0XHR1aWQoKXtcclxuXHRcdFx0XHRcdFx0cmV0dXJuIHRoaXMuaWQrKHVpZCsrKVxyXG5cdFx0XHRcdFx0fSxcclxuXHRcdFx0XHRcdHRvU3RyaW5nKG9wdCwgcHJvcHMpe1xyXG5cdFx0XHRcdFx0XHRpZihvcHQgJiYgdHlwZW9mIG9wdC50ZW1wbGF0ZSE9XCJ1bmRlZmluZWRcIiAmJiAkLmlzRnVuY3Rpb24ob3B0LnRlbXBsYXRlKSlcclxuXHRcdFx0XHRcdFx0XHRyZXR1cm4gb3B0LnRlbXBsYXRlKHRoaXMuZ2V0U3R5bGVUZXh0KCksIHRoaXMuX2h0bWwoKSwgcHJvcHMpXHJcblx0XHRcdFx0XHRcdHZhciBodG1sPVsnPCFkb2N0eXBlIGh0bWw+XFxyXFxuPGh0bWw+PGhlYWQ+PG1ldGEgY2hhcnNldD11dGYtOD48bWV0YSBrZXk9XCJnZW5lcmF0b3JcIiB2YWx1ZT1cImRvY3gyaHRtbFwiPjx0aXRsZT4nKyhwcm9wcy5uYW1lfHwnJykrJzwvdGl0bGU+PHN0eWxlPiddXHJcblx0XHRcdFx0XHRcdGh0bWwucHVzaCh0aGlzLmdldFN0eWxlVGV4dCgpKVxyXG5cdFx0XHRcdFx0XHRodG1sLnB1c2goJzwvc3R5bGU+PC9oZWFkPjxib2R5PicpXHJcblx0XHRcdFx0XHRcdGh0bWwucHVzaCh0aGlzLl9odG1sKCkpXHJcblx0XHRcdFx0XHRcdG9wdCAmJiBvcHQuZXh0ZW5kU2NyaXB0ICYmIGh0bWwucHVzaCgnPHNjcmlwdCBzcmM9XCInK29wdC5leHRlbmRTY3JpcHQrJ1wiPjwvc2NyaXB0PicpXHJcblx0XHRcdFx0XHRcdGh0bWwucHVzaCgnPC9ib2R5PjxodG1sPicpXHJcblx0XHRcdFx0XHRcdHJldHVybiBodG1sLmpvaW4oJ1xcclxcbicpXHJcblx0XHRcdFx0XHR9LFxyXG5cdFx0XHRcdFx0X2h0bWwoKXtcclxuXHRcdFx0XHRcdFx0dmFyIGRpdnM9dGhpcy5xdWVyeVNlbGVjdG9yQWxsKCdwPmRpdiwgc3Bhbj5kaXYnKVxyXG5cdFx0XHRcdFx0XHRpZihkaXZzLmxlbmd0aD09MClcclxuXHRcdFx0XHRcdFx0XHRyZXR1cm4gdGhpcy5vdXRlckhUTUxcclxuXHJcblx0XHRcdFx0XHRcdC8qKlxyXG5cdFx0XHRcdFx0XHQqIGlsbGVnYWwgPHA+IDxkaXYvPiA8L3A+XHJcblx0XHRcdFx0XHRcdCogRE9NIG9wZXJhdGlvbiBkaXJlY3RseSBpbiBvbmxvYWRcclxuXHRcdFx0XHRcdFx0Ki9cclxuXHRcdFx0XHRcdFx0dmFyIGRpdmNvbnRhaW5lcj1kb2MuY3JlYXRlRWxlbWVudCgnZGl2JyksIHVpZD0wXHJcblx0XHRcdFx0XHRcdGRpdmNvbnRhaW5lci5pZD0nZGl2Y29udGFpbmVyJ1xyXG5cdFx0XHRcdFx0XHRkaXZjb250YWluZXIuc3R5bGUuZGlzcGxheT1cIm5vbmVcIlxyXG5cdFx0XHRcdFx0XHR0aGlzLmFwcGVuZENoaWxkKGRpdmNvbnRhaW5lcilcclxuXHRcdFx0XHRcdFx0Zm9yKHZhciBpPWRpdnMubGVuZ3RoLTE7aT4tMTtpLS0pe1xyXG5cdFx0XHRcdFx0XHRcdHZhciBkaXY9ZGl2c1tpXSxcclxuXHRcdFx0XHRcdFx0XHRcdHBhcmVudD1kaXYucGFyZW50Tm9kZTtcclxuXHJcblx0XHRcdFx0XHRcdFx0aWYoIWRpdi5pZClcclxuXHRcdFx0XHRcdFx0XHRcdGRpdi5pZD0nX3onKygrK3VpZClcclxuXHJcblx0XHRcdFx0XHRcdFx0aWYoIXBhcmVudC5pZClcclxuXHRcdFx0XHRcdFx0XHRcdHBhcmVudC5pZD0nX3knK3VpZFxyXG5cclxuXHRcdFx0XHRcdFx0XHRkaXYuc2V0QXR0cmlidXRlKCdkYXRhLXBhcmVudCcscGFyZW50LmlkKVxyXG5cdFx0XHRcdFx0XHRcdGRpdi5zZXRBdHRyaWJ1dGUoJ2RhdGEtaW5kZXgnLGluZGV4T2YoZGl2LHBhcmVudC5jaGlsZE5vZGVzKSlcclxuXHJcblx0XHRcdFx0XHRcdFx0ZGl2Y29udGFpbmVyLmFwcGVuZENoaWxkKGRpdnNbaV0pXHJcblx0XHRcdFx0XHRcdH1cclxuXHJcblx0XHRcdFx0XHRcdHZhciBodG1sPXRoaXMub3V0ZXJIVE1MKydcXG5cXHI8c2NyaXB0PignK3RoaXMuX3RyYW5zZm9ybWVyLnRvU3RyaW5nKCkrJykoKTs8L3NjcmlwdD4nXHJcblx0XHRcdFx0XHRcdHRoaXMuX3RyYW5zZm9ybWVyKCk7XHJcblx0XHRcdFx0XHRcdHJldHVybiBodG1sXHJcblx0XHRcdFx0XHR9LFxyXG5cdFx0XHRcdFx0X3RyYW5zZm9ybWVyKCl7XHJcblx0XHRcdFx0XHRcdHZhciBhPWRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNkaXZjb250YWluZXInKVxyXG5cdFx0XHRcdFx0XHRmb3IodmFyIGRpdnM9YS5jaGlsZE5vZGVzLCBpPWRpdnMubGVuZ3RoLTE7aT4tMTtpLS0pe1xyXG5cdFx0XHRcdFx0XHRcdHZhciBkaXY9ZGl2c1tpXSxcclxuXHRcdFx0XHRcdFx0XHRcdHBhcmVudElkPWRpdi5nZXRBdHRyaWJ1dGUoJ2RhdGEtcGFyZW50JyksXHJcblx0XHRcdFx0XHRcdFx0XHRpbmRleD1wYXJzZUludChkaXYuZ2V0QXR0cmlidXRlKCdkYXRhLWluZGV4JykpLFxyXG5cdFx0XHRcdFx0XHRcdFx0cGFyZW50PWRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyMnK3BhcmVudElkKTtcclxuXHRcdFx0XHRcdFx0XHRwYXJlbnQuaW5zZXJ0QmVmb3JlKGRpdixwYXJlbnQuY2hpbGROb2Rlc1tpbmRleF0pXHJcblx0XHRcdFx0XHRcdH1cclxuXHRcdFx0XHRcdFx0YS5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKGEpXHJcblx0XHRcdFx0XHR9XHJcblx0XHRcdFx0fSk7XHJcblxyXG5cdFx0XHRcdGZ1bmN0aW9uIGluZGV4T2YoZWwsIGVscyl7XHJcblx0XHRcdFx0XHRmb3IodmFyIGk9ZWxzLmxlbmd0aC0xO2k+MDtpLS0pXHJcblx0XHRcdFx0XHRcdGlmKGVsPT1lbHNbaV0pXHJcblx0XHRcdFx0XHRcdFx0cmV0dXJuIGlcclxuXHRcdFx0XHRcdHJldHVybiAwXHJcblx0XHRcdFx0fVxyXG5cclxuXHRcdFx0XHQob3B0ICYmIG9wdC5jb250YWluZXIgfHwgZG9jdW1lbnQuYm9keSkuYXBwZW5kQ2hpbGQocm9vdCk7XHJcblx0XHRcdFx0cm9vdC5ib2R5PXJvb3RcclxuXHRcdFx0XHRyZXR1cm4gcm9vdFxyXG5cdFx0XHR9KSgpO1xyXG5cclxuXHRcdFx0cmV0dXJuIChmdW5jdGlvbiBtaXhpbihkb2Mpe1xyXG5cdFx0XHRcdHZhciBzdHlsZXNoZWV0PWRvYy5jcmVhdGVTdHlsZVNoZWV0KClcclxuXHRcdFx0XHR2YXIgcmVsU3R5bGVzPXt9LCBzdHlsZXM9e31cclxuXHJcblx0XHRcdFx0cmV0dXJuIE9iamVjdC5hc3NpZ24oc2VsZkNvbnZlcnRlclskLmlzTm9kZSA/ICdub2RlZnknIDogJ2Jyb3dzZXJpZnknXShkb2Msc3R5bGVzaGVldCwgb3B0KSx7XHJcblx0XHRcdFx0XHRjcmVhdGVTdHlsZShzZWxlY3Rvcil7XHJcblx0XHRcdFx0XHRcdGlmKHN0eWxlc1tzZWxlY3Rvcl0pXHJcblx0XHRcdFx0XHRcdFx0cmV0dXJuIHN0eWxlc1tzZWxlY3Rvcl1cclxuXHRcdFx0XHRcdFx0dmFyIHJ1bGVzPXN0eWxlc2hlZXQuY3NzUnVsZXMsbGVuPXJ1bGVzLmxlbmd0aFxyXG5cdFx0XHRcdFx0XHRzdHlsZXNoZWV0Lmluc2VydFJ1bGUoc2VsZWN0b3Iuc3BsaXQoJywnKS5tYXAoZnVuY3Rpb24oYSl7XHJcblx0XHRcdFx0XHRcdFx0XHRyZXR1cm4gYS50cmltKClbMF09PScjJyA/IGEgOiAnIycrdGhpcy5pZCsnICcrYVxyXG5cdFx0XHRcdFx0XHRcdH0uYmluZCh0aGlzKSkuam9pbignLCcpKyd7fScsbGVuKVxyXG5cdFx0XHRcdFx0XHRyZXR1cm4gIHN0eWxlc1tzZWxlY3Rvcl09c3R5bGVzaGVldC5jc3NSdWxlc1tsZW5dLnN0eWxlXHJcblx0XHRcdFx0XHR9LFxyXG5cdFx0XHRcdFx0c3R5bGVQYXRoKGEsIHBhcmVudCl7XHJcblx0XHRcdFx0XHRcdGlmKHBhcmVudClcclxuXHRcdFx0XHRcdFx0XHRyZXR1cm4gcmVsU3R5bGVzW2FdPXBhcmVudFxyXG5cdFx0XHRcdFx0XHR2YXIgcGF0aHM9W2FdLHBhcmVudD1hXHJcblx0XHRcdFx0XHRcdHdoaWxlKHBhcmVudD1yZWxTdHlsZXNbcGFyZW50XSlcclxuXHRcdFx0XHRcdFx0XHRwYXRocy51bnNoaWZ0KHBhcmVudClcclxuXHRcdFx0XHRcdFx0cmV0dXJuIHBhdGhzLmpvaW4oJyAnKVxyXG5cdFx0XHRcdFx0fSxcclxuXHRcdFx0XHRcdHJlbGVhc2UoKXtcclxuXHRcdFx0XHRcdFx0ZGVsZXRlIHRoaXMuc2VjdGlvblxyXG5cdFx0XHRcdFx0XHR0aGlzLl9yZWxlYXNlKClcclxuXHRcdFx0XHRcdH1cclxuXHRcdFx0XHR9KVxyXG5cdFx0XHR9KShkb2MpXHJcblx0XHR9KSgkLmlzTm9kZSA/IGNyZWF0ZURvY3VtZW50KCkgOiBkb2N1bWVudClcclxuXHR9XHJcblxyXG5cdHN0YXRpYyBub2RlZnkoZG9jLCBzdHlsZXNoZWV0LCBvcHQpe1xyXG5cdFx0cmV0dXJuIE9iamVjdC5hc3NpZ24oZG9jLHtcclxuXHRcdFx0X3JlbGVhc2UoKXtcclxuXHJcblx0XHRcdH0sXHJcblx0XHRcdGFzSW1hZ2VVUkwoYnVmZmVyKXtcclxuXHRcdFx0XHRpZihvcHQgJiYgdHlwZW9mKG9wdC5hc0ltYWdlVVJMKSE9J3VuZGVmaW5lZCcpXHJcblx0XHRcdFx0XHRyZXR1cm4gb3B0LmFzSW1hZ2VVUkwoYnVmZmVyKVxyXG5cdFx0XHRcdHJldHVybiBcImltYWdlOi8vbm90c3VwcG9ydFwiXHJcblx0XHRcdH0sXHJcblx0XHRcdGFzWmlwKCl7XHJcblx0XHRcdFx0dGhyb3cgbmV3IEVycm9yKCdub3Qgc3VwcG9ydCcpXHJcblx0XHRcdH0sXHJcblx0XHRcdGRvd25sb2FkKCl7XHJcblx0XHRcdFx0dGhyb3cgbmV3IEVycm9yKCdub3Qgc3VwcG9ydCcpXHJcblx0XHRcdH0sXHJcblx0XHRcdHNhdmUoKXtcclxuXHRcdFx0XHR0aHJvdyBuZXcgRXJyb3IoJ25vdCBzdXBwb3J0JylcclxuXHRcdFx0fVxyXG5cdFx0fSlcclxuXHR9XHJcblxyXG5cdHN0YXRpYyBicm93c2VyaWZ5KGRvYywgc3R5bGVzaGVldCwgb3B0KXtcclxuXHRcdHZhciBQcm90b19CbG9iPShmdW5jdGlvbihhKXtcclxuXHRcdFx0XHRhPVVSTC5jcmVhdGVPYmplY3RVUkwobmV3IEJsb2IoKSkuc3BsaXQoJy8nKTtcclxuXHRcdFx0XHRhLnBvcCgpO1xyXG5cdFx0XHRcdHJldHVybiBhLmpvaW4oJy8nKVxyXG5cdFx0XHR9KSgpLFxyXG5cdFx0XHRSZWdfUHJvdG9fQmxvYj1uZXcgUmVnRXhwKFByb3RvX0Jsb2IrXCIvKFtcXFxcd1xcXFxkLV0rKVwiLFwiZ2lcIik7XHJcblxyXG5cdFx0cmV0dXJuIE9iamVjdC5hc3NpZ24oZG9jLHtcclxuXHRcdFx0YXNaaXAob3B0LCBwcm9wcyl7XHJcblx0XHRcdFx0dmFyIHppcD1uZXcgSlNaaXAoKSxoYXNJbWFnZT1mYWxzZTtcclxuXHRcdFx0XHR2YXIgZj16aXAuZm9sZGVyKCdpbWFnZXMnKVxyXG5cdFx0XHRcdE9iamVjdC5rZXlzKHRoaXMuaW1hZ2VzKS5mb3JFYWNoKGZ1bmN0aW9uKGEpe1xyXG5cdFx0XHRcdFx0aGFzSW1hZ2U9dHJ1ZVxyXG5cdFx0XHRcdFx0Zi5maWxlKGEuc3BsaXQoJy8nKS5wb3AoKSx0aGlzW2FdKVxyXG5cdFx0XHRcdH0sdGhpcy5pbWFnZXMpXHJcblx0XHRcdFx0emlwLmZpbGUoJ3Byb3BzLmpzb24nLEpTT04uc3RyaW5naWZ5KHByb3BzKSk7XHJcblx0XHRcdFx0emlwLmZpbGUoJ21haW4uaHRtbCcsaGFzSW1hZ2UgPyB0aGlzLnRvU3RyaW5nKG9wdCkucmVwbGFjZShQcm90b19CbG9iLCdpbWFnZXMnKSA6IHRoaXMudG9TdHJpbmcoKSlcclxuXHRcdFx0XHRyZXR1cm4gemlwXHJcblx0XHRcdH0sXHJcblx0XHRcdGRvd25sb2FkKG9wdCwgcHJvcHMpe1xyXG5cdFx0XHRcdHZhciBhPWRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJhXCIpXHJcblx0XHRcdFx0ZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZChhKVxyXG5cdFx0XHRcdGEuaHJlZj1VUkwuY3JlYXRlT2JqZWN0VVJMKHRoaXMuYXNaaXAob3B0LHByb3BzKS5nZW5lcmF0ZSh7dHlwZTonYmxvYid9KSlcclxuXHRcdFx0XHRhLmRvd25sb2FkPShwcm9wcy5uYW1lfHxcImRvY3VtZW50XCIpKycuemlwJ1xyXG5cdFx0XHRcdGEuY2xpY2soKVxyXG5cdFx0XHRcdFVSTC5yZXZva2VPYmplY3RVUkwoYS5ocmVmKVxyXG5cdFx0XHRcdGRvY3VtZW50LmJvZHkucmVtb3ZlQ2hpbGQoYSlcclxuXHRcdFx0fSxcclxuXHRcdFx0c2F2ZShvcHQsIHByb3BzKXtcclxuXHRcdFx0XHR2YXIgaGFzSW1hZ2U9ZmFsc2UsIGltYWdlcz17fSwgbWU9dGhpcztcclxuXHRcdFx0XHRyZXR1cm4gJC5EZWZlcnJlZC53aGVuKCh0aGlzLmltYWdlcyAmJiBPYmplY3Qua2V5cyh0aGlzLmltYWdlcyl8fFtdKS5tYXAoZnVuY3Rpb24oYSl7XHJcblx0XHRcdFx0XHRoYXNJbWFnZT10cnVlXHJcblx0XHRcdFx0XHRyZXR1cm4gb3B0LnNhdmVJbWFnZSh0aGlzW2FdLHByb3BzKVxyXG5cdFx0XHRcdFx0XHQudGhlbihmdW5jdGlvbih1cmwpe3JldHVybiBpbWFnZXNbYV09dXJsfSlcclxuXHRcdFx0XHR9LHRoaXMuaW1hZ2VzKSlcclxuXHRcdFx0XHQudGhlbihmdW5jdGlvbigpe1xyXG5cdFx0XHRcdFx0dmFyIGh0bWw9bWUudG9TdHJpbmcob3B0LCBwcm9wcyk7XHJcblx0XHRcdFx0XHRpZihoYXNJbWFnZSlcclxuXHRcdFx0XHRcdFx0aHRtbD1odG1sLnJlcGxhY2UoUmVnX1Byb3RvX0Jsb2IsZnVuY3Rpb24oYSxpZCl7cmV0dXJuIGltYWdlc1thXX0pO1xyXG5cdFx0XHRcdFx0cmV0dXJuIG9wdC5zYXZlSHRtbChodG1sLCBwcm9wcylcclxuXHRcdFx0XHR9KVxyXG5cdFx0XHR9LFxyXG5cdFx0XHRpbWFnZXM6e30sXHJcblx0XHRcdGFzSW1hZ2VVUkwoYXJyYXlCdWZmZXIpe1xyXG5cdFx0XHRcdHZhciB1cmw9VVJMLmNyZWF0ZU9iamVjdFVSTChuZXcgQmxvYihbYXJyYXlCdWZmZXJdLFxyXG5cdFx0XHRcdFx0e3R5cGU6XCJpbWFnZS9cIisodHlwZW9mKGFycmF5QnVmZmVyKT09J3N0cmluZycgPyAnc3ZnK3htbCcgOiAnKicpfSkpO1xyXG5cdFx0XHRcdHRoaXMuaW1hZ2VzW3VybF09YXJyYXlCdWZmZXJcclxuXHRcdFx0XHRyZXR1cm4gdXJsXHJcblx0XHRcdH0sXHJcblx0XHRcdF9yZWxlYXNlKCl7XHJcblx0XHRcdFx0T2JqZWN0LmtleXModGhpcy5pbWFnZXMpLmZvckVhY2goZnVuY3Rpb24oYil7XHJcblx0XHRcdFx0XHRVUkwucmV2b2tlT2JqZWN0VVJMKGIpXHJcblx0XHRcdFx0fSlcclxuXHRcdFx0XHRkZWxldGUgdGhpcy5pbWFnZXNcclxuXHRcdFx0fVxyXG5cdFx0fSlcclxuXHR9XHJcbn1cclxuXHJcbihmdW5jdGlvbihpc05vZGUsIG0pe1xyXG5cdGlmKCFpc05vZGUpXHRyZXR1cm47XHJcblxyXG5cdGNyZWF0ZURvY3VtZW50PXJlcXVpcmUobSkuanNkb21cclxuXHRsZXQgd2luZG93PWNyZWF0ZURvY3VtZW50KCkuZGVmYXVsdFZpZXdcclxuXHJcblx0Z2xvYmFsLmJ0b2E9d2luZG93LmJ0b2FcclxuXHRDU1NTdHlsZURlY2xhcmF0aW9uPXdpbmRvdy5DU1NTdHlsZURlY2xhcmF0aW9uXHJcbn0pKCQuaXNOb2RlLCBcImpzZG9tXCIpXHJcbiJdfQ==