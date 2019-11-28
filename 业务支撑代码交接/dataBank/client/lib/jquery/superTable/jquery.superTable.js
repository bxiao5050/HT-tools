/////////////////////////////////////////////////////////////////////////////////////////
// Super Tables Plugin for jQuery - MIT Style License
// Copyright (c) 2009 Jeffrey Lee --- blog.darkthread.net
//
// A wrapper for Matt Murphy's Super Tables http://www.matts411.com/post/super_tables/
//
// Contributors:
//
/////////////////////////////////////////////////////////////////////////////////////////
////// TO CALL: 
// $("...").toSuperTable(options)
//
////// OPTIONS: (order does not matter )
// cssSkin : string ( eg. "sDefault", "sSky", "sOrange", "sDark" )
// headerRows : integer ( default is 1 )
// fixedCols : integer ( default is 0 )
// colWidths : integer array ( use -1 for auto sizing )
// onStart : function ( any this.variableNameHere variables you create here can be used later ( eg. onFinish function ) )
// onFinish : function ( all this.variableNameHere variables created in this script can be used in this function )
// margin, padding, width, height, overflow...: Styles for "fakeContainer"
//
////// Example:
// $("#GridView1").toSuperTable(
//              { width: "640px", height: "480px", fixedCols: 2,
//                onFinish: function() { alert('Done!'); } })

(function ($) {
    $.fn.extend(
            {
                toSuperTable: function (options) {
                    var setting = $.extend(
                    {
                        width: "640px", height: "320px",
                        margin: "10px", padding: "0px",
                        overflow: "hidden", colWidths: undefined,
                        fixedCols: 0, headerRows: 1,
                        onStart: function () { },
                        onFinish: function () { },
                        cssSkin: "sSky"
                    }, options);
                    return this.each(function () {
                        var q = $(this);
                        var id = q.attr("id");
                        q.removeAttr("style").wrap("<div id='" + id + "_box'></div>");

                        var nonCssProps = ["fixedCols", "headerRows", "onStart", "onFinish", "cssSkin", "colWidths"];
                        var container = $("#" + id + "_box");

                        for (var p in setting) {
                            if ($.inArray(p, nonCssProps) == -1) {
                                container.css(p, setting[p]);
                                delete setting[p];
                            }
                        }

                        var mySt = new superTable(id, setting);

                    });
                }
            });
})(jQuery);
