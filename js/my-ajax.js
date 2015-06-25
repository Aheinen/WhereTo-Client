$(document).ready(function(event) {

    $('#footer').off('click', '.single-event-link').on('click', '.single-event-link', function(event) {
        event.preventDefault();
        var user_id = $('#container').attr('class');

        var url = "https://whereto-server.herokuapp.com/users/" + user_id + "/events"

        template = Handlebars.compile($("#single-event-template").html())

        $.getJSON(url, function(json) {
            if (json.event.description) {
                var desc = "<p>Description: " + json.event.description + "</p>";
            } else {
                var desc = "<p>Description: Not Provided.</p>"
            }
            $("#container").html(template(json))
            $('#container').find('.back').append(desc)
            $('#footer a').removeClass('ui-btn-active');
        }) // end getJSON


    }) // end single

    $('#container').off('click', '.preview').on('click', '.preview', function(event) {
        event.preventDefault();

        var event_id = $(this).attr('id');

        var url = "https://whereto-server.herokuapp.com/events/" + event_id;

        template = Handlebars.compile($("#single-event-template").html())

        $.getJSON(url, function(json) {
             if (json.event.description) {
                var desc = "<p>Description: " + json.event.description + "</p>";
            } else {
                var desc = "<p>Description: Not Provided.</p>"
            }
            $("#container").html(template(json))
            $('#container').find('.back').append(desc)
        }) // end getJSON

        $('#footer a').removeClass('ui-btn-active') // prevent highlighting of nav buttons

    }) // end single


    $('#footer').off('click', '.multi-event-link').on('click', '.multi-event-link', function(event) {
        var user_id = $('#container').attr('class');
        event.preventDefault();
        if ($(this).attr('href') === '#wishlist'){
            var url = "https://whereto-server.herokuapp.com/users/" + user_id+ "/wishlist"
        }
        else{
            var url = "https://whereto-server.herokuapp.com/users/" + user_id+ "/events/list"
            }
            console.log(url);
            template = Handlebars.compile($("#multi-event-template").html())

        $.getJSON(url, function(json) {
            $("#container").html(template(json))
            $("#container > ul").listview().listview("refresh")
            $('#footer a').removeClass('ui-btn-active');
        }) // end getJSON


    }) // end multi

    $('#container').off('click', '.category').on('click', '.category', function(event) {
        event.preventDefault();

        $(this).toggleClass("ui-btn-active");
    }) // end preference selection



}); // end document ready

// document.addEventListener("deviceready", onDeviceReady, false);
// function onDeviceReady() {
//    window.open = cordova.InAppBrowser.open;
// }
