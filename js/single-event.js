$(document).ready(function(event) {
  baseURL = 'https://whereto-server.herokuapp.com/'
  $('#container').on('swipeleft', '.image', function(e){
    e.preventDefault();
    $('.image').fadeOut();
    var data = {accepted: false};
    createWishlist(data);
  });

  $('#container').on('swiperight', '.image', function(e){
    e.preventDefault();
    $('.image').fadeOut();
    var data = {accepted: true};
    createWishlist(data);
  });

  $('#container').on('click', '.image', function(){
    var page1 = $('.front');
    var page2 = $('.back');
    var toHide = page1.is(':visible') ? page1 : page2 ;
    var toShow = page2.is(':visible') ? page1 : page2 ;

    toHide.removeClass('flip in').addClass('flip out').hide();
    toShow.removeClass('flip out').addClass('flip in').show();
  });
});

var createWishlist = function(data) {
  var user_id = $('#container').attr('class')
  var event_id = $('.image').attr('id');
  var url = 'users/' + user_id + '/events/' + event_id + '/wishlists'
  $.ajax({
    url: baseURL + url,
    type: "POST",
    data: data
  })
  .done(function(response){
    template = Handlebars.compile($("#single-event-template").html());
    $("#container").html(template(response)).css('display', 'none');
    $('#container').fadeIn(1000);
  })
  .fail(function(){
    alert('fail');
  })
}
