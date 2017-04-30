$(document).ready(function() {
  $("#login-submit").on('click', function(event) {
    event.preventDefault(event);
    const password = $("#password").val();
    const username = $("#username").val();
    $.ajax({
      url: '/api/login',
      type: 'POST',
      dataType: 'json',
      data: {
        email: username,
        password: password
      }
    })
    .done(function(data) {
      if(data.token === undefined){
        return alert("unable to log in");
      }

      document.cookie = "token=" + data.token;
      window.location.href = "/groups.html";
    });
  });
});

console.log('here');
