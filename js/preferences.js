$(document).ready(function(event) {

  $('#mypanel').off('click').on('click', '#preferences', function(event) {
    event.preventDefault();
    // hide header/footer
    $('#footer').css('display', 'none')

    var user_id = $('#container').attr('class');
    var url = baseURL + '/users/' + user_id + "/edit";

    $.getJSON(url, function(json) {
      console.log(json)

      template = Handlebars.compile($("#preferences").html());
      $("#container").html(template(json));
      $("#container > ul").listview().listview("refresh");
    })
  }) // end update preferences

  .on('click', '#home', function(event) {
    var user_id = $('#container').attr('class');

    var url = baseURL + "/users/" + user_id + "/events"

    template = Handlebars.compile($("#single-event-template").html())

    $.getJSON(url, function(json) {
      var desc = "<p>Description: " + json.event.description + "</p>";
      $("#container").html(template(json))
      $('#container').find('.back').append(desc)
      $('#footer a').removeClass('ui-btn-active');
      $('#footer').removeAttr('style');
    }) // end getJSON
  }) // end home link

  // #.off used to prevent double firing of events
  // http://www.gajotres.net/prevent-jquery-multiple-event-triggering/ See Solution 2
  $('#container').off('click', '#submit_preferences').on('click', '#submit_preferences', function(event) {
    event.preventDefault();

    var interests = []
    var items = $('#container').find('li > a')

    $.each(items, function( index, value ) {

      if ($(this).hasClass("ui-btn-active")) {

        interests.push(index+1);

          } // end if loop
      }); // end each loop

    var user_id = $('#container').attr('class')

    var updateInterests = $.post(
      baseURL + "/users/" + user_id + "/interests",
      {interests: interests}
      );

    updateInterests.done(function(response){
      $('#header').removeAttr('style');
      $('#footer').removeAttr('style');
      template = Handlebars.compile($("#single-event-template").html());
          // var desc = "<p>Description: " + response.event.description + "</p>";
          $("#container").html(template(response));
          // $('#container a').append(desc);
        })

    updateInterests.fail(function(){
      alert("aw man");
    })

  }) // end submit preferences


  $('#mypanel').on('click', '#secret', function(e){
    e.preventDefault();
    $('#container').html('<img id="sherif" src="img/sherif2.gif" />')
    console.log('hello');
  });
}); // end document ready