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

var _converter = require('../converter');

var _converter2 = _interopRequireDefault(_converter);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Field = function (_Converter) {
	(0, _inherits3.default)(Field, _Converter);

	function Field(wordModel, parent) {
		(0, _classCallCheck3.default)(this, Field);

		var _this = (0, _possibleConstructorReturn3.default)(this, (Field.__proto__ || (0, _getPrototypeOf2.default)(Field)).apply(this, arguments));

		_this.elStart = parent.content;
		return _this;
	}

	(0, _createClass3.default)(Field, [{
		key: 'convert',
		value: function convert(elEnd) {}
	}, {
		key: 'wordType',
		get: function get() {
			return 'field';
		}
	}]);
	return Field;
}(_converter2.default);

exports.default = Field;
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9kb2N4L2h0bWwvZmllbGQvZmllbGQuanMiXSwibmFtZXMiOlsiRmllbGQiLCJ3b3JkTW9kZWwiLCJwYXJlbnQiLCJhcmd1bWVudHMiLCJlbFN0YXJ0IiwiY29udGVudCIsImVsRW5kIiwiQ29udmVydGVyIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBOzs7Ozs7SUFFcUJBLEs7OztBQUNwQixnQkFBWUMsU0FBWixFQUF1QkMsTUFBdkIsRUFBOEI7QUFBQTs7QUFBQSxtSUFDcEJDLFNBRG9COztBQUU3QixRQUFLQyxPQUFMLEdBQWFGLE9BQU9HLE9BQXBCO0FBRjZCO0FBRzdCOzs7OzBCQUdPQyxLLEVBQU0sQ0FBRTs7O3NCQUZGO0FBQUMsVUFBTyxPQUFQO0FBQWU7OztFQUxJQyxtQjs7a0JBQWRQLEsiLCJmaWxlIjoiZmllbGQuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgQ29udmVydGVyIGZyb20gJy4uL2NvbnZlcnRlcidcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEZpZWxkIGV4dGVuZHMgQ29udmVydGVye1xyXG5cdGNvbnN0cnVjdG9yKHdvcmRNb2RlbCwgcGFyZW50KXtcclxuXHRcdHN1cGVyKC4uLmFyZ3VtZW50cylcclxuXHRcdHRoaXMuZWxTdGFydD1wYXJlbnQuY29udGVudDtcclxuXHR9XHJcblx0Z2V0IHdvcmRUeXBlKCl7cmV0dXJuICdmaWVsZCd9XHJcblxyXG5cdGNvbnZlcnQoZWxFbmQpe31cclxufSJdfQ==