$(document).ready(function(event) {

    $('.single-event-link').click(function(event) {
        var user_id = $('#container').attr('class');
        event.preventDefault();

        var url = "https://whereto-server.herokuapp.com/users/" + user_id + "/events"

        template = Handlebars.compile($("#single-event-template").html())

        $.getJSON(url, function(json) {
           var desc = "<p>Description: " + json.event.description + "</p>";
            $("#container").html(template(json))

            $('#container a').append(desc)
        }) // end getJSON

    }) // end single


    $('.multi-event-link').click(function(event) {
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

        }) // end getJSON

    }) // end multi

    $('#container').off('click', '.category').on('click', '.category', function(event) {
        event.preventDefault();

        $(this).toggleClass("ui-btn-active");
    }) // end preference selection

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
            "https://whereto-server.herokuapp.com/users/"+user_id+"/interests",
            {interests: interests}
        );

        updateInterests.done(function(response){
            $('#header').removeAttr('style');
            $('#footer').removeAttr('style');
            template = Handlebars.compile($("#single-event-template").html());
            var desc = "<p>Description: " + response.event.description + "</p>";
            $("#container").html(template(response));
            $('#container a').append(desc);
        })

        updateInterests.fail(function(){
            alert("aw man");
        })

    }) // end submit preferences

}); // end document ready

