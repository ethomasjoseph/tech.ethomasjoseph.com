/**
 * ! Navheader JavaScript
 */

"use strict";

var tjs = window.tjs || {};

// self initializing function
tjs.navheader = (function(context, $) {
    var $searchWrapper,
        _init,
        _handlePageScroll,
        _toggleSearchNCollapseNav,
        _initSearchButton;

    _initSearchButton = function() {
        var searchIcons = $(".search-icon");
        $(searchIcons).click(function() {
            $($searchWrapper).toggle(80, function() {
                var searchOpen = $($searchWrapper).is(":visible");
                $.each($(".search-icon"), function(i, el) {
                    if (searchOpen) {
                        $(el).addClass("active-text");
                    } else {
                        $(el).removeClass("active-text");
                    }
                });
                if (searchOpen) {
                    $('#tj-navbar-collapse').collapse('hide');
                    $("#txtSearch").focus();
                }
            });
        });
    };

    _handlePageScroll = function() {
        $(document).on("scroll", function() {
            if ($(document).scrollTop() > 200) {
                $("#mainNav").addClass("shrink");
            } else {
                $("#mainNav").removeClass("shrink");
            }
        });
    };

    _toggleSearchNCollapseNav = function() {
        $('#tj-navbar-collapse').on('show.bs.collapse', function(e) {
            var searchOpen = $($searchWrapper).is(":visible");
            if (searchOpen) {
                // gracefully hide the search bar
                var searchIcon = $(".search-icon").first();
                if (searchIcon.length) {
                    searchIcon.trigger('click');
                }
            }
        });
    };

    _init = function() {
        $searchWrapper = $("#search-wrapper");
        _initSearchButton();
        _handlePageScroll();
        _toggleSearchNCollapseNav();
    };

    _init();
}(window, jQuery));