/*-------------------------------------------------------------------- 
 * JQuery Plugin: "EqualHeights" & "EqualWidths"
 * by:	Scott Jehl, Todd Parker, Maggie Costello Wachs (http://www.filamentgroup.com)
 *
 * Copyright (c) 2007 Filament Group
 * Licensed under GPL (http://www.opensource.org/licenses/gpl-license.php)
 *
 * Description: Compares the heights or widths of the top-level children of a provided element 
 		and sets their min-height to the tallest height (or width to widest width). Sets in em units 
 		by default if pxToEm() method is available.
 * Dependencies: jQuery library, pxToEm method	(article: http://www.filamentgroup.com/lab/retaining_scalable_interfaces_with_pixel_to_em_conversion/)							  
 * Usage Example: $(element).equalHeights();
   						      Optional: to set min-height in px, pass a true argument: $(element).equalHeights(true);
 * Version: 2.0, 07.24.2008
 * Changelog:
 *  08.02.2007 initial Version 1.0
 *  07.24.2008 v 2.0 - added support for widths
--------------------------------------------------------------------*/

$.fn.equalHeights = function(options) {
	options = $.extend({px: false, filter: 'children', selector: '*'}, options);
	$(this).each(function(){
		var currentTallest = 0,
				$this = $(this),
				$children = $this[options.filter](options.selector);
		$children.each(function(i){
			var $child = $(this);
			if ($child.height() > currentTallest) { currentTallest = $child.height(); }
		});
		if (!options.px && Number.prototype.pxToEm) currentTallest = currentTallest.pxToEm(); //use ems unless px is specified
		// for ie6, set height since min-height isn't supported
		if ($.browser.msie && $.browser.version == 6.0) { $children.css({'height': currentTallest}); }
		$children.css({'min-height': currentTallest}); 
	});
	return this;
};

// just in case you need it...
$.fn.equalWidths = function(options) {
	options = $.extend({px: false, filter: 'children', selector: '*'}, options);
	$(this).each(function(){
		var currentWidest = 0,
				$this = $(this),
				$children = $this.find(options.selector);
				$children = $this[options.filter](options.selector);
		$children.each(function(i){
				var $child = $(this);
				if($child.width() > currentWidest) { currentWidest = $child.width(); }
		});
		if(!options.px && Number.prototype.pxToEm) currentWidest = currentWidest.pxToEm(); //use ems unless px is specified
		// for ie6, set width since min-width isn't supported
		if ($.browser.msie && $.browser.version == 6.0) { $.children.css({'width': currentWidest}); }
		$children.css({'min-width': currentWidest}); 
	});
	return this;
};
