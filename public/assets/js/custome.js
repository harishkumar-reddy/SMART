var customeActions = {
    __ishelpEnabled: false,
    shoHelp: function(elmTarget){
        if(customeActions.__ishelpEnabled){
            customeActions.__ishelpEnabled = false;
            $('.helpdot').remove();
            $(elmTarget).find("i").removeClass('active')
            return true;
        }

        $(elmTarget).find("i").addClass('active')
        customeActions.__ishelpEnabled = true;
        $.each($('.hashelp'),function(i,elm){
            var helpData = $(elm).data();
            var html = '<div class="helpdot" >' +
                        '  <a href="#"  class="dot" role="button" data-toggle="popover" data-trigger="focus" title="'+ helpData.helpTitle +'" data-content="'+ helpData.helpMsg +'"></a>' +
                        '</div>';
            $(elm).append(html);
        });
        $('[data-toggle="popover"]').popover();
    },
    showLoader: function(){
        $("#modal_loader").modal({
            show:true,
            backdrop:false,
            keyboard:false
        });

        return true;
    },
    hideLoader:function(){
        setTimeout(function () {
            $("#modal_loader").modal('hide');
        }, 100)

        return true;
    },

    loadScreen:function (elmTarget) {
        var screenTitle = $(elmTarget).children('a').html();
        screenTitle = screenTitle.replace(/p>/gi, 'span>');
        $("#screen_title").html(screenTitle);
        var data = $(elmTarget).children('a').data('breadcrumb');
        if(data == undefined){
            data = "[]";
        }
        data = JSON.parse(data.replace(/'/gi, '"'));
        $("#screen_breadcrumb").html('');
        $.each(data,function(i, b){
            if(b.link == "#"){
                $("#screen_breadcrumb").append('<li class="breadcrumb-item '+ (i==(data.length-1)?'active' :'') +'">' + b.title + '</li>');
            }else {
                $("#screen_breadcrumb").append('<li class="breadcrumb-item '+ (i==(data.length-1)?'active' :'') +'"><a href="' + b.link + '">' + b.title + '</a></li>');
            }
        });

        this.showLoader();
        $.ajax({
            url:$(elmTarget).children('a').attr('href'),
            type:"GET",
            success: function (ret) {
                customeActions.hideLoader();
                $('#content').html(ret);
            },
            error:function (err, errmsg) {
                customeActions.hideLoader();

                $('#content').html(err.responseText);
            }
        });
    }

};

$('.sidebar li').click(function (e) {
    if($(this).hasClass('has-treeview')){
        return true;
    }
    e.preventDefault();
    customeActions.loadScreen(this);
});

