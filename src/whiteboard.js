$(function(){
    //-- Showing Welcome Popup (Modal)
    $("#welcomeModal.modal").modal().show();

    //-- Toolbar dragging
    $("#toolbar").draggable({handle: "#move-toolbar", containment: "body", scroll: false});

    //-- Content containerdragging.
    $("#content").draggable({
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
            var ctBDif = $("body").height() - ctTop - $(this).height();
            if(ctTop < 0 && ctBDif > 0){
                $(this).css({
                    "height": "+=" + ctBDif
                })
            }

            // Adding space in right
            var ctRDif = $("body").width() - ctLeft - $(this).width();
            if(ctLeft < 0 && ctRDif > 0){
                $(this).css({
                    "width": "+=" + ctRDif
                })
            }

        },
        cancel: "#content *",
        scroll:false
    });

    $("p").draggable({scroll: false});

    tinymce.init({selector:'#content span', menubar: false, inline:true, toolbar: [
        'bold italic underline | fontsizeselect | forecolor backcolor | alignleft aligncenter alignright alignfull | numlist bullist outdent indent'
      ]});

});