$(document).ready(function() {


    // Get checkbox statuses from localStorage if available (IE)
    if (localStorage) {

        // Menu minifier status (Contract/expand side menu on large screens)
        var checkboxValue = localStorage.getItem('minifier');

        if (checkboxValue === 'true') {
            $('#sidebar,#menu-minifier').addClass('mini');
            $('#minifier').prop('checked', true);

        } else {

            if ($('#minifier').is(':checked')) {
                $('#sidebar,#menu-minifier').addClass('mini');
                $('#minifier').prop('checked', true);
            } else {
                $('#sidebar,#menu-minifier').removeClass('mini');
                $('#minifier').prop('checked', false);
            }
        }

        // Switch statuses
        var switchValues = JSON.parse(localStorage.getItem('switchValues')) || {};

        $.each(switchValues, function(key, value) {

            // Apply only if element is included on the page
            if ($('[data-unit="' + key + '"]').length) {

                if (value === true) {

                    // Apply appearance of the "unit" and checkbox element
                    $('[data-unit="' + key + '"]').addClass("active");
                    $("#" + key).prop('checked', true);
                    $("#" + key).closest("label").addClass("checked");

                    //In case of Camera unit - play video
                    if (key === "switch-camera-1" || key === "switch-camera-2") {
                        $('[data-unit="' + key + '"] video')[0].play();
                    }

                } else {
                    $('[data-unit="' + key + '"]').removeClass("active");
                    $("#" + key).prop('checked', false);
                    $("#" + key).closest("label").removeClass("checked");
                    if (key === "switch-camera-1" || key === "switch-camera-2") {
                        $('[data-unit="' + key + '"] video')[0].pause();
                    }
                }
            }
        });
    }


    // Contract/expand side menu on click. (only large screens)
    $('#minifier').click(function() {

        $('#sidebar,#menu-minifier').toggleClass('mini');

        // Save side menu status to localStorage if available (IE)
        if (localStorage) {
            checkboxValue = this.checked;
            localStorage.setItem('minifier', checkboxValue);
        }

    });


    // Side menu toogler for medium and small screens
    $('[data-toggle="offcanvas"]').click(function() {
        $('.row-offcanvas').toggleClass('active');
    });


    // Switch (checkbox element) toogler
    $('.switch input[type="checkbox"]').on("change", function(t) {

        // Check the time between changes to prevert Android native browser execute twice
        // If you dont need support for Android native browser - just call "switchSingle" function
        if (this.last) {

            this.diff = t.timeStamp - this.last;

            // Don't execute if the time between changes is too short (less than 250ms) - Android native browser "twice bug"
            // The real time between two human taps/clicks is usually much more than 250ms"
            if (this.diff > 250) {

                this.last = t.timeStamp;

                iot.switchSingle(this.id, this.checked);

            } else {
                return false;
            }

        } else {

            // First attempt on this switch element
            this.last = t.timeStamp;

            iot.switchSingle(this.id, this.checked);

        }
    });

    // All ON/OFF controls
    $('.lights-control').click(function() {

        var target = $(this).closest('.lights-controls').data('controls');
        var action = $(this).data('action');

        iot.switchGroup(target, action);
    });

    // Reposition to center when a modal is shown
    $('.modal.centered').on('show.bs.modal', iot.centerModal);

    // Reset/Stop countdown timer (EXIT NOW)
    $('#armModal').on('hide.bs.modal', iot.clearCountdown);

    // Garage doors controls
    $('.doors-control').click(function() {

        var target = $(this).closest('.timer-controls').data('controls');
        var action = $(this).data('action');

        iot.garageDoors(target, action);
    });

    // Alerts "Close" callback - hide modal and alert indicator dot when user closes all alerts
    $('#alertsModal .alert').on('close.bs.alert', function() {
        var sum = $('#alerts-toggler').attr('data-alerts');
        sum = sum - 1;
        $('#alerts-toggler').attr('data-alerts', sum);

        if (sum === 0) {
            $('#alertsModal').modal('hide');
            $('#alerts-toggler').attr('data-toggle', 'none');

        }

    });

    // Show/hide tips (popovers) - FAB button (right bottom on large screens)
    $('#info-toggler').click(function() {

        if ($('body').hasClass('info-active')) {
            $('[data-toggle="popover-all"]').popover('hide');
            $('body').removeClass('info-active');
        } else {
            $('[data-toggle="popover-all"]').popover('show');
            $('body').addClass('info-active');
        }
    });

    // Hide tips (popovers) by clicking outside
    $('body').on('click', function(pop) {

        if (pop.target.id !== 'info-toggler' && $('body').hasClass('info-active')) {
            $('[data-toggle="popover-all"]').popover('hide');
            $('body').removeClass('info-active');
        }

    });

});

// Apply necessary changes, functionality when content is loaded
$(window).on('load', function() {

    // This script is necessary for cross browsers icon sprite support (IE9+, ...) 
    svg4everybody();

    // Washing machine - demonstration of running program/cycle
    $('#wash-machine').timer({
        countdown: true,
        format: '%H:%M:%S',
        duration: '1h17m10s',
        callback: function() {
            $('[data-unit="wash-machine"]').removeClass("active");
        }
    });

    if ($('[data-unit="switch-camera-1"]').hasClass("active")) {
        var activeVideo = $('[data-unit="switch-camera-1"] video').get(0);

        if (activeVideo.paused) {
            activeVideo.autoplay = true;
            activeVideo.load();
            activeVideo.play();
        } else {
            activeVideo.pause();
        }
    }

    if ($('[data-unit="switch-camera-2"]').hasClass("active")) {
        var activeVideo = $('[data-unit="switch-camera-2"] video').get(0);

        if (activeVideo.paused) {
            activeVideo.autoplay = true;
            activeVideo.load();
            activeVideo.play();
        } else {
            activeVideo.pause();
        }
    }

    // "Timeout" function is not neccessary - important is to hide the preloader overlay
    setTimeout(function() {

        // Hide preloader overlay when content is loaded
        $('#iot-preloader,.card-preloader').fadeOut();
        $("#wrapper").removeClass("hidden");

        // Check for Main contents scrollbar visibility and set right position for FAB button
        iot.positionFab();

    }, 800);

});

// Apply necessary changes if window resized
$(window).on('resize', function() {

    // Modal reposition when the window is resized
    $('.modal.centered:visible').each(iot.centerModal);

    // Check for Main contents scrollbar visibility and set right position for FAB button
    iot.positionFab();
});