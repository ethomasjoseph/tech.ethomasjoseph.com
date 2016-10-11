/**
 * ! Navheader JavaScript
 */

"use strict";

var tjs = window.tjs || {};

// self initializing function
tjs.navheader = (function(context, $){
    var _init,
        _initSearchButton;
    
    _initSearchButton = function() {
        var searchIcons = $(".search-icon");
        var searchWrapper = $("#search-wrapper");
        $(searchIcons).click(function(){
            $(searchWrapper).toggle(80, function(){
                var searchOpen = $(searchWrapper).is(":visible");
                $.each($(".search-icon"), function(i,el){
                    if (searchOpen) {
                        $(el).addClass("active-text");
                    } else {
                        $(el).removeClass("active-text");
                    }
                });
                if (searchOpen) {
                    $("#txtSearch").focus();
                }
            });
        });
    };
    
    _init = function() {
        _initSearchButton();
    };
    
    _init();
}(window, jQuery));