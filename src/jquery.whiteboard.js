/** Tools:
 *  -   0   mouseTool
 *  -   1   textTool
 *  -   2   rectTool
 *  -   3   circleTool
 *  -   4   mathsTool
 * ...
 */
var elID = tool = 0;
var appSelector = "#app";
var contentSelector = appSelector + " .wbjs-content";
var mathInsertCoords = null;

// Helper: get page coordinates from mouse or touch event
function getEventCoords(event) {
    if (event.originalEvent && event.originalEvent.touches && event.originalEvent.touches.length) {
        return {
            pageX: event.originalEvent.touches[0].pageX,
            pageY: event.originalEvent.touches[0].pageY
        };
    }
    return { pageX: event.pageX, pageY: event.pageY };
}

// Helper: safely parse a CSS pixel value, defaulting to 0 if NaN
function parseCssPx(value) {
    var n = parseInt(value, 10);
    return isNaN(n) ? 0 : n;
}

$(function(){
    //-- Formating the app
    $(appSelector).addClass("vw-100").addClass("vh-100").addClass("overflow-hidden");
    
    $("input[name='toolRadio']").change(function(){
        switch($(this).attr("id")){
            case "mouseTool":
                tool = 0;
                $(contentSelector).css({"cursor": "grab"});
                break;
            case "textTool":
                tool = 1;
                $(contentSelector).css("cursor", "text");
                break;
            case "rectTool":
                tool = 2;
                $(contentSelector).css("cursor", "crosshair");
                break;
            case "circleTool":
                tool = 3;
                $(contentSelector).css("cursor", "crosshair");
                break;
            case "mathsTool":
                tool = 4;
                $(contentSelector).css("cursor", "crosshair");
                break;
            //TODO: To be continued...
        }
        $(appSelector).css({"cursor": "text"});
    });

    //-- Showing Welcome Popup (Modal)
    $("#welcomeModal.modal").modal().show();

    //-- Toolbar dragging
    $("#toolbar").draggable({handle: "#move-toolbar", containment: appSelector, scroll: false});

    //-- Content container dragging.
    $(contentSelector).draggable({
        start: function(){
            $(this).css("cursor", "grabbing");
        },
        stop: function() {
            var ctTop = parseCssPx($(this).css("top"));
            var ctLeft = parseCssPx($(this).css("left"));

            // Adding space in top/left
            if(ctTop > 0 || ctLeft > 0){
                $(this).children().css({
                    "top" : "+=" + ctTop,
                    "left" : "+=" + ctLeft
                });

                $(this).css({
                    "width": "+=" + ctLeft,
                    "height": "+=" + ctTop,
                    "top": "0",
                    "left": "0"
                })
            }

            // Adding space in bottom
            var ctBDif = $(appSelector).height() - ctTop - $(this).height();
            if(ctTop < 0 && ctBDif > 0){
                $(this).css({
                    "height": "+=" + ctBDif
                })
            }

            // Adding space in right
            var ctRDif = $(appSelector).width() - ctLeft - $(this).width();
            if(ctLeft < 0 && ctRDif > 0){
                $(this).css({
                    "width": "+=" + ctRDif
                })
            }
            
            $(this).css("cursor", "grab");
        },
        cancel: contentSelector + " *",
        scroll:false
    });

    //-- Prevent default touch behavior on canvas to avoid scrolling
    document.querySelector(contentSelector).addEventListener("touchmove", function(e) {
        if (tool !== 0) {
            e.preventDefault();
        }
    }, { passive: false });

    //-- Elements adding (supports both click and tap)
    // Flag to suppress synthesized click after touchend
    var ignoreNextClick = false;

    function addElement(event) {
        var coords = getEventCoords(event);
        var ctTop = Math.abs(parseCssPx($(contentSelector).css("top")));
        var ctLeft = Math.abs(parseCssPx($(contentSelector).css("left")));
        switch(tool){
            case 1:
                var newEl = $(contentSelector).append('<div class="wbjs-el"><div class="btn btn-link position-absolute drg-btn"><i class="las la-arrows-alt"></i></div><p class="p-2 m-0" id="wbjs-el-'+elID+'"></p></div>').children(":last-child");
                newEl.children("p").tinymce({menubar: false, inline:true, plugins: [
                    'link',
                    'textcolor',
                    'contextmenu',
                    'autolink'
                  ], toolbar: [
                        'bold italic underline | fontsizeselect | forecolor backcolor'
                ], auto_focus: 'wbjs-el-'+elID});
                
                newEl.css({
                    "position": "absolute",
                    "top": ctTop + coords.pageY,
                    "left": ctLeft + coords.pageX,
                    "min-width": "62px",
                    "min-height": "24px"
                });
                $("#mouseTool").trigger("click");

                newEl.draggable({handle: "div.btn", scroll: false});
                elID++;
                break;
                
            case 2:
                var newEl = $(contentSelector).append('<div class="wbjs-el" id="wbjs-el-'+elID+'"><div class="btn btn-link position-absolute drg-btn"><i class="las la-arrows-alt"></i></div></div>').children(":last-child");
                
                newEl.css({
                    "position": "absolute",
                    "top": ctTop + coords.pageY,
                    "left": ctLeft + coords.pageX,
                    "border": "1px solid black",
                    "width": "64px",
                    "height": "64px"
                });

                $("#mouseTool").trigger("click");

                newEl.draggable({scroll: false});
                newEl.resizable();
                elID++;
                break;
            case 3:
                var newEl = $(contentSelector).append('<div class="wbjs-el" id="wbjs-el-'+elID+'"><div class="btn btn-link position-absolute drg-btn"><i class="las la-arrows-alt"></i></div></div>').children(":last-child");
                
                newEl.css({
                    "position": "absolute",
                    "top": ctTop + coords.pageY,
                    "left": ctLeft + coords.pageX,
                    "border": "1px solid black",
                    "border-radius": "100%",
                    "width": "64px",
                    "height": "64px"
                });

                $("#mouseTool").trigger("click");

                newEl.draggable({scroll: false});
                newEl.resizable();
                elID++;
                break;
            case 4:
                mathInsertCoords = { pageX: coords.pageX, pageY: coords.pageY, ctTop: ctTop, ctLeft: ctLeft };
                $("#mathLatexInput").val("");
                $("#mathPreview").html('<span class="text-muted">Preview will appear here</span>');
                $("#mathModal").modal("show");
                break;
        }
    }

    $(contentSelector).on("click", function(event) {
        if (ignoreNextClick) {
            ignoreNextClick = false;
            return;
        }
        addElement(event);
    });

    //-- Touch: single-tap to add element (ignore drags)
    var touchMoved = false;
    $(contentSelector).on("touchstart", function() { touchMoved = false; });
    $(contentSelector).on("touchmove", function() { touchMoved = true; });
    $(contentSelector).on("touchend", function(event) {
        if (!touchMoved && tool !== 0) {
            var changedTouches = event.originalEvent && event.originalEvent.changedTouches;
            if (changedTouches && changedTouches.length > 0) {
                var touch = changedTouches[0];
                addElement({ pageX: touch.pageX, pageY: touch.pageY });
                // Suppress the synthesized click that follows touchend
                ignoreNextClick = true;
            }
        }
    });

    //-- Math formula modal: live preview
    $("#mathLatexInput").on("input", function() {
        var latex = $(this).val().trim();
        if (latex) {
            try {
                katex.render(latex, document.getElementById("mathPreview"), { throwOnError: false, displayMode: true });
            } catch(e) {
                $("#mathPreview").html('<span class="text-danger">Invalid formula</span>');
            }
        } else {
            $("#mathPreview").html('<span class="text-muted">Preview will appear here</span>');
        }
    });

    //-- Math formula modal: insert button
    $("#mathInsertBtn").on("click", function() {
        var latex = $("#mathLatexInput").val().trim();
        if (!latex || !mathInsertCoords) return;

        var rendered = $('<span></span>')[0];
        try {
            katex.render(latex, rendered, { throwOnError: false, displayMode: true });
        } catch(e) {
            return;
        }

        var newEl = $(contentSelector).append(
            '<div class="wbjs-el" id="wbjs-el-'+elID+'">' +
                '<div class="btn btn-link position-absolute drg-btn"><i class="las la-arrows-alt"></i></div>' +
                '<div class="wbjs-math p-2"></div>' +
            '</div>'
        ).children(":last-child");

        newEl.find(".wbjs-math").append(rendered);

        newEl.css({
            "position": "absolute",
            "top": mathInsertCoords.ctTop + mathInsertCoords.pageY,
            "left": mathInsertCoords.ctLeft + mathInsertCoords.pageX
        });

        $("#mathModal").modal("hide");
        $("#mouseTool").trigger("click");

        newEl.draggable({handle: "div.btn", scroll: false});
        elID++;
        mathInsertCoords = null;
    });

    //-- Math formula modal: allow Enter key to insert
    $("#mathLatexInput").on("keydown", function(e) {
        if (e.key === "Enter") {
            e.preventDefault();
            $("#mathInsertBtn").trigger("click");
        }
    });

    //-- Math formula modal: reset tool on cancel
    $("#mathModal").on("hidden.bs.modal", function() {
        mathInsertCoords = null;
    });
});