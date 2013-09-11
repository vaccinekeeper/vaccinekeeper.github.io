// Accommodate running jQuery or Zepto in noConflict() mode by
// using an anonymous function to redefine the $ shorthand name.
// See http://docs.jquery.com/Using_jQuery_with_Other_Libraries
// and http://zeptojs.com/
var libFuncName = null;

if (typeof jQuery === "undefined" &&
    typeof Zepto === "undefined" &&
    typeof $ === "function") {
  libFuncName = $;
} else if (typeof jQuery === "function") {
  libFuncName = jQuery;
} else if (typeof Zepto === "function") {
  libFuncName = Zepto;
} else {
  throw new TypeError();
}

(function ($, window, document, undefined) {
  //clean up empty tags
  $('.google-form-wrapper p, .google-form-wrapper br')
    .filter(function() {
      return $(this).html() == '';
    })
    .remove();
  
  //add required class to required elements
  $('.google-form-wrapper form')
    .find('.ss-item-required input, .ss-item-required textarea')
    .filter(function() {
      return $(this).attr('name').match(/entry\.\d\.single/);
    })
    .addClass('required');
 
  //validate the form
/*  
  $('.google-form-wrapper form').validate({
    submitHandler: function(form) {
      $(form)
        .ajaxSubmit({
          success: function(data) {
            if (data) {
              $(form)
              .hide(200, function() {
                $(this)
                  .prev('.success-msg')
                  .fadeIn('slow')
              })
            }
          },
          error : function (data) {
            console.error(data);
          }
        })
    }
  });
  */
  
  
}(libFuncName, this, this.document));



/*
jQuery(document).ready(function() {
  //clean up empty tags
  jQuery('.google-form-wrapper p, .google-form-wrapper br')
    .filter(function() {
      return jQuery(this).html() == '';
    })
    .remove();
  
  //add required class to required elements
  jQuery('.google-form-wrapper form')
    .find('.ss-item-required input, .ss-item-required textarea')
    .filter(function() {
      return jQuery(this).attr('name').match(/entry\.\d\.single/);
    })
    .addClass('required');
 
  //validate the form
  jQuery('.google-form-wrapper form').validate({
    submitHandler: function(form) {
      jQuery(form)
        .ajaxSubmit({
          success: function(data) {
            if (data) {
              jQuery(form)
              .hide(200, function() {
                jQuery(this)
                  .prev('.success-msg')
                  .fadeIn('slow')
              })
            }
          },
          error : function (data) {
            console.error(data);
          }
        })
    }
  });
});
*/