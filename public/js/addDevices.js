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

        // Range Slider values
       var rangeValues = JSON.parse(localStorage.getItem('rangeValues')) || {};

       $.each(rangeValues, function(key, value) {

        // Apply only if element is included on the page
        if ($('[data-rangeslider="' + key + '"]').length) {

          if (key === 'fridge-temp') {
            // Update Range slider - special case Fridge
            var temperatureFar = value;
            var temperatureCel = (temperatureFar - 32) * 5 / 9;
            var roundCel = Number(Math.round(temperatureCel + 'e2') + 'e-2');
            $('[data-rangeslider="' + key + '"] #fridge-temp-F').html(temperatureFar);
            $('[data-rangeslider="' + key + '"] #fridge-temp-C').html(roundCel);

          } else {
            // Update Range slider - universal
            $('[data-rangeslider="' + key + '"] input[type="range"]').val(value);
            $('[data-rangeslider="' + key + '"] .range-output').html(value);
          }
        }
      });



    // closing if statement of local storage 
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

        // Check the time between changes to prevent Android native browser execute twice
        // If you don't need support for Android native browser - just call "switchSingle" function
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

    // Wash machine controls
    $('.wash-control').click(function() {

     var target = $(this).closest('.timer-controls').data('controls');
     var action = $(this).data('action');
    
     iot.washMachine(target, action);
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

    // Data binding for numeric representation of range slider
    $(document).on('input', 'input[type="range"]', function() {
    $('[data-rangeslider="' + this.id + '"] .range-output').html(this.value);
    });

    // Data binding for numeric representation of Fridge range slider
    $(document).on('input', 'input[type="range"]#fridge-temp', function() {
    var temperatureFar = this.value;
    var temperatureCel = (temperatureFar - 32) * 5 / 9;
    var roundCel = Number(Math.round(temperatureCel + 'e2') + 'e-2');
    $('[data-rangeslider="' + this.id + '"] #fridge-temp-F').html(temperatureFar);
    $('[data-rangeslider="' + this.id + '"] #fridge-temp-C').html(roundCel);

    // Manage temperature visualization heating/cooling in regard to desired (71.6 F)
      if (temperatureFar > 71.6) {
        $('[data-unit="' + this.id + '"]').addClass("heating");
        $('[data-unit="' + this.id + '"]').removeClass("cooling");
      } else if (temperatureFar < 71.6) {
        $('[data-unit="' + this.id + '"]').addClass("cooling");
        $('[data-unit="' + this.id + '"]').removeClass("heating")  
      } else {
        $('[data-unit="' + this.id + '"]').removeClass("cooling");
        $('[data-unit="' + this.id + '"]').removeClass("heating");
      }

    });

    // Data binding for numeric representation of TV Volumee range slider
    $(document).on('input', 'input[type="range"].volume', function() {
    $('[data-rangeslider="' + this.id + '"] .range-output').html(this.value);
    });

    // Bar Chart initialization settings - Chartist.js

    var data01 = {
        // Labels array that can contain any sort of values
        labels: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
        // Series array that contains series objects or in this case series data arrays
        series: [{
            "name": "Kitchen",
            "data": [7, 4, 6, 5, 6, 3, 8]
          },
          {
            "name": "Dining room",
            "data": [3, 1, 1, 2, 1, 2, 2]
          },
          {
            "name": "Living room",
            "data": [6, 2, 3, 4, 2, 5, 7]
          },
          {
            "name": "Bedroom",
            "data": [2, 1, 1, 1, 1, 2, 3]
          },
          {
            "name": "Bathroom",
            "data": [6, 5, 6, 7, 5, 12, 9]
          }
        ]
      };

      var options01 = {
        axisY: {
          labelInterpolationFnc: function(value) {
            return value + 'h'
          }
        },
        height: 240,
        high: 14,
        low: 0,
        scaleMinSpace: 6,
        onlyInteger: false,
        referenceValue: 0,
        seriesBarDistance: 8,
        plugins: [
          Chartist.plugins.legend({
            position: 'bottom'
          })
        ]
      };

      var responsive_steps01 = [
        // Show only every second label
        ['screen and (max-width: 768px)', {
          axisX: {
            labelInterpolationFnc: function skipLabels(value, index, labels) {
              return index % 2 === 0 ? value : null;
            }
          }
        }],
        // Show only every fourth label
        ['screen and (max-width: 480px)', {
          axisX: {
            labelInterpolationFnc: function skipLabels(value, index, labels) {
              return index % 4 === 0 ? value : null;
            }
          }
        }]
      ];

      var responsive_steps02 = [
        // Show only every second label
        ['screen and (max-width: 768px)', {
          axisX: {
            labelInterpolationFnc: function skipLabels(value, index, labels) {
              return index % 2 === 0 ? value : null;
            }
          }
        }],
        // Show only every fourth label
        ['screen and (max-width: 480px)', {
          axisX: {
            labelInterpolationFnc: function skipLabels(value, index, labels) {
              return index % 4 === 0 ? value : null;
            }
          }
        }]
      ];

      // Pie Chart initialization settings - Chartist.js
      var data02 = {
        labels: ['Kitchen', 'Dining room', 'Living room', 'Bedroom', 'Bathroom'],
        series: [28, 12, 20, 9, 31]
      };

      var options02 = {
        chartPadding: 50,
        donut: true,
        donutWidth: 12,
        labelOffset: 20,
        labelDirection: 'explode',
        labelInterpolationFnc: function(value, idx) {
          return data02.series[idx] + '%'
        }
      };

      var responsive_steps02 = [
        ['screen and (max-width: 768px)', {
          height: 240,
          chartPadding: 25
        }]
      ];

      // Initialize a Bar chart in the container with the ID chart01
      new Chartist.Bar('#chart01', data01, options01, responsive_steps01)
        .on('draw', function(data001) {
          if (data001.type === 'bar') {
            data001.element.attr({
              style: 'stroke-width: 6px;'
            });
          }
        });

       // Initialize a Bar chart in the container with the ID chart01
       new Chartist.Bar('#chart02', data02, options02, responsive_steps02)
       .on('draw', function(data02) {
         if (data02.type === 'bar' && data02.value.y > 0) {
           data02.element.attr({
             class: 'ct-bar abovezero'
           });
         }
       });

 // closing of the document tag
});// doc ready END

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
            $('[data-unit="wash-machine"] .status').html('OFF');
        }
    });

    $('[data-unit="wash-machine"] .timer-controls button[data-action="pause"]').css("display", "block");

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

    // "Timeout" function is not necessary - important is to hide the preloader overlay
    setTimeout(function() {

    // Hide preloader overlay when content is loaded
    $('#iot-preloader,.card-preloader').fadeOut();
    $("#wrapper").removeClass("hidden");

    // Initialize range sliders
    // $('input[type="range"]').rangeslider({
    //   polyfill: false,
    //   onSlideEnd: function(position, value) {

    //     var rangeValues = JSON.parse(localStorage.getItem('rangeValues')) || {};
    //     // Update localStorage
    //     if (localStorage) {
    //       rangeValues[this.$element[0].id] = value;
    //       localStorage.setItem("rangeValues", JSON.stringify(rangeValues));
    //     }
    //   }

    // });

    // Check for Main contents scrollbar visibility and set right position for FAB button
    iot.positionFab();

  }, 800);


}); // window onload end

// Apply necessary changes if window resized
$(window).on('resize', function() {

    // Modal reposition when the window is resized
    $('.modal.centered:visible').each(iot.centerModal);

    // Check for Main contents scrollbar visibility and set right position for FAB button
    iot.positionFab();
});