$(document).bind("mobileinit", function(){
  $.mobile.allowCrossDomainPages = true;
  $.support.cors                 = true;
  $.mobile.pushStateEnabled      = false;
  // Need this for mobile cors
});
