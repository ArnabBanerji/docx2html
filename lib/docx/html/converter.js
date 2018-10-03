'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _typeof2 = require('babel-runtime/helpers/typeof');

var _typeof3 = _interopRequireDefault(_typeof2);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var divContainers = 'SECTION,DIV,TD'.split(',');

var Converter = function () {
	function Converter(wModel, parentConverter) {
		(0, _classCallCheck3.default)(this, Converter);

		this.wordModel = wModel;
		this.parent = parentConverter;
		this.doc = parentConverter && parentConverter.doc;
		this.content = null;
	}

	(0, _createClass3.default)(Converter, [{
		key: 'visit',

		/**interface API: happen when just word model identified, without children appended yet*/
		value: function visit() {
			if (!this.parent || this.parent.content) return this.convert.apply(this, arguments);
		}
	}, {
		key: 'convert',
		value: function convert() {
			this.content = this.createElement();
			if (this.content) {
				this.parent.content.appendChild(this.content);
			} else this.content = this.parent && this.parent.content || null;

			this.convertStyle(this.content);
		}
	}, {
		key: 'createElement',
		value: function createElement() {
			switch ((0, _typeof3.default)(this.tag)) {
				case 'string':
					return this.doc.createElement(this.tag);
				case 'function':
					var el = this.tag();
					return this.doc.createElement(el);
				default:
					return null;
			}
		}
	}, {
		key: 'convertStyle',
		value: function convertStyle(el, a) {
			this.wordModel.getStyleId && (a = this.wordModel.getStyleId()) && this.constructor.addClass(el, this.doc.stylePath(this.constructor.asCssID(a)));
		}
	}, {
		key: '_shouldIgnore',
		value: function _shouldIgnore() {
			return false;
		}
	}, {
		key: 'release',
		value: function release() {}
	}, {
		key: 'wordType',
		get: function get() {
			return null;
		}
	}, {
		key: 'tag',
		get: function get() {
			return null;
		}
	}], [{
		key: 'asCssID',
		value: function asCssID(a) {
			return a.replace(/\s+/g, '_');
		}
	}, {
		key: 'addClass',
		value: function addClass(el, classes) {
			el.setAttribute('class', (el.getAttribute('class') || '') + ' ' + classes);
		}
	}]);
	return Converter;
}();

exports.default = Converter;
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9kb2N4L2h0bWwvY29udmVydGVyLmpzIl0sIm5hbWVzIjpbImRpdkNvbnRhaW5lcnMiLCJzcGxpdCIsIkNvbnZlcnRlciIsIndNb2RlbCIsInBhcmVudENvbnZlcnRlciIsIndvcmRNb2RlbCIsInBhcmVudCIsImRvYyIsImNvbnRlbnQiLCJjb252ZXJ0IiwiYXJndW1lbnRzIiwiY3JlYXRlRWxlbWVudCIsImFwcGVuZENoaWxkIiwiY29udmVydFN0eWxlIiwidGFnIiwiZWwiLCJhIiwiZ2V0U3R5bGVJZCIsImNvbnN0cnVjdG9yIiwiYWRkQ2xhc3MiLCJzdHlsZVBhdGgiLCJhc0Nzc0lEIiwicmVwbGFjZSIsImNsYXNzZXMiLCJzZXRBdHRyaWJ1dGUiLCJnZXRBdHRyaWJ1dGUiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsSUFBSUEsZ0JBQWMsaUJBQWlCQyxLQUFqQixDQUF1QixHQUF2QixDQUFsQjs7SUFFcUJDLFM7QUFDcEIsb0JBQVlDLE1BQVosRUFBb0JDLGVBQXBCLEVBQW9DO0FBQUE7O0FBQ25DLE9BQUtDLFNBQUwsR0FBZUYsTUFBZjtBQUNBLE9BQUtHLE1BQUwsR0FBWUYsZUFBWjtBQUNBLE9BQUtHLEdBQUwsR0FBVUgsbUJBQW1CQSxnQkFBZ0JHLEdBQTdDO0FBQ0EsT0FBS0MsT0FBTCxHQUFhLElBQWI7QUFDQTs7Ozs7QUFHRDswQkFDTztBQUNOLE9BQUcsQ0FBQyxLQUFLRixNQUFOLElBQWdCLEtBQUtBLE1BQUwsQ0FBWUUsT0FBL0IsRUFDQyxPQUFPLEtBQUtDLE9BQUwsYUFBZ0JDLFNBQWhCLENBQVA7QUFDRDs7OzRCQUNRO0FBQ1IsUUFBS0YsT0FBTCxHQUFhLEtBQUtHLGFBQUwsRUFBYjtBQUNBLE9BQUcsS0FBS0gsT0FBUixFQUFnQjtBQUNmLFNBQUtGLE1BQUwsQ0FBWUUsT0FBWixDQUFvQkksV0FBcEIsQ0FBZ0MsS0FBS0osT0FBckM7QUFDQSxJQUZELE1BR0MsS0FBS0EsT0FBTCxHQUFhLEtBQUtGLE1BQUwsSUFBZSxLQUFLQSxNQUFMLENBQVlFLE9BQTNCLElBQXNDLElBQW5EOztBQUVELFFBQUtLLFlBQUwsQ0FBa0IsS0FBS0wsT0FBdkI7QUFDQTs7O2tDQUNjO0FBQ2QsaUNBQWMsS0FBS00sR0FBbkI7QUFDQSxTQUFLLFFBQUw7QUFDQyxZQUFPLEtBQUtQLEdBQUwsQ0FBU0ksYUFBVCxDQUF1QixLQUFLRyxHQUE1QixDQUFQO0FBQ0QsU0FBSyxVQUFMO0FBQ0MsU0FBSUMsS0FBRyxLQUFLRCxHQUFMLEVBQVA7QUFDQSxZQUFPLEtBQUtQLEdBQUwsQ0FBU0ksYUFBVCxDQUF1QkksRUFBdkIsQ0FBUDtBQUNEO0FBQ0MsWUFBTyxJQUFQO0FBUEQ7QUFTQTs7OytCQUNZQSxFLEVBQUlDLEMsRUFBRTtBQUNsQixRQUFLWCxTQUFMLENBQWVZLFVBQWYsS0FDS0QsSUFBRSxLQUFLWCxTQUFMLENBQWVZLFVBQWYsRUFEUCxLQUVJLEtBQUtDLFdBQUwsQ0FBaUJDLFFBQWpCLENBQTBCSixFQUExQixFQUE2QixLQUFLUixHQUFMLENBQVNhLFNBQVQsQ0FBbUIsS0FBS0YsV0FBTCxDQUFpQkcsT0FBakIsQ0FBeUJMLENBQXpCLENBQW5CLENBQTdCLENBRko7QUFHQTs7O2tDQUNjO0FBQ2QsVUFBTyxLQUFQO0FBQ0E7Ozs0QkFDUSxDQUFFOzs7c0JBbkNHO0FBQUMsVUFBTyxJQUFQO0FBQVk7OztzQkFDbEI7QUFBQyxVQUFPLElBQVA7QUFBWTs7OzBCQW9DUEEsQyxFQUFFO0FBQ2hCLFVBQU9BLEVBQUVNLE9BQUYsQ0FBVSxNQUFWLEVBQWlCLEdBQWpCLENBQVA7QUFDQTs7OzJCQUNlUCxFLEVBQUlRLE8sRUFBUTtBQUMzQlIsTUFBR1MsWUFBSCxDQUFnQixPQUFoQixFQUF5QixDQUFDVCxHQUFHVSxZQUFILENBQWdCLE9BQWhCLEtBQTBCLEVBQTNCLElBQStCLEdBQS9CLEdBQW1DRixPQUE1RDtBQUNBOzs7OztrQkFqRG1CckIsUyIsImZpbGUiOiJjb252ZXJ0ZXIuanMiLCJzb3VyY2VzQ29udGVudCI6WyJ2YXIgZGl2Q29udGFpbmVycz0nU0VDVElPTixESVYsVEQnLnNwbGl0KCcsJyk7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBDb252ZXJ0ZXJ7XHJcblx0Y29uc3RydWN0b3Iod01vZGVsLCBwYXJlbnRDb252ZXJ0ZXIpe1xyXG5cdFx0dGhpcy53b3JkTW9kZWw9d01vZGVsXHJcblx0XHR0aGlzLnBhcmVudD1wYXJlbnRDb252ZXJ0ZXJcclxuXHRcdHRoaXMuZG9jPSBwYXJlbnRDb252ZXJ0ZXIgJiYgcGFyZW50Q29udmVydGVyLmRvY1xyXG5cdFx0dGhpcy5jb250ZW50PW51bGw7XHJcblx0fVxyXG5cdGdldCB3b3JkVHlwZSgpe3JldHVybiBudWxsfVxyXG5cdGdldCB0YWcoKXtyZXR1cm4gbnVsbH1cclxuXHQvKippbnRlcmZhY2UgQVBJOiBoYXBwZW4gd2hlbiBqdXN0IHdvcmQgbW9kZWwgaWRlbnRpZmllZCwgd2l0aG91dCBjaGlsZHJlbiBhcHBlbmRlZCB5ZXQqL1xyXG5cdHZpc2l0KCl7XHJcblx0XHRpZighdGhpcy5wYXJlbnQgfHwgdGhpcy5wYXJlbnQuY29udGVudClcclxuXHRcdFx0cmV0dXJuIHRoaXMuY29udmVydCguLi5hcmd1bWVudHMpXHJcblx0fVxyXG5cdGNvbnZlcnQoKXtcclxuXHRcdHRoaXMuY29udGVudD10aGlzLmNyZWF0ZUVsZW1lbnQoKVxyXG5cdFx0aWYodGhpcy5jb250ZW50KXtcclxuXHRcdFx0dGhpcy5wYXJlbnQuY29udGVudC5hcHBlbmRDaGlsZCh0aGlzLmNvbnRlbnQpXHJcblx0XHR9ZWxzZVxyXG5cdFx0XHR0aGlzLmNvbnRlbnQ9dGhpcy5wYXJlbnQgJiYgdGhpcy5wYXJlbnQuY29udGVudCB8fCBudWxsXHJcblx0XHRcdFxyXG5cdFx0dGhpcy5jb252ZXJ0U3R5bGUodGhpcy5jb250ZW50KVxyXG5cdH1cclxuXHRjcmVhdGVFbGVtZW50KCl7XHJcblx0XHRzd2l0Y2godHlwZW9mKHRoaXMudGFnKSl7XHJcblx0XHRjYXNlICdzdHJpbmcnOlxyXG5cdFx0XHRyZXR1cm4gdGhpcy5kb2MuY3JlYXRlRWxlbWVudCh0aGlzLnRhZylcclxuXHRcdGNhc2UgJ2Z1bmN0aW9uJzpcclxuXHRcdFx0dmFyIGVsPXRoaXMudGFnKClcclxuXHRcdFx0cmV0dXJuIHRoaXMuZG9jLmNyZWF0ZUVsZW1lbnQoZWwpXHJcblx0XHRkZWZhdWx0OlxyXG5cdFx0XHRyZXR1cm4gbnVsbFxyXG5cdFx0fVxyXG5cdH1cclxuXHRjb252ZXJ0U3R5bGUoZWwsIGEpe1xyXG5cdFx0dGhpcy53b3JkTW9kZWwuZ2V0U3R5bGVJZCBcclxuXHRcdFx0JiYgKGE9dGhpcy53b3JkTW9kZWwuZ2V0U3R5bGVJZCgpKSBcclxuXHRcdFx0JiYgdGhpcy5jb25zdHJ1Y3Rvci5hZGRDbGFzcyhlbCx0aGlzLmRvYy5zdHlsZVBhdGgodGhpcy5jb25zdHJ1Y3Rvci5hc0Nzc0lEKGEpKSk7XHJcblx0fVxyXG5cdF9zaG91bGRJZ25vcmUoKXtcclxuXHRcdHJldHVybiBmYWxzZVxyXG5cdH1cclxuXHRyZWxlYXNlKCl7fVxyXG5cclxuXHRzdGF0aWMgYXNDc3NJRChhKXtcclxuXHRcdHJldHVybiBhLnJlcGxhY2UoL1xccysvZywnXycpXHJcblx0fVxyXG5cdHN0YXRpYyBhZGRDbGFzcyhlbCwgY2xhc3Nlcyl7XHJcblx0XHRlbC5zZXRBdHRyaWJ1dGUoJ2NsYXNzJywgKGVsLmdldEF0dHJpYnV0ZSgnY2xhc3MnKXx8JycpKycgJytjbGFzc2VzKVxyXG5cdH1cclxufVxyXG4iXX0=