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
   						      Optional: to set min-height in px, pass a true argument: $(element).equalHeights{em: true});
 * Version: 2.1, 04.27.2012
 * Changelog:
 *  08.02.2007 initial Version 1.0
 *  07.24.2008 v 2.0 - added support for widths
 *  04.27.2012 : PseudoNinja (email at pseudo ninja dot com) - added support for exceptions
--------------------------------------------------------------------*/

/**
 * Equal Heights JQuery Extension
 */
$.fn.equalHeights = function (params) {
    var _exclude = params.exclude || [],
    	_em = params.em || false
    	;
    $(this).each(function () {
        var currentTallest = 0;
        $(this).children().not(_exclude.join(', ')).each(function (i) {
            if ($(this).height() > currentTallest) { currentTallest = $(this).height(); }
        });
        if (!px || !Number.prototype.pxToEm) currentTallest = currentTallest.pxToEm(); //use ems unless px is specified
        // for ie6, set height since min-height isn't supported
        if ($.browser.msie && $.browser.version == 6.0) {
            $(this).children().not(_exclude.join(', ')).css({ 'height': currentTallest });
        }
        $(this).children().not(_exclude.join(', ')).css({ 'min-height': currentTallest });
    });
    return this;
};

// just in case you need it...
$.fn.equalWidths = function(px) {
	$(this).each(function(){
		var currentWidest = 0;
		$(this).children().each(function(i){
				if($(this).width() > currentWidest) { currentWidest = $(this).width(); }
		});
		if(!px || !Number.prototype.pxToEm) currentWidest = currentWidest.pxToEm(); //use ems unless px is specified
		// for ie6, set width since min-width isn't supported
		if ($.browser.msie && $.browser.version == 6.0) { $(this).children().css({'width': currentWidest}); }
		$(this).children().css({'min-width': currentWidest}); 
	});
	return this;
};