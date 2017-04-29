$(document).ready(function() {
  $("#submit").on('click', function(event) {
    event.preventDefault(event);
    const password = $("#password").val();
    const email = $("#email").val();
    const confirm = $("#confirm").val();
    const first = $("#first").val();
    const last = $("#last").val();

    if(password != confirm){
      return alert("Fucking put your password right in cunt");
    }

    $.ajax({
      url: '/api/register',
      type: 'POST',
      dataType: 'json',
      data: {
        email: email,
        password: password,
        firstName: first,
        lastName: last
      }
    })
    .done(function(data) {
      alert(data);
    });
  });
});

console.log('here');
