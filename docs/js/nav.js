($(document).ready(function(){
    $('.navbar-burger').click(function () {
        var id = $(this).attr('data-target');
        $('#'+id).toggleClass('is-active');
        $(this).toggleClass('is-active');
    });
}))(jQuery);