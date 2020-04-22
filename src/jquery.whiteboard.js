/** Tools:
 *  -   0   mouseTool
 *  -   1   textTool
 *  -   2   rectTool
 *  -   3   circleTool
 * ...
 */
var elID = tool = 0;
var appSelector = "#app";
var contentSelector = appSelector + " .wbjs-content";

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
            //TODO: To be continued...
        }
        $(appSelector).css({"cursor": "text"});
    });

    //-- Showing Welcome Popup (Modal)
    $("#welcomeModal.modal").modal().show();

    //-- Toolbar dragging
    $("#toolbar").draggable({handle: "#move-toolbar", containment: appSelector, scroll: false});

    //-- Content containerdragging.
    $(contentSelector).draggable({
        start: function(){
            $(this).css("cursor", "grabbing");
        },
        stop: function() {
            var ctTop = parseInt($(this).css("top"));
            var ctLeft = parseInt($(this).css("left"));

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

    //-- Elements adding
    $(contentSelector).click(function(event){
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
                    "top": parseInt($(this).css("top")) + event.pageY,
                    "left": parseInt($(this).css("left")) + event.pageX,
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
                    "top": parseInt($(this).css("top")) + event.pageY,
                    "left": parseInt($(this).css("left")) + event.pageX,
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
                    "top": parseInt($(this).css("top")) + event.pageY,
                    "left": parseInt($(this).css("left")) + event.pageX,
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
        }
    });
});