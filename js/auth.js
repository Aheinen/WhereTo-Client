$(document).on('pagecreate',function(event) {

  template = Handlebars.compile($("#login-template").html());
  $('#container').html(template());

  var ref = new Firebase("https://wheretodbc.firebaseIO.com");

  $('#container').on('click','#login', function(e){
   e.preventDefault();
   // fbAuth().then(function(authData){
   //    var firstName = authData.facebook.cachedUserProfile.first_name;
   //    var lastName = authData.facebook.cachedUserProfile.last_name;
   //    var email = authData.facebook.email;
   //    var picture = authData.facebook.cachedUserProfile.picture.data.url;
      var userInfo = {
        first_name: "Fernanda",
        last_name: "Getschko",
        email: "f.martins.marques@gmail.com",
        image: null
      }
      createUser(userInfo);
   // }, { scope: "email" });

   $('#logout').on('click', function(e){
    e.preventDefault();
    template = Handlebars.compile($("#login-template").html());
    $('#container').html(template());
    $('#container').removeClass();
    $('#container').addClass("landing_page");
    $('#header').css('display', 'none');
    $('#footer').css('display', 'none');
    ref.unauth();
   })
 });

var fbAuth = function(){
  var promise = new Promise(function(resolve, reject){
    ref.authWithOAuthPopup("facebook", function(error, authData) {
      if (error) {
        reject(error);
      } else {
        resolve(authData);
      };
    });
  })
  return promise;
};
});
var createUser = function(obj){
  $.ajax({
    url: baseURL + '/users',
    method:'POST',
    data: obj
  })
  .done(function(response){
    var user_id = response.user.id.toString();
    $('#container').addClass(user_id);
    $('#container').removeClass("landing_page");
    if (response.event != null) {
      $('#header').removeAttr('style');
      $('#footer').removeAttr('style');

      template = Handlebars.compile($("#single-event-template").html());

      if (response.event.description) {
        var desc = "<p>Description: " + response.event.description + "</p>";
      } else {
        var desc = "<p>Description: Not Provided.</p>"
      }

      $("#container").html(template(response));
      $('#container').find('.back').append(desc);

    }
    else {
      template = Handlebars.compile($("#preferences").html());
      $("#container").html(template(response));
      $("#container > ul").listview().listview("refresh");
    }
  console.log(window.location.href);
  })
  .fail(function(){
    console.log("fail");
  })
}


