(function($) {
    var form = $('#mc-embedded-subscribe-form');
    var error = function(msg) {
        $('#mce-error-response').css('display', 'none').text('');
        if (msg) {
            $('#mce-error-response').css('display', 'block').addClass('is-danger').html(msg);
            form.find('input[type=email]').addClass('is-danger');
        }

        state_reset();

        return false;
    };

    function isValidEmailAddress(emailAddress) {
        var pattern = /^([a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+(\.[a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+)*|"((([ \t]*\r\n)?[ \t]+)?([\x01-\x08\x0b\x0c\x0e-\x1f\x7f\x21\x23-\x5b\x5d-\x7e\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|\\[\x01-\x09\x0b\x0c\x0d-\x7f\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))*(([ \t]*\r\n)?[ \t]+)?")@(([a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.)+([a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.?$/i;
        return pattern.test(emailAddress);
    };

    function register($form) {
        $.ajax({
            method: $form.attr('method'),
            url: $form.attr('action'),
            data: $form.serialize(),
            cache       : false,
            dataType    : 'jsonp',
            jsonpCallback:      'c',
            contentType: "application/json; charset=utf-8",
        })
            .done(function(data) {
                if (data.result != "success") {
                    $('#mc-embedded-subscribe').attr('disabled', false);
                    error(data.msg);
                } else {
                    state_done();
                }
            })
            .fail(function(data) {
                error("Could not connect to the registration server. Please try again later.");
            });
    }

    var state_reset = function () {
        $('#mc-embedded-subscribe')
            .attr('disabled', false)
            .text('Subscribe');
    };
    var state_done = function () {
        $('#mc-embedded-subscribe')
            .attr('disabled', true)
            .addClass('btn-confirm')
            .text('Confirm');

        $('#mce-success-response').css('display', 'flex');
        form.find('input[type=email]').removeClass('is-danger');

        ga('send', 'event', 'email', 'subscribe');
    };

    var state_sending = function() {
        $('#mc-embedded-subscribe')
            .attr('disabled', true)
            .text('Sending...');

        form.find('input[type=email]').addClass('is-primary');
    };

    $('#mc-embedded-subscribe-form').submit(function(e) {
        e.preventDefault();

        error();
        if (!isValidEmailAddress($('#mce-EMAIL').val())) {
            return error('Please enter a valid email address.');
        }

        state_sending();
        register($(this));
        return true;
    });
}(jQuery));