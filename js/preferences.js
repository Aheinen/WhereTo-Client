$(document).ready(function(event) {

    $('#mypanel').off('click').on('click', '#preferences', function(event) {
        event.preventDefault();

        // hide header/footer
        $('#footer').css('display', 'none')

        var user_id = $('#container').attr('class');
        var url = 'https://whereto-server.herokuapp.com/users/' + user_id + "/edit";

        $.getJSON(url, function(json) {
            console.log(json)

            template = Handlebars.compile($("#preferences").html());
            $("#container").html(template(json));
            $("#container > ul").listview().listview("refresh");
        })
    }) // end update preferences

    .on('click', '#home', function(event) {
        var user_id = $('#container').attr('class');

        var url = "https://whereto-server.herokuapp.com/users/" + user_id + "/events"

        template = Handlebars.compile($("#single-event-template").html())

        $.getJSON(url, function(json) {
            var desc = "<p><span class='bold'>Description:</span> " + json.event.description + "</p>";
            $("#container").html(template(json))
            $('#container').find('.back').append(desc)
            $('#footer a').removeClass('ui-btn-active');
            $('#footer').removeAttr('style');
        }) // end getJSON

    }) // end home link

}); // end document ready
