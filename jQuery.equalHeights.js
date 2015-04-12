/*-------------------------------------------------------------------- 
 * JQuery Plugin: "EqualHeights" & "EqualWidths"
 * by:	Scott Jehl, Todd Parker, Maggie Costello Wachs (http://www.filamentgroup.com)
 * v 2.1 by: Rudyard Murdough (rmurdough@gmail.com)
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
 * Version: 2.1, 03.27.2013
 * Changelog:
 *  08.02.2007 initial Version 1.0
 *  07.24.2008 v 2.0 - added support for widths
 *  03.27.2013 v 2.1 - include border size in calculations, made work in jQuery no-conflict mode
--------------------------------------------------------------------*/
(function ($) {
$.fn.equalHeights = function(px) {
	$(this).each(function(){
            var currentTallest = 0;
            $(this).children().each(function(i){
                if ($(this).outerHeight() > currentTallest) 
                { 
                    currentTallest = $(this).outerHeight(); 
                }
            });
            if (!px && Number.prototype.pxToEm) currentTallest = currentTallest.pxToEm(); //use ems unless px is specified
		// for ie6, set height since min-height isn't supported
            if ($.browser.msie && $.browser.version == 6.0) 
            { 
                $(this).children().css({'height': function() {
                        return currentTallest-parseInt($(this).css("borderTopWidth"), 0)-parseInt($(this).css("borderBottomWidth"), 0);
                    }
                }); 
            }
            $(this).children().css({'min-height': function() {
                    return currentTallest-parseInt($(this).css("borderTopWidth"), 0)-parseInt($(this).css("borderBottomWidth"), 0);
                }            
            }); 
	});
	return this;
};

// just in case you need it...
$.fn.equalWidths = function(px) {
	$(this).each(function(){
            var currentWidest = 0;
            $(this).children().each(function(i){
                if($(this).width() > currentWidest) 
                { 
                    currentWidest = $(this).width(); 
                }
            });
            if(!px && Number.prototype.pxToEm) currentWidest = currentWidest.pxToEm(); //use ems unless px is specified
            // for ie6, set width since min-width isn't supported
            if ($.browser.msie && $.browser.version == 6.0) 
            { 
                $(this).children().css({'width': function() {
                        return currentWidest-parseInt($(this).css("borderLeftWidth"), 0)-parseInt($(this).css("borderRightWidth"), 0);
                    }
                }); 
            }
            $(this).children().css({'min-width': function() {
                    return currentWidest-parseInt($(this).css("borderLeftWidth"), 0)-parseInt($(this).css("borderRightWidth"), 0);
                }
            }); 
	});
	return this;
};
})(jQuery);