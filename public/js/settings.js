 

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
  
  
        // Side menu toogler for medium and small devices
        $('[data-toggle="offcanvas"]').click(function() {
          $('.row-offcanvas').toggleClass('active');
        });
  
        // Reposition to center when a modal is shown
        $('.modal.centered').on('show.bs.modal', iot.centerModal);
  
        // Alerts "Close" callback - hide modal and alert indicator icon dot when user close all alerts
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
  
        // "Timeout" function is not neccessary - important is to hide preloader overlay
        setTimeout(function() {
  
          // Hide preloader overlay when content is loaded
          $('#iot-preloader,.card-preloader').fadeOut();
          $("#wrapper").removeClass("hidden");
  
          // Check if Main contents scrollbar visibility and set right position for FAB button
          iot.positionFab();
  
        }, 800);
  
      });
  
      // Apply necessary changes if window resized
      $(window).on('resize', function() {
  
        // Modal reposition when the window is resized
        $('.modal.centered:visible').each(iot.centerModal);
  
        // Check if Main contents scrollbar visibility and set right position for FAB button
        iot.positionFab();
      });