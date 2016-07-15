/* ========================================================================
 * Angular movable: ngMovable.js v1.0
 * http://itman70s.github.io/
 * ======================================================================== */
(function(window, angular, undefined) {
	'use strict';

	/**
	* The `movable` directive provides a simple way to make your items movable.
	*
	*
	*
	* @example
	*
	* ```js
	* angular.module('movableExample', ['ngMovable'])
	* ```
	* ```html
	* <div movable></div>
	* ```
	*/
angular.module('ngMovable', [])
.directive('movable', ['$document', function ($document) {
	return {
		restrict : 'A',
		link : function (scope, element, attrs) {
			var startX, startY, initialMouseX, initialMouseY;
			var target = attrs.movable ? element.closest(attrs.movable) : element;
			
			element.css("cursor", "pointer");
			var zindex = target.css("z-index");
			element.bind("mousedown", function (evt) {
				element.css("cursor", "move");
				target.css({
					"position" : 'relative',
					"z-index" : 1000
				});
				startX = target.prop('offsetLeft');
				startY = target.prop('offsetTop');
				initialMouseX = evt.clientX;
				initialMouseY = evt.clientY;
				$document.bind('mousemove', mousemove);
				$document.bind('mouseup', mouseup);
				return false;
			});

			function mousemove(evt) {
				var dx = evt.clientX - initialMouseX;
				var dy = evt.clientY - initialMouseY;
				target.css({
					top : startY + dy + 'px',
					left : startX + dx + 'px'
				});
				return false;
			}

			function mouseup() {
				element.css("cursor", "pointer");
				target.css("z-index", zindex);
				$document.unbind('mousemove', mousemove);
				$document.unbind('mouseup', mouseup);
			}
		}
	};
}]);
})(window, window.angular);
