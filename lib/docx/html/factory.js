'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.default = {
	'*': require('./converter'),
	'document': require('./document'),
	'hyperlink': require('./a'),
	'bookmarkStart': require('./bookmark'),
	'drawing.anchor': require("./drawingAnchor"),
	'fieldBegin': require('./fieldBegin'),
	'fieldEnd': require('./fieldEnd'),
	'footer': require('./footer'),
	'drawing.inline': require('./graphic'),
	'heading': require('./h'),
	'header': require('./header'),
	'image': require('./img'),
	'list': require('./list'),
	'paragraph': require('./p'),
	'section': require('./section'),
	'shape': require('./shape'),
	'inline': require('./span'),
	'table': require('./table'),
	'cell': require('./td'),
	'text': require('./text'),
	'textbox': require('./textbox'),
	'row': require('./tr'),

	'field.hyperlink': require('./field/hyperlink'),

	'style.document': require('./style/document'),
	'style.inline': require('./style/inline'),
	'style.numbering.definition': require('./style/list'),
	'style.paragraph': require('./style/paragraph'),
	'style.table': require('./style/table')
};
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9kb2N4L2h0bWwvZmFjdG9yeS5qcyJdLCJuYW1lcyI6WyJyZXF1aXJlIl0sIm1hcHBpbmdzIjoiOzs7OztrQkFBZTtBQUNiLE1BQVNBLFFBQVEsYUFBUixDQURJO0FBRWIsYUFBYUEsUUFBUSxZQUFSLENBRkE7QUFHYixjQUFlQSxRQUFRLEtBQVIsQ0FIRjtBQUliLGtCQUFrQkEsUUFBUSxZQUFSLENBSkw7QUFLYixtQkFBa0JBLFFBQVEsaUJBQVIsQ0FMTDtBQU1iLGVBQWVBLFFBQVEsY0FBUixDQU5GO0FBT2IsYUFBYUEsUUFBUSxZQUFSLENBUEE7QUFRYixXQUFZQSxRQUFRLFVBQVIsQ0FSQztBQVNiLG1CQUFrQkEsUUFBUSxXQUFSLENBVEw7QUFVYixZQUFhQSxRQUFRLEtBQVIsQ0FWQTtBQVdiLFdBQVlBLFFBQVEsVUFBUixDQVhDO0FBWWIsVUFBV0EsUUFBUSxPQUFSLENBWkU7QUFhYixTQUFVQSxRQUFRLFFBQVIsQ0FiRztBQWNiLGNBQWNBLFFBQVEsS0FBUixDQWREO0FBZWIsWUFBYUEsUUFBUSxXQUFSLENBZkE7QUFnQmIsVUFBV0EsUUFBUSxTQUFSLENBaEJFO0FBaUJiLFdBQVlBLFFBQVEsUUFBUixDQWpCQztBQWtCYixVQUFXQSxRQUFRLFNBQVIsQ0FsQkU7QUFtQmIsU0FBVUEsUUFBUSxNQUFSLENBbkJHO0FBb0JiLFNBQVVBLFFBQVEsUUFBUixDQXBCRztBQXFCYixZQUFhQSxRQUFRLFdBQVIsQ0FyQkE7QUFzQmIsUUFBVUEsUUFBUSxNQUFSLENBdEJHOztBQXdCYixvQkFBbUJBLFFBQVEsbUJBQVIsQ0F4Qk47O0FBMEJiLG1CQUFrQkEsUUFBUSxrQkFBUixDQTFCTDtBQTJCYixpQkFBaUJBLFFBQVEsZ0JBQVIsQ0EzQko7QUE0QmIsK0JBQThCQSxRQUFRLGNBQVIsQ0E1QmpCO0FBNkJiLG9CQUFtQkEsUUFBUSxtQkFBUixDQTdCTjtBQThCYixnQkFBZ0JBLFFBQVEsZUFBUjtBQTlCSCxDIiwiZmlsZSI6ImZhY3RvcnkuanMiLCJzb3VyY2VzQ29udGVudCI6WyJleHBvcnQgZGVmYXVsdCB7XHJcblx0ICcqJzogXHRcdFx0XHRyZXF1aXJlKCcuL2NvbnZlcnRlcicpXHJcblx0LCdkb2N1bWVudCc6XHRcdHJlcXVpcmUoJy4vZG9jdW1lbnQnKVxyXG5cdCwnaHlwZXJsaW5rJzogXHRcdHJlcXVpcmUoJy4vYScpXHJcblx0LCdib29rbWFya1N0YXJ0JzogXHRyZXF1aXJlKCcuL2Jvb2ttYXJrJylcclxuXHQsJ2RyYXdpbmcuYW5jaG9yJzpcdHJlcXVpcmUoXCIuL2RyYXdpbmdBbmNob3JcIilcclxuXHQsJ2ZpZWxkQmVnaW4nOlx0XHRyZXF1aXJlKCcuL2ZpZWxkQmVnaW4nKVxyXG5cdCwnZmllbGRFbmQnOlx0XHRyZXF1aXJlKCcuL2ZpZWxkRW5kJylcclxuXHQsJ2Zvb3Rlcic6XHRcdFx0cmVxdWlyZSgnLi9mb290ZXInKVxyXG5cdCwnZHJhd2luZy5pbmxpbmUnOlx0cmVxdWlyZSgnLi9ncmFwaGljJylcclxuXHQsJ2hlYWRpbmcnOlx0XHRcdHJlcXVpcmUoJy4vaCcpXHJcblx0LCdoZWFkZXInOlx0XHRcdHJlcXVpcmUoJy4vaGVhZGVyJylcclxuXHQsJ2ltYWdlJzpcdFx0XHRyZXF1aXJlKCcuL2ltZycpXHJcblx0LCdsaXN0JzpcdFx0XHRyZXF1aXJlKCcuL2xpc3QnKVxyXG5cdCwncGFyYWdyYXBoJzpcdFx0cmVxdWlyZSgnLi9wJylcclxuXHQsJ3NlY3Rpb24nOlx0XHRcdHJlcXVpcmUoJy4vc2VjdGlvbicpXHJcblx0LCdzaGFwZSc6XHRcdFx0cmVxdWlyZSgnLi9zaGFwZScpXHJcblx0LCdpbmxpbmUnOlx0XHRcdHJlcXVpcmUoJy4vc3BhbicpXHJcblx0LCd0YWJsZSc6XHRcdFx0cmVxdWlyZSgnLi90YWJsZScpXHJcblx0LCdjZWxsJzpcdFx0XHRyZXF1aXJlKCcuL3RkJylcclxuXHQsJ3RleHQnOlx0XHRcdHJlcXVpcmUoJy4vdGV4dCcpXHJcblx0LCd0ZXh0Ym94JzpcdFx0XHRyZXF1aXJlKCcuL3RleHRib3gnKVxyXG5cdCwncm93JzpcdFx0XHRcdHJlcXVpcmUoJy4vdHInKVxyXG5cdFxyXG5cdCwnZmllbGQuaHlwZXJsaW5rJzpcdHJlcXVpcmUoJy4vZmllbGQvaHlwZXJsaW5rJylcclxuXHRcclxuXHQsJ3N0eWxlLmRvY3VtZW50JzpcdHJlcXVpcmUoJy4vc3R5bGUvZG9jdW1lbnQnKVxyXG5cdCwnc3R5bGUuaW5saW5lJzpcdFx0cmVxdWlyZSgnLi9zdHlsZS9pbmxpbmUnKVxyXG5cdCwnc3R5bGUubnVtYmVyaW5nLmRlZmluaXRpb24nOlx0cmVxdWlyZSgnLi9zdHlsZS9saXN0JylcclxuXHQsJ3N0eWxlLnBhcmFncmFwaCc6XHRyZXF1aXJlKCcuL3N0eWxlL3BhcmFncmFwaCcpXHJcblx0LCdzdHlsZS50YWJsZSc6XHRcdHJlcXVpcmUoJy4vc3R5bGUvdGFibGUnKVxyXG59Il19